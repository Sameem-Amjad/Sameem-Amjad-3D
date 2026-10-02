# Sameem Amjad — freelance full-stack developer

**Live site: [sameemamjad.com](https://sameemamjad.com)**

Sameem Amjad is a freelance full-stack developer based in Pakistan and the founder of [DevoraX](https://thedevorax.tech). He fixes and ships stuck web and mobile apps — Next.js, React Native, Supabase, Stripe and AWS — including apps built with AI tools such as Lovable, Bolt, Replit and Cursor. He has sold on [Fiverr](https://www.fiverr.com/sameemamjad) since 2022, with a 5.0 rating across 50+ projects for clients in the US, UK, Canada and Hong Kong.

- **Services:** [app rescue for vibe-coded apps](https://sameemamjad.com/services/fix-vibe-coded-app) · [Next.js development](https://sameemamjad.com/services/nextjs-developer) · [App Store & Google Play launch](https://sameemamjad.com/services/app-store-launch) · [marketplace development](https://sameemamjad.com/services/marketplace-development)
- **Guides:** [fixing “RLS disabled in public” in Supabase](https://sameemamjad.com/guides/supabase-rls-disabled-in-public) · [the 404 on refresh in a single-page app](https://sameemamjad.com/guides/fix-404-on-refresh-single-page-app)
- **Work:** [case studies](https://sameemamjad.com/work)
- **Contact:** [book a free call](https://thedevorax.tech/book) · [WhatsApp +92 371 1285190](https://wa.me/923711285190) · [email](mailto:sameemamjadarsu@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sameem-amjad-dev)

---

## This repository

The source of sameemamjad.com: a React 18 + Vite single-page app, **prerendered to static HTML at build time** so every route reaches search engines and AI crawlers with its own title, description, content and JSON-LD — no JavaScript required to read it.

| | |
|---|---|
| Framework | React 18, React Router 6, Vite 4 |
| Styling | Tailwind CSS 3, CSS keyframes above the fold, Framer Motion below it |
| Rendering | `vite build` + `vite build --ssr`, then `scripts/prerender.mjs` writes one HTML file per route |
| SEO | Per-route meta and JSON-LD from one resolver (`src/constants/seo.js`), shared by the prerenderer and the client |
| Generated at build | `sitemap.xml`, `robots.txt`, `llms.txt` (see `vite.config.js`) |
| Hosting | Vercel, with security headers and a CSP in `vercel.json` |
| Contact | EmailJS form, WhatsApp, booking link |
| Analytics | Google Analytics 4 and Microsoft Clarity, loaded from the bundle (`src/utils/analytics.js`) |

### Where the content lives

- `src/constants/index.js` — profile, projects, testimonials (real Fiverr reviews), FAQ, links
- `src/constants/services.js` — the `/services/*` pages
- `src/constants/guides.js` — the `/guides/*` pages
- `src/constants/caseStudies.js` — long-form case-study copy for `/work/*`
- `src/constants/seo.js` — titles, descriptions and the schema graph for every route

A project, service or guide added to those files appears in the prerendered pages, the sitemap, `llms.txt` and the ⌘K palette with no other change.

### Commands

```bash
npm install
cp .env.example .env     # EmailJS keys and the optional GA4 ID
npm run dev              # dev server (serves the unprerendered shell)
npm run build            # client build + SSR build + prerender → dist/
npm run preview          # serve dist/ locally
npm run check:links      # report dead or http:// outbound links
npm run check:palette    # ranking tests for the ⌘K command palette
npm run indexnow         # after a deploy: submit the live sitemap to Bing/IndexNow
```
