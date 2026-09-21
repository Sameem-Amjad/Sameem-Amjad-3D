# SEO audit — 19-point checklist

**Site:** https://sameem-the-dev.vercel.app
**Audited:** 2026-09-21
**Scope:** static analysis of the repo + live HTTP checks on every outbound link.

---

## ⚠️ Read this first: three other Claude sessions are editing this repo right now

While this audit ran, `index.html`, `vite.config.js`, `package.json` and
`src/constants/seo.js` were all rewritten underneath me — timestamps land
*seconds* apart, mid-audit. `ListAgents` confirms three peer sessions, two busy.

One of them is building a **server-side prerender pipeline** (`entry-server.jsx`
+ `scripts/prerender.mjs`, wired into `npm run build`). That work overlaps items
**1–6, 10 and 14** below.

**I made no code changes.** Two agents writing the same files is how you lose
work. Nothing here is applied — this is the map, and the section at the bottom
says what I need from you before I touch anything.

---

## Scoreboard

| # | Item | Status | Owner |
|---|------|--------|-------|
| 1 | sitemap.xml | ✅ Done | peer session |
| 2 | robots.txt | ✅ Done | peer session |
| 3 | Remove noindex | ✅ Clean | — |
| 4 | Canonical tags | ✅ Done | peer session |
| 5 | Meta titles | ✅ Done | peer session |
| 6 | Meta descriptions | ✅ Done | peer session |
| 7 | One H1 per page | ✅ Pass | — |
| 8 | Header hierarchy | ❌ **3 defects** | me, on your go-ahead |
| 9 | Alt text | ⚠️ 1 defect + 1 weak | me |
| 10 | Schema markup | 🟡 Written, not yet rendered | peer session |
| 11 | Internal links | ✅ Good | — |
| 12 | Broken links | ❌ **4 dead + 1 placeholder** | **needs you** |
| 13 | Compress images | 🟡 Remote solved, local not | me |
| 14 | Core Web Vitals | 🟡 In flight | peer session |
| 15 | Mobile responsiveness | ✅ Looks sound (not device-tested) | — |
| 16 | Enforce HTTPS | ❌ 1 defect | me |
| 17 | URL slugs | ✅ Clean | — |
| 18 | llms.txt | ❌ Missing | me |
| 19 | Backlink strategy | ❌ Nothing | **needs you** |

---

## What's already handled

**1 · sitemap.xml** — generated at build by the `seoFiles` plugin in
[vite.config.js](vite.config.js), driven off `seoRoutes` in
[src/constants/seo.js](src/constants/seo.js). 28 URLs. Derived from the same
array that renders the routes, so it can't drift when you add a project.

**2 · robots.txt** — same plugin. `Allow: /` plus the sitemap pointer. Correct.

**3 · noindex** — no blanket `noindex` anywhere. The only one is in
[seo.js:208](src/constants/seo.js#L208), applied to *unmatched* paths — right
call, since `<Route path="*">` renders `<Home>` and without it Google would
index junk URLs as soft-404s.

**4 · Canonicals** — `normalizePath` in [seo.js:29](src/constants/seo.js#L29)
strips trailing slashes so `/work/foo/` and `/work/foo` can't both index. Baked
into `index.html` and maintained on client-side navigation.

**5 · Titles / 6 · Descriptions** — per-route in `seo.js`. Descriptions are
clamped to 158 chars on a word boundary, so nothing truncates mid-word in the
SERP. Project pages compose theirs from real case-study copy.

**7 · One H1 per page** — verified, all four route types pass:

| Route | H1 | Source |
|---|---|---|
| `/` | "Sameem Amjad" | [Hero.jsx:109](src/components/Hero.jsx#L109) |
| `/work` | "Selected work." | `PageHeader` |
| `/builds` | "More builds." | `PageHeader` |
| `/work/:slug` | project title | [ProjectDetail.jsx:132](src/pages/ProjectDetail.jsx#L132) |

**11 · Internal links** — better than expected. Navbar routes properly via
`<Link to>`, the footer has a real `<nav aria-label="Footer">` block, and
project pages carry wrapping prev/next nav. Only gap is contextual in-copy
links, which is a nice-to-have, not a defect.

**17 · Slugs** — `slugify` emits `[a-z0-9-]` only, and the build **fails** on a
slug collision rather than silently shipping two projects at one URL. Good.

---

## Defects I found

### 8 · Header hierarchy — 3 skipped levels

Real, and all in card components:

| File | Renders | On page | Problem |
|---|---|---|---|
| [Team.jsx:34](src/components/Team.jsx#L34) | `h4` | `/` | section `h2` → `h4`, skips h3 |
| [projects.jsx:78](src/components/projects.jsx#L78) | `h3` | `/work` | page `h1` → `h3`, skips h2 |
| [projects.jsx:120](src/components/projects.jsx#L120) | `h4` | `/builds` | page `h1` → `h4`, skips h2 **and** h3 |

Note the grids render at *different depths on different pages* — `FeaturedGrid`
sits under an `h2` on the homepage (fine) but directly under the `h1` on
`/work` (skip). So the fix isn't just renaming tags: the card level has to
become a prop, or `/work` and `/builds` need a real `h2` above the grid.

**Fix costs nothing visually** — the sizing is all Tailwind classes, independent
of the tag.

### 9 · Alt text

- **Defect:** [Experience.jsx:22](src/components/Experience.jsx#L22) — company
  logos ship `alt=""`. That marks them decorative, but they're the only thing
  identifying the employer in that row. Should be `` `${company} logo` ``.
- **Weak:** [projects.jsx:11](src/components/projects.jsx#L11) — `alt={title}`
  just restates the heading next to it. `Showcase.jsx` already does this right
  (`` `${p.title} — ${p.tagline}` ``); worth matching.
- Hero and Team alt text are already good.

### 12 · Broken links — 4 dead, verified by HTTP

Checked all 37 outbound URLs. Confirmed dead (re-tested individually, not just
in the burst):

| URL | Code | Where |
|---|---|---|
| `https://wodproleague.es/` | **conn. fail** | DNS resolves to `13.61.144.207`, no HTTP response |
| `play.google.com/…id=com.webrange.outstride` | **404** | app delisted or wrong package id |
| `play.google.com/…id=com.webrangesolutions.wod_pro_league` | **404** | same |
| `apps.apple.com/us/app/outstride/id6736747732` | **404** | app pulled or ID changed |

Plus a placeholder: [index.js:27](src/constants/index.js#L27) —
`calendly: "https://cal.com/"` with a `// TODO` beside it. That's your
**"Book a call" CTA on every page and in the footer**, currently landing on
cal.com's marketing homepage instead of your booking page. Highest-value fix on
this entire list, and it isn't an SEO one.

False alarms, for the record: Fiverr returns 403 to bots (fine), and the App
Store 429s were my own rate-limiting — they pass when retried with a delay.

### 13 · Image compression

Remote is **solved**: [utils/img.js](src/utils/img.js) routes the 21 Supabase
PNGs through the render endpoint, taking 1.7–6.5 MB originals to 40–90 KB WebP,
with a 2x `srcSet`. Genuinely good work.

Local is not: `public/myimage/profile.png` is **359 KB** and is both your hero
portrait *and* the default OG image for every page. Should be WebP with a PNG
fallback — roughly 40–60 KB. Rest of `public/` is fine (888 KB total).

### 16 · HTTPS

One: [index.js:446](src/constants/index.js#L446) —
`web: "http://coffee-shop-original.vercel.app/"`.

I tested the HTTPS variant: **it returns 200**. One-character fix, no downside.

### 18 · llms.txt

Missing entirely. Since `seo.js` already holds structured per-route titles,
descriptions and the full project list, this generates cleanly from the same
source in the existing build plugin — same pattern as sitemap.xml, no new
moving parts.

---

## Two judgment calls worth your eye

**Schema is written but not yet rendered.** `seo.js` has a genuinely good graph
— `Person`, `Organization`, `WebSite`, `CollectionPage`, `CreativeWork`,
`BreadcrumbList`, correctly cross-linked by `@id`. But **no `<script
type="application/ld+json">` exists anywhere in the codebase yet.** It only
starts working once `scripts/prerender.mjs` lands. As of this audit that file
is referenced by `package.json` and `seo.js` but **does not exist** — meaning
`npm run build` is currently broken mid-refactor. Expected; the peer session is
still working. Just don't deploy until it lands.

**The sitemap `lastmod` regressed.** The earlier `vite.config.js` used a pinned
`CONTENT_REVISED` constant with a comment explaining why: Google compares
claimed `lastmod` against real modification history, and a site caught
restamping every URL on every deploy gets the field distrusted site-wide. The
rewrite replaced it with `new Date()` — so a CSS tweak now tells Google all 28
pages were rewritten. The same commit also re-added `changefreq`/`priority`,
which Google has publicly confirmed it ignores.

The first version was right. I'd restore the pinned constant — but it's a peer
session's active decision, so I'm flagging it rather than reverting it.

---

## What I need from you

### Blocking — I can't resolve these without you

**A · The four dead links.** For each, tell me: fix the URL, or drop the link?

1. `wodproleague.es` — is the site down temporarily, or gone?
2. WOD Pro League — Play Store *and* App Store both 404. Delisted?
3. Outstride — Play Store + App Store 404, but `out-stride.com` is live (200).
   Web-only now?

Dropping a dead store badge is usually better than leaving it: a 404 from a
portfolio reads worse than no badge at all.

**B · Your real booking link.** cal.com/you? calendly.com/you? This is the
site's primary conversion path and it's currently a placeholder.

**C · Backlink strategy (item 19).** Nothing exists, and nothing *can* exist in
the repo — backlinks are earned off-site. I can draft a concrete plan, but I
need to know which of these you actually have or will do:

- [ ] GitHub profile README + pinned repos linking here
- [ ] LinkedIn featured section
- [ ] Fiverr profile (you have one — does it link out?)
- [ ] DevoraX site (`thedevorax.tech`) — does it link to this portfolio?
- [ ] Client sites willing to carry a "built by" credit
- [ ] Dev.to / Hashnode / Medium — will you write?
- [ ] Directories: Awwwards, Dribbble, Product Hunt, Peerlist, Wellfound

Realistically the fastest wins are the DevoraX cross-link and client credits,
since those are domains you or people you know already control.

**D · Custom domain?** Everything is hardcoded to
`sameem-the-dev.vercel.app` (`ORIGIN` in `seo.js`). If a real domain is coming,
say so now — moving after Google indexes 28 URLs means redirects and lost
authority. If you own `sameemamjad.com` or similar, point it here *before* we
submit the sitemap.

### Non-blocking — just say go

I can do these immediately, and none of them touch the files the peer sessions
are in:

1. Header hierarchy — items 8 (3 files)
2. Alt text — item 9 (2 files)
3. HTTPS on the coffee-shop link — item 16 (1 char)
4. `llms.txt` generation — item 18 (extends the existing build plugin)
5. `profile.png` → WebP — item 13

**Say the word and I'll take all five**, once the peer sessions are idle so we
don't collide.

### Not verifiable from here

**15 · Mobile responsiveness** reads sound in the code — Tailwind breakpoints
used consistently, `min-h-[44px]` on every tap target, `overflow-x-hidden` on
the shell, a `prefers-reduced-motion` block. But I can't confirm it without a
real device or a running browser. If you want it actually verified rather than
assumed, I'd need to run the dev server and drive a browser — say so and I will.

**14 · Core Web Vitals** needs a deployed URL to measure. Once the prerender
work lands and you deploy, PageSpeed Insights on the live site gives real
numbers. What I *can* see statically: the JS bundle is **412 KB** in a single
chunk with no code splitting, and fonts still load via `@import` in
`index.css` — which is render-blocking regardless of the new `preconnect`
hints, because the browser can't discover the font URL until the stylesheet
parses. Moving that to a `<link>` in `index.html` is a real LCP win.

---

*Audit is static analysis plus live link checks. No code was modified.*
