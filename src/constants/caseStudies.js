// ─────────────────────────────────────────────────────────────
//  Rich case-study content, keyed by project slug (slugify(title)).
//  Merged over the base project object in getProjectBySlug().
//  Every field here is optional and the detail page degrades gracefully
//  when a field is missing.
//
//  Honesty rules (2026-10-08): `results` states only what a buyer can
//  check, such as a store listing, a live site or a quote the client
//  published. It does not repeat usage figures nobody can see, and it says
//  plainly when a project was built as an employee elsewhere rather than
//  for a DevoraX client.
//
//  Shape per entry:
//    overview  – 1–2 sentence lead shown under the hero title
//    problem   – "01 // the problem"  paragraph
//    approach  – "02 // the approach" paragraph
//    features  – "03 // what I built" cards  [{ title, detail }]
//    results   – impact-band closing paragraph
//    quote     – first-person pull-quote (Sameem's voice)
//    year      – optional; shown in spec.config when present
// ─────────────────────────────────────────────────────────────

export const caseStudies = {
  loopedin: {
    overview:
      "A social app that fuses short-form video with live, local event discovery. I built its backend while working at Zencloud.",
    problem:
      "Social feeds and event discovery usually live in two separate apps. Loopedin had to be both, a short-form video feed and a live local-events layer, under one roof, and it had to stay real-time without the cloud bill growing faster than the audience.",
    approach:
      "I architected the backend as independent Node.js microservices on AWS so video, messaging, events and scoring can each scale on their own. A serverless pipeline on AWS MediaConvert transcodes uploads into adaptive HLS streams, Socket.io backed by Redis handles messaging and presence, and a gamified LoopScore engine rewards activity.",
    features: [
      { title: "Serverless video pipeline", detail: "Upload-to-playback transcoding on AWS MediaConvert, so video scales without dedicated media servers." },
      { title: "Real-time messaging", detail: "Socket.io + Redis for low-latency chat, presence and notifications." },
      { title: "Live event discovery", detail: "A location-aware events layer surfaces what's happening nearby, blended into the feed." },
      { title: "LoopScore engine", detail: "A gamified scoring system that rewards activity." },
    ],
    results:
      "Loopedin launched on Google Play and the App Store in September 2026, so it is early: the store listings are linked above. This was Zencloud's client project, built while I was employed there.",
    quote:
      "The hard part was never a single feature. It was keeping video, chat and events real-time on one backend without the costs running away. That's an architecture problem, and it's the part I love.",
  },

  "dooz-inspected-cars": {
    overview:
      "A marketplace to search, buy, finance and insure inspected used cars in Jordan, one experience across web, iOS and Android.",
    problem:
      "Buying a used car online means trusting a stranger's word about its condition. Dooz set out to remove that risk: every vehicle inspected, every report visible, and financing and insurance handled in the same place instead of five.",
    approach:
      "One shared NestJS backend over PostgreSQL serves three clients: an Angular web app and React Native iOS and Android apps. That let inspection reports and financing calculators ship consistently everywhere at once.",
    features: [
      { title: "150-point inspections", detail: "Every listing carries a standardized inspection report buyers can read before they visit." },
      { title: "Financing & insurance", detail: "Built-in calculators let buyers price finance and insurance without leaving the platform." },
      { title: "One backend, three apps", detail: "Angular web plus React Native iOS/Android over a shared NestJS + PostgreSQL API." },
    ],
    results:
      "Dooz hired me directly. It is live on the web, the App Store and Google Play, where it shows 100K+ installs, and the store links above show its current ratings.",
    quote:
      "Trust is a product feature. Once buyers believe the inspection, everything else, from financing to repeat visits, follows.",
  },

  "koor-food-delivery": {
    overview:
      "A marketplace connecting customers with local home chefs, real-time from order to doorstep.",
    problem:
      "Home cooks make great food but have no easy way to sell it, and delivery apps are built for restaurants, not individuals. Koor needed a marketplace that could onboard home chefs, track orders live and stay fast as the menu grew.",
    approach:
      "I built Koor on a NestJS backend with Elasticsearch-powered discovery so search stays instant, Firebase for real-time delivery tracking, and AWS (EC2, S3, CloudFront) underneath. A React Native app puts the whole experience on customers' phones.",
    features: [
      { title: "Home-chef marketplace", detail: "Onboarding, menus and payouts designed for individual cooks, not restaurants." },
      { title: "Real-time tracking", detail: "Firebase powers live order and delivery status from kitchen to door." },
      { title: "Instant discovery", detail: "Elasticsearch keeps search and dish recommendations fast as the catalog grows." },
      { title: "Cloud setup", detail: "AWS EC2 / S3 / CloudFront behind the API and media." },
    ],
    results:
      "Version one went live on Google Play in October 2025. It is a young app, so there are no usage numbers worth quoting yet.",
  },

  afriva: {
    overview:
      "A multi-vendor marketplace with separate dashboards for admins, managers, sellers and buyers. Built at Webrange Solutions.",
    problem:
      "Multi-vendor commerce means four kinds of user, admin, manager, seller and buyer, each needing a different view of the same system, while the storefront stays fast and findable on Google.",
    approach:
      "Next.js 15 with server-side rendering for speed and SEO, and Supabase for auth, data and real-time updates. Each role gets its own permission-scoped dashboard, and order status updates live.",
    features: [
      { title: "Role-based dashboards", detail: "Distinct, permission-scoped surfaces for admins, managers, sellers and buyers." },
      { title: "SSR performance & SEO", detail: "Next.js 15 server rendering keeps pages fast and indexable." },
      { title: "Real-time order tracking", detail: "Live order status through Supabase realtime." },
      { title: "Predictable state", detail: "Redux Toolkit keeps a complex multi-role app manageable." },
    ],
    results:
      "Built while I was a full-stack developer at Webrange Solutions. The link above is the buyer-side demo build, so it shows the product rather than live sales.",
  },

  "pastel-marketplace": {
    overview:
      "A marketplace for antiques and vintage pieces with provenance, on web, iOS and Android. I work on its iOS app as a software engineer at Pastel.",
    problem:
      "High-value antiques need what generic marketplaces don't offer: visible provenance, safe high-ticket payments and careful shipping. Pastel has to feel as trustworthy as the objects it sells.",
    approach:
      "Pastel runs on Sharetribe for marketplace transactions, with a Next.js and Firebase layer and Shippo for shipping. Sharetribe has no native mobile app of its own, so the iOS and Android apps are custom builds on top of it, and that is the part I work on.",
    features: [
      { title: "Provenance-first listings", detail: "Each item carries its history and curation." },
      { title: "Marketplace payments", detail: "Sharetribe handles the transaction flow between buyers and sellers." },
      { title: "Native apps on Sharetribe", detail: "iOS and Android apps built on Sharetribe's APIs, which ship no mobile app themselves." },
    ],
    results:
      "Pastel is live on the web, the App Store and Google Play. I joined in 2026 as a software engineer, after the first iOS release, and this is my employer's product, not a DevoraX client project.",
    quote:
      "Luxury is really just trust made tangible: provenance, secure payment, safe delivery. Get those right and the rest is design.",
  },

  "tal-workforce": {
    overview:
      "A welfare app connecting UK mobile workers with safe venues for rest and facilities, paid for by their employers.",
    problem:
      "Mobile and field workers often have nowhere safe to rest or use basic facilities during long shifts. TAL connects them to vetted venues nearby, with employers paying, across web, iOS and Android.",
    approach:
      "A Flutter mobile app and React web dashboard over a Node.js backend on AWS. Location services match workers to nearby partner venues, and an employer-funded access model handles who pays.",
    features: [
      { title: "Nearby venue search", detail: "Location services surface vetted venues close to the worker." },
      { title: "Employer-funded access", detail: "Employers fund and manage welfare access for their workforce." },
      { title: "Cross-platform", detail: "Flutter iOS/Android apps plus a React web dashboard on one backend." },
    ],
    results:
      "TAL is live on talservices.co.uk, the App Store and Google Play. I built it while I was a full-stack developer at Webrange Solutions, for Webrange's client.",
  },

  "wod-pro-league": {
    overview:
      "An online functional-fitness league with real-time leaderboards and live score submission. Built by the Zencloud team I was part of.",
    problem:
      "Competitive fitness online is simultaneous: athletes everywhere submit scores while everyone watches the leaderboard move. That's a low-latency, high-concurrency problem that has to feel instant.",
    approach:
      "A serverless AWS Lambda + S3 backend keeps cost proportional to load, while Redis and Socket.io push live leaderboard updates. Flutter mobile apps and a React web app give athletes and organizers the same real-time view.",
    features: [
      { title: "Real-time leaderboards", detail: "Redis + Socket.io push score changes live to every athlete." },
      { title: "Serverless backend", detail: "AWS Lambda + S3 scale with demand instead of a fixed server bill." },
      { title: "Score submission", detail: "Athletes submit and verify scores in real time from the app." },
    ],
    results:
      "In the client's own words, published on Zencloud's website: \"In our very first season, more than 600 athletes joined.\" This was Zencloud's client project, built while I was employed there.",
  },

  "juju-streaming": {
    overview:
      "The backend for a streaming app serving several media types, with its own processing pipeline and subscription billing.",
    problem:
      "Streaming means moving large media reliably, keeping it away from people who haven't paid, and billing for it, all at once. JUJU needed a pipeline that could ingest and serve many content types securely.",
    approach:
      "I built a Fluent-FFmpeg + BullMQ media pipeline on AWS S3/EC2 so heavy transcoding runs as background jobs, with signed URLs and role-based access protecting content and subscription billing wired in from the start.",
    features: [
      { title: "Media pipeline", detail: "Fluent-FFmpeg + BullMQ run transcoding as background jobs, off the request path." },
      { title: "Secure delivery", detail: "Signed S3 URLs and role-based access so only entitled users reach content." },
      { title: "Subscription billing", detail: "Monetization built in, not bolted on afterwards." },
    ],
    results:
      "A direct client project. There is no public link, so this page describes the engineering only.",
  },

  pathana: {
    overview:
      "An EdTech platform that guides students from high school towards a career with personalized roadmaps and counselor collaboration.",
    problem:
      "Students rarely get a clear, personal path from where they are to the career they want, and counselors lack tools to guide many students at once. Pathana makes that journey structured, trackable and shared.",
    approach:
      "A Next.js frontend over a Node.js/Firebase backend delivers personalized roadmaps, milestone tracking and counselor collaboration.",
    features: [
      { title: "Personalized roadmaps", detail: "Each student gets a tailored path with clear milestones." },
      { title: "Counselor collaboration", detail: "Counselors follow and guide their students' progress." },
      { title: "Progress tracking", detail: "Milestones show where each student is and what comes next." },
    ],
    results:
      "Pathana is live at pathana.net, where schools can request a pilot. I built it at ivector, where I work as a software engineer.",
  },

  three28: {
    overview:
      "A creator app to upload, distribute and sell video, with pricing, merch and analytics in the creator's hands.",
    problem:
      "Creators want to decide how they make money, but most platforms control pricing and distribution. Three28 hands that back: pricing, merch, payments and data all belong to the creator.",
    approach:
      "A React Native app over a NestJS/AWS backend gives creators their own pricing, merch, secure payments and an analytics dashboard in one app.",
    features: [
      { title: "Creator-set pricing", detail: "Creators decide exactly how their content is priced." },
      { title: "Merch & payments", detail: "Merchandise and payment flows inside the app." },
      { title: "Analytics dashboard", detail: "Insight into audience and revenue." },
    ],
    results:
      "Three28 was a direct client. It has been on the App Store since July 2024; the listing is linked above.",
  },

  "digital-power-of-attorney": {
    overview:
      "e-fuldmagt, a Danish service for managing digital powers of attorney. I built its backend while working at Zencloud.",
    problem:
      "Power of attorney is high-stakes: it needs verified identity, documents that hold up legally, careful storage and precise, revocable control over who can act for whom, under Danish and EU data rules.",
    approach:
      "A Node.js/Express backend with React web and Flutter mobile clients on AWS. Sign-in uses Denmark's MitID through Criipto (OIDC), legal PDF documents are generated from the user's input, storage is encrypted on S3, and the REST APIs were built to GDPR requirements. The interface is fully localized in Danish and English.",
    features: [
      { title: "MitID identity", detail: "Digital identity verification through Criipto, using Denmark's MitID." },
      { title: "Generated legal documents", detail: "Power-of-attorney PDFs generated from what the user enters." },
      { title: "Granular delegation", detail: "Precise, revocable control over who can act on whose behalf." },
      { title: "Encrypted storage", detail: "Documents held in encrypted S3 storage." },
    ],
    results:
      "e-fuldmagt is live at e-fuldmagt.dk. It was Zencloud's client project, built while I was employed there. Neither I nor DevoraX hold security certifications, so none are claimed here.",
    quote:
      "In this kind of work the invisible parts, identity, delegation and audit trails, are the product. Users should feel nothing but confidence.",
  },

  waitmate: {
    overview:
      "A hospitality suite that puts reservations, tables, staff and guest CRM for restaurants and hotels in one place, with a React Native companion app.",
    problem:
      "Hospitality venues juggle reservations, tables, staff and guest relationships across disconnected tools, often per location. Waitmate brings all of it into one real-time system across multiple sites.",
    approach:
      "A React web app and React Native companion over Supabase, with bookings, live dashboards and multi-location support.",
    features: [
      { title: "Unified operations", detail: "Reservations, tables, staff and CRM in a single system." },
      { title: "Multi-location", detail: "Manage several venues from one dashboard." },
      { title: "Companion app", detail: "A React Native app keeps floor staff in sync." },
    ],
    results:
      "The linked dashboard is a demo build with sample data, so the figures on it are not real bookings.",
  },
};
