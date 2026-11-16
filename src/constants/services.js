// ─────────────────────────────────────────────────────────────
//  Service pages on this site. One is left: the Next.js page, kept as a
//  personal skills page. thedevorax.tech owns every offer and landing page,
//  so the other three pages that lived here (finish and ship a stuck app, the
//  App Store and Google Play launch, marketplace development) were replaced
//  by permanent redirects in vercel.json to the matching pages there; the
//  links to those pages live in constants/doors.js.
//
//  This page quotes no prices and lays out no offer ladder: services and
//  prices are on thedevorax.tech/services, and the page says so.
//
//  Every claim must be backed by something on the site: `projects` are
//  titles from constants/index.js, `reviewTags` pick real Fiverr reviews by
//  their `tags`. No invented clients or numbers.
//
//  FAQ answers are rendered open on the page AND restated in FAQPage
//  markup, so the first sentence of each must answer the question on its
//  own: it is the sentence an assistant will quote.
//
//  Plain data (its one import is plain data too), so vite.config.js can read
//  it in Node.
// ─────────────────────────────────────────────────────────────

import { devoraxPages } from "./doors";

// Date the page's content last changed: shown on the page, used as
// dateModified in its schema and as its lastmod in the sitemap.
export const SERVICES_UPDATED = "2026-11-16";

export const servicePages = [
  {
    slug: "nextjs-developer",
    name: "Next.js development",
    icon: "web",
    summary:
      "A freelance Next.js developer for fixes, speed, Stripe payments and dashboards, or a new app built properly from the start.",
    serviceType: "Next.js and React web development",
    seoTitle: "Freelance Next.js Developer for Hire · Sameem Amjad",
    seoDescription:
      "Freelance Next.js developer: fixes, performance, Stripe payments and dashboards in Next.js 15, with Supabase and AWS. Rated 5.0 on Fiverr.",
    eyebrow: "service · next.js development",
    h1: "Freelance Next.js developer",
    h1Accent: "for fixes, speed and payments.",
    lede:
      "Founders and agencies bring me in for three kinds of Next.js work: an app that's slow or tangled and needs restructuring, payments and dashboards that need adding, or a new product that needs building properly. I work in your repo and on your Vercel or AWS account. Services and prices are on thedevorax.tech, not on this page.",
    problems: [
      "The app works, but it's slow, and nobody wants to touch the code.",
      "You need Stripe checkout, subscriptions or a customer dashboard, and your team is busy.",
      "Your pages don't rank, because search engines see very little on them.",
      "Your agency landed a Next.js project and needs a senior developer on it.",
    ],
    includes: [
      {
        title: "Restructuring and performance",
        detail:
          "Core Web Vitals, caching, images and bundle size, and a component structure the next developer can follow.",
      },
      {
        title: "Stripe payments and dashboards",
        detail:
          "Checkout, webhooks, subscriptions and the customer dashboard around them. One client's review: Stripe payments and a user dashboard in their Next.js 15 app, delivered a day early.",
      },
      {
        title: "Auth and role-based dashboards",
        detail:
          "Supabase or custom auth, with separate admin, seller and customer views that only show each person what they should see.",
      },
      {
        title: "SEO that works",
        detail:
          "Server rendering, per-page metadata, structured data and sitemaps, so pages are visible to Google and to AI search.",
      },
      {
        title: "Deploys",
        detail: "Vercel or AWS, environment variables, domains and SSL, set up so releases are boring.",
      },
      {
        title: "New builds",
        detail:
          "Landing pages and SaaS apps built from scratch, on the well-supported parts of the stack.",
      },
    ],
    projects: ["Afriva", "Pathana", "Pastel Marketplace", "ConstrAction", "Pianissimo Online", "iDecorwala"],
    reviewTags: ["nextjs"],
    tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel", "AWS"],
    faqs: [
      {
        q: "Can you add Stripe payments to my Next.js app?",
        a: "Yes. Checkout, subscriptions, webhooks and the dashboard around them are some of the most common jobs I do. The part that usually goes wrong is the webhook: the app has to record a payment when Stripe confirms it, not when the browser says so, so that's where I start.",
      },
      {
        q: "How do I improve Next.js performance?",
        a: "Measure first, with Lighthouse or real-user data, then fix the biggest cost. The usual culprits are oversized images, too much JavaScript sent to the browser, data fetched on the client that could be fetched on the server, and components that re-render far more than they need to.",
      },
      {
        q: "Can I hire a remote Next.js developer in a different time zone?",
        a: "Yes. I'm in Pakistan (UTC+5) and most of my clients are in the US and UK. Work is async by default: you get written updates and a preview link, and calls are booked in your time zone.",
      },
      {
        q: "Do you only work in Next.js?",
        a: "No. I also work in plain React, Node and NestJS on the backend, and React Native or Flutter for mobile. Next.js is what I'd pick for most new web products, because it handles SEO and server logic well and is easy to hire for later.",
      },
      {
        q: "Can you take over a Next.js codebase another developer started?",
        a: "Yes, and a fair share of my work is exactly that. I read the code first and tell you honestly what state it's in, before quoting to change anything.",
      },
      {
        q: "Where are your services and prices?",
        a: "Not on this page. DevoraX, the studio I founded, publishes its services and prices on thedevorax.tech, and that is the place to read them.",
        link: { href: devoraxPages.services, label: "Services and prices on thedevorax.tech" },
      },
    ],
    ctaTitle: "Tell me what you're building in Next.js.",
    keywords: ["nextjs", "next.js", "react", "stripe", "dashboard", "freelance", "web", "performance"],
  },
];

export const getServiceBySlug = (slug) => servicePages.find((s) => s.slug === slug) || null;

/* The services whose proof includes a given project — so a project page can
   point at the page that cites it, without a second hand-kept map. */
export const servicesForProject = (title) => servicePages.filter((s) => s.projects?.includes(title));
