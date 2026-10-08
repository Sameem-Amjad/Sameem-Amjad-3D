// ─────────────────────────────────────────────────────────────
//  Real portfolio data for Sameem Amjad — Founder & Lead Engineer, DevoraX
//  Projects sourced from the DevoraX case-study (Supabase `projects` table).
//  NOTE: `links.booking` is the DevoraX scheduler, not a third-party one.
// ─────────────────────────────────────────────────────────────

import { caseStudies } from "./caseStudies";

export const profile = {
  name: "Sameem Amjad",
  role: "Founder & Lead Engineer",
  company: "DevoraX",
  // Hero headline is the name — a portfolio is a personal brand, not a job ad.
  // `kicker` is the role line that sits under it in acid.
  headline: ["Sameem", "Amjad"],
  // The two lines under the name carry the positioning, so they carry the
  // words buyers actually search. Keyword research (2026-09-29): people type
  // "freelance full stack developer" and "fix my vibe coded app"; nobody
  // types "AI agents & full-stack systems", and none of the reviews are
  // about AI, so AI moves to the end of the pitch rather than leading it.
  kicker: "Freelance Full-Stack Developer",
  subheadline:
    "I fix stuck apps and ship them — Next.js, React Native, Supabase, Stripe and AWS, including apps built with Lovable, Bolt, Replit or Cursor. At DevoraX I build marketplaces, mobile apps and AI features, from architecture to launch.",
  // Third person, facts only: Person.description in the schema, the opening
  // of llms.txt and the footer's about line. It is the paragraph an
  // assistant quotes when asked who he is, so every clause must be checkable.
  bio:
    "Sameem Amjad is a freelance full-stack developer based in Pakistan and the founder of DevoraX. He fixes and ships stuck web and mobile apps — Next.js, React Native, Supabase, Stripe and AWS — including apps built with AI tools such as Lovable, Bolt, Replit and Cursor. He has sold on Fiverr since 2022, with a 5.0 rating across 50+ projects for clients in the US, UK, Canada and Hong Kong.",
  location: "Available worldwide · Remote",
  availability: "Available for new projects",
  email: "sameemamjadarsu@gmail.com",
  // Business WhatsApp. `phone` is the display form; the wa.me link below
  // needs the bare international digits.
  phone: "+92 371 1285190",
};

export const links = {
  devorax: "https://thedevorax.tech",
  fiverr: "https://www.fiverr.com/sameemamjad", // confirmed from fiverr_reviews.json freelancerUrl
  // Booking: the real scheduler, on DevoraX. Picks a slot from Sameem's
  // live Google Calendar availability and sends a calendar invite with a
  // Meet link. Was "https://cal.com/" — cal.com's own marketing homepage,
  // not a booking page — so all ten "Book a call" CTAs dead-ended there.
  booking: "https://thedevorax.tech/book",
  email: "mailto:sameemamjadarsu@gmail.com",
  // wa.me opens the WhatsApp app on phones and WhatsApp Web on desktop.
  // Use whatsappHref() when a prefilled message helps; this bare form is
  // what the schema graph and llms.txt cite.
  // Written out literally (bare international digits) so check:links,
  // which reads source text, can test it.
  whatsapp: "https://wa.me/923711285190",
  // Profiles about Sameem himself — the schema graph's sameAs, and the
  // footer.
  // The URL thedevorax.tech links everywhere. The older numeric one in the
  // GitHub README stops resolving once a custom URL is set.
  linkedin: "https://www.linkedin.com/in/sameem-amjad-dev",
  github: "https://github.com/Sameem-Amjad",
  x: "https://x.com/SameemAmjad",
};

/* A wa.me link with the first message already typed. The page it came from
   is in the text so a WhatsApp lead says where it started — GA sees the
   click, but only the message itself reaches the phone. */
export const whatsappHref = (pathname = "/") => {
  const page = pathname && pathname !== "/" ? `sameemamjad.com${pathname}` : "sameemamjad.com";
  const text = `Hi Sameem, I found you on ${page} and I'd like to talk about a project.`;
  return `${links.whatsapp}?text=${encodeURIComponent(text)}`;
};

export const navLinks = [
  { id: "work", title: "Work" },
  { id: "services", title: "Services" },
  { id: "process", title: "Process" },
  { id: "contact", title: "Contact" },
];

// `page` links a tab to its full /services/<slug> page (constants/services.js).
export const services = [
  {
    key: "rescue",
    title: "App Rescue",
    label: "Rescue",
    blurb:
      "Your app works in the demo and breaks with real users. I find out why, fix it and ship it.",
    detail:
      "A lot of apps now start in Lovable, Bolt, Replit or Cursor, or with a contractor who has since disappeared. They look finished, then fall over at login, payments or deploy. I audit first, quote one fixed price, and fix the app in your codebase.",
    points: [
      "Login, Supabase security rules and exposed keys",
      "Stripe checkout, webhooks and subscriptions",
      "Deploys: Vercel, AWS, custom domains and SSL",
      "Slow pages, broken layouts and mobile UI bugs",
      "Moving the app off the builder onto accounts you own",
    ],
    tech: ["Lovable", "Bolt", "Next.js", "Supabase", "Stripe", "AWS"],
    icon: "shield",
    accent: "from-amber-400/25 to-transparent",
    page: "fix-vibe-coded-app",
  },
  {
    key: "web",
    title: "Web Platforms",
    label: "Web",
    blurb:
      "Next.js & React apps with SSR, role-based dashboards and real-time data — engineered for speed and SEO.",
    detail:
      "Most businesses do not need a clever frontend, they need one that loads fast, ranks, and does not fall over when traffic arrives. I build multi-tenant platforms with real dashboards, real permissions and real data behind them.",
    points: [
      "Server-rendered Next.js for speed and search visibility",
      "Role-based admin, seller and customer dashboards",
      "Real-time data over sockets, not polling",
      "Stripe payments, subscriptions and webhook flows",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    icon: "web",
    page: "nextjs-developer",
    accent: "from-violet-500/25 to-transparent",
    span: "md:col-span-2",
  },
  {
    key: "mobile",
    title: "Mobile Apps",
    label: "Mobile",
    blurb:
      "Cross-platform React Native & Flutter apps live on the App Store and Google Play.",
    detail:
      "One codebase, both stores, and an actual release process at the end of it. I have taken marketplace, delivery, social and AI apps through App Store and Google Play review; the store links are on the project cards.",
    points: [
      "React Native and Flutter, one codebase for iOS and Android",
      "Push, deep links, offline state and background sync",
      "App Store and Play Store submission handled end to end",
      "Over-the-air updates so fixes do not wait on review",
    ],
    tech: ["React Native", "Flutter", "Firebase", "Node.js"],
    icon: "mobile",
    page: "app-store-launch",
    accent: "from-cyan-400/25 to-transparent",
    span: "",
  },
  {
    key: "ai",
    title: "AI Agents & Automation",
    label: "AI",
    blurb:
      "Agentic systems, voice agents and AI orchestration — software that decides and acts, not a chat box bolted onto a landing page.",
    detail:
      "Most \"AI features\" are a prompt box wired to an API. The work worth paying for is agentic: systems that plan a task, call real tools, check their own output and hand back something you can act on. I build those, wire them into the systems you already run, and keep them inside a cost you agreed to.",
    points: [
      "Agentic workflows that plan, call tools and complete real tasks",
      "Voice agents — speech in, action out, over phone or web",
      "RAG and AI orchestration over your own data, not the open internet",
      "LLM features with structured outputs you can actually trust",
      "Cleaning up AI-generated codebases into something production-grade",
    ],
    tech: ["OpenAI", "LangChain", "Python", "Whisper", "Vector DBs"],
    icon: "ai",
    accent: "from-fuchsia-500/25 to-transparent",
    span: "md:col-span-2",
  },
  {
    key: "cloud",
    title: "Backend & Cloud",
    label: "Backend",
    blurb:
      "Node/NestJS services on AWS — queues, media pipelines, sockets and secure APIs.",
    detail:
      "The part nobody sees until it breaks. Services that scale horizontally, queues that absorb spikes, and infrastructure you can hand to another engineer without an apology.",
    points: [
      "Node and NestJS services, containerised and horizontally scaled",
      "Queues and event streams that absorb traffic spikes",
      "AWS infrastructure as code, with CI/CD from day one",
      "Monitoring and alerting so you hear it from us, not your users",
    ],
    tech: ["Node.js", "NestJS", "Python", "AWS", "Docker", "Kubernetes"],
    icon: "cloud",
    accent: "from-emerald-400/25 to-transparent",
    span: "",
  },
  {
    key: "architecture",
    title: "Solution Architecture",
    label: "Architecture",
    blurb:
      "System design and architecture for products that have to survive their own success — before a line of code is written.",
    detail:
      "The most expensive decisions on a project are made in week one, by whoever happens to be in the room. I do that part deliberately: the data model, the service boundaries, what is queued and what is synchronous, and which parts are allowed to be boring. Usually it means building less, not more.",
    points: [
      "System design and architecture reviews before the build starts",
      "Data modelling and service boundaries that survive the next feature",
      "Scaling paths costed honestly — what breaks first, and at what number",
      "Technical due diligence on a codebase you are about to buy or inherit",
      "Rescuing projects that shipped fast and are now stuck",
    ],
    tech: ["System Design", "Microservices", "Event-Driven", "PostgreSQL", "AWS"],
    icon: "compass",
    accent: "from-sky-400/25 to-transparent",
    span: "",
  },
];

// Leadership / team
export const team = [
  {
    name: "Sameem Amjad",
    badge: "Founder",
    role: "Founder & Lead Engineer",
    title: "Full-Stack Engineer · Web · Mobile · AI",
    image: "/myimage/profile-960.webp",
    bio: "I turn ideas and half-finished apps into products people can use, from first MVPs to apps live on both stores. Clean architecture, honest communication, and software that solves real business problems.",
    tags: ["Next.js", "React Native", "Node.js", "AWS", "AI"],
  },
  {
    name: "Usman",
    badge: "CTO",
    role: "Chief Technical Officer",
    title: "Full-Stack AI Architect · Web · Mobile · 35-Day Free Maintenance",
    image: "/myimage/usman_cto-960.webp",
    bio: "Expert Full-Stack AI Architect with 5+ years building scalable Generative-AI systems, custom web apps and SaaS platforms. I turn slow, outdated systems into fast, scalable, user-friendly products — architecting cross-platform mobile (React Native, Flutter) and high-concurrency web on Kubernetes & AWS.",
    tags: ["Generative AI", "React Native", "Flutter", "Kubernetes", "AWS", "SaaS"],
  },
];

// ── Featured (curated, rich cards) ──────────────────────────────
// Every number on a card has to survive a buyer checking it (2026-10-08).
// Store facts come from the live App Store / Google Play listings; nothing
// is a "client-reported" figure nobody can see. `role` says whose project it
// was: employer work is labelled as employer work, because these were
// built while Sameem was employed elsewhere, not delivered by DevoraX.
// Where the employer is unconfirmed the role says "previous employer".
export const featuredProjects = [
  {
    title: "Loopedin",
    tagline: "Social + local-events app · built at Zencloud, live on both stores",
    role: "Backend engineer · Zencloud",
    category: "Node.js · Microservices · AWS",
    filter: "Platforms",
    description:
      "Social app blending short-form video with local event discovery. I built the backend at Zencloud: a serverless video pipeline on AWS MediaConvert, real-time messaging on Socket.io + Redis, and a gamified LoopScore engine. It launched on the App Store and Google Play in September 2026.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780687758048-dmnf119254.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Launched", v: "Sep 2026" },
      { k: "Stores", v: "iOS + Android" },
      { k: "My part", v: "Backend" },
    ],
    tags: ["TypeScript", "Node.js", "Socket.io", "Redis", "AWS"],
    web: "https://loopedin.life/",
    android: "https://play.google.com/store/apps/details?id=com.zencloud.loopedin",
    ios: "https://apps.apple.com/us/app/loopedin-life/id6757230032",
  },
  {
    title: "Dooz Inspected Cars",
    tagline: "Used-car marketplace in Jordan · 100K+ Google Play downloads",
    role: "Full-stack engineer",
    category: "Angular · NestJS · React Native",
    filter: "Mobile",
    description:
      "Platform to search, buy, finance and insure inspected used cars, with 150-point inspection reports and financing calculators across web, iOS and Android, all served by one NestJS backend.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780687463421-x75fdi95mk8.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Google Play", v: "100K+ installs" },
      { k: "Platforms", v: "Web · iOS · Android" },
      { k: "Backend", v: "NestJS" },
    ],
    tags: ["Angular", "NestJS", "React Native", "PostgreSQL"],
    web: "https://dooz.com/en/cars-for-sale",
    android: "https://play.google.com/store/apps/details?id=com.dooz.app&hl=en",
    ios: "https://apps.apple.com/us/app/dooz-cars/id1627030530",
  },
  {
    title: "Koor Food Delivery",
    tagline: "Homemade-food marketplace · v1 live on Google Play",
    role: "Full-stack engineer",
    category: "React Native · NestJS · AWS",
    filter: "Mobile",
    description:
      "Marketplace connecting customers with home chefs. NestJS backend, Elasticsearch-powered discovery, Firebase for live order tracking and AWS (EC2, S3, CloudFront) underneath. Version one went live on Google Play in October 2025.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780682366449-mqcg4kehwuc.png",
    accent: "from-yellow-400 to-orange-500",
    stats: [
      { k: "Launched", v: "Oct 2025" },
      { k: "Platform", v: "Android" },
      { k: "Tracking", v: "Real-time" },
    ],
    tags: ["React Native", "NestJS", "Firebase", "Elasticsearch", "AWS"],
    android: "https://play.google.com/store/apps/details?id=com.koor_user",
  },
  {
    title: "Afriva",
    tagline: "Four-role multi-vendor marketplace · built at Webrange",
    role: "Full-stack engineer · Webrange Solutions",
    category: "Next.js 15 · Supabase",
    filter: "E-Commerce",
    description:
      "Multi-vendor marketplace with separate dashboards for admins, managers, sellers and buyers. Server-rendered Next.js 15 for speed and SEO, Supabase for auth and data, and real-time order tracking. Built while I was at Webrange Solutions; the link is the demo build.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780690136428-ugskg9kw1yo.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Dashboards", v: "4 roles" },
      { k: "Framework", v: "Next.js 15" },
      { k: "Built at", v: "Webrange" },
    ],
    tags: ["Next.js", "Supabase", "Redux Toolkit"],
    web: "https://afriva-buyer.vercel.app/",
  },
  {
    title: "Pastel Marketplace",
    tagline: "Antiques marketplace on Sharetribe · I work on its iOS app",
    role: "Software engineer · Pastel",
    category: "Next.js · Firebase · Sharetribe",
    filter: "E-Commerce",
    description:
      "Marketplace for antiques and vintage pieces with provenance, running on Sharetribe with Shippo for shipping, on web, iOS and Android. I joined Pastel as a software engineer in 2026 and work on its iOS marketplace app.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686446029-4r69nforunv.png",
    accent: "from-orange-400 to-red-500",
    stats: [
      { k: "Platform", v: "Sharetribe" },
      { k: "Apps", v: "Web · iOS · Android" },
      { k: "My part", v: "iOS app" },
    ],
    tags: ["Next.js", "Firebase", "Sharetribe", "Shippo"],
    web: "https://mypastel.com/",
    ios: "https://apps.apple.com/us/app/pastel-antique-marketplace/id6753628917",
  },
  {
    title: "TAL Workforce",
    tagline: "UK welfare app for mobile workers · live on iOS and Android",
    role: "Full-stack engineer · previous employer",
    category: "Flutter · React · Node.js",
    filter: "Mobile",
    description:
      "Connects mobile workers with venues offering rest and welfare facilities, paid for by their employers. Location-based venue search across a Flutter app, a React web dashboard and a Node.js backend on AWS. Built as an employee, not as a DevoraX client project.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689110015-zywscjbzpj.png",
    accent: "from-teal-400 to-emerald-400",
    stats: [
      { k: "Market", v: "UK" },
      { k: "Platforms", v: "Web · iOS · Android" },
      { k: "Context", v: "Employer project" },
    ],
    tags: ["Flutter", "React", "Node.js", "AWS"],
    web: "https://talservices.co.uk/",
    android: "https://play.google.com/store/apps/details?id=com.zencloud.tal&hl=en",
    ios: "https://apps.apple.com/in/app/tal-services/id6737687790",
  },
  {
    title: "WOD Pro League",
    tagline: "Online functional-fitness league · built at Zencloud",
    role: "Full-stack engineer · Zencloud",
    category: "Flutter · React · Node.js · AWS",
    filter: "Mobile",
    description:
      "Competition platform with real-time leaderboards and score submission, built by the Zencloud team I was part of: Flutter apps, an AWS Lambda + S3 backend, and Redis + Socket.io for live updates. The client's own words, on Zencloud's site: more than 600 athletes joined in the first season.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689938803-y248gktlxs9.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Season one", v: "600+ athletes" },
      { k: "Leaderboards", v: "Real-time" },
      { k: "Backend", v: "AWS Lambda" },
    ],
    tags: ["Flutter", "React", "Node.js", "AWS", "Redis"],
    // Site and both store listings 404 as of 2026-09-21. LiveLinks hides a
    // project with no valid URLs, so the card shows without dead badges.
    // The 600-athlete figure is the client's quote on zencloudtechnologies.com.
    // TODO: restore when Sameem supplies the current links.
  },
  {
    title: "JUJU Streaming",
    tagline: "Media-streaming backend · FFmpeg + BullMQ pipeline",
    role: "Backend engineer · previous employer",
    category: "Node.js · AWS · Media",
    filter: "Platforms",
    description:
      "Backend for a streaming app serving video, audio and other media types: a Fluent-FFmpeg + BullMQ processing pipeline on AWS S3/EC2, signed URLs, role-based access and subscription billing. Built as an employee; there is no public link.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689640497-3073j1xez4v.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Pipeline", v: "FFmpeg + BullMQ" },
      { k: "Access", v: "Signed URLs" },
      { k: "Context", v: "Employer project" },
    ],
    tags: ["Node.js", "AWS", "FFmpeg", "BullMQ"],
  },
  {
    title: "Pathana",
    tagline: "Career-planning platform for students and counselors",
    role: "Full-stack engineer",
    category: "Next.js · Node.js · Firebase",
    filter: "Web",
    description:
      "Guides students from high school towards a career with personalized roadmaps, milestone tracking and counselor collaboration.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686955522-g97v6wiz2bm.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Users", v: "Students · counselors" },
      { k: "Frontend", v: "Next.js" },
      { k: "Status", v: "Live site" },
    ],
    tags: ["Next.js", "Node.js", "Firebase", "AWS"],
    web: "https://www.pathana.net/",
  },
  {
    title: "Three28",
    tagline: "Creator video-monetization app · live on the App Store",
    role: "Full-stack engineer",
    category: "React Native · NestJS · AWS",
    filter: "Mobile",
    description:
      "Lets creators upload, distribute and sell their video with their own pricing, merch and payments, plus an analytics dashboard. React Native app on a NestJS/AWS backend, on the App Store since July 2024.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780683222648-emwgaqd7yf.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Platform", v: "iOS" },
      { k: "Pricing", v: "Creator-set" },
      { k: "Merch", v: "Built in" },
    ],
    tags: ["React Native", "NestJS", "AWS"],
    ios: "https://apps.apple.com/us/app/three28/id6504447934",
  },
  {
    title: "Digital Power of Attorney",
    tagline: "Danish digital power-of-attorney service · built at Zencloud",
    role: "Backend engineer · Zencloud",
    category: "Node.js · React · Flutter · AWS",
    filter: "Platforms",
    description:
      "e-fuldmagt manages digital powers of attorney for the Danish market. At Zencloud I built secure sign-in with MitID through Criipto, generated PDF documents, document management and REST APIs built to GDPR requirements, behind a Danish/English interface.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689033958-rhhcbvu4tq.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Identity", v: "MitID" },
      { k: "Documents", v: "Generated PDFs" },
      { k: "Built at", v: "Zencloud" },
    ],
    tags: ["Node.js", "Express", "React", "Flutter", "AWS"],
    web: "https://www.e-fuldmagt.dk/en",
  },
  {
    title: "Waitmate",
    tagline: "Hospitality management suite · demo build",
    role: "Full-stack engineer",
    category: "React · Supabase · React Native",
    filter: "Web",
    description:
      "Reservations, tables, staff and guest CRM for restaurants and hotels in one system, with multi-location support and a React Native companion app. The link is a demo build with sample data.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686310124-toexmepxwz.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Status", v: "Demo" },
      { k: "Data", v: "Supabase" },
      { k: "Companion", v: "React Native" },
    ],
    tags: ["React", "Supabase", "React Native"],
    web: "https://waitmate.vercel.app/dashboard",
  },
];

// ── More work (compact, filterable grid) ────────────────────────
export const moreProjects = [
  {
    title: "Hear With You",
    role: "Full-stack engineer · previous employer",
    category: "Flutter · NestJS · Next.js",
    filter: "AI",
    description:
      "AI storytelling app that reads personalized stories in the listener's own cloned voice. I built the Flutter app, the NestJS backend, the Next.js admin and landing page, and the deploy pipeline. Live on the App Store since June 2026.",
    image: "",
    accent: "from-fuchsia-400 to-purple-500",
    stats: [
      { k: "AI", v: "Voice cloning" },
      { k: "Live", v: "App Store" },
    ],
    tags: ["Flutter", "NestJS", "Next.js", "AI"],
    ios: "https://apps.apple.com/us/app/hear-with-you/id6766187555",
  },
  {
    title: "FinTech Mobile App",
    category: "React Native · Node.js",
    filter: "Mobile",
    description:
      "Cross-platform banking app: secure APIs and real-time transaction handling on a Node.js backend. No public link.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/fintech/card_images/fintech_card_image.png",
    accent: "from-teal-400 to-emerald-400",
    stats: [
      { k: "Mobile", v: "React Native" },
      { k: "Backend", v: "Node.js" },
    ],
    tags: ["React Native", "Node.js", "Security"],
  },
  {
    title: "AI E-Commerce Ecosystem",
    category: "Next.js · Microservices",
    filter: "AI",
    description:
      "Multi-vendor marketplace with AI-driven recommendations on Docker/K8s microservices.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/ai_ecommerce_ecosystem/card_image.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Engine", v: "AI recs" },
      { k: "Infra", v: "Docker/K8s" },
    ],
    tags: ["Next.js", "Docker", "Kubernetes"],
  },
  {
    title: "Barfly Risk Engine",
    role: "Backend engineer · Zencloud",
    category: "Node.js · AI",
    filter: "AI",
    description:
      "Flight-transfer risk check built at Zencloud: Duffel API flight data plus heuristics that flag risky connections before booking. Live in got2.travel.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689308066-rn493il9vek.png",
    accent: "from-sky-400 to-blue-500",
    stats: [
      { k: "Data", v: "Duffel API" },
      { k: "Live in", v: "got2.travel" },
    ],
    tags: ["React", "Node.js", "AI"],
    web: "https://got2.travel/",
  },
  {
    title: "Coffee Shop Web App",
    category: "Next.js · Firebase",
    filter: "Web",
    description:
      "Café website demo with server rendering, an interactive menu and ordering. Scores 95 on Lighthouse.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780685783771-wjgtujionwd.png",
    accent: "from-orange-400 to-red-500",
    stats: [
      { k: "Lighthouse", v: "95" },
      { k: "Type", v: "Demo build" },
    ],
    tags: ["Next.js", "React", "Firebase"],
    web: "https://coffee-shop-original.vercel.app/",
  },
  {
    title: "Augment Fit",
    category: "React · TypeScript · Supabase",
    filter: "Web",
    description:
      "Fitness-management admin panel connecting trainers and users, with BMI tracking and workout plans.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686023549-17rflwl4eoy.png",
    accent: "from-teal-400 to-emerald-400",
    stats: [
      { k: "Type", v: "Admin panel" },
      { k: "Data", v: "Supabase" },
    ],
    tags: ["React", "TypeScript", "Supabase"],
    // The Vercel demo now serves a blank page (2026-10-08), so no link.
  },
  {
    title: "ConstrActive",
    category: "GoHighLevel · Supabase · Stripe",
    filter: "Platforms",
    description:
      "Construction CRM automating lead capture, subscriptions and recurring payments.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780796858509-2ivbajvu5mm.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "CRM", v: "GoHighLevel" },
      { k: "Payments", v: "Stripe" },
    ],
    tags: ["Supabase", "Stripe", "CRM"],
    // constraction.ca now hosts a different product (a contract generator),
    // so linking it would show a buyer something that is not this build.
  },
  {
    title: "Bondly Pet Care",
    role: "Backend lead · Webrange Solutions",
    category: "Node.js · Firebase · Stripe",
    filter: "Mobile",
    description:
      "Backend for a subscription pet-care marketplace behind a Flutter app, built at Webrange: credit management, Stripe subscriptions, push notifications and AWS deployment.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/bondly/bondly.png",
    accent: "from-pink-400 to-rose-500",
    stats: [
      { k: "Payments", v: "Stripe" },
      { k: "Deploy", v: "AWS" },
    ],
    tags: ["Node.js", "Firebase", "Stripe", "AWS"],
    web: "https://www.bondlypets.com/",
  },
  {
    title: "Outstride / Ginger",
    role: "Frontend engineer · Webrange Solutions",
    category: "React.js Frontend",
    filter: "E-Commerce",
    description:
      "React e-commerce storefront and admin, built at Webrange with modular components and React Hook Form + Zod for product management.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/outstride/outstride_card.png",
    accent: "from-lime-400 to-green-500",
    stats: [
      { k: "Frontend", v: "React" },
      { k: "Forms", v: "RHF + Zod" },
    ],
    tags: ["React", "Frontend"],
    // out-stride.com is now a Shopify store, not this build, and both store
    // listings 404 (2026-09-21), so no links.
  },
  {
    title: "Food Magnet",
    role: "Full-stack engineer · Zencloud",
    category: "Flutter · React · AWS Lambda",
    filter: "Mobile",
    description:
      "Food-truck discovery with live location tracking, vendor profiles and a React admin dashboard. I worked on the existing customer and vendor apps at Zencloud.",
    image: "",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Backend", v: "AWS Lambda" },
      { k: "Tracking", v: "Live GPS" },
    ],
    tags: ["Flutter", "React", "AWS Lambda", "Firebase"],
    web: "https://www.foodmagnet.app/",
    android:
      "https://play.google.com/store/apps/details?id=com.foodmagnet.foodTruck&hl=en",
    ios: "https://apps.apple.com/us/app/food-magnet-vendor/id6444549450",
  },
  {
    title: "CEDMAT Roller Shutter",
    category: "React Native · AWS",
    filter: "Mobile",
    description:
      "Field app for roller-shutter installers: motor calibration, compliance documents and search.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780682841099-7f50fzfk6sy.png",
    accent: "from-blue-500 to-indigo-500",
    stats: [
      { k: "Platform", v: "Android" },
      { k: "Users", v: "Installers" },
    ],
    tags: ["React Native", "NestJS", "AWS"],
    android: "https://play.google.com/store/apps/details?id=com.cedmat_app",
  },
  {
    title: "AI Art Stylization",
    category: "FastAPI · Stable Diffusion",
    filter: "AI",
    description:
      "AI image-stylization system using Stable Diffusion and SAM with real-time segmentation.",
    image: "",
    accent: "from-fuchsia-400 to-purple-500",
    stats: [
      { k: "Models", v: "SD + SAM" },
      { k: "Processing", v: "Real-time" },
    ],
    tags: ["FastAPI", "Stable Diffusion", "SAM"],
  },
  {
    title: "Predictive Analytics",
    category: "MERN · Machine Learning",
    filter: "AI",
    description:
      "Analytics dashboard visualizing large datasets, with ML models for market prediction.",
    image: "",
    accent: "from-emerald-400 to-cyan-400",
    stats: [
      { k: "Data", v: "Real-time" },
      { k: "Models", v: "ML-based" },
    ],
    tags: ["MERN", "Machine Learning"],
  },
  {
    title: "AgroBridge",
    category: "React Native · Firebase",
    filter: "Mobile",
    description:
      "Agricultural marketplace with real-time data sync, file uploads and swipe-based interactions.",
    image: "",
    accent: "from-green-400 to-emerald-500",
    stats: [
      { k: "Realtime", v: "Firebase" },
      { k: "Platform", v: "Mobile" },
    ],
    tags: ["React Native", "Firebase"],
  },
];

export const projectFilters = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "E-Commerce",
  "Platforms",
];

export const processSteps = [
  {
    no: "01",
    title: "Discovery",
    blurb:
      "We pin down scope, goals and the metrics that define success — no ambiguity before a line of code.",
  },
  {
    no: "02",
    title: "Design & Architecture",
    blurb:
      "UX flows plus a scalable system design: data models, services and infrastructure mapped up front.",
  },
  {
    no: "03",
    title: "Build",
    blurb:
      "Agile sprints with weekly demos. You see working software early and steer it the whole way.",
  },
  {
    no: "04",
    title: "Ship",
    blurb:
      "Hardened QA, then launch — App Store, Google Play or production web with CI/CD in place.",
  },
  {
    no: "05",
    title: "Scale",
    blurb:
      "Monitoring, iteration and growth engineering so the product keeps performing as usage climbs.",
  },
];

// ── Project detail lookup ───────────────────────────────────────
// URL-safe slug from a project title. "Dooz Inspected Cars" → "dooz-inspected-cars"
export const slugify = (s = "") =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Single ordered list backing the /work/:slug detail pages + prev/next nav.
export const allProjects = [...featuredProjects, ...moreProjects];

// Apps in the portfolio with a live App Store or Google Play listing.
// Counted from the data, so the headline number can't drift from the cards.
export const storeAppCount = allProjects.filter((p) => p.ios || p.android).length;

// Trust chips shown in the hero. Each one is checkable: the Fiverr profile
// for the first two, the store badges on the project cards for the third.
// (Replaced 2.4M users / 120k orders / 99.9% uptime on 2026-10-08: the
// store listings contradicted them.)
export const heroStats = [
  { value: "5.0", label: "Fiverr rating" },
  { value: "50+", label: "Fiverr projects" },
  { value: String(storeAppCount), label: "apps live on the stores" },
];

// Animated counters in the impact bar
export const impactStats = [
  { value: 50, decimals: 0, suffix: "+", label: "Fiverr projects" },
  { value: storeAppCount, decimals: 0, suffix: "", label: "Apps live on the stores" },
  { value: 4, decimals: 0, suffix: "+", label: "Years shipping (since 2022)" },
  // Countries the Fiverr clients are in: US, UK, Canada, Hong Kong.
  { value: 4, decimals: 0, suffix: "", label: "Client countries" },
  { value: 21, decimals: 0, suffix: "", label: "Client reviews, verbatim" },
  { value: 5, decimals: 1, suffix: "", label: "Fiverr rating", isRating: true },
];

// Base project merged with its rich case-study content (if any).
export const getProjectBySlug = (slug) => {
  const base = allProjects.find((p) => slugify(p.title) === slug);
  if (!base) return null;
  return { ...base, ...(caseStudies[slug] || {}) };
};

// Previous / next project (wraps around) for the detail-page footer nav.
export const getAdjacentProjects = (slug) => {
  const i = allProjects.findIndex((p) => slugify(p.title) === slug);
  if (i === -1) return { prev: null, next: null };
  const n = allProjects.length;
  return {
    prev: allProjects[(i - 1 + n) % n],
    next: allProjects[(i + 1) % n],
  };
};

// Kept so any legacy imports don't break the build.
export const technologies = [];
export const projects = featuredProjects;

// ── Tech stack, grouped by layer ────────────────────────────────
// `names` must match the `name` field in techStack.js so the logo resolves.
// Anything without a logo still renders as a text chip.
export const stackGroups = [
  // AI leads the list deliberately. It used to be four names tacked onto the
  // end of "Cloud & AI", which reads as a side interest — while agentic and
  // LLM work is the thing people are actively searching for.
  {
    label: "AI & Agents",
    hint: "Systems that decide and act, not chat wrappers",
    names: [
      "OpenAI",
      "LangChain",
      "Python",
      "Vector DBs",
      "RAG",
      "Whisper",
      "Stable Diffusion",
    ],
  },
  {
    label: "Frontend",
    hint: "Interfaces people actually enjoy using",
    names: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
  },
  {
    label: "Mobile",
    hint: "Shipped to the App Store and Google Play",
    names: ["React Native", "Flutter", "Expo", "Swift", "Kotlin"],
  },
  {
    label: "Backend & Data",
    hint: "The part that has to stay up at 3am",
    names: [
      "Node.js",
      "NestJS",
      "Python",
      "FastAPI",
      "PHP",
      "Laravel",
      "PostgreSQL",
      "Redis",
      "Supabase",
      "Firebase",
      "Elasticsearch",
    ],
  },
  {
    label: "Cloud & Architecture",
    hint: "Infrastructure, and the design decisions above it",
    names: [
      "AWS",
      "Docker",
      "Kubernetes",
      "System Design",
      "Microservices",
      "Event-Driven",
      "Stripe",
    ],
  },
];

// ── FAQ ─────────────────────────────────────────────────────────
export const faqs = [
  {
    q: "What exactly do you do?",
    a: "I'm the founder and lead engineer at DevoraX. I take products from an idea to something live that real people use — web platforms, mobile apps on both stores, and AI features on top of them. On most projects I'm doing the architecture and the hard parts myself, not handing it off.",
  },
  {
    q: "Do I hire you, or an agency?",
    a: "Both, and you choose. For a focused build it's me. For a larger product I bring in the DevoraX team — currently two senior engineers plus specialists as the scope needs them. Either way I stay the person you talk to, and I stay accountable for what ships.",
  },
  {
    q: "What does a project usually cost, and how long does it take?",
    a: "An MVP with auth, payments and an admin area is typically 4–8 weeks. A platform with mobile apps and real-time features is more like 3–6 months. I quote per project rather than per hour once scope is clear, so you're not paying for my learning curve. For reference, DevoraX's published packages start at $2,900 for an MVP and $7,500 for a growth build. The discovery call is free and you get an honest number at the end of it.",
  },
  {
    q: "My app was built with Lovable, Bolt or Cursor and it's broken. Can you fix it?",
    a: "Yes. A lot of my Fiverr work is fixing and finishing other people's apps — deploys, payments, restructuring and UI bugs — and AI-built apps break in the same places. I audit the app first, then fix login, database security, payments and deploys in your codebase for one fixed price, and get it live.",
    link: { to: "/services/fix-vibe-coded-app", label: "How app rescue works" },
  },
  {
    q: "What happens after launch?",
    a: "Launch is where most builds get abandoned. Every DevoraX project ships with monitoring, CI/CD and 35 days of free maintenance. After that, ongoing support is an option rather than an obligation — the code is yours, documented, and handed over properly.",
  },
  {
    q: "Which stack do you work in?",
    a: "Next.js and React on the frontend, React Native or Flutter for mobile, Node/NestJS on the backend, Postgres or Supabase for data, and AWS for infrastructure. I pick the boring, well-supported option unless the problem genuinely needs something else — you shouldn't inherit a stack nobody else can hire for.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes, and a fair share of my work is exactly that: a project that stalled, a contractor who disappeared, a system that got slow as it grew. I start with an audit and tell you honestly whether it's worth fixing or worth replacing, before you spend anything on the build.",
  },
  {
    q: "Where are you based, and will our hours overlap?",
    a: "I'm based in Pakistan (PKT, UTC+5) and work with clients in the US, UK, Canada and Hong Kong. Calls are booked through the scheduler in your own time zone, work updates are written so nothing waits on a meeting, and messages get a reply within 24 hours.",
  },
  {
    q: "Can I message you on WhatsApp?",
    a: "Yes. WhatsApp +92 371 1285190 is the fastest way to reach me: send your app link and what's going wrong, and I'll reply with next steps. You can also book a free 30-minute call or use the form below.",
  },
  {
    q: "How do we start?",
    a: "Book a call. Thirty minutes, no pitch deck. Tell me what you're building and what success looks like, and you'll leave with a scope, a timeline and a number — whether or not you work with me.",
  },
];

// ── Client testimonials ─────────────────────────────────────────
// Real Fiverr reviews, scraped 24 -> 21 after removing exact
// duplicates (the same review posted twice). All 5 stars, newest first.
// Nothing here is written by me; `quote` is the client's text verbatim.
// `tags` say what a review is evidence of; the service pages pick their
// reviews by tag, so a quote is never retyped anywhere.
export const testimonials = [
  {
    quote:
      "very quick turn around",
    name: "fabeice",
    country: "United Kingdom",
    rating: 5,
    when: "1 month ago",
    source: "Fiverr",
  },
  {
    quote:
      "I had an absolute pleasure working with Sameem and his team, they are very reliable, respectful, and professional. They provided an exceptional result, and I can't recommend them enough. Will definitely continue working with them for all my future projects. Thank you Sameem and team!",
    name: "roychid",
    country: "Canada",
    rating: 5,
    when: "3 months ago",
    source: "Fiverr",
    tags: ["team"],
  },
  {
    quote:
      "Excellent work, definitely recommended! The seller was great to work with, very professional and paid close attention to every detail. Everything was handled smoothly and delivered exactly as expected. I'm really happy with the result and would gladly work together again.",
    name: "monica7o9",
    country: "United States",
    rating: 5,
    when: "4 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Excellent seller! Delivered outstanding quality with great attention to detail. Very professional, responsive, and reliable. Will definitely work again!",
    name: "airo001",
    country: "United States",
    rating: 5,
    when: "4 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Amazingly friendly person. Operates with great skill, expertise and knowhow. Genuine person who communicates openly and honestly. Thank your brother.",
    name: "stevieowen",
    country: "Hong Kong",
    rating: 5,
    when: "5 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Seller delivered a high Quality work. Highly recommended",
    name: "johnniedrtu",
    country: "United States",
    rating: 5,
    when: "5 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Sameem did an excellent job deploying my React application on AWS EC2 and connecting it to my domain. Everything was configured perfectly, including Nginx and SSL. The website is fast, secure, and running smoothly. Communication was clear throughout the process, and he delivered on time. Highly recommended for server deployment and AWS work!",
    name: "monica_lisa",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
    tags: ["rescue", "deploy", "fullstack"],
  },
  {
    quote:
      "Working with Sameem was an amazing experience! He integrated Stripe payment API, and built a user dashboard in my Next.js 15 app - all delivered one day early! What impressed me most was his attention to detail and the bonus features he added without extra charge, including email notifications and an... See more",
    name: "matthew4l2",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
    tags: ["rescue", "fullstack", "nextjs"],
  },
  {
    quote:
      "I had a great experience working with Sameem. He delivered exactly what I needed for my Doctor & Patient Appointment app landing page. The design is modern, clean, and very professional, and it works perfectly on mobile, tablet, and desktop. Sameem built the page using Next.js with great performance... See more",
    name: "irmairvin",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
    tags: ["fullstack", "nextjs"],
  },
  {
    quote:
      "Sameem did an excellent job optimizing and restructuring our Next.js app. The codebase is now clean, scalable, and production-ready with noticeable performance improvements. Professional, efficient, and highly recommended.",
    name: "irmairvin",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
    tags: ["rescue", "fullstack", "nextjs"],
  },
  {
    quote:
      "Amazing work! The website looks professional, works perfectly, and the order system is smooth. Seller was responsive and delivered on time. Will definitely work again.",
    name: "cedric_coleman",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
    tags: ["fullstack", "marketplace"],
  },
  {
    quote:
      "Sameem and his team are skilled and know their stuff. They do solid work and are a pleasure to work with.",
    name: "samuelfmdan",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
    tags: ["team"],
  },
  {
    quote:
      "He was delivered on time and the communication was clear throughout the project.",
    name: "amybrown31",
    country: "United Kingdom",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Sameem successfully completed the full OneSignal integration for both iOS and Android apps, including push notifications, in-app notifications, and email notifications using OneSignal APIs. The implementation was done properly, worked as expected, and followed the required setup and configuration steps... See more",
    name: "cedric_coleman",
    country: "United States",
    rating: 5,
    when: "7 months ago",
    source: "Fiverr",
    tags: ["mobile"],
  },
  {
    quote:
      "Great experience working with this Sameem! They improved my existing Figma website design by fixing alignment issues, spacing, typography, and responsiveness. The final design looks much cleaner, more professional, and well-organized. Communication was smooth, and delivery was on time. Highly recommended!",
    name: "smith3131",
    country: "United Kingdom",
    rating: 5,
    when: "7 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Very quick delivery and great communication. Fixed my issue perfectly. The developer understood the problem immediately, provided timely updates, and ensured everything was fully responsive and bug-free. Highly recommend for anyone needing fast and efficient solutions.",
    name: "irmairvin",
    country: "United States",
    rating: 5,
    when: "7 months ago",
    source: "Fiverr",
    tags: ["rescue"],
  },
  {
    quote:
      "Amazing experience working with him! He was professional, responsive, and delivered exactly what I needed. I'm very satisfied with the results and will definitely hire him again in the future. Highly recommended!",
    name: "lilyadam2",
    country: "Canada",
    rating: 5,
    when: "7 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Excellent Sameem! He fixed all the UI issues in my mobile app and made it look very professional and clean. Communication was smooth and delivery was on time. Highly recommended!",
    name: "robertfelt0n",
    country: "United Kingdom",
    rating: 5,
    when: "7 months ago",
    source: "Fiverr",
    tags: ["mobile", "rescue"],
  },
  {
    quote:
      "Great work, beat my expectations",
    name: "juldany4",
    country: "United States",
    rating: 5,
    when: "1 year ago",
    source: "Fiverr",
  },
  {
    quote:
      "Did exactly what i asked for",
    name: "juldany4",
    country: "United States",
    rating: 5,
    when: "1 year ago",
    source: "Fiverr",
  },
  {
    quote:
      "Well he was a professional in his work. he deliver more than my expectation. I highly recommend him and he deliver before the due date and he always give explanation more for the project. Well done for the great work",
    name: "tidem06",
    country: "United States",
    rating: 5,
    when: "2 years ago",
    source: "Fiverr",
  },
];

export const testimonialStats = {
  total: 21, // unique reviews shown; the raw Fiverr scrape had 24 with 3 exact dupes
  average: 5.0,
  countries: 4,
};

// ── Experience ──────────────────────────────────────────────────
// `current: true` roles render as concurrent branches off HEAD; the rest fall
// into the merged history below, newest first.
// ⚠️ DevoraX `from` is a placeholder — set it to the real founding year.
export const experiences = [
  {
    role: "Founder & Lead Engineer",
    org: "DevoraX",
    logo: "/logos/devorax.png",
    kind: "Founder",
    period: "2022 — Present",
    from: 2022,
    location: "Remote · worldwide",
    current: true,
    summary:
      "The studio I run. Client products end to end — scoping, architecture, build and launch — with specialists brought in as scope demands.",
    bullets: [
      "Lead the design, engineering and launch of web, mobile and AI products for clients in the US, UK, Canada and Hong Kong.",
      "Own architecture and the hard parts personally; every build ships with CI/CD, monitoring and 35 days of maintenance.",
      "A two-person studio: me and Usman (CTO). Client work so far has come through Fiverr, at a 5.0 rating across 50+ projects since 2022.",
    ],
    tags: ["Next.js", "React Native", "Node.js", "AWS", "AI"],
  },
  {
    role: "Software Engineer (Full Stack)",
    org: "Pastel",
    logo: "/logos/pastel.png",
    kind: "Full-time",
    period: "Apr 2026 — Present",
    from: 2026,
    location: "Dover, Delaware, US · Remote",
    current: true,
    summary: "Building the iOS marketplace app for Pastel.",
    bullets: [
      "Building the iOS marketplace app for Pastel's antiques and vintage platform.",
    ],
    tags: ["iOS", "React Native", "Marketplace"],
    href: "https://mypastel.com/",
  },
  {
    role: "Software Engineer (Full Stack)",
    org: "ivector",
    logo: "/logos/ivector.png",
    kind: "Full-time",
    period: "Apr 2026 — Present",
    from: 2026,
    location: "Sacramento, California, US · Remote",
    current: true,
    summary: "Live bidding marketplace, iOS.",
    bullets: [
      "Developing and maintaining iOS features for a live bidding marketplace app: real-time bidding, authentication, listings and backend API integration.",
      "Contributed to UI/UX improvements, database management and deployment, plus performance work to keep the real-time experience smooth.",
    ],
    tags: ["iOS", "Real-time", "Auth", "APIs"],
    href: "https://www.ivector.co/",
  },
  {
    role: "Freelance Full-Stack Developer",
    org: "Fiverr",
    logo: "/logos/fiverr.png",
    kind: "Freelance",
    period: "Jan 2022 — Present",
    from: 2022,
    location: "Pakistan · Remote",
    current: true,
    summary: "50+ projects, 5.0 rating, still taking work.",
    bullets: [
      "50+ projects completed with a 5.0 rating across 30+ reviews from clients in the US, UK, Canada and Hong Kong.",
      "MERN stack, React Native and Flutter builds, plus AWS deployment, Docker, Kubernetes and CI/CD.",
    ],
    tags: ["MERN", "React Native", "Flutter", "AWS", "Docker", "CI/CD"],
    href: "https://www.fiverr.com/sameemamjad",
  },
  {
    role: "Full Stack Engineer",
    org: "Climaxcode Technology",
    logo: "/logos/climaxcode.png",
    kind: "Full-time",
    period: "Mar 2026 — May 2026",
    from: 2026,
    location: "Islamabad, Pakistan · On-site",
    summary: "CRM, AI notes and AI image generation.",
    bullets: [
      "Shipped a CRM system, an AI notes application and an AI image generation platform.",
      "Handled both ends: APIs, database design, authentication and deployment workflows.",
      "Managed DigitalOcean servers end to end — setup, environment configuration and production deploys.",
    ],
    tags: ["Next.js", "Node.js", "DigitalOcean", "AI"],
    href: "https://climaxcode.com/",
  },
  {
    role: "Software Engineer",
    org: "Zencloud Technologies",
    logo: "/logos/zencloud.png",
    kind: "Full-time",
    period: "Oct 2024 — Mar 2026",
    from: 2024,
    location: "Islamabad, Pakistan · On-site",
    summary: "Backend architecture for enterprise, data-heavy platforms.",
    bullets: [
      "Led backend work across the full lifecycle — system design, API development, AWS deployment, performance tuning and monitoring.",
      "e-fuldmagt, a Danish digital authorization platform: secure authentication flows, document management and GDPR-compliant REST APIs.",
      "Barfly's flight transfer risk module: Duffel API plus custom heuristics to predict disruption in real time, over resilient pipelines and background jobs.",
    ],
    tags: ["Node.js", "NestJS", "MongoDB", "AWS", "Swagger", "GitHub Actions"],
    href: "https://www.zencloudtechnologies.com/",
  },
  {
    role: "Full Stack Developer",
    org: "Webrange Solutions",
    logo: "/logos/webrange.png",
    kind: "Full-time",
    period: "Jan 2024 — Oct 2024",
    from: 2024,
    location: "Islamabad, Pakistan · On-site",
    summary: "E-commerce and subscription platforms.",
    bullets: [
      "Led backend for Bondly, a Node.js + Firebase pet-care ecosystem behind a Flutter app: subscription billing, credit logic, real-time notifications and Stripe.",
      "Built Afriva, a four-role e-commerce platform on Next.js and Supabase — admin, manager, seller and buyer, with real-time order tracking.",
      "Worked on Ginger, a React e-commerce app, focused on component architecture and state management.",
    ],
    tags: ["Next.js", "React", "Supabase", "Firebase", "Stripe", "AWS"],
    href: "https://www.webrangesolutions.com/",
  },
];
