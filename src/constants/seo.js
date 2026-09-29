// ─────────────────────────────────────────────────────────────
//  Per-route SEO metadata — one resolver, consumed twice:
//    · at build time by scripts/prerender.mjs, baked into static HTML
//    · at runtime by <Seo>, on client-side route changes
//  Both paths share this file so the crawler-visible head and the
//  in-app head can never drift apart.
// ─────────────────────────────────────────────────────────────

import { allProjects, slugify, getProjectBySlug, profile, links, faqs } from "./index";
import { servicePages, getServiceBySlug, SERVICES_UPDATED } from "./services";
import { guides, getGuideBySlug } from "./guides";
import { sized } from "../utils/img";

/* The canonical origin. Everything derives from it: canonicals, og:url,
   the sitemap, llms.txt and every @id in the schema graph — so the site can
   only ever declare one home.

   Apex, not www: sameemamjad.com is what goes in an email signature. Vercel
   must have the apex set as the primary domain so www redirects to it; if
   that is ever flipped, every canonical here would point at a URL that
   redirects, which Google tolerates but should not have to. */
export const ORIGIN = "https://sameemamjad.com";
export const SITE_NAME = "Sameem Amjad";
export const DEFAULT_OG_IMAGE = `${ORIGIN}/myimage/profile.png`;

/* Google truncates around 155–160 chars. Clamp on a word boundary so
   descriptions never end mid-word in the SERP. */
const clamp = (s = "", max = 158) => {
  const t = String(s).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const stop = cut.lastIndexOf(" ");
  return `${(stop > max * 0.6 ? cut.slice(0, stop) : cut).replace(/[\s,;:.·–—-]+$/, "")}…`;
};

/* "/work/foo/" and "/work/foo" are the same page — pick one spelling so the
   canonical never declares the site a duplicate of itself. */
export const normalizePath = (pathname = "/") => {
  const p = (pathname || "/").split("?")[0].split("#")[0];
  return p !== "/" && p.endsWith("/") ? p.replace(/\/+$/, "") : p;
};

// Project images live on Supabase Storage; ask for a 1200px render so the
// OG card isn't a 6 MB PNG that Slack and LinkedIn refuse to fetch.
const ogFor = (project) =>
  project?.image ? sized(project.image, 1200, 80) : DEFAULT_OG_IMAGE;

/* DevoraX's own site already publishes an Organization node at this @id.
   Using the same IRI here, rather than minting sameemamjad.com/#organization,
   lets anything that reads both graphs merge them into one company instead
   of two companies with the same name. */
const ORG_ID = `${links.devorax}/#organization`;

const person = {
  "@type": "Person",
  "@id": `${ORIGIN}/#person`,
  name: profile.name,
  // The spellings the same person goes by elsewhere: the GitHub display
  // name and the Fiverr/handle form. Lets an engine tie those pages to him.
  alternateName: ["Sameem_Amjad", "sameemamjad"],
  // One title, the one buyers search for. The DevoraX role lives in worksFor
  // and in the description, not as a second jobTitle.
  jobTitle: "Full-Stack Developer",
  email: profile.email,
  url: ORIGIN,
  image: DEFAULT_OG_IMAGE,
  // Third person and fact-only, because this is the sentence an assistant
  // lifts when asked who he is. Same text as llms.txt and the footer.
  description: profile.bio,
  worksFor: { "@id": ORG_ID },
  homeLocation: { "@type": "Country", name: "Pakistan" },
  // knowsAbout is how the Person entity gets associated with a topic. Proven
  // work first (it is what the reviews and case studies back), AI after.
  knowsAbout: [
    "Full-stack web development",
    "Next.js",
    "React",
    "Node.js",
    "Supabase",
    "Stripe integration",
    "AWS deployment",
    "React Native",
    "Flutter",
    "Fixing and securing AI-generated apps (Lovable, Bolt, Replit, Cursor)",
    "Marketplace development",
    "System design",
    "LLM application development",
    "AI agents",
  ],
  /* Pages about this person, not the company. links.devorax was doing double
     duty — asserted here as another page about Sameem and at organization.url
     as the company's website, which are different claims. The team page is a
     page about him; the company homepage is not. */
  sameAs: [
    `${links.devorax}/team`,
    links.linkedin,
    links.github,
    links.x,
    links.fiverr,
  ].filter(Boolean),
  /* How to reach him, stated as data. An assistant asked "how do I contact
     Sameem Amjad" can answer from this without scraping a button label. */
  telephone: profile.phone.replace(/\s+/g, ""),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: profile.phone.replace(/\s+/g, ""),
      email: profile.email,
      url: links.whatsapp,
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
  ],
};

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: profile.company,
  url: links.devorax,
  founder: { "@id": `${ORIGIN}/#person` },
};

const website = {
  "@type": "WebSite",
  "@id": `${ORIGIN}/#website`,
  url: ORIGIN,
  name: `${profile.name} — ${profile.role}`,
  publisher: { "@id": `${ORIGIN}/#person` },
  inLanguage: "en",
};

const breadcrumb = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(({ name, path }, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${ORIGIN}${path}`,
  })),
});

const projectListItems = (list) =>
  list.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${ORIGIN}/work/${slugify(p.title)}`,
    name: p.title,
  }));

/* Every page's @graph must DEFINE the @ids it references. Citing
   ".../#person" from a project page while only the homepage defines that node
   leaves a dangling reference, and consumers drop the relation rather than
   resolving it across documents. These three are cheap and self-contained, so
   each page carries its own copy. */
/* The homepage's primary subject is a person, which is exactly what Google
   documents ProfilePage for. Person alone describes the entity; ProfilePage
   says "and this page is about them", which is the part that makes the page
   itself resolvable as the entity's profile. mainEntity points at the same
   Person node rather than restating it, so there is still one Person in the
   graph. Only on "/" — /work and the case studies are not profile pages. */
const profilePage = {
  "@type": "ProfilePage",
  "@id": `${ORIGIN}/#profilepage`,
  url: ORIGIN,
  name: `${profile.name} — ${profile.role}`,
  mainEntity: { "@id": `${ORIGIN}/#person` },
  isPartOf: { "@id": `${ORIGIN}/#website` },
};

const SHARED_NODES = [person, organization, website];

/* Google truncates on rendered width (~600px), not a character count; 65 is
   the closer proxy and 60 was throwing away usable characters. Drop the brand
   suffix before letting the subtitle be cut, and cut the subtitle before the
   project name — a title truncated mid-word reads as broken in the SERP. */
const TITLE_MAX = 65;

/* Subtitles are " · "-separated clauses, and clamping used to cut inside one:
   "Global fitness competitions · 120+…" strands a number from its unit and
   looks machine-broken rather than merely long. Drop whole trailing clauses
   instead, so what survives is always complete. Falls back to the character
   clamp only when even the first clause is too long. */
const clampSubtitle = (subtitle, room) => {
  if (subtitle.length <= room) return subtitle;
  const parts = subtitle.split(" · ");
  for (let n = parts.length - 1; n >= 1; n--) {
    const candidate = parts.slice(0, n).join(" · ");
    if (candidate.length <= room) return candidate;
  }
  return clamp(subtitle, room);
};

const composeTitle = (head, subtitle, brand) => {
  const full = subtitle ? `${head} — ${subtitle} · ${brand}` : `${head} · ${brand}`;
  if (full.length <= TITLE_MAX) return full;

  const noBrand = subtitle ? `${head} — ${subtitle}` : head;
  if (noBrand.length <= TITLE_MAX) return noBrand;

  const room = TITLE_MAX - head.length - 3;
  if (subtitle && room >= 12) return `${head} — ${clampSubtitle(subtitle, room)}`;
  return clamp(head, TITLE_MAX);
};

/* FAQ markup restates exactly what the page renders. Google only honours
   it for text a visitor can reach, and assistants quote the answer text, so
   the markup and the page must be the same words — both read from one
   array. */
const faqPage = (id, list) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: list.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

/* ── Static routes ───────────────────────────────────────── */

const STATIC = {
  "/": {
    // Name first (branded searches have to be won before anything else),
    // then the phrase buyers type. "Freelance Full-Stack Developer for Hire"
    // is the one title pattern that ranks for an individual on that query.
    title: `${profile.name} — Freelance Full-Stack Developer for Hire`,
    // What Google prints under the title: the lead offer, in the words people
    // search, inside the ~158-char clamp. Was "AI agents … voice agents",
    // which no review or case study backs.
    description:
      "Freelance full-stack developer. I fix stuck apps and ship them: Next.js, React Native, Supabase, Stripe and AWS, including apps built with Lovable or Bolt.",
    type: "profile",
    image: DEFAULT_OG_IMAGE,
    graph: [profilePage, person, organization, website, faqPage(`${ORIGIN}/#faq`, faqs)],
  },
  "/work": {
    title: `Work — ${allProjects.length} shipped products · ${profile.name}`,
    description: clamp(
      `Case studies from ${allProjects.length} production products: social platforms at 2.4M+ users, marketplaces moving $1.2B+, AI systems and mobile apps live on the App Store and Google Play.`
    ),
    type: "website",
    image: ogFor(allProjects[0]),
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/work#page`,
        url: `${ORIGIN}/work`,
        name: "Work",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${ORIGIN}/#person` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: allProjects.length,
          itemListElement: projectListItems(allProjects),
        },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
      ]),
      ...SHARED_NODES,
    ],
  },
  "/builds": {
    title: `Builds — more shipped production work · ${profile.name}`,
    description: clamp(
      // Described these as "experiments and side projects" while the page
      // itself lists seven Live-badged client products with revenue figures.
      // The title tag is the highest-weight on-page relevance signal and it
      // was undervaluing its own page, and contradicting /work.
      "A wider cut of production work across web, mobile, AI and cloud — client products shipped and live, beyond the featured case studies."
    ),
    type: "website",
    image: DEFAULT_OG_IMAGE,
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/builds#page`,
        url: `${ORIGIN}/builds`,
        name: "Builds",
        isPartOf: { "@id": `${ORIGIN}/#website` },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Builds", path: "/builds" },
      ]),
      ...SHARED_NODES,
    ],
  },
  "/services": {
    title: `Services — full-stack & AI development · ${profile.name}`,
    description: clamp(
      "App rescue, Next.js development, App Store launch and marketplace builds. Senior-led, fixed scope and fixed price, from Sameem Amjad and DevoraX."
    ),
    type: "website",
    image: DEFAULT_OG_IMAGE,
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/services#page`,
        url: `${ORIGIN}/services`,
        name: "Services",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${ORIGIN}/#person` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: servicePages.length,
          itemListElement: servicePages.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${ORIGIN}/services/${s.slug}`,
            name: s.name,
          })),
        },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      ...SHARED_NODES,
    ],
  },
  "/guides": {
    title: `Guides — fixing apps that break in production · ${profile.name}`,
    description: clamp(
      "Short, complete fixes for the problems AI-built apps hit in production — Supabase security, deploys, 404s — with the exact code for each."
    ),
    type: "website",
    image: DEFAULT_OG_IMAGE,
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${ORIGIN}/guides#page`,
        url: `${ORIGIN}/guides`,
        name: "Guides",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: guides.length,
          itemListElement: guides.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${ORIGIN}/guides/${g.slug}`,
            name: g.title,
          })),
        },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
      ]),
      ...SHARED_NODES,
    ],
  },
};

/* A service page's graph: the Service itself, provided by the Person, plus
   its FAQ. */
const serviceSeo = (service) => {
  const url = `${ORIGIN}/services/${service.slug}`;
  return {
    path: `/services/${service.slug}`,
    canonical: url,
    title: service.seoTitle,
    description: clamp(service.seoDescription),
    image: DEFAULT_OG_IMAGE,
    type: "website",
    robots: "index,follow,max-image-preview:large,max-snippet:-1",
    graph: [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.seoDescription,
        url,
        provider: { "@id": `${ORIGIN}/#person` },
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: links.booking,
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: service.seoTitle,
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${url}#service` },
        dateModified: SERVICES_UPDATED,
      },
      ...(service.faqs?.length ? [faqPage(`${url}#faq`, service.faqs)] : []),
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.name, path: `/services/${service.slug}` },
      ]),
      ...SHARED_NODES,
    ],
  };
};

/* A guide is a TechArticle written by the Person — authorship and dates
   are what make a how-to citable, so both are stated here and shown on the
   page. `about` ties it to the service it leads to. */
const guideService = (guide) => (guide.service ? getServiceBySlug(guide.service) : null);

const guideSeo = (guide) => {
  const url = `${ORIGIN}/guides/${guide.slug}`;
  return {
    path: `/guides/${guide.slug}`,
    canonical: url,
    title: guide.seoTitle,
    description: clamp(guide.seoDescription),
    image: DEFAULT_OG_IMAGE,
    type: "article",
    robots: "index,follow,max-image-preview:large,max-snippet:-1",
    graph: [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.seoDescription,
        url,
        mainEntityOfPage: url,
        image: DEFAULT_OG_IMAGE,
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { "@id": `${ORIGIN}/#person` },
        publisher: { "@id": `${ORIGIN}/#person` },
        isPartOf: { "@id": `${ORIGIN}/#website` },
        inLanguage: "en",
        // Named inline, not a bare @id: the Service node itself lives on the
        // service page's graph, and a reference this graph doesn't define
        // would be dropped by consumers.
        ...(guideService(guide)
          ? {
              about: {
                "@type": "Service",
                "@id": `${ORIGIN}/services/${guide.service}#service`,
                name: guideService(guide).name,
                url: `${ORIGIN}/services/${guide.service}`,
              },
            }
          : {}),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: guide.title, path: `/guides/${guide.slug}` },
      ]),
      ...SHARED_NODES,
    ],
  };
};

/* ── Resolver ────────────────────────────────────────────── */

export const seoForPath = (pathname = "/") => {
  const path = normalizePath(pathname);
  const canonical = `${ORIGIN}${path}`;

  const guideMatch = path.match(/^\/guides\/([^/]+)$/);
  const guide = guideMatch ? getGuideBySlug(guideMatch[1]) : null;
  if (guide) return guideSeo(guide);

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  const service = serviceMatch ? getServiceBySlug(serviceMatch[1]) : null;
  if (service) return serviceSeo(service);

  const match = path.match(/^\/work\/([^/]+)$/);
  const project = match ? getProjectBySlug(match[1]) : null;

  if (project) {
    const slug = slugify(project.title);
    // Only about half the projects carry a tagline; the rest have `category`
    // (the stack line). Without this the title read "AgroBridge — undefined".
    const subtitle = project.tagline || project.category;
    return {
      path,
      canonical: `${ORIGIN}/work/${slug}`,
      title: composeTitle(project.title, subtitle, profile.name),
      description: clamp(project.description || subtitle || project.title),
      image: ogFor(project),
      type: "article",
      robots: "index,follow,max-image-preview:large,max-snippet:-1",
      graph: [
        {
          "@type": "CreativeWork",
          "@id": `${ORIGIN}/work/${slug}#project`,
          name: project.title,
          headline: subtitle || project.title,
          description: project.description,
          url: `${ORIGIN}/work/${slug}`,
          image: ogFor(project),
          creator: { "@id": `${ORIGIN}/#person` },
          keywords: (project.tags || []).join(", "),
          isPartOf: { "@id": `${ORIGIN}/#website` },
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${slug}` },
        ]),
        ...SHARED_NODES,
      ],
    };
  }

  const base = STATIC[path];

  // Unknown path: App renders <Home> for "*" and Vercel answers 200, so
  // canonicalising blindly would let /banana assert itself as a real page and
  // mint unbounded duplicates of the homepage. No canonical, noindex instead.
  if (!base) {
    return {
      path,
      canonical: null,
      title: `Page not found · ${profile.name}`,
      description:
        "That page doesn't exist. Browse the work, the builds, or head back to the homepage.",
      image: DEFAULT_OG_IMAGE,
      type: "website",
      robots: "noindex,follow",
      graph: [],
    };
  }

  return {
    path,
    canonical,
    robots: "index,follow,max-image-preview:large,max-snippet:-1",
    ...base,
  };
};

/* Every route the prerenderer and the sitemap should emit. */
export const seoRoutes = [
  "/",
  "/services",
  ...servicePages.map((s) => `/services/${s.slug}`),
  "/guides",
  ...guides.map((g) => `/guides/${g.slug}`),
  "/work",
  "/builds",
  ...allProjects.map((p) => `/work/${slugify(p.title)}`),
];
