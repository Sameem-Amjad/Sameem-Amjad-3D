# SEO audit — 19-point checklist

**Site:** https://sameem-the-dev.vercel.app
**Audited:** 2026-09-21 · **Updated after fixes:** 2026-09-21

---

## Scoreboard

| # | Item | Status |
|---|------|--------|
| 1 | sitemap.xml | ✅ Done — 28 URLs, generated at build |
| 2 | robots.txt | ✅ Done |
| 3 | Remove noindex | ✅ Clean |
| 4 | Canonical tags | ✅ Done |
| 5 | Meta titles | ✅ Done — per route |
| 6 | Meta descriptions | ✅ Done — per route, clamped to 158 |
| 7 | One H1 per page | ✅ Pass |
| 8 | Header hierarchy | ✅ **Fixed** |
| 9 | Alt text | ✅ **Fixed** |
| 10 | Schema markup | ✅ Done — rendered via prerender |
| 11 | Internal links | ✅ Good |
| 12 | Broken links | ⚠️ **4 dead — needs your call** |
| 13 | Compress images | ✅ **Fixed** — 776 KB → 106 KB |
| 14 | Core Web Vitals | 🟡 Partly — see below |
| 15 | Mobile responsiveness | ✅ Sound in code (not device-tested) |
| 16 | Enforce HTTPS | ✅ **Fixed** |
| 17 | URL slugs | ✅ Clean |
| 18 | llms.txt | ✅ **Added** |
| 19 | Backlink strategy | ❌ **Needs you** |

**15 of 19 done. 4 open — and 3 of those are decisions only you can make.**

---

## What I fixed this session

### 8 · Header hierarchy — 4 skips closed

Every page type now steps `h1 → h2 → h3` with no gaps. Verified against the
*prerendered HTML*, not just the source:

| Page | Before | After |
|---|---|---|
| `/` | h2 → h4 in Team | h1 → h2 → h3 |
| `/work` | h1 → h3 | h1 → h2 → h3 |
| `/builds` | h1 → h4 | h1 → h2 → h3 |
| `/work/:slug` | h1 → h3 | h1 → h2 → h3 |

Two of these were worth more than the tag change:

- `/work` and `/builds` got an `sr-only` h2 above the grid. No visual change —
  the `PageHeader` already labels the page visually, so a visible one would be
  redundant.
- **`/work/:slug` was the real find.** Its section labels ("01 // the problem",
  "02 // the approach", "03 // what I built") rendered as `<p>`. So the
  structure of every case study — the pages most meant to rank — was invisible
  to crawlers. They're `h2` now. `mono-label` carries the sizing, so nothing
  moved on screen.

### 9 · Alt text

- Employer logos in `Experience.jsx` shipped `alt=""`, marking them decorative
  when they were the only thing naming the company. Now `` `${org} logo` ``.
- Project card images said `alt={title}` — a restatement of the heading right
  beside them. Now `` `${title} — ${tagline}` ``, matching what `Showcase.jsx`
  already did well.
- **Zero empty alts** left in the prerendered homepage.

### 13 · Image compression — 776 KB → 106 KB

| File | Before | After |
|---|---|---|
| `profile.png` | 367 KB | **41 KB** webp |
| `usman_cto.jpeg` | 409 KB | **65 KB** webp |

An 86% cut on the two heaviest visitor-facing assets. Both were full-resolution
1254px originals being scaled down in CSS.

The originals stay on disk on purpose: `DEFAULT_OG_IMAGE` still points at
`profile.png`, because LinkedIn and several link scrapers still handle WebP
badly. Browsers get WebP, scrapers get PNG.

*(The 21 Supabase project images were already handled — `utils/img.js` routes
them through a resize + WebP endpoint, 1.7–6.5 MB down to 40–90 KB.)*

### 16 · HTTPS

`coffee-shop-original.vercel.app` was linked over `http://`. I tested the HTTPS
variant — 200. Switched. No `http://` URLs left in `src/`.

### 18 · llms.txt

Now generated at build alongside `sitemap.xml` and `robots.txt`, from
`seoForPath` — the same resolver the prerenderer and `<Seo>` use. So the blurb
an assistant reads is the blurb Google reads, and a project added to
`constants/index.js` appears in all three files or none. A hand-kept copy would
have been stale within a week.

6.2 KB: profile, all 28 pages grouped into Pages / Case studies / More builds,
plus outbound profile links.

---

## Still open

### ⚠️ 12 · Four dead links — I need your call on each

Verified individually over HTTP, not just in a burst:

| Link | Result |
|---|---|
| `wodproleague.es` | DNS resolves to `13.61.144.207`, **no HTTP response** |
| WOD Pro League — Play Store | **404** |
| WOD Pro League — App Store | **404** |
| Outstride — Play Store | **404** |
| Outstride — App Store | **404** |

Both apps 404 on **both** stores. That usually means delisted, not a typo.
Outstride's website (`out-stride.com`) is still live and returns 200.

**Fix the URLs, or drop the badges?** A dead store badge on a portfolio reads
worse than no badge — it suggests the work didn't survive. I'd drop the store
links for both and keep Outstride's web link, but they're your projects and you
know whether they're coming back.

*Not broken, for the record:* Fiverr returns 403 to bots, and the App Store
429s in my first pass were my own rate-limiting — they pass on retry.

### 🔴 The booking link — highest-value fix on this page, and it isn't SEO

[`src/constants/index.js:27`](src/constants/index.js#L27)

```js
calendly: "https://cal.com/", // TODO: replace with your real Calendly / Cal.com link
```

That's the **"Book a call" CTA on every page, in the nav, and in the footer** —
currently dropping people on cal.com's marketing homepage. Every visitor who
wants to hire you hits a dead end.

**Send me the real link and I'll wire it in a minute.**

### ❌ 19 · Backlink strategy — needs your input

Can't live in the repo; backlinks are earned off-site. I'll draft a real plan,
but tell me which of these you actually have or will do:

- [ ] `thedevorax.tech` — does it link back to this portfolio?
- [ ] GitHub profile README + pinned repos
- [ ] LinkedIn featured section
- [ ] Fiverr profile — does it link out?
- [ ] Client sites willing to carry a "built by" credit
- [ ] Dev.to / Hashnode / Medium — will you actually write?
- [ ] Directories: Peerlist, Wellfound, Awwwards, Product Hunt

Fastest real wins are the DevoraX cross-link and client credits — domains you
or people you know already control. The rest is slower and mostly depends on
whether you'll write consistently.

### 🟡 14 · Core Web Vitals — two known items left

Needs a deployed URL for real numbers (PageSpeed Insights). Statically visible:

1. **427 KB JS in a single chunk**, no code splitting. Route-level lazy loading
   would cut what `/` has to parse before paint.
2. **Fonts still load via `@import` in `index.css`** — render-blocking
   regardless of the new `preconnect` hints, because the browser can't discover
   the font URL until the stylesheet parses. Moving it to a `<link>` in
   `index.html` is a straightforward LCP win.

Say the word on either.

### 15 · Mobile — sound, but not device-tested

Tailwind breakpoints used consistently, `min-h-[44px]` on every tap target,
`overflow-x-hidden` on the shell, a `prefers-reduced-motion` block. I can't
confirm it without driving a real browser. Ask and I'll run the dev server and
check properly.

---

## Also worth knowing

**The prerender pipeline landed and works.** `npm run build` emits 28 routes +
`404.html` as static HTML, so crawlers get real markup and per-route meta
instead of an empty `<div id="root">`. That's what makes items 4, 5, 6 and 10
actually function rather than just exist in source.

**The sitemap `lastmod` regression got fixed.** It briefly used `new Date()`,
which would have told Google all 28 pages were rewritten every time you tweaked
CSS. It's back to a pinned `CONTENT_REVISED` constant — bump it when project
copy actually changes.

---

*Build verified green after every change. Heading order checked against
prerendered HTML output, not source.*
