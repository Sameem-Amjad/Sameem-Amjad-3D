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
| 12 | Broken links | ✅ **Fixed** — dead links removed, checker added |
| 13 | Compress images | ✅ **Fixed** — 776 KB → 106 KB |
| 14 | Core Web Vitals | ✅ **Measured: 65 → 86 mobile** |
| 15 | Mobile responsiveness | ✅ **Verified** — Lighthouse mobile audits pass |
| 16 | Enforce HTTPS | ✅ **Fixed** |
| 17 | URL slugs | ✅ Clean |
| 18 | llms.txt | ✅ **Added** |
| 19 | Backlink strategy | 📘 **Explained below — your move** |

**18 of 19 done and deployed.** The last one (backlinks) is off-site work only
you can do — explained in plain terms at the bottom.

Live Lighthouse, mobile: **Performance 86 · Accessibility 97 · Best Practices 96
· SEO 100**.

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

### 12 · Broken links — removed, plus a checker

**WOD Pro League** — site and both store listings 404, so all three links are
gone and the card renders without badges. `LiveLinks` already hides a project
with no valid URLs, so nothing broke. Commented with a TODO for when you send
the current links.

**Outstride** — both store listings 404, website is live. Store links dropped,
`out-stride.com` kept.

On *"don't show links if they aren't responding"* — that can't be a runtime
feature. A page can't test its own outbound links, because CORS hides the
response status from JavaScript; and even if it could, you'd be firing 40
requests on every page load to hide two badges. It has to be a maintenance job
instead, so I automated the job:

```bash
npm run check:links
```

Walks `src/`, finds every outbound URL, checks it with a browser user-agent and
a proper connection pool, and reports what's dead and where it's referenced. It
separates **bot-blocked** hosts (Fiverr 403s every crawler — that's not a dead
link) from genuinely dead ones, and flags any `http://` that should be `https://`.
Exit code is always 0 — it reports, it never fails your deploy. A flaky network
shouldn't block a release.

Current run: **32 links, all responding.**

### 14 · Core Web Vitals — both items done

**Fonts moved out of CSS.** They were loading via `@import` in `index.css`. An
`@import` is only discovered *after* the bundled stylesheet downloads and
parses, so the font request started a full round trip late and blocked first
paint for that whole window. `preconnect` could not fix this — it warms the TCP
connection but never tells the browser what to fetch. As a `<link>` in
`index.html`, the request now goes out with the initial HTML parse, in parallel
with the CSS.

**Vendor chunking.** One 427 KB chunk became three:

| Chunk | Size | gzip |
|---|---|---|
| `react` (react, dom, router) | 162 KB | 53 KB |
| `motion` (framer-motion) | 105 KB | 36 KB |
| app code | 159 KB | 48 KB |

Same bytes on a first visit, but editing your copy now invalidates 48 KB of
cache instead of all 136 KB — returning visitors stop re-downloading React
because you reworded a heading.

**I did not do route-level `React.lazy`**, though it's the usual advice here. It
would break the prerender: React 18's `renderToString` can't resolve a lazy
component, so every page would bake its loading spinner into the static HTML and
undo the entire SEO gain. The prerender is worth far more than the code split.

### The booking CTA — no longer dead

`links.calendly` was `https://cal.com/` — cal.com's *marketing homepage*, not a
booking page. All **ten** "Book a call" CTAs dead-ended there: nav, hero,
services, team, FAQ, footer, contact panel, and every work/builds/project page.

It now points at `/#contact`, your own form, which is already wired to EmailJS
and works. Strictly better than a dead link while you decide on a scheduler.
**To switch to a real one, change one line** in `src/constants/index.js`.

While doing this I found `PrimaryButton` accepted a `to` prop and silently
ignored it, so both buttons now route internal links through React Router
instead of emitting a bare `<a>` that would full-reload the SPA.

---

## Measured results

Lighthouse against the live site, mobile, throttled to slow 4G with 4× CPU
slowdown — Lighthouse's default, and deliberately pessimistic.

| | Before | After |
|---|---|---|
| **Performance** | 65 | **86** |
| Accessibility | 97 | 97 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |
| LCP | 8.6 s | **3.7 s** |
| FCP | 3.0 s | **1.8 s** |
| Speed Index | 5.7 s | **4.1 s** |
| TBT | 0 ms | 50 ms |
| CLS | 0 | 0 |

### What was actually wrong

Not what it looked like. LCP was 8.6s but **92% of it was render delay, not
network** — TTFB was 681 ms and the LCP element's load time was 0 ms, because
it is a paragraph that was in the HTML from the first byte.

Two things were hiding it:

- **framer-motion serialises `initial` into SSR output.** Around 125 elements
  shipped as `opacity:0` and only appeared once React had hydrated and the
  animations ran. The prerender was doing its job for crawlers — SEO scored 100
  throughout — while humans watched a blank screen.
- **The boot splash** was a fixed, full-viewport overlay removed on mount. Right
  when the page really was an empty `<div id="root">`; once prerendering landed
  it covered content that had already arrived.

The fix took two attempts. Forcing `#hero` visible with a `.pre-hydrate` class
failed because `main.jsx` removed it on the next animation frame, long before
hydration — so the hero painted, blanked, and came back. Retiming could not fix
it either: these are *mount* animations, so framer-motion always restarts them
from `opacity:0` once it takes over.

Above-the-fold entrance simply cannot depend on JS. The hero, navbar and
portrait now animate with CSS keyframes, which start at first paint, need no
bundle, and run on the compositor. Below-the-fold sections still use
framer-motion — they animate on scroll, by which point the bundle has arrived.

Fonts were also unblocked (`media="print"` + `onload`), worth ~1 s of
render-blocking time. Render-blocking resources now report **none**.

### What's left in the 3.7 s

Render delay is still ~2.8 s, but it is now the entrance animation itself — the
`backwards` fill holds each element at its start frame during its delay, and
Chrome does not count a zero-opacity element as painted. That is a design
choice, not a defect.

I tested removing the fade from the LCP paragraph (translate-only entrance) and
it changed nothing — local LCP stayed 2.6 s — so the fade is not the
bottleneck, and the change was reverted rather than altering the design for no
measured gain.

Worth keeping in perspective: this is **lab** data under deliberate throttling.
Google ranks on **field** data from real users (CrUX), which the site has not
accumulated yet. A local build with no Vercel TTFB scores **95 / LCP 2.6 s**, so
most of the remaining gap is network, not page weight.

### Mobile (item 15)

Previously "looks sound in code, not verified". Now verified — Lighthouse's
mobile audits all pass: viewport meta, touch target size and spacing, and
legible font sizes.

One real accessibility bug surfaced and was fixed: the star rating used
`aria-label` on a bare `<span>`, which ARIA prohibits on generic elements, so
screen readers could ignore it. It now carries `role="img"`.

---

## Item 19 · Backlinks, explained properly

You asked what this actually means. Here it is without the jargon.

### What a backlink is

A backlink is just **another website linking to yours**. That's the whole
concept.

Google's original insight was to treat a link as a *vote*. If lots of sites
link to you, you're probably worth showing. Votes aren't equal, though — a link
from a site Google already trusts counts for far more than a link from a site
nobody visits.

### Why you specifically need them

Everything in items 1–18 was **on-page** SEO: making your site legible to
crawlers. That work is now done, and it's the part you control completely.

But on-page SEO only decides *whether you can rank*. It doesn't make you rank.
Your domain is `sameem-the-dev.vercel.app` — brand new, on a shared host, with
**zero** sites linking to it. To Google you're currently indistinguishable from
an abandoned side project. Perfect markup on a site with no inbound links still
lands on page 5.

Backlinks are the part that moves you up. They're also the only part that
can't be done in code — which is why this is the one item I can't finish for you.

### What counts, and what actively hurts

**Real votes:** a relevant site, genuinely choosing to link to you, in
content a human reads.

**Worthless:** paid link farms, "1000 backlinks for $5" gigs, comment spam,
directory blasts. Google has classified these for fifteen years. At best they
do nothing; at worst you get a manual penalty that's slow and painful to
reverse. **Do not buy backlinks.** If you take one thing from this section,
that's it.

### Your actual list, ordered by effort-to-payoff

**1 · DevoraX → portfolio.** You own `thedevorax.tech`. Does it link here? If
not, that's a free link from a relevant domain, and it's a two-minute edit on a
site you control. Do this first.

**2 · GitHub profile.** Put the URL in your profile's website field and your
profile README. `github.com` is one of the most trusted domains on the web.

**3 · Fiverr.** You have a 5.0 top-rated profile. Check whether it links out —
Fiverr may `nofollow` it, which passes less ranking weight, but it still sends
you *real clients*, which matters more than the SEO.

**4 · Client credits.** The strongest links on your list. You built
`mypastel.com`, `out-stride.com`, `talservices.co.uk`, `got2.travel`,
`bondlypets.com` and more. A "Built by Sameem Amjad" in the footer of even
three of those is exactly the kind of link Google weighs heavily: a real,
relevant site vouching for you in context. Ask the clients you're on good terms
with. Some will say yes immediately.

**5 · Profile sites.** LinkedIn featured section, Peerlist, Wellfound. Fast,
low value individually, but they're 15 minutes total and they establish that the
same name and site appear consistently across the web — which Google uses to
connect the dots about who you are.

**6 · Writing.** Dev.to, Hashnode, a personal blog. Highest ceiling by far —
you've built serverless video pipelines, real-time leaderboards at 120 countries,
marketplaces moving $1.2B. That's genuinely rare material. But it only works if
you write *consistently*, and one abandoned post does nothing. Only commit if
you'll actually keep going.

**Skip entirely:** Awwwards and Product Hunt. They're for launches and visual
showcases, not engineer portfolios. Poor fit for your time.

### What to expect

Backlinks are slow. Weeks to months before Google recrystallises rankings, not
days. The DevoraX link and two or three client credits will do more for you than
everything else on that list combined — and they're the ones you can get this
week.

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
