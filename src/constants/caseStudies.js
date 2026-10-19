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
//
//  `video` and `gallery` live on the base project in index.js, not here:
//  the cards need them too (the "Video" badge), and they only see the base.
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

  // Formerly "ConstrActive": the same Fiverr client. Lead with the contract
  // generator that is live at constraction.ca; the earlier CRM work for the
  // business gets one sentence, in `results`.
  constraction: {
    overview:
      "A bilingual contract generator for Quebec contractors, built for a Fiverr client and live at constraction.ca. A contractor builds a contract in English or French, downloads it as a PDF ready to sign, and tracks it until the job is paid.",
    problem:
      "Small contractors in Quebec still write contracts by hand or from outdated templates. Missing RBQ licence details and required clauses lead to disputes and unpaid work, and clients often need the contract in French and English.",
    approach:
      "I built it on Next.js 15 with next-intl, so every page exists in English and French, and Supabase for accounts, contracts and Edge Functions. A guided builder walks the contractor through each part of the agreement, React-PDF turns the answers into a PDF in either language, and Stripe takes payment per contract or as an unlimited monthly plan.",
    features: [
      { title: "Guided contract builder", detail: "Step-by-step builder for client–contractor and general contractor–subcontractor agreements." },
      { title: "PDFs in English or French", detail: "A ready-to-sign PDF in either language, with RBQ licence numbers checked against the valid formats." },
      { title: "Contract lifecycle", detail: "Every contract moves from draft to generated, signed, paid and completed, so none get lost." },
      { title: "Stripe billing", detail: "Pay per contract, or subscribe to an unlimited monthly plan." },
      { title: "Admin panel", detail: "Users, contracts, revenue and MRR in one place, plus erasing a user's data on request (GDPR erasure)." },
    ],
    results:
      "ConstrAction is live at constraction.ca. The live demo is a separate copy with sample data, where you can sign in as an admin or a contractor and build a contract yourself; payments there run in Stripe's test mode. The walkthrough video above shows the landing page, the builder and the admin panel. Before this, I built the same business's lead capture, CRM and subscription payments on GoHighLevel, Supabase and Stripe.",
  },

  voicedesk: {
    overview:
      "A white-label AI receptionist that answers calls, books and qualifies leads, which agencies sell to their own clients under their own brand. I built it for a Fiverr client.",
    problem:
      "Hotels, clinics, restaurants and trades miss calls after hours and at peak times, and every missed call is a lost booking. Agencies want to sell an AI receptionist to these clients, but off-the-shelf tools can't be rebranded and charge a platform fee on every minute.",
    approach:
      "A Node.js server streams the call audio over WebSockets: Deepgram turns speech into text and text back into speech, and an LLM (Gemini or Claude) decides what to say, so a caller can interrupt the agent mid-sentence the way they would a person. Calls come in through Twilio or straight from the browser. One engine and one Supabase Postgres database serve every agency and every business, and each agency sees only its own clients.",
    features: [
      { title: "Live voice calls", detail: "In the browser or by phone, and the caller can interrupt the agent mid-sentence." },
      { title: "Its own knowledge base", detail: "Each business has its own knowledge base, and the agent answers only from it." },
      { title: "Booking and lead tools", detail: "Availability, booking with SMS confirmation, lookup and cancel, lead capture, messages and warm transfer to a person." },
      { title: "One engine, many industries", detail: "Hotel stays, restaurant tables, clinic appointments and service visits, each set up from a template." },
      { title: "White-label agencies", detail: "Each agency gets its own brand and domain, and sees only its own clients." },
      { title: "Calls you can review", detail: "A live call feed, transcripts, AI call summaries with outcome and sentiment, and analytics." },
    ],
    results:
      "Built for a Fiverr client. The live demo runs on sample businesses and needs no login: open a business, press Test and talk to its agent. The 3-minute video above includes a real voice call. The demo runs on free-tier AI quotas, so if the agent says it is having trouble, try again a minute later.",
  },

  "pianissimo-online": {
    overview:
      "An online piano academy that keeps students practising between lessons: courses, XP and badges for practice, teacher feedback and a community, in English and Spanish. I built it for a Fiverr client.",
    problem:
      "Online piano students lose motivation between lessons, teachers can't see who is actually practising, and lessons, feedback and community end up spread across different tools.",
    approach:
      "A Next.js 14 app with next-intl for English and Spanish, installable to the home screen as a PWA. Supabase holds the courses, practice logs and messages, Supabase Realtime pushes notifications as they happen, and Cloudinary handles media. Every practice entry feeds the XP system, so levels, badges, streaks and the leaderboard all come from the same log the teacher sees.",
    features: [
      { title: "Courses and progress", detail: "Courses and lessons, with progress tracked for each student." },
      { title: "Practice that earns XP", detail: "Logging practice earns XP, levels, badges and streaks, and feeds a leaderboard." },
      { title: "Teacher grading", detail: "Teachers grade challenges and keep class notes for each student." },
      { title: "Community", detail: "A feed with posts, polls and reactions, plus direct messages." },
      { title: "Real-time and installable", detail: "Live notifications, and the app installs to the home screen as a PWA." },
      { title: "Admin area", detail: "Students, analytics, moderation and invites." },
    ],
    results:
      "Built for a Fiverr client. The live demo has sample students, a teacher and an admin account, so you can log practice, check the leaderboard and grade a challenge yourself, in English or Spanish. The 2-minute video above covers the same ground.",
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
      "e-fuldmagt is live at e-fuldmagt.dk. It was Zencloud's client project, built while I was employed there. The live demo runs a separate copy with sample data, so you can try the user app and the admin panel without touching the real service, and the 2-minute video above walks through both. Neither I nor DevoraX hold security certifications, so none are claimed here.",
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

  idecorwala: {
    overview:
      "A corporate website for iDecorwala, a company that supplies wall, floor and ceiling finishes and modular spaces. It presents the product ranges, is built to rank in search, and turns visitors into project enquiries.",
    problem:
      "The business needed a credible B2B website that presents its product ranges, ranks in search, and turns visitors into project enquiries, with content the team can update without a developer.",
    approach:
      "Next.js 16 renders every page on the server, so pages load fast and search engines see the whole page. Product categories, product pages and articles come from Supabase, so the team can change them without a developer, and every page has its own metadata, with a sitemap.",
    features: [
      { title: "Product catalogue", detail: "Product categories and product pages driven from the database." },
      { title: "Content pages", detail: "Thought-leadership articles, projects and services pages." },
      { title: "Enquiries", detail: "A contact and request-for-proposal flow for project enquiries." },
      { title: "SEO foundations", detail: "Per-page metadata, a sitemap and fast server-rendered pages." },
    ],
    results:
      "iDecorwala hired me directly, and the website is live at idecorwala.com. The 75-second video above walks through it, and the live demo page links a public preview with nothing to sign in to.",
  },

  firstpass: {
    overview:
      "A subscription study platform for the Multistate Pharmacy Jurisprudence Examination (MPJE), with state-specific practice questions, readiness tracking and tools for schools that prepare whole cohorts. A demo build with sample data.",
    problem:
      "Pharmacy law differs in every US state, so MPJE candidates struggle to find practice material for their own state and have no reliable way to tell when they are ready to sit the exam.",
    approach:
      "Next.js 16 with Supabase for accounts, the question bank and quiz history, and Stripe for subscriptions. Questions are organised by state and law category, so a candidate practises the law of the state they are sitting for, and every quiz result feeds a readiness score across the categories.",
    features: [
      { title: "State-by-state question bank", detail: "Organised by state and law category, with an explanation for every answer." },
      { title: "Practice tools", detail: "Timed quizzes, bookmarks, daily goals and study streaks." },
      { title: "Readiness score", detail: "Calculated from performance across categories, so a candidate can see when they are ready." },
      { title: "Four plans", detail: "Free, Basic, Pro and School, billed through Stripe." },
      { title: "Schools and admin", detail: "Schools and cohorts with instructors, plus an admin console for content, users and analytics." },
    ],
    results:
      "This is a demo build with sample data, not a client product. From the live demo page you can sign in as a student, an instructor or an admin, and payments run in Stripe's test mode. The 2-minute video above shows the student dashboard, a practice quiz and the admin console.",
  },

  sitewrite: {
    overview:
      "Two apps for chartered surveying firms: a surveyor app that works on site without signal, and an admin portal where the firm controls wording, templates and the team. A demo build with sample data.",
    problem:
      "Surveyors often have no connection on site and rewrite their notes into RICS Home Survey reports afterwards. Firms struggle to keep wording consistent and branded across every surveyor.",
    approach:
      "Both apps are React and TypeScript on Vite, over Supabase. The surveyor app is an offline PWA: Workbox caches the app, IndexedDB keeps each survey on the tablet, and it syncs on its own once there is a connection again. jsPDF builds the branded report from the finished survey, and each firm's data is kept apart from every other firm's.",
    features: [
      { title: "Every RICS element", detail: "Captures elements D–J with condition ratings, photos and signatures." },
      { title: "Works offline", detail: "Works fully offline on site and syncs automatically when back online." },
      { title: "Approved phrase library", detail: "783 approved phrases for descriptions, construction, condition and advice." },
      { title: "One-click report", detail: "A branded PDF report from the finished survey." },
      { title: "Firm admin portal", detail: "Phrase library editor, report templates and team management." },
      { title: "Multi-tenant", detail: "Each firm's data is isolated from every other firm's." },
    ],
    results:
      "This is a demo build with sample data, not a client product. The live demo page opens both apps, with a surveyor who has surveys in progress, complete and issued, and a firm admin; the AI writing assistant is switched off there. The 2-minute video above shows the surveyor app, the branded report and the admin app.",
  },

  "ar-lip-filler-preview": {
    overview:
      "A proof of concept for aesthetic clinics: the phone camera tracks the face and reshapes the lips live, so a patient can preview filler styles before treatment.",
    problem:
      "Patients find it hard to picture what lip filler will look like on their own face, and consultations rely on before-and-after photos of other people.",
    approach:
      "MediaPipe tracks the face live, entirely in the browser. Anatomy-aware warping reshapes the lips and a WebGL2 renderer draws the result in real time, with style presets and a volume control. A FastAPI and PostgreSQL backend stores the before-and-after pairs a user saves.",
    features: [
      { title: "Live face tracking", detail: "MediaPipe face tracking, running entirely in the browser." },
      { title: "Realistic warping", detail: "Anatomy-aware warping and a WebGL2 renderer." },
      { title: "Style presets", detail: "Natural, Russian, French and clinic presets, with adjustable volume." },
      { title: "Before and after", detail: "A side-by-side comparison of the face before and after." },
      { title: "Training data", detail: "Saved before-and-after pairs feed a dataset for training future models." },
    ],
    results:
      "This is a proof of concept, not a clinic's product. The live demo needs no login and works best on a phone, once you allow camera access. The 90-second video above was recorded with an AI-generated face of a person who does not exist.",
  },
};
