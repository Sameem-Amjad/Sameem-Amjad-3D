import { existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  ORIGIN,
  seoRoutes,
  seoForPath,
  isoDurationSeconds,
  videoUploadIso,
  videoTitle,
} from "./src/constants/seo.js";
import {
  profile,
  links,
  featuredProjects,
  moreProjects,
  slugify,
  getProjectBySlug,
} from "./src/constants/index.js";
import { servicePages } from "./src/constants/services.js";
import { guides } from "./src/constants/guides.js";

// Date the site's *content* was last revised — not the date of the last build.
// Bump this when project copy or case-study text actually changes.
//
// Deliberately a constant rather than new Date(): Google checks a claimed
// lastmod against the page's real modification history and, once a site is
// caught restamping every URL on every deploy, it stops trusting the field
// site-wide. A CSS tweak must not tell Google all 28 pages were rewritten.
const CONTENT_REVISED = "2026-10-19";

// The case study behind a /work/<slug> route, when it has a walkthrough.
const videoProjectFor = (route) => {
  const m = route.match(/^\/work\/([^/]+)$/);
  const project = m ? getProjectBySlug(m[1]) : null;
  return project?.video ? project : null;
};

// Captions are free text; one stray & would invalidate the whole file.
const xmlText = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Google's video sitemap extension. Same title, caption, length and date as
// the page's VideoObject, from the same helpers in seo.js.
const videoEntry = (project) => {
  const v = project.video;
  return `
    <video:video>
      <video:thumbnail_loc>${ORIGIN}${v.poster}</video:thumbnail_loc>
      <video:title>${xmlText(videoTitle(project))}</video:title>
      <video:description>${xmlText(v.caption)}</video:description>
      <video:content_loc>${ORIGIN}${v.src}</video:content_loc>
      <video:duration>${isoDurationSeconds(v.duration)}</video:duration>
      <video:publication_date>${videoUploadIso(v.uploadDate)}</video:publication_date>
    </video:video>`;
};

// sitemaps.org 0.9. <loc> and <lastmod> only: Google ignores <changefreq> and
// <priority>, and Bing confirmed in 2025 that it does too, so emitting them
// adds bytes and a second thing to keep honest in exchange for nothing.
// Case studies with a walkthrough also carry a <video:video> entry.
const buildSitemap = (routes) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map((loc) => {
    const project = videoProjectFor(loc);
    return `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${CONTENT_REVISED}</lastmod>${project ? videoEntry(project) : ""}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

/* Every walkthrough must point at files that exist in public/video under a
   URL-safe name, with a parseable length and date. A typo here would ship a
   broken player and a sitemap entry Google rejects, and nothing else would
   notice. Returns a list of problems. */
const videoProblems = () =>
  seoRoutes.map(videoProjectFor).filter(Boolean).flatMap((p) => {
    const v = p.video;
    const out = [];
    for (const [key, ext] of [["src", "mp4"], ["poster", "jpg"]]) {
      const file = v[key];
      if (!new RegExp(`^/video/[a-z0-9-]+\\.${ext}$`).test(file || "")) out.push(`${p.title}: video.${key} "${file}"`);
      else if (!existsSync(new URL(`./public${file}`, import.meta.url))) out.push(`${p.title}: missing public${file}`);
    }
    try {
      const secs = isoDurationSeconds(v.duration);
      if (secs < 1 || secs > 28800) out.push(`${p.title}: video.duration ${v.duration} out of range`);
    } catch (e) {
      out.push(`${p.title}: ${e.message}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.uploadDate || "")) out.push(`${p.title}: video.uploadDate "${v.uploadDate}"`);
    if (!v.caption) out.push(`${p.title}: video.caption is empty`);
    return out;
  });

/* llmstxt.org format — the machine-readable index assistants look for.
   Built from seoForPath, the same resolver the prerenderer and <Seo> use, so
   the blurb an LLM reads is the blurb Google reads. A second hand-kept copy
   would be wrong within a week. */
const buildLlmsTxt = () => {
  const line = (path, label) => {
    const { title, description } = seoForPath(path);
    return `- [${label || title}](${ORIGIN}${path}): ${description}`;
  };
  const project = (p) => line(`/work/${slugify(p.title)}`, p.title);

  return `# ${profile.name}

> ${profile.bio}

${profile.role} at ${profile.company}. ${profile.location}.

## Hire or contact

- [Book a free 30-minute call](${links.booking}): scope, timeline and a fixed price, whether or not you hire
- [WhatsApp ${profile.phone}](${links.whatsapp}): fastest reply
- [Email](${links.email}): ${profile.email}
- [Fiverr](${links.fiverr}): 5.0 rating across 50+ projects

## Services

${servicePages.map((sv) => line(`/services/${sv.slug}`, sv.name)).join("\n")}

## Guides

${guides.map((g) => line(`/guides/${g.slug}`, g.title)).join("\n")}

## Pages

${["/", "/services", "/guides", "/work", "/builds"].map((r) => line(r)).join("\n")}

## Case studies

${featuredProjects.map(project).join("\n")}

## More builds

${moreProjects.map(project).join("\n")}

## Elsewhere

- [${profile.company}](${links.devorax}): the studio I founded and lead
- [Fiverr](${links.fiverr}): freelance profile and client reviews
- [LinkedIn](${links.linkedin})
- [GitHub](${links.github})
- [X](${links.x})
`;
};

/* Emits sitemap.xml, robots.txt and llms.txt at build time from the same route list the
   prerenderer walks — so a project added to src/constants/index.js can't end
   up prerendered but missing from the sitemap, or the reverse. */
const seoFiles = () => ({
  name: "seo-files",
  // Client build only — the SSR pass shares this config, and without the
  // guard it would emit a second copy of both files into dist-ssr.
  apply: (config, { command }) => command === "build" && !config.build?.ssr,
  generateBundle() {
    // A duplicate <loc> means two project titles collapsed to one slug — a
    // routing bug where one project silently shadows the other.
    const dupes = seoRoutes.filter((r, i) => seoRoutes.indexOf(r) !== i);
    if (dupes.length) {
      this.error(`Duplicate sitemap URLs (slug collision): ${dupes.join(", ")}`);
    }

    // Slugs are [a-z0-9-] by construction, so nothing needs XML escaping —
    // assert it rather than assume it, since one stray & invalidates the file
    // and Search Console then rejects every URL, not just the bad one.
    const unsafe = seoRoutes.filter((r) => !/^\/[a-z0-9\-/]*$/.test(r));
    if (unsafe.length) {
      this.error(`Sitemap URLs need XML escaping: ${unsafe.join(", ")}`);
    }

    const badVideos = videoProblems();
    if (badVideos.length) {
      this.error(`Walkthrough video problems:\n  ${badVideos.join("\n  ")}`);
    }

    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: buildSitemap(seoRoutes),
    });
    this.emitFile({
      type: "asset",
      fileName: "robots.txt",
      source: `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
    });
    this.emitFile({
      type: "asset",
      fileName: "llms.txt",
      source: buildLlmsTxt(),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ ssrBuild }) => ({
  plugins: [react(), seoFiles()],
  build: {
    rollupOptions: {
      /* Client build only. The SSR pass shares this config and treats react
         as external, so naming it in manualChunks there fails the build. */
      output: ssrBuild
        ? {}
        : {
            /* Split the framework and animation libs out of the app chunk.
               Deliberately NOT route-level React.lazy: the prerenderer uses
               renderToString, which cannot resolve a lazy component, so every
               page would bake its Suspense fallback into the static HTML and
               undo the prerender. Same bytes on a cold visit, but app edits
               stop invalidating the vendor code that never changed. */
            manualChunks: {
              react: ["react", "react-dom", "react-router-dom"],
              motion: ["framer-motion"],
            },
          },
    },
  },
}));
