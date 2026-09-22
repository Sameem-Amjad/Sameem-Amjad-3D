// ─────────────────────────────────────────────────────────────
//  Per-route SEO metadata — one resolver, consumed twice:
//    · at build time by scripts/prerender.mjs, baked into static HTML
//    · at runtime by <Seo>, on client-side route changes
//  Both paths share this file so the crawler-visible head and the
//  in-app head can never drift apart.
// ─────────────────────────────────────────────────────────────

import { allProjects, slugify, getProjectBySlug, profile, links } from "./index";
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

const person = {
  "@type": "Person",
  "@id": `${ORIGIN}/#person`,
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: ORIGIN,
  image: DEFAULT_OG_IMAGE,
  description: profile.subheadline,
  worksFor: { "@id": `${ORIGIN}/#organization` },
  // knowsAbout is how the Person entity gets associated with a topic. Listed
  // specifically, because "AI engineering" is too broad to attach to anything.
  knowsAbout: [
    "AI agents",
    "Agentic systems and workflows",
    "AI orchestration",
    "Voice agents",
    "Retrieval-augmented generation (RAG)",
    "LLM application development",
    "Solution architecture",
    "System design",
    "Full-stack web development",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "React Native",
    "Cloud architecture",
  ],
  sameAs: [links.devorax, links.fiverr].filter(Boolean),
};

const organization = {
  "@type": "Organization",
  "@id": `${ORIGIN}/#organization`,
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
const SHARED_NODES = [person, organization, website];

/* Google truncates titles around 60 characters. Drop the brand suffix before
   letting the subtitle be cut, and cut the subtitle before the project name —
   a title truncated mid-word reads as broken in the SERP. */
const TITLE_MAX = 60;
const composeTitle = (head, subtitle, brand) => {
  const full = subtitle ? `${head} — ${subtitle} · ${brand}` : `${head} · ${brand}`;
  if (full.length <= TITLE_MAX) return full;

  const noBrand = subtitle ? `${head} — ${subtitle}` : head;
  if (noBrand.length <= TITLE_MAX) return noBrand;

  const room = TITLE_MAX - head.length - 3;
  if (subtitle && room >= 12) return `${head} — ${clamp(subtitle, room)}`;
  return clamp(head, TITLE_MAX);
};

/* ── Static routes ───────────────────────────────────────── */

const STATIC = {
  "/": {
    title: `${profile.name} — ${profile.role} · ${profile.company}`,
    // What Google prints under the title. Leads with the work people search
    // for rather than a job title, and stays inside the ~158-char clamp.
    description:
      "Sameem Amjad builds AI agents, agentic workflows and voice agents, plus the web, mobile and cloud systems around them. Founder & Lead Engineer, DevoraX.",
    type: "profile",
    image: DEFAULT_OG_IMAGE,
    graph: [person, organization, website],
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
    title: `Builds — experiments & side projects · ${profile.name}`,
    description: clamp(
      "Smaller builds, experiments and tools — the things built between client projects: prototypes, internal tooling and AI side projects by Sameem Amjad."
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
};

/* ── Resolver ────────────────────────────────────────────── */

export const seoForPath = (pathname = "/") => {
  const path = normalizePath(pathname);
  const canonical = `${ORIGIN}${path}`;

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
  "/work",
  "/builds",
  ...allProjects.map((p) => `/work/${slugify(p.title)}`),
];
