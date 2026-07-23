// ─────────────────────────────────────────────────────────────
//  Real portfolio data for Sameem Amjad — Founder & Lead Engineer, DevoraX
//  Projects sourced from the DevoraX case-study (Supabase `projects` table).
//  NOTE: replace the two placeholder links flagged below with the real ones.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Sameem Amjad",
  role: "Founder & Lead Engineer",
  company: "DevoraX",
  headline: ["I build products", "that scale to", "millions."],
  subheadline:
    "Founder & Lead Engineer at DevoraX. I lead teams that ship production-grade web, mobile and AI products — from first line of code to millions of users.",
  location: "Available worldwide · Remote",
  availability: "Available for new projects",
  email: "sameemamjadarsu@gmail.com",
};

export const links = {
  devorax: "https://thedevorax.tech",
  fiverr: "https://www.fiverr.com/sameemamjad", // TODO: replace with your real Fiverr profile URL
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
    title: "Web Platforms",
    blurb:
      "Next.js & React apps with SSR, role-based dashboards and real-time data — engineered for speed and SEO.",
    icon: "web",
    accent: "from-violet-500/25 to-transparent",
    span: "md:col-span-2",
  },
  {
    title: "Mobile Apps",
    blurb:
      "Cross-platform React Native & Flutter apps live on the App Store and Google Play.",
    icon: "mobile",
    accent: "from-cyan-400/25 to-transparent",
    span: "",
  },
  {
    title: "AI & ML",
    blurb:
      "Recommendation engines, Stable Diffusion pipelines, risk engines and LLM-powered products.",
    icon: "ai",
    accent: "from-fuchsia-500/25 to-transparent",
    span: "",
  },
  {
    title: "Backend & Cloud",
    blurb:
      "Node/NestJS microservices on AWS — queues, streaming, sockets and bank-grade security at scale.",
    icon: "cloud",
    accent: "from-emerald-400/25 to-transparent",
    span: "md:col-span-2",
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
    web: "http://coffee-shop-original.vercel.app/",
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

// Kept so any legacy imports don't break the build.
export const technologies = [];
export const experiences = [];
export const testimonials = [];
export const projects = featuredProjects;
