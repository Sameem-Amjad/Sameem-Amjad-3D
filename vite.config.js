import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ORIGIN, seoRoutes } from "./src/constants/seo.js";

/* Priority by shape of route, so adding a project never needs a second edit.
   Detail pages outrank /builds: they're the pages that actually rank. */
const weight = (loc) =>
  loc === "/"
    ? { changefreq: "weekly", priority: "1.0" }
    : loc === "/work"
    ? { changefreq: "weekly", priority: "0.9" }
    : loc === "/builds"
    ? { changefreq: "monthly", priority: "0.7" }
    : { changefreq: "monthly", priority: "0.8" };

/* Emits sitemap.xml + robots.txt at build time from the same route list the
   prerenderer walks — so a project added to src/constants/index.js can't end
   up prerendered but missing from the sitemap, or the reverse. */
const seoFiles = () => ({
  name: "seo-files",
  // Client build only — the SSR pass shares this config, and without the
  // guard it would emit a second copy of both files into dist-ssr.
  apply: (config, { command }) => command === "build" && !config.build?.ssr,
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoRoutes
  .map((loc) => {
    const { changefreq, priority } = weight(loc);
    return `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
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
