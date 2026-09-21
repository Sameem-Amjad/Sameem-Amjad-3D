import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { allProjects, slugify } from "./src/constants/index.js";

export const ORIGIN = "https://sameem-the-dev.vercel.app";

// Date the site's *content* was last revised — not the date of the last build.
// Bump this when project copy or case-study text actually changes.
//
// Deliberately a constant rather than new Date(): Google checks a claimed
// lastmod against the page's real modification history and, once a site is
// caught restamping every URL on every deploy, it stops trusting the field
// site-wide. A CSS tweak must not tell Google all 28 pages were rewritten.
const CONTENT_REVISED = "2026-09-21";

// Every crawlable URL, derived from the same array that renders the routes,
// so the sitemap cannot drift when a project is added or a title is edited.
const routes = () => [
  "/",
  "/work",
  "/builds",
  ...allProjects.map((p) => `/work/${slugify(p.title)}`),
];

// sitemaps.org 0.9. <loc> and <lastmod> only: Google ignores <changefreq> and
// <priority>, and Bing confirmed in 2025 that it does too, so emitting them
// adds bytes and a second thing to keep honest in exchange for nothing.
const buildSitemap = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${CONTENT_REVISED}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const buildRobots = () =>
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;

// Emits sitemap.xml + robots.txt into the build output. They are generated
// rather than committed, and must NOT also exist in public/ — publicDir is
// copied into the same outDir, so a static copy would silently collide.
//
// Vercel's `rewrites` run after the filesystem check, so the SPA catch-all in
// vercel.json does not shadow these files once they exist. (That ordering is a
// property of `rewrites`; the legacy `routes` key would shadow them.)
const seoFiles = () => ({
  name: "seo-files",
  apply: "build",
  generateBundle() {
    const urls = routes();

    // A duplicate <loc> is accepted by crawlers but means two titles collapsed
    // to one slug — a routing bug where one project shadows the other.
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
    if (dupes.length) {
      this.error(`Duplicate sitemap URLs (slug collision): ${dupes.join(", ")}`);
    }

    // Slugs are [a-z0-9-] by construction, so nothing needs XML escaping —
    // assert it rather than assume it, since one stray & invalidates the file
    // and Search Console then rejects all 28 URLs, not just the bad one.
    const unsafe = urls.filter((u) => !/^\/[a-z0-9\-/]*$/.test(u));
    if (unsafe.length) {
      this.error(`Sitemap URLs need XML escaping: ${unsafe.join(", ")}`);
    }

    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: buildSitemap(urls),
    });
    this.emitFile({
      type: "asset",
      fileName: "robots.txt",
      source: buildRobots(),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
});
