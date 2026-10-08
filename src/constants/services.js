// ─────────────────────────────────────────────────────────────
//  Service pages — one per thing people hire Sameem for, each aimed at
//  one buyer search. Drives /services, /services/:slug, the sitemap,
//  llms.txt, the ⌘K palette and each page's Service + FAQPage schema.
//
//  Keyword targets come from Google/Bing autocomplete research
//  (2026-09-29): each page owns ONE primary phrase so no two pages compete.
//    fix-vibe-coded-app      → "fix vibe coded app", "vibe code fixer"
//    nextjs-developer        → "next js freelancer", "freelance next js developer"
//    app-store-launch        → "lovable app to app store", "publish app to play store"
//    marketplace-development → "multi vendor marketplace development"
//  Deliberately absent: an AI-agents page (no AI reviews or agent case
//  study yet) and anything "world's best" (no buyer demand, and an
//  unprovable claim).
//
//  Every claim must be backed by something on the site: `projects` are
//  titles from constants/index.js, `reviewTags` pick real Fiverr reviews by
//  their `tags`. No invented clients, numbers or prices. The only prices
//  quoted are DevoraX's published packages and the finish & ship prices
//  Sameem set on 2026-10-09: $400 audit (credited to the fix), $1,200 per
//  week of work, $1,500 a month for care.
//
//  FAQ answers are rendered open on the page AND restated in FAQPage
//  markup, so the first sentence of each must answer the question on its
//  own: it is the sentence an assistant will quote.
//
//  Plain data with no imports, so vite.config.js can read it in Node.
// ─────────────────────────────────────────────────────────────

export const SERVICES_UPDATED = "2026-10-09";

export const servicePages = [
  {
    slug: "fix-vibe-coded-app",
    // Named "finish & ship" (2026-10-09 strategy): "rescue" is the crowded,
    // cheap end of this market. The slug, SEO title and H1 keep the words
    // buyers actually search ("fix vibe coded app").
    name: "Finish & ship",
    icon: "shield",
    summary:
      "Finish and ship an app that works in the demo but breaks with real users: payments, security, deploys and the App Store, including apps built with Lovable, Bolt, Replit or Cursor.",
    serviceType: "Software repair, security hardening and deployment",
    seoTitle: "Fix Your Vibe-Coded App (Lovable, Bolt, Replit) · Sameem Amjad",
    seoDescription:
      "Lovable, Bolt, Replit or Cursor app broken in production? I fix login, Supabase security, Stripe payments and deploys, then ship it. Audit first, fixed price.",
    eyebrow: "service · finish & ship",
    h1: "Vibe-coded app broken in production?",
    h1Accent: "I'll finish it and ship it.",
    lede:
      "AI builders get you to a working demo fast. Real users are where it breaks: logins that loop, payments that never record, a deploy that 404s, data anyone can read. I find what's wrong, fix it in your codebase and get it live, whether it was built with Lovable, Bolt, Replit, Cursor or v0, or by a contractor who disappeared.",
    problemsTitle: "signs your app needs fixing",
    problems: [
      "It works in the builder's preview, then breaks once it's deployed.",
      "Login or sign-up loops, sends people to the wrong page, or logs them out.",
      "Supabase warns that RLS is disabled, or your API keys are sitting in the browser code.",
      "Stripe takes the money, but your app never records the payment.",
      "Refreshing any page other than the homepage shows a 404.",
      "Pages are slow, layouts break on mobile, and Google isn't indexing it.",
      "Every fix the AI makes breaks something else, and it's burning your credits.",
      "You need to show it to investors or hand it to a team, and you're not sure what's under the hood.",
    ],
    includes: [
      {
        title: "Login and data security",
        detail:
          "Auth flows that hold, row-level security on every Supabase table, and secrets moved out of the browser. The difference between a demo and something you can put real users on.",
      },
      {
        title: "Payments",
        detail:
          "Stripe checkout, webhooks and subscriptions that record every payment, handle failures and never double-charge.",
      },
      {
        title: "Deploys and domains",
        detail:
          "Vercel or AWS, environment variables, custom domain and SSL, and the 404-on-refresh problem single-page apps hit on most hosts.",
      },
      {
        title: "Speed and structure",
        detail:
          "Slow pages, bloated bundles and tangled components, restructured into code the next developer can pick up.",
      },
      {
        title: "SEO for single-page apps",
        detail:
          "Single-page apps, which is how most Lovable and Bolt projects started, can show search engines an almost empty page, especially once they're exported and hosted elsewhere. Prerendering, per-page titles and a sitemap fix that; this site runs on the same setup.",
      },
      {
        title: "Moving off the builder",
        detail:
          "Your code on GitHub, your database and users in a Supabase or AWS account you own, and hosting that isn't tied to the tool you built it with.",
      },
      {
        title: "iOS and Android launch",
        detail:
          "When the next step is the stores: native features such as push notifications and deep links, accounts in your name, and submission until the app is approved.",
      },
      {
        title: "Mobile and UI bugs",
        detail: "Broken layouts, responsive issues and mobile-app UI fixes, down to spacing and typography.",
      },
      {
        title: "A written report",
        detail:
          "What was wrong, what I changed, what's left and what to watch, so the next developer, or the next AI prompt, starts from the truth.",
      },
    ],
    // The offer ladder from the 2026-10-09 strategy, with the prices Sameem
    // set the same day. Keep them in step with src/data/offer.ts on DevoraX.
    steps: [
      {
        title: "Free call",
        detail:
          "Book 30 minutes or message me on WhatsApp with the app link and what's going wrong. You'll hear what I'd check first, whether or not you hire me.",
      },
      {
        title: "Launch-readiness audit",
        detail:
          "$400, credited to the fix if you go ahead. I review the code, database security, payments, hosting and store readiness, and you keep the written report either way. There's an investor-ready version for founders facing technical due diligence.",
      },
      {
        title: "Finish sprint",
        detail:
          "$1,200 per week of work, usually one or two weeks. The audit says how many weeks it needs, so you know the total before anything starts. I fix it in your codebase and test each change before it goes live.",
      },
      {
        title: "Ship and hand over",
        detail:
          "Deployed to your hosting, and to the App Store and Google Play if that's the goal, with notes on everything that changed.",
      },
      {
        title: "Monthly care (optional)",
        detail: "$1,500 a month for fixes, updates and releases, so the next feature doesn't break the last one.",
      },
    ],
    // No project cards here: none of the portfolio builds was a rescue job,
    // so showing them under "proof" implied otherwise. The rescue-tagged
    // Fiverr reviews below are the real evidence.
    projects: [],
    reviewTags: ["rescue"],
    tech: ["Lovable", "Bolt.new", "Replit", "Cursor", "v0", "Next.js", "React", "Supabase", "Stripe", "Vercel", "AWS"],
    faqs: [
      {
        q: "How do you fix a vibe-coded app?",
        a: "I start with an audit, not with code. I go through login, database security, payments, deploy settings and whatever users are complaining about, then list what's broken and what's risky, with a fixed price to fix it. The fixes go into your codebase one problem at a time, and each is tested before the app goes live again.",
      },
      {
        q: "Is Lovable production ready?",
        a: "Lovable is good at getting a product built, but what it generates usually needs a production pass before real users arrive. That means row-level security on every Supabase table, secrets kept off the client, payment webhooks, error handling and a proper deploy. The same goes for Bolt, Replit and Cursor projects, and it's what the audit covers.",
      },
      {
        q: "Why does my app show a 404 when I refresh the page?",
        a: "Most AI-built apps are single-page apps: the server has one real file, index.html, and the app handles every other URL in the browser. When you refresh a page like /dashboard, the host looks for a file that doesn't exist and returns a 404. The fix is a rewrite rule that sends unknown paths to index.html.",
        link: { to: "/guides/fix-404-on-refresh-single-page-app", label: "The rewrite for Vercel, Netlify, AWS and Nginx" },
      },
      {
        q: "Are vibe-coded apps secure?",
        a: "Often not by default. The most common problem is a Supabase database with row-level security switched off, which lets anyone with your public API key read or change your data. Secrets in client code and unchecked user input come next. None of it is hard to fix, but someone has to check for it on purpose.",
        link: { to: "/guides/supabase-rls-disabled-in-public", label: "How to fix “RLS disabled in public”" },
      },
      {
        q: "What does a vibe code cleanup specialist do?",
        a: "A vibe code cleanup specialist takes an app an AI tool or a rushed contractor built and makes it safe to run. That means fixing security holes, broken flows and deploy problems, restructuring the worst of the code, and documenting what's there. The goal is an app you can keep building on, not a rewrite for its own sake.",
      },
      {
        q: "Should I fix my app or rebuild it?",
        a: "Fix it, unless the foundations are wrong. Fixing is usually far cheaper than rebuilding, and a rebuild only makes sense when the data model no longer fits what the product has become, or when every change breaks two other things. The audit tells you which you're dealing with before you spend money on either.",
      },
      {
        q: "Stripe took the money but my app didn't unlock anything. Why?",
        a: "Usually the webhook that tells your app about the payment is failing. The most common cause is Stripe's signature check, which fails with “No signatures found matching the expected signature for payload” when the code verifies a parsed body instead of the raw one, or uses the wrong signing secret. Until the webhook succeeds, Stripe keeps the money and your app never hears about it.",
        link: { to: "/guides/stripe-webhook-no-signatures-found-matching-expected-signature", label: "Fix the Stripe webhook signature error" },
      },
      {
        q: "How much does it cost to fix a Lovable or Bolt app?",
        a: "Most fixes are one or two weeks of work at $1,200 a week. It starts with a $400 audit, credited to the fix if you go ahead, which tells you how many weeks your app needs, so you know the total before anything starts. Monthly care after launch is $1,500 a month, and there's no hourly billing.",
      },
      {
        q: "Who is this for?",
        a: "Founders whose app has real stakes: users signing up, a launch or investor date, a client waiting, or money on the line. It's not a fit for hobby projects with no users or deadline, for equity-only offers, or for WordPress and Shopify theme work.",
      },
      {
        q: "Can I hire you on Fiverr?",
        a: "Yes. I've sold on Fiverr since 2022, with a 5.0 rating across 50+ projects, so you can order there if you prefer its payment protection. You can also work with me directly: message me on WhatsApp or book a call.",
      },
    ],
    related: ["nextjs-developer", "app-store-launch", "marketplace-development"],
    ctaTitle: "Tell me what's broken.",
    keywords: ["finish", "ship", "fix", "rescue", "broken", "bug", "lovable", "bolt", "replit", "cursor", "vibe", "supabase", "stripe", "deploy", "audit"],
  },

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
      "Founders and agencies bring me in for three kinds of Next.js work: an app that's slow or tangled and needs restructuring, payments and dashboards that need adding, or a new product that needs building properly. I work in your repo and on your Vercel or AWS account, and you see working software early instead of a big reveal at the end.",
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
          "Landing pages, SaaS apps and marketplaces built from scratch, on the well-supported parts of the stack.",
      },
    ],
    steps: [
      { title: "Scope", detail: "A short call about what you need, then a written scope and a fixed price." },
      {
        title: "Build in the open",
        detail: "Work lands in your repo in small pieces, with a preview link you can click through.",
      },
      {
        title: "Ship and hand over",
        detail: "Deployed to production, with notes on what was built and how to change it.",
      },
    ],
    projects: ["Afriva", "Pathana", "Pastel Marketplace"],
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
        a: "Yes. I'm in Pakistan (UTC+5) and most of my clients are in the US and UK. Work is async by default: you get written updates and a preview link, calls are booked in your time zone, and messages get a reply within 24 hours.",
      },
      {
        q: "Do you only work in Next.js?",
        a: "No. I also work in plain React, Node and NestJS on the backend, and React Native or Flutter for mobile. Next.js is what I'd pick for most new web products, because it handles SEO and server logic well and is easy to hire for later.",
      },
      {
        q: "Can you take over a Next.js codebase another developer started?",
        a: "Yes, and a fair share of my work is exactly that. I read the code first and tell you honestly what state it's in, before quoting to change anything.",
      },
    ],
    related: ["fix-vibe-coded-app", "marketplace-development", "app-store-launch"],
    ctaTitle: "Tell me what you're building in Next.js.",
    keywords: ["nextjs", "next.js", "react", "stripe", "dashboard", "freelance", "web", "performance"],
  },

  {
    slug: "app-store-launch",
    name: "App Store & Google Play launch",
    icon: "mobile",
    summary:
      "Turn a web app into iOS and Android apps that pass review, or build them properly in React Native or Flutter.",
    serviceType: "Mobile app development and app store publishing",
    seoTitle: "Get Your App Into the App Store & Google Play · Sameem Amjad",
    seoDescription:
      "Turn a Lovable, Bolt or other web app into iOS and Android apps that pass review, or build them in React Native or Flutter. Push, store listings, launch.",
    eyebrow: "service · mobile apps",
    h1: "Your app, live in the App Store",
    h1Accent: "and Google Play.",
    lede:
      "AI builders make web apps. Getting into the stores takes more: packaging the app, adding the native features Apple expects, setting up push notifications and getting through review. I do that part, and when a wrapper won't do, I build the app properly in React Native or Flutter.",
    problems: [
      "You built the product in Lovable or Bolt, and customers keep asking for the app.",
      "Apple rejected your app for being a website in a wrapper.",
      "Push notifications or deep links need to work on both iPhone and Android.",
      "Your mobile app has UI bugs that make it look unfinished.",
    ],
    includes: [
      {
        title: "Wrapper or native, decided honestly",
        detail:
          "A web wrapper is quick and cheap but risks rejection if it adds nothing to the website. React Native or Flutter costs more and is far safer. I'll tell you which your app needs.",
      },
      {
        title: "The native features Apple expects",
        detail:
          "Native navigation, offline states and device features built into the core flows, with push on top. Apple says push alone isn't enough to make a website into an app.",
      },
      {
        title: "Push, in-app and email notifications",
        detail:
          "OneSignal or Firebase set up for both iOS and Android, including the certificate and account setup that usually eats a week.",
      },
      {
        title: "Store accounts in your name",
        detail: "Apple Developer and Google Play Console accounts you own, app signing, TestFlight and internal testing.",
      },
      {
        title: "Listings and review",
        detail:
          "Screenshots, descriptions, privacy labels, and the back-and-forth with app review until the app is approved.",
      },
      {
        title: "Updates after launch",
        detail:
          "Over-the-air updates for fixes that shouldn't wait on review, and a release process for the ones that must.",
      },
    ],
    steps: [
      {
        title: "Look at the app",
        detail: "Send the link. I'll tell you whether it can be wrapped or needs a native build, and what either costs.",
      },
      {
        title: "Build and test",
        detail:
          "Test builds on your own phone through TestFlight and Google Play internal testing before anything is public.",
      },
      {
        title: "Submit and launch",
        detail: "Store listings, submission, and handling review feedback until the app is live.",
      },
    ],
    projects: ["Hear With You", "Loopedin", "TAL Workforce", "Three28", "Dooz Inspected Cars", "Koor Food Delivery"],
    reviewTags: ["mobile"],
    tech: ["React Native", "Flutter", "OneSignal", "Firebase", "TestFlight", "App Store Connect", "Google Play Console"],
    faqs: [
      {
        q: "Can I upload a Lovable app to the Apple App Store?",
        a: "Yes, but not as a plain website in a wrapper. Apple's guideline 4.2 rejects apps that are basically a repackaged website, and its rejection notes say that adding push notifications, location or sharing on its own isn't enough. The app has to work like an app: native navigation, offline behaviour and device features built into what people actually do in it. That means either reworking the wrapped version around those, or rebuilding the key screens in React Native.",
        link: { to: "/guides/app-store-guideline-4-2-minimum-functionality", label: "What to do about a Guideline 4.2 rejection" },
      },
      {
        q: "How do I publish a web app to the Google Play Store?",
        a: "Package the app as a wrapper or a native build, create a Play Console developer account, add the store listing and privacy details, and test it through internal testing before releasing it. Google Play is more forgiving than Apple about wrappers, but new personal developer accounts have to run a closed test with real testers before they're allowed to publish.",
      },
      {
        q: "Should I use React Native or Flutter?",
        a: "Either can ship a great app. I lean to React Native when the team already writes React or the app shares code with a web app, and to Flutter when the design is highly custom. I've shipped both to the App Store and Google Play.",
      },
      {
        q: "Do I own the app and the store accounts?",
        a: "You should, and I set it up that way: the Apple and Google developer accounts are created in your name, the code is yours, and I work inside them as a team member.",
      },
    ],
    related: ["fix-vibe-coded-app", "nextjs-developer", "marketplace-development"],
    ctaTitle: "Send me the app you want in the stores.",
    keywords: ["mobile", "ios", "android", "app store", "play store", "react native", "flutter", "push"],
  },

  {
    slug: "marketplace-development",
    name: "Marketplace development",
    icon: "globe",
    summary:
      "Marketplaces finished and shipped: Sharetribe custom features, native iOS and Android apps, seller payouts, search and admin dashboards, or a custom build when a platform won't fit.",
    serviceType: "Online marketplace development",
    seoTitle: "Multi-Vendor Marketplace Development · Sameem Amjad",
    seoDescription:
      "Multi-vendor marketplaces finished and shipped: Sharetribe custom features, native iOS and Android apps, Stripe Connect payouts, search and admin dashboards.",
    eyebrow: "service · marketplaces",
    h1: "Multi-vendor marketplaces,",
    h1Accent: "built and shipped.",
    lede:
      "A marketplace is two products in one: a shop for buyers and a business tool for sellers, with money moving between them. I've engineered marketplaces for used cars, home-cooked food, multi-vendor retail and antiques, on Sharetribe and on custom stacks. Sharetribe gets you live fast but ships no native mobile app, and payouts are where AI-built marketplaces stall: those are the parts I finish.",
    problems: [
      "You've proved there's demand and need a real two-sided product, not a template.",
      "Your marketplace runs on Sharetribe and customers want an iOS and Android app, which Sharetribe doesn't ship.",
      "Seller payouts or identity checks through Stripe Connect don't work end to end.",
      "Your prototype takes orders but can't handle payouts, refunds or disputes.",
      "Search has slowed down as the catalogue has grown.",
      "Vendors, buyers and admins all need different views of the same data.",
    ],
    includes: [
      {
        title: "Sharetribe custom features",
        detail: "Custom code on Sharetribe's APIs and templates: transaction processes, extra listing data and integrations the no-code console can't do.",
      },
      { title: "Vendor onboarding", detail: "Sign-up, verification, listings and a seller dashboard vendors actually use." },
      {
        title: "Payments and payouts",
        detail: "Checkout, split payments, vendor payouts, refunds and the records your accountant will ask for.",
      },
      { title: "Search and discovery", detail: "Fast search and filters that stay fast as the catalogue grows." },
      { title: "Reviews, disputes and trust", detail: "Ratings, reporting and the admin tools to deal with problems." },
      { title: "Role-based dashboards", detail: "Separate views for admins, managers, sellers and buyers over one backend." },
      {
        title: "Native iOS and Android apps",
        detail: "React Native or Flutter apps on Sharetribe's Marketplace API or your own backend, submitted to the App Store and Google Play until approved.",
      },
    ],
    steps: [
      { title: "Scope", detail: "What the first version must do, what can wait, and a fixed price." },
      { title: "Build", detail: "Weekly demos from the first sprint, so you see the marketplace working early." },
      {
        title: "Launch and scale",
        detail: "A production deploy with monitoring, then iteration once real vendors and buyers arrive.",
      },
    ],
    projects: ["Dooz Inspected Cars", "Koor Food Delivery", "Afriva", "Pastel Marketplace"],
    reviewTags: ["marketplace"],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Supabase", "Stripe", "Elasticsearch", "React Native", "AWS"],
    faqs: [
      {
        q: "How much does it cost to build a marketplace app?",
        a: "It depends on scope, so every project gets a fixed-price proposal after a discovery call. For reference, DevoraX's published packages start at $2,900 for an MVP and $7,500 for a growth build, and larger platforms are scoped individually.",
      },
      {
        q: "Should I use Sharetribe or build a custom marketplace?",
        a: "Use Sharetribe or a similar platform when your marketplace works like the ones it was designed for and speed matters most. Build custom when your transactions, pricing or workflows are unusual, or when the platform's fees and limits start to cost more than engineering would. Pastel runs on Sharetribe; Dooz, Koor and Afriva are custom builds.",
      },
      {
        q: "Does Sharetribe have a mobile app?",
        a: "No. Sharetribe gives you a web marketplace and APIs, not native iOS and Android apps. Your options are a wrapper service, a certified mobile template, or a React Native app built on Sharetribe's Marketplace API; which fits depends on budget and how native the app needs to feel.",
        link: { to: "/guides/sharetribe-mobile-app", label: "Sharetribe mobile app options, compared" },
      },
      {
        q: "Can I start my marketplace in Lovable or Bolt?",
        a: "For a prototype, yes: it's a quick way to test the idea with real users. Payouts, vendor verification, refunds and disputes are where AI-built marketplaces usually need an engineer, so plan for that step before you scale.",
      },
      {
        q: "How long does it take to build a marketplace?",
        a: "An MVP with vendor onboarding, payments and an admin area typically takes 4–8 weeks. A platform with mobile apps and real-time features is more like 3–6 months.",
      },
    ],
    related: ["nextjs-developer", "app-store-launch", "fix-vibe-coded-app"],
    ctaTitle: "Tell me about the marketplace you want to build.",
    keywords: ["marketplace", "multi-vendor", "ecommerce", "e-commerce", "sharetribe", "vendors", "payouts", "stripe connect"],
  },
];

export const getServiceBySlug = (slug) => servicePages.find((s) => s.slug === slug) || null;

/* The services whose proof includes a given project — so a case study can
   point at the service it demonstrates without a second hand-kept map. */
export const servicesForProject = (title) => servicePages.filter((s) => s.projects?.includes(title));
