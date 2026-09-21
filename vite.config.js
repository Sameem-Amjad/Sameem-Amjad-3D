import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ORIGIN, seoRoutes } from "./src/constants/seo.js";

// Date the site's *content* was last revised — not the date of the last build.
// Bump this when project copy or case-study text actually changes.
//
// Deliberately a constant rather than new Date(): Google checks a claimed
// lastmod against the page's real modification history and, once a site is
// caught restamping every URL on every deploy, it stops trusting the field
// site-wide. A CSS tweak must not tell Google all 28 pages were rewritten.
const CONTENT_REVISED = "2026-09-21";

// sitemaps.org 0.9. <loc> and <lastmod> only: Google ignores <changefreq> and
// <priority>, and Bing confirmed in 2025 that it does too, so emitting them
// adds bytes and a second thing to keep honest in exchange for nothing.
const buildSitemap = (routes) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (loc) => `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${CONTENT_REVISED}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

/* Emits sitemap.xml + robots.txt at build time from the same route list the
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
    // and Search Console then rejects all 28 URLs, not just the bad one.
    const unsafe = seoRoutes.filter((r) => !/^\/[a-z0-9\-/]*$/.test(r));
    if (unsafe.length) {
      this.error(`Sitemap URLs need XML escaping: ${unsafe.join(", ")}`);
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
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
});
