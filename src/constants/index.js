// ─────────────────────────────────────────────────────────────
//  Real portfolio data for Sameem Amjad — Founder & Lead Engineer, DevoraX
//  Projects sourced from the DevoraX case-study (Supabase `projects` table).
//  NOTE: one placeholder link remains — `links.calendly`. Flagged below.
// ─────────────────────────────────────────────────────────────

import { caseStudies } from "./caseStudies";

export const profile = {
  name: "Sameem Amjad",
  role: "Founder & Lead Engineer",
  company: "DevoraX",
  // Hero headline is the name — a portfolio is a personal brand, not a job ad.
  // `kicker` is the role line that sits under it in acid.
  headline: ["Sameem", "Amjad"],
  kicker: "Full-Stack & AI Engineer",
  subheadline:
    "Founder & Lead Engineer at DevoraX. I lead teams that ship production-grade web, mobile and AI products — from first line of code to millions of users.",
  location: "Available worldwide · Remote",
  availability: "Available for new projects",
  email: "sameemamjadarsu@gmail.com",
};

export const links = {
  devorax: "https://thedevorax.tech",
  fiverr: "https://www.fiverr.com/sameemamjad", // confirmed from fiverr_reviews.json freelancerUrl
  calendly: "https://cal.com/", // TODO: replace with your real Calendly / Cal.com link
  email: "mailto:sameemamjadarsu@gmail.com",
};

export const navLinks = [
  { id: "work", title: "Work" },
  { id: "services", title: "Services" },
  { id: "process", title: "Process" },
  { id: "contact", title: "Contact" },
];

// Trust chips shown in the hero
export const heroStats = [
  { value: "2.4M+", label: "users reached" },
  { value: "120k+", label: "orders processed" },
  { value: "99.9%", label: "uptime" },
];

// Animated counters in the impact bar
export const impactStats = [
  { value: 24, decimals: 0, suffix: "+", label: "Products shipped" },
  { value: 2.4, decimals: 1, suffix: "M+", label: "Users reached" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Peak uptime" },
  { value: 120, decimals: 0, suffix: "k+", label: "Orders processed" },
  { value: 120, decimals: 0, suffix: "+", label: "Countries served" },
  { value: 5, decimals: 1, suffix: "", label: "Fiverr rating", isRating: true },
];

export const services = [
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
      "One codebase, both stores, and an actual release process at the end of it. I have shipped marketplaces, delivery apps and social platforms through review and out to hundreds of thousands of installs.",
    points: [
      "React Native and Flutter, one codebase for iOS and Android",
      "Push, deep links, offline state and background sync",
      "App Store and Play Store submission handled end to end",
      "Over-the-air updates so fixes do not wait on review",
    ],
    tech: ["React Native", "Flutter", "Firebase", "Node.js"],
    icon: "mobile",
    accent: "from-cyan-400/25 to-transparent",
    span: "",
  },
  {
    key: "ai",
    title: "AI & ML",
    label: "AI",
    blurb:
      "Recommendation engines, Stable Diffusion pipelines, risk engines and LLM-powered products.",
    detail:
      "AI as a feature that earns its place, not a demo bolted onto a landing page. Recommendation engines that lift conversion, risk scoring that catches what rules miss, and generative pipelines that run at production cost.",
    points: [
      "LLM features with structured outputs you can actually trust",
      "Recommendation and ranking engines tuned on your data",
      "Stable Diffusion and image pipelines at production cost",
      "Risk and fraud scoring on live transaction streams",
    ],
    tech: ["OpenAI", "Stable Diffusion", "Python", "PostgreSQL"],
    icon: "ai",
    accent: "from-fuchsia-500/25 to-transparent",
    span: "",
  },
  {
    key: "cloud",
    title: "Backend & Cloud",
    label: "Backend",
    blurb:
      "Node/NestJS microservices on AWS — queues, streaming, sockets and bank-grade security at scale.",
    detail:
      "The part nobody sees until it breaks. Services that scale horizontally, queues that absorb spikes, and infrastructure you can hand to another engineer without an apology.",
    points: [
      "Node and NestJS services, containerised and horizontally scaled",
      "Queues and event streams that absorb traffic spikes",
      "AWS infrastructure as code, with CI/CD from day one",
      "Monitoring and alerting so you hear it from us, not your users",
    ],
    tech: ["Node.js", "NestJS", "AWS", "Docker", "Kubernetes", "Redis"],
    icon: "cloud",
    accent: "from-emerald-400/25 to-transparent",
    span: "md:col-span-2",
  },
];

// Leadership / team
export const team = [
  {
    name: "Sameem Amjad",
    badge: "Founder",
    role: "Founder & Lead Engineer",
    title: "Full-Stack Engineer · Web · Mobile · AI",
    image: "/myimage/profile.webp",
    imgPos: "object-center",
    bio: "I lead teams that turn ideas into products real people use every day — from MVPs to platforms serving millions. Clean architecture, honest communication, and software that solves real business problems.",
    tags: ["Next.js", "React Native", "Node.js", "AWS", "AI"],
  },
  {
    name: "Usman",
    badge: "CTO",
    role: "Chief Technical Officer",
    title: "Full-Stack AI Architect · Web · Mobile · 35-Day Free Maintenance",
    image: "/myimage/usman_cto.webp",
    imgPos: "object-top",
    bio: "Expert Full-Stack AI Architect with 5+ years building scalable Generative-AI systems, custom web apps and SaaS platforms. I turn slow, outdated systems into fast, scalable, user-friendly products — architecting cross-platform mobile (React Native, Flutter) and high-concurrency web on Kubernetes & AWS for 99.9% uptime.",
    tags: ["Generative AI", "React Native", "Flutter", "Kubernetes", "AWS", "SaaS"],
  },
];

// ── Featured (curated, rich cards) ──────────────────────────────
export const featuredProjects = [
  {
    title: "Loopedin",
    tagline: "Social + events platform for 2.4M+ users",
    category: "Node.js · Microservices · AWS",
    filter: "Platforms",
    description:
      "Next-gen social platform blending short-form video with live local event discovery. Serverless video pipeline (AWS MediaConvert), real-time messaging (Socket.io + Redis) and a gamified LoopScore engine.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780687758048-dmnf119254.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Active users", v: "2.4M+" },
      { k: "Messages sent", v: "96.3M+" },
      { k: "Videos shared", v: "4.8M+" },
    ],
    tags: ["TypeScript", "Node.js", "Socket.io", "Redis", "AWS"],
  },
  {
    title: "Dooz Inspected Cars",
    tagline: "Verified used-car marketplace · $1.2B+ JD in transactions",
    category: "Angular · NestJS · React Native",
    filter: "Mobile",
    description:
      "All-in-one platform to search, buy, finance and insure 20,000+ inspected vehicles. 150-point inspection reports, financing calculators and AI valuation across web, iOS and Android.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780687463421-x75fdi95mk8.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Verified vehicles", v: "20,000+" },
      { k: "Transactions", v: "1.2B+ JD" },
      { k: "Satisfaction", v: "98%" },
    ],
    tags: ["Angular", "NestJS", "React Native", "PostgreSQL"],
    web: "https://dooz.com/en/cars-for-sale",
    android: "https://play.google.com/store/apps/details?id=com.dooz.app&hl=en",
    ios: "https://apps.apple.com/us/app/dooz-cars/id1627030530",
  },
  {
    title: "Koor Food Delivery",
    tagline: "Homemade-food marketplace · 120k+ orders",
    category: "React Native · NestJS · AWS",
    filter: "Mobile",
    description:
      "Cloud-native marketplace connecting customers with home chefs. Real-time delivery via Firebase, Elasticsearch-powered discovery and AWS (EC2, S3, CloudFront) for reliability at scale.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780682366449-mqcg4kehwuc.png",
    accent: "from-yellow-400 to-orange-500",
    stats: [
      { k: "Orders completed", v: "120,000+" },
      { k: "User rating", v: "4.8 / 5" },
      { k: "Delivery", v: "Real-time" },
    ],
    tags: ["React Native", "NestJS", "Firebase", "Elasticsearch", "AWS"],
    android: "https://play.google.com/store/apps/details?id=com.koor_user",
  },
  {
    title: "Afriva",
    tagline: "Multi-vendor e-commerce · $1.2M revenue",
    category: "Next.js 15 · Supabase",
    filter: "E-Commerce",
    description:
      "Modern multi-vendor marketplace with role-based dashboards for admins, managers, sellers and buyers. SSR for performance and SEO, real-time delivery tracking across 120+ cities.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780690136428-ugskg9kw1yo.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Total revenue", v: "$1.2M" },
      { k: "Active vendors", v: "1,245" },
      { k: "Cities covered", v: "120+" },
    ],
    tags: ["Next.js", "Supabase", "Redux Toolkit"],
    web: "https://afriva-buyer.vercel.app/",
  },
  {
    title: "Pastel Marketplace",
    tagline: "Luxury antiques marketplace · 48k+ collectors",
    category: "Next.js · Firebase",
    filter: "E-Commerce",
    description:
      "Elegant marketplace for antiques and vintage treasures with provenance. Curated collections, secure payments (Sharetribe) and insured global logistics via Shippo.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686446029-4r69nforunv.png",
    accent: "from-orange-400 to-red-500",
    stats: [
      { k: "Curated items", v: "12k+" },
      { k: "Happy collectors", v: "48k+" },
      { k: "Positive reviews", v: "98%" },
    ],
    tags: ["Next.js", "Firebase", "Sharetribe", "Shippo"],
    web: "https://mypastel.com/",
    ios: "https://apps.apple.com/us/app/pastel-antique-marketplace/id6753628917",
  },
  {
    title: "TAL Workforce",
    tagline: "Welfare platform for mobile workers · 5,000+ supported",
    category: "Flutter · React · Node.js",
    filter: "Mobile",
    description:
      "Connects mobile workers with safe venues offering rest and welfare facilities. Real-time location services, venue search and employer-funded access across web, iOS and Android.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689110015-zywscjbzpj.png",
    accent: "from-teal-400 to-emerald-400",
    stats: [
      { k: "Workers supported", v: "5,000+" },
      { k: "Partner venues", v: "2,500+" },
      { k: "Satisfaction", v: "98%" },
    ],
    tags: ["Flutter", "React", "Node.js", "AWS"],
    web: "https://talservices.co.uk/",
    android: "https://play.google.com/store/apps/details?id=com.zencloud.tal&hl=en",
    ios: "https://apps.apple.com/in/app/tal-services/id6737687790",
  },
  {
    title: "WOD Pro League",
    tagline: "Global fitness competitions · 120+ countries",
    category: "Flutter · React · Node.js · AWS",
    filter: "Mobile",
    description:
      "Functional-fitness competition platform with real-time leaderboards and score submission. AWS Lambda + S3 serverless backend, Redis and Socket.io for low-latency live updates.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689938803-y248gktlxs9.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Total athletes", v: "12,778" },
      { k: "Scores submitted", v: "8,567" },
      { k: "Countries", v: "120+" },
    ],
    tags: ["Flutter", "React", "Node.js", "AWS", "Redis"],
    web: "https://wodproleague.es/",
    android:
      "https://play.google.com/store/apps/details?id=com.webrangesolutions.wod_pro_league",
    ios: "https://apps.apple.com/pk/app/wod-pro-league/id6538719686",
  },
  {
    title: "JUJU Streaming",
    tagline: "Multimedia streaming platform · 1.2M watch-hours",
    category: "Node.js · AWS · Media",
    filter: "Platforms",
    description:
      "Secure, scalable streaming for 9+ content types. Fluent-FFmpeg + BullMQ media pipeline on AWS S3/EC2, signed URLs and RBAC, subscription billing built in.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689640497-3073j1xez4v.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Watch time", v: "1.2M hrs" },
      { k: "Total users", v: "128,540" },
      { k: "Revenue", v: "$48,760" },
    ],
    tags: ["Node.js", "AWS", "FFmpeg", "BullMQ"],
  },
  {
    title: "Pathana",
    tagline: "EdTech planning platform · 10k+ students, 500+ schools",
    category: "Next.js · Node.js · Firebase",
    filter: "Web",
    description:
      "Guides students from high school to career readiness with personalized roadmaps, milestone tracking and counselor collaboration — backed by real-time data insights.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686955522-g97v6wiz2bm.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Students reached", v: "10k+" },
      { k: "School partners", v: "500+" },
      { k: "Success rate", v: "85%" },
    ],
    tags: ["Next.js", "Node.js", "Firebase", "AWS"],
    web: "https://www.pathana.net/",
  },
  {
    title: "Three28",
    tagline: "Creator monetization platform · 100% revenue retention",
    category: "React Native · NestJS · AWS",
    filter: "Mobile",
    description:
      "Lets creators upload, distribute and monetize video with user-controlled pricing, merch integration, secure payments and a data-driven analytics dashboard.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780683222648-emwgaqd7yf.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Revenue retention", v: "100%" },
      { k: "Monthly growth", v: "10k+" },
      { k: "Engagement", v: "High" },
    ],
    tags: ["React Native", "NestJS", "AWS"],
    ios: "https://apps.apple.com/us/app/three28/id6504447934",
  },
  {
    title: "Digital Power of Attorney",
    tagline: "GDPR & ISO 27001 authorization platform",
    category: "Node.js · React · Flutter · AWS",
    filter: "Platforms",
    description:
      "Manages digital authorizations across government and private portals with digital signatures, encrypted S3 storage and granular delegation — compliant with GDPR & ISO 27001.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689033958-rhhcbvu4tq.png",
    accent: "from-purple-400 to-indigo-500",
    stats: [
      { k: "Security", v: "Bank-grade" },
      { k: "Compliance", v: "GDPR · ISO" },
      { k: "Storage", v: "Encrypted S3" },
    ],
    tags: ["Node.js", "Express", "React", "Flutter", "AWS"],
    web: "https://www.e-fuldmagt.dk/en",
  },
  {
    title: "Waitmate",
    tagline: "Hospitality management suite · 87% occupancy",
    category: "React · Supabase · React Native",
    filter: "Web",
    description:
      "Unified reservations, table, staff and CRM platform for restaurants and hotels. Smart bookings, real-time analytics and multi-location support with a React Native companion app.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686310124-toexmepxwz.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Total revenue", v: "$24,680" },
      { k: "Occupancy rate", v: "87%" },
      { k: "Satisfaction", v: "4.8 / 5" },
    ],
    tags: ["React", "Supabase", "React Native"],
    web: "https://waitmate.vercel.app/dashboard",
  },
];

// ── More work (compact, filterable grid) ────────────────────────
export const moreProjects = [
  {
    title: "FinTech Mobile App",
    category: "React Native · Node.js",
    filter: "Mobile",
    description:
      "Cross-platform banking app processing 50k+ daily transactions with bank-grade security.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/fintech/card_images/fintech_card_image.png",
    accent: "from-teal-400 to-emerald-400",
    stats: [
      { k: "Uptime", v: "99.9%" },
      { k: "Transactions", v: "50k+/day" },
    ],
    tags: ["React Native", "Node.js", "Security"],
  },
  {
    title: "AI E-Commerce Ecosystem",
    category: "Next.js · Microservices",
    filter: "AI",
    description:
      "Scalable multi-vendor marketplace with AI-driven recommendations on Docker/K8s microservices.",
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
    category: "Node.js · AI",
    filter: "AI",
    description:
      "Real-time flight-transfer risk assessment using the Duffel API and heuristic algorithms.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780689308066-rn493il9vek.png",
    accent: "from-sky-400 to-blue-500",
    stats: [
      { k: "On-time", v: "88%" },
      { k: "Accuracy", v: "78%" },
    ],
    tags: ["React", "Node.js", "AI"],
    web: "https://got2.travel/",
  },
  {
    title: "Coffee Shop Web App",
    category: "Next.js · Firebase",
    filter: "Web",
    description:
      "Premium café web platform with SSR, interactive menu and e-commerce — 95 Lighthouse score.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780685783771-wjgtujionwd.png",
    accent: "from-orange-400 to-red-500",
    stats: [
      { k: "Lighthouse", v: "95" },
      { k: "Retention", v: "+15%" },
    ],
    tags: ["Next.js", "React", "Firebase"],
    web: "https://coffee-shop-original.vercel.app/",
  },
  {
    title: "Augment Fit",
    category: "React · TypeScript · Supabase",
    filter: "Web",
    description:
      "Fitness-management admin panel connecting trainers and users with BMI tracking and workout plans.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780686023549-17rflwl4eoy.png",
    accent: "from-teal-400 to-emerald-400",
    stats: [
      { k: "Revenue", v: "$18,230" },
      { k: "Retention", v: "87.3%" },
    ],
    tags: ["React", "TypeScript", "Supabase"],
    web: "https://augment-fit.vercel.app/dashboard",
  },
  {
    title: "ConstrActive",
    category: "GoHighLevel · Supabase · Stripe",
    filter: "Platforms",
    description:
      "Construction CRM automating lead-gen, subscriptions and payments with recurring plans.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780796858509-2ivbajvu5mm.png",
    accent: "from-cyan-400 to-blue-500",
    stats: [
      { k: "Monthly rev.", v: "$28,450" },
      { k: "Projects", v: "350+" },
    ],
    tags: ["Supabase", "Stripe", "CRM"],
    web: "https://constraction.ca/",
  },
  {
    title: "Bondly Pet Care",
    category: "Node.js · Firebase · Stripe",
    filter: "Mobile",
    description:
      "Subscription-based pet-care ecosystem with credit management, Stripe payments and AWS deployment.",
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
    category: "React.js Frontend",
    filter: "E-Commerce",
    description:
      "Modern React e-commerce storefront with modular components and optimized client-side performance.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/outstride/outstride_card.png",
    accent: "from-lime-400 to-green-500",
    stats: [
      { k: "Frontend", v: "React" },
      { k: "Perf", v: "Optimized" },
    ],
    tags: ["React", "Frontend"],
    web: "https://out-stride.com/",
    android:
      "https://play.google.com/store/apps/details?id=com.webrange.outstride&hl=en",
    ios: "https://apps.apple.com/us/app/outstride/id6736747732",
  },
  {
    title: "Food Magnet",
    category: "Flutter · React · AWS Lambda",
    filter: "Mobile",
    description:
      "Real-time food-truck discovery with live location tracking, vendor profiles and a React admin dashboard.",
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
      "Technical control app for roller-shutter installation — motor calibration, compliance docs and search.",
    image:
      "https://arqdtyoiwvhpxkuyettb.supabase.co/storage/v1/object/public/DevoraX/projects/1780682841099-7f50fzfk6sy.png",
    accent: "from-blue-500 to-indigo-500",
    stats: [
      { k: "Efficiency", v: "+20%" },
      { k: "Compliance", v: "Enhanced" },
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
      "Real-time analytics dashboard visualizing large datasets with ML models for market prediction.",
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
    names: ["Node.js", "NestJS", "PostgreSQL", "Redis", "Supabase", "Firebase", "Elasticsearch"],
  },
  {
    label: "Cloud & AI",
    hint: "Infrastructure and the models that run on it",
    names: ["AWS", "Docker", "Kubernetes", "Stripe", "OpenAI", "Stable Diffusion"],
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
    a: "An MVP with auth, payments and an admin area is typically 4–8 weeks. A platform with mobile apps and real-time features is more like 3–6 months. I quote per project rather than per hour once scope is clear, so you're not paying for my learning curve. The discovery call is free and you get an honest number at the end of it.",
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
    q: "How do we start?",
    a: "Book a call. Thirty minutes, no pitch deck. Tell me what you're building and what success looks like, and you'll leave with a scope, a timeline and a number — whether or not you work with me.",
  },
];

// ── Client testimonials ─────────────────────────────────────────
// Real Fiverr reviews, scraped 24 -> 21 after removing exact
// duplicates (the same review posted twice). All 5 stars, newest first.
// Nothing here is written by me; `quote` is the client's text verbatim.
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
  },
  {
    quote:
      "Working with Sameem was an amazing experience! He integrated Stripe payment API, and built a user dashboard in my Next.js 15 app - all delivered one day early! What impressed me most was his attention to detail and the bonus features he added without extra charge, including email notifications and an... See more",
    name: "matthew4l2",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "I had a great experience working with Sameem. He delivered exactly what I needed for my Doctor & Patient Appointment app landing page. The design is modern, clean, and very professional, and it works perfectly on mobile, tablet, and desktop. Sameem built the page using Next.js with great performance... See more",
    name: "irmairvin",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Sameem did an excellent job optimizing and restructuring our Next.js app. The codebase is now clean, scalable, and production-ready with noticeable performance improvements. Professional, efficient, and highly recommended.",
    name: "irmairvin",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Amazing work! The website looks professional, works perfectly, and the order system is smooth. Seller was responsive and delivered on time. Will definitely work again.",
    name: "cedric_coleman",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
  },
  {
    quote:
      "Sameem and his team are skilled and know their stuff. They do solid work and are a pleasure to work with.",
    name: "samuelfmdan",
    country: "United States",
    rating: 5,
    when: "6 months ago",
    source: "Fiverr",
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
      "Lead the design, engineering and launch of web, mobile and AI products for clients across four continents.",
      "Own architecture and the hard parts personally; every build ships with CI/CD, monitoring and 35 days of maintenance.",
      "24+ products shipped, 2.4M+ users reached, 99.9% peak uptime across the portfolio.",
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
  {
    role: "MERN Stack Developer",
    org: "ByteSight Technologies",
    kind: "Hybrid",
    period: "Jun 2023 — Dec 2023",
    from: 2023,
    location: "Pakistan · Hybrid",
    summary: "Three projects, front to back.",
    bullets: [
      "Led three builds: the Foxtel and Nove inventory systems, and the Glorious Publications website.",
      "Owned frontend and backend on the MERN stack, with Material UI and Tailwind for the interfaces.",
    ],
    tags: ["MERN", "Next.js", "Material UI", "Tailwind CSS", "Git"],
  },
];
