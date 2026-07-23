// ─────────────────────────────────────────────────────────────
//  Rich case-study content, keyed by project slug (slugify(title)).
//  Merged over the base project object in getProjectBySlug().
//  DRAFT copy — grounded in each project's description/stats/tags.
//  Refine the wording freely; every field here is optional and the
//  detail page degrades gracefully when a field is missing.
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
      "A next-generation social platform that fuses short-form video with live, local event discovery — engineered to stay real-time at the scale of millions.",
    problem:
      "Social feeds and event discovery usually live in two separate apps, and neither is built to carry millions of people sharing video and messaging at the same instant. Loopedin had to be both — a short-form video feed and a live local-events layer — under one roof, without the latency or cloud bill exploding as the audience grew.",
    approach:
      "I architected Loopedin as a set of independent Node.js microservices on AWS so each concern — video, messaging, events, scoring — could scale on its own. A serverless pipeline on AWS MediaConvert handles video transcoding, Socket.io backed by Redis powers real-time messaging and presence, and a gamified LoopScore engine keeps engagement compounding.",
    features: [
      { title: "Serverless video pipeline", detail: "Upload-to-playback transcoding on AWS MediaConvert, so video scales without dedicated media servers." },
      { title: "Real-time messaging", detail: "Socket.io + Redis deliver low-latency chat, presence and notifications across millions of sessions." },
      { title: "Live event discovery", detail: "A location-aware events layer surfaces what's happening nearby, blended straight into the feed." },
      { title: "LoopScore engine", detail: "A gamified scoring system that rewards activity and keeps retention high." },
    ],
    results:
      "Loopedin now reaches 2.4M+ users and has carried 96.3M+ messages and 4.8M+ shared videos — all on infrastructure that holds 99.9% uptime under real load.",
    quote:
      "The hard part was never a single feature — it was keeping everything real-time while the numbers kept climbing. That's an architecture problem, and it's the part I love.",
  },

  "dooz-inspected-cars": {
    overview:
      "An all-in-one marketplace to search, buy, finance and insure inspected used cars — one verified experience across web, iOS and Android.",
    problem:
      "Buying a used car online means trusting a stranger's word about the car's condition. Dooz set out to remove that risk entirely: every vehicle inspected, every report transparent, and the whole journey — financing and insurance included — handled in one place instead of five.",
    approach:
      "I led delivery across three clients from a single shared NestJS backend: an Angular web app plus React Native iOS and Android apps over one PostgreSQL-backed API. That let 150-point inspection reports, financing calculators and AI-assisted valuation ship consistently everywhere at once.",
    features: [
      { title: "150-point inspections", detail: "Every listing carries a standardized, transparent inspection report buyers can trust." },
      { title: "Financing & insurance", detail: "Built-in calculators let buyers finance and insure a car without leaving the platform." },
      { title: "AI valuation", detail: "Data-driven pricing gives buyers and sellers a fair-market value instantly." },
      { title: "One backend, three apps", detail: "Angular web plus React Native iOS/Android over a shared NestJS + PostgreSQL API." },
    ],
    results:
      "The platform lists 20,000+ verified vehicles, has processed 1.2B+ JD in transactions and holds a 98% satisfaction rate.",
    quote:
      "Trust is a product feature. Once buyers believed the inspection, everything else — financing, insurance, repeat visits — followed.",
  },

  "koor-food-delivery": {
    overview:
      "A cloud-native marketplace connecting hungry customers with local home chefs — real-time from order to doorstep.",
    problem:
      "Home cooks make incredible food but have no easy way to sell it, and existing delivery apps are built for restaurants, not individuals. Koor needed a marketplace that could onboard home chefs, handle live order tracking and stay fast as the catalog of dishes grew.",
    approach:
      "I built Koor on a NestJS backend with an Elasticsearch-powered discovery layer so search and recommendations stay instant, Firebase for real-time delivery tracking, and AWS (EC2, S3, CloudFront) for reliability at scale. A React Native app puts the whole experience in customers' pockets.",
    features: [
      { title: "Home-chef marketplace", detail: "Onboarding, menus and payouts purpose-built for individual cooks, not restaurants." },
      { title: "Real-time tracking", detail: "Firebase powers live order and delivery status from kitchen to door." },
      { title: "Instant discovery", detail: "Elasticsearch keeps search and dish recommendations fast as the catalog grows." },
      { title: "Scalable cloud", detail: "AWS EC2 / S3 / CloudFront for reliability under real load." },
    ],
    results:
      "Koor has completed 120,000+ orders at a 4.8/5 user rating, with real-time delivery throughout.",
    quote:
      "Marketplaces live or die on trust and speed. We optimized relentlessly for both.",
  },

  afriva: {
    overview:
      "A modern multi-vendor marketplace with role-based dashboards for admins, managers, sellers and buyers — fast, SEO-friendly and real-time.",
    problem:
      "Multi-vendor commerce means four different users — admin, manager, seller, buyer — each needing a different view of the same system, all while staying fast and discoverable on the open web. Afriva needed enterprise structure without enterprise sluggishness.",
    approach:
      "Built on Next.js 15 with server-side rendering for performance and SEO, and Supabase for auth, data and real-time. Role-based dashboards give each user exactly the surface they need, and delivery tracking updates live across 120+ cities.",
    features: [
      { title: "Role-based dashboards", detail: "Distinct, permission-scoped surfaces for admins, managers, sellers and buyers." },
      { title: "SSR performance & SEO", detail: "Next.js 15 server rendering keeps pages fast and discoverable." },
      { title: "Real-time delivery tracking", detail: "Live order status across 120+ cities via Supabase realtime." },
      { title: "Type-safe state", detail: "Redux Toolkit keeps a complex multi-role app predictable." },
    ],
    results:
      "$1.2M in revenue, 1,245 active vendors and coverage across 120+ cities.",
  },

  "pastel-marketplace": {
    overview:
      "An elegant marketplace for antiques and vintage treasures — curated, provenance-backed and shipped insured worldwide.",
    problem:
      "High-value antiques demand what generic marketplaces can't offer: verifiable provenance, secure high-ticket payments and insured, careful global logistics. Pastel had to feel as trustworthy and refined as the objects it sells.",
    approach:
      "A Next.js storefront over Firebase, with Sharetribe handling secure marketplace transactions and Shippo managing insured global logistics. Curation and provenance are first-class, so every listing carries its story.",
    features: [
      { title: "Provenance-first listings", detail: "Every item carries verifiable history and curation." },
      { title: "Secure high-ticket payments", detail: "Sharetribe handles escrow-grade marketplace transactions." },
      { title: "Insured global logistics", detail: "Shippo powers insured, tracked shipping worldwide." },
    ],
    results:
      "12k+ curated items, 48k+ collectors and a 98% positive-review rate.",
    quote:
      "Luxury is really just trust made tangible — provenance, secure payment, safe delivery. Get those right and the rest is design.",
  },

  "tal-workforce": {
    overview:
      "A welfare platform connecting mobile workers with safe venues for rest and facilities — funded by their employers.",
    problem:
      "Mobile and field workers often have nowhere safe to rest or access basic facilities during long shifts. TAL needed to connect them to vetted venues in real time, with employers footing the bill — across web, iOS and Android.",
    approach:
      "A Flutter mobile app and React web dashboard over a Node.js backend on AWS. Real-time location services match workers to nearby partner venues, and an employer-funded access model handles who pays for what.",
    features: [
      { title: "Real-time venue matching", detail: "Location services surface safe, vetted venues nearby, instantly." },
      { title: "Employer-funded access", detail: "Employers fund and manage welfare access for their workforce." },
      { title: "Cross-platform", detail: "Flutter iOS/Android apps plus a React web dashboard, one backend." },
    ],
    results:
      "5,000+ workers supported across 2,500+ partner venues, at 98% satisfaction.",
  },

  "wod-pro-league": {
    overview:
      "A global functional-fitness competition platform with real-time leaderboards and live score submission across 120+ countries.",
    problem:
      "Competitive fitness is global and simultaneous — thousands of athletes submitting scores at once while everyone watches the leaderboard move. That's a low-latency, high-concurrency problem that has to feel instant no matter where you are.",
    approach:
      "A serverless AWS Lambda + S3 backend keeps cost proportional to load, while Redis and Socket.io drive low-latency live leaderboard updates. Flutter mobile apps and a React web app give athletes and organizers a shared, real-time view.",
    features: [
      { title: "Real-time leaderboards", detail: "Redis + Socket.io push score changes live to every athlete." },
      { title: "Serverless backend", detail: "AWS Lambda + S3 scale with demand, not against a fixed server bill." },
      { title: "Global score submission", detail: "Athletes across 120+ countries submit and verify scores in real time." },
    ],
    results:
      "12,778 athletes, 8,567 scores submitted, live in 120+ countries.",
  },

  "juju-streaming": {
    overview:
      "A secure, scalable streaming platform supporting 9+ content types — with its own media pipeline and built-in subscription billing.",
    problem:
      "Streaming means moving large media reliably, protecting it from unauthorized access, and billing for it — all at once. JUJU needed a pipeline that could ingest and serve many content types securely while monetizing through subscriptions.",
    approach:
      "I built a Fluent-FFmpeg + BullMQ media pipeline on AWS S3/EC2 for transcoding and delivery, with signed URLs and role-based access control protecting content, and subscription billing wired in from day one.",
    features: [
      { title: "Media pipeline", detail: "Fluent-FFmpeg + BullMQ handle transcoding and processing as background jobs." },
      { title: "Secure delivery", detail: "Signed URLs and RBAC ensure only entitled users reach content." },
      { title: "Subscription billing", detail: "Monetization built in, not bolted on afterwards." },
    ],
    results:
      "1.2M+ watch-hours, 128,540 users and $48,760 in revenue.",
  },

  pathana: {
    overview:
      "An EdTech platform that guides students from high school to career readiness with personalized roadmaps and counselor collaboration.",
    problem:
      "Students rarely get a clear, personalized path from where they are to the career they want — and counselors lack the tooling to guide many students at once. Pathana had to make that journey structured, trackable and collaborative.",
    approach:
      "A Next.js frontend over a Node.js/Firebase backend delivers personalized roadmaps, milestone tracking and real-time counselor collaboration, backed by data insights that show what's actually working.",
    features: [
      { title: "Personalized roadmaps", detail: "Each student gets a tailored path with clear milestones." },
      { title: "Counselor collaboration", detail: "Counselors track and guide students in real time." },
      { title: "Data insights", detail: "Real-time analytics surface progress and outcomes." },
    ],
    results:
      "10k+ students reached across 500+ partner schools, with an 85% success rate.",
  },

  three28: {
    overview:
      "A creator platform to upload, distribute and monetize video — with pricing, merch and analytics fully in the creator's hands.",
    problem:
      "Creators want to own how they monetize, but most platforms take control (and a cut) of pricing and distribution. Three28 set out to hand that control back — pricing, merch, payments and data all creator-owned.",
    approach:
      "A React Native app over a NestJS/AWS backend gives creators user-controlled pricing, merch integration, secure payments and a data-driven analytics dashboard — a complete monetization toolkit in one app.",
    features: [
      { title: "Creator-set pricing", detail: "Creators control exactly how their content is priced." },
      { title: "Merch & payments", detail: "Integrated merchandise and secure payment flows." },
      { title: "Analytics dashboard", detail: "Data-driven insights into audience and revenue." },
    ],
    results:
      "100% revenue retention with 10k+ monthly growth and consistently high engagement.",
  },

  "digital-power-of-attorney": {
    overview:
      "A compliance-grade platform for managing digital authorizations across government and private portals — GDPR and ISO 27001 aligned.",
    problem:
      "Power-of-attorney and delegation are high-stakes: they demand legally sound digital signatures, encrypted storage and precise, revocable control over who can act on whose behalf — all under strict regulatory compliance.",
    approach:
      "A Node.js/Express backend with React web and Flutter mobile clients on AWS. Digital signatures, encrypted S3 storage and granular delegation controls are built to GDPR and ISO 27001 standards from the ground up.",
    features: [
      { title: "Digital signatures", detail: "Legally sound signing baked into every authorization." },
      { title: "Granular delegation", detail: "Precise, revocable control over who can act on whose behalf." },
      { title: "Encrypted storage", detail: "Encrypted S3 storage with bank-grade security." },
    ],
    results:
      "Bank-grade security, GDPR + ISO 27001 compliance, and encrypted storage throughout.",
    quote:
      "In compliance work, the invisible parts — encryption, delegation, audit trails — are the product. Users should feel nothing but confidence.",
  },

  waitmate: {
    overview:
      "A unified hospitality suite — reservations, tables, staff and CRM — for restaurants and hotels, with a React Native companion app.",
    problem:
      "Hospitality venues juggle reservations, tables, staff and guest relationships across disconnected tools, often per location. Waitmate needed to unify all of it into one real-time system that works across multiple sites.",
    approach:
      "A React web app and React Native companion over Supabase deliver smart bookings, real-time analytics and multi-location support — one platform for the whole operation.",
    features: [
      { title: "Unified operations", detail: "Reservations, tables, staff and CRM in a single system." },
      { title: "Multi-location", detail: "Manage many venues from one real-time dashboard." },
      { title: "Companion app", detail: "A React Native app keeps staff in sync on the floor." },
    ],
    results:
      "$24,680 revenue, 87% occupancy and a 4.8/5 satisfaction rating.",
  },
};
