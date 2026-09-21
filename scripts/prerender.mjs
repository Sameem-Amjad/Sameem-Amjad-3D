/* Turns the SPA into a set of static pages.
 *
 * Vercel serves one index.html for every path, so before this ran, every
 * route shipped the same <title>, the same description, and an empty
 * <div id="root">. Google's renderer can execute the bundle and eventually
 * see the real page; Bing, LinkedIn, Slack, X and most AI crawlers will not.
 *
 * So each known route is rendered once here, at build time, and written to
 * its own HTML file with its own head. The client bundle is untouched —
 * main.jsx hydrates the markup instead of creating it from scratch.
 *
 * Runs after `vite build` and `vite build --ssr`; see package.json.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");

const { render, seoRoutes, seoForPath, headTagsToHtml } = await import(
  join(root, "dist-ssr", "entry-server.js")
);

const template = await readFile(join(DIST, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_DIV = '<div id="root"></div>';

if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  throw new Error(
    "prerender: dist/index.html is missing the <!--seo--> markers or an empty " +
      "#root div. index.html changed shape — update this script to match."
  );
}

// "/" -> dist/index.html, "/work/foo" -> dist/work/foo/index.html.
// Directory-index files are what let Vercel serve /work/foo with no rewrite
// and no trailing-slash redirect.
const fileFor = (route) =>
  route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");

/* Visible text inside <main>, i.e. the routed content only.
   Measuring the whole document is useless here: Navbar and Footer sit outside
   <Routes>, so a route that renders nothing still scores several hundred
   characters of chrome and sails past any floor. */
const mainText = (html) =>
  (html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
const MIN_TEXT = 200;

let written = 0;
const failures = [];

for (const route of seoRoutes) {
  try {
    const seo = seoForPath(route);
    const appHtml = render(route);

    // A route that renders to almost nothing doesn't throw — a component
    // returning null, or a <Navigate> short-circuiting, produces a valid but
    // empty page. main.jsx then sees a non-empty #root and hydrates the
    // emptiness rather than rendering, so the route ships permanently blank.
    if (mainText(appHtml) < MIN_TEXT) {
      throw new Error(
        `<main> rendered ${mainText(appHtml)} chars of text (floor ${MIN_TEXT}) ` +
          `— the route resolved but produced an empty page`
      );
    }

    // Function replacers: a plain replacement string treats $&, $` and $' as
    // substitution patterns, and React escapes an apostrophe to &#x27; — so a
    // literal "$" before one in any project copy would splice the matched text
    // into the middle of the page.
    const html = template
      .replace(SEO_BLOCK, () => headTagsToHtml(seo))
      .replace(ROOT_DIV, () => `<div id="root">${appHtml}</div>`);

    const file = fileFor(route);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, "utf8");
    written += 1;
  } catch (err) {
    failures.push({ route, err });
  }
}

/* Vercel serves 404.html, with a real 404 status, for any path that isn't a
   file. Every real route is a file now, so this catches only junk URLs — and
   it ships noindex with no canonical, which is what stops /banana from being
   indexed as a 200-status duplicate of the homepage. */
const notFound = seoForPath("/__not-found__");
await writeFile(
  join(DIST, "404.html"),
  template
    .replace(SEO_BLOCK, () => headTagsToHtml(notFound))
    .replace(ROOT_DIV, () => `<div id="root">${render("/__not-found__")}</div>`),
  "utf8"
);

for (const { route, err } of failures) {
  console.error(`prerender: ${route} failed — ${err.message}`);
}

// A half-prerendered dist is worse than none: some routes would ship real
// HTML and the rest a blank shell, and nothing downstream would say which.
if (failures.length) {
  throw new Error(`prerender: ${failures.length}/${seoRoutes.length} routes failed`);
}

console.log(`prerender: ${written} routes + 404.html → static HTML`);
