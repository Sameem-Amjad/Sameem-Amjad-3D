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

  // Added 2026-11-02 from each demo's own description (the demo hub). Client
  // projects say so; none names a platform, a person or a figure the demo
  // does not show.
  "bevy-irie": {
    overview:
      "A website for Bevy Irie, a Lagos property-management company whose clients are landlords living abroad. It explains the services, shows how the company works and turns visits into enquiries, and a private dashboard shows the owner where visitors come from.",
    problem:
      "Landlords abroad hand their property, rent and tenants to a company they may never meet, so the website has to earn that trust on its own: clear services, a visible process, proof from other landlords and an easy way to reach a person. The owner also wanted to see where visitors come from, without an analytics subscription and without collecting personal data.",
    approach:
      "Next.js 16 and React 19 render every page on the server, with structured data and a sitemap for search. The contact form is checked with Zod in the browser and again on the server. Page views go to Upstash Redis through a small tracking route that stores no IP addresses, and the owner reads them on a dashboard behind a passcode.",
    features: [
      { title: "Services and process", detail: "Ten services, each with what's included and a way to enquire, plus a five-step onboarding process, compliance standards and an FAQ." },
      { title: "Guides for landlords abroad", detail: "Six in-depth guides, with structured data, a sitemap and social images." },
      { title: "Enquiries", detail: "A contact form checked in the browser and on the server, with an automatic reply, and WhatsApp and phone on every page." },
      { title: "Private analytics", detail: "An owner dashboard of views, visitors, countries, pages, devices and sources, with no IP addresses stored." },
      { title: "Consent", detail: "A cookie choice that stops page-view tracking entirely when declined, and support for reduced motion." },
    ],
    results:
      "Bevy Irie is a client project. The live demo runs a separate copy: the website and the owner dashboard, which starts with two weeks of sample visits, and a contact form that checks every field but sends nothing. The 2-minute video above walks through both.",
  },
  "steamblast-arena": {
    overview:
      "A multiplayer web game for children aged 5 to 12. Players move through a maze and spray water to turn each other into steam, and a steamed player answers a maths or literacy question to get back in.",
    problem:
      "Revision drills feel like homework, and most learning games are single-player quizzes with a game skin. The client wanted a multiplayer game children want to play, where answering questions is the way back into the action, with premium extras for families and class tools for schools in Hong Kong.",
    approach:
      "The game runs in Phaser 3 inside a React 18 shell and installs as a PWA. Each match runs on a Node.js server over Socket.IO, ten times a second, so every screen sees the same game and the browser only sends inputs. Sequelize keeps accounts, classes, questions and results, and an admin panel manages the question banks.",
    features: [
      { title: "Real-time matches", detail: "2–8 players per match, run on the server so every screen agrees." },
      { title: "The Chamber", detail: "A steamed player answers a question at their level to respawn, with a shield, a speed bonus for quick answers and streaks." },
      { title: "Bots", detail: "Bots fill the match when nobody else is online: they dodge water, chase power-ups and line up their shots." },
      { title: "Question banks", detail: "Maths and literacy for ages 5–7, 7–9 and 9–12, managed in the admin panel." },
      { title: "Teachers and parents", detail: "Classes with join codes and per-student accuracy, and a parent portal with recent games and a daily time limit the server enforces." },
      { title: "Premium", detail: "Extra water, a custom avatar and a weekly cosmetics shop paid for with coins earned in play." },
    ],
    results:
      "SteamBlast Arena is a client project. The live demo runs a separate copy where anyone can press Play and battle bots straight away, with payments and email switched off. The 2½-minute video above shows a round, the Chamber, the shop, the parent portal, the teacher dashboard and the admin panel.",
  },
  "expertprofile-ai": {
    overview:
      "An editorial website that publishes lists of verified experts in fintech, crypto, technology and AI visibility, run entirely from a no-code CMS.",
    problem:
      "When people ask an AI assistant or a search engine who the experts are on a topic, the answer depends on what public sources say, and those are often thin, outdated or wrong. Experts have no trustworthy, well-structured page that vouches for them, and the editorial team needs to publish and maintain one without a developer.",
    approach:
      "Next.js 16 generates the pages ahead of time and refreshes each one the moment an editor publishes, so readers get static pages and editors see their change within seconds. Supabase holds the content, sign-in and images, with row-level security on every table, and each article carries JSON-LD and a sitemap entry.",
    features: [
      { title: "Recognition articles", detail: "One template: topic, date, geography, introduction, 8–15 expert cards and the methodology." },
      { title: "Expert cards", detail: "Role, organisation, reason for inclusion, public links and the date the information was checked." },
      { title: "Expert Hub", detail: "Category tabs with counts, featured people and search." },
      { title: "Requests", detail: "AI Profile Audit requests, nominations and corrections land in the editors' inbox." },
      { title: "No-code CMS", detail: "Articles, experts, categories, events, pages, the inbox, newsletter subscribers and team roles." },
    ],
    results:
      "ExpertProfile.AI is a client project. The live demo runs a separate copy with sample experts and articles: publish the draft list in the CMS and it appears on the site within seconds. The 2½-minute video above walks through the website and the CMS.",
  },
  solnotary: {
    overview:
      "A web app that proves what someone knew, and when. It seals a text by writing only its hash to Solana, then publishes the text for an exact crypto payment, on a page anyone can verify.",
    problem:
      "Predictions, sealed bids and ideas are only worth something if you can prove later that they came first, without giving them away early. Screenshots and emails can be faked, and posting the text publicly reveals it. The client wanted a commitment that a public blockchain can vouch for, fast and cheap, with publishing as the paid step.",
    approach:
      "Next.js 16 with Solana web3.js. Sign-in is a wallet signature checked on the server. The server hashes the text, a live BTC, ETH and SOL price snapshot and a secret salt with SHA-256 and writes only the hash to Solana as a memo transaction. Supabase keeps the records behind row-level security, so a sealed text can't be read with the public key.",
    features: [
      { title: "Wallet sign-in", detail: "A one-time challenge signed by the wallet and checked with ed25519; no passwords or email." },
      { title: "Sealed on-chain", detail: "Only the hash goes on Solana, as a memo transaction confirmed in seconds." },
      { title: "Paid reveal", detail: "An exact payment in SOL, USDC or USDT with a reference memo publishes the text." },
      { title: "Verify in the browser", detail: "Public pages reveal the text and salt and recompute the hash in the visitor's own browser." },
      { title: "Admin overview", detail: "Every record and payment, read-only, without ever showing sealed text." },
    ],
    results:
      "SolNotary is a client project. The live demo runs on Solana devnet: every transaction is real and opens in Solana Explorer, but it uses test SOL with no value. A hash on a blockchain shows a text existed at a time; it is not a legal notarization. The 2-minute video above shows a verified record, a new notarization and the admin overview.",
  },
  gentler: {
    overview:
      "A small, calm web app for adults: three short lessons anyone can read, and a private journal that saves itself as you type.",
    problem:
      "Most wellbeing apps push streaks, reminders and progress bars, and many quietly track what people write. Someone who just wants a quiet place to read a little and write privately ends up with another app that nags them and doesn't feel private.",
    approach:
      "Next.js 16 and React 19 over Supabase Auth and Postgres. Row-level security means each entry can only ever be read by the person who wrote it, and every save carries a revision number, so an entry changed in another tab is flagged instead of overwritten. There is no admin console, by design.",
    features: [
      { title: "Open lessons", detail: "Three short lessons, each with a teaching, one small optional action, its sources and reflection prompts." },
      { title: "Honest autosave", detail: "The journal saves as you type and only says Saved once the server has confirmed it." },
      { title: "No lost edits", detail: "Revision numbers flag an entry changed in another tab instead of overwriting it." },
      { title: "Yours to keep or delete", detail: "Export everything as one .txt file, or delete the account with every entry." },
      { title: "Calm by design", detail: "No timers, streaks, reminders or tracking; larger text, reduced motion and an evening theme." },
    ],
    results:
      "GentleR is a client project, and not a medical or therapy product. The live demo runs a separate copy: the lessons are open to anyone, and the live demo page lists shared journal accounts. The 2-minute video above shows a lesson, autosave, the journal, display settings and the account page.",
  },
  "royal-malt": {
    overview:
      "A one-page launch site for Royal Malt Vanilla, an alcohol-free malt drink, written for customers and for the trade buyers who might distribute it.",
    problem:
      "A new drink brand needed a launch site that felt as premium as its packaging, spoke to consumers and trade buyers alike, and could run on the client's existing cPanel shared hosting, which has no Node.js.",
    approach:
      "Built with TanStack Start and React 19, then prerendered to plain HTML with a sitemap, a social preview image and cache rules, so it runs on any shared host with no server runtime. Tailwind CSS v4 handles the layouts from phones to wide screens.",
    features: [
      { title: "Film-first opening", detail: "A video intro, a launch hero with the campaign poster and a short brand film." },
      { title: "Quick-scan story", detail: "The brand story, its benefits, six ingredients and lifestyle moments." },
      { title: "For the trade", detail: "Trade specifications and a gallery of the can, shrink pack and retail carton." },
      { title: "Enquiries", detail: "A partnership enquiry form and a newsletter signup that validate and confirm on the page." },
      { title: "Runs anywhere", detail: "Prerendered to static files, so it needs nothing but a web host." },
    ],
    results:
      "Royal Malt is a client project. The live demo runs a separate copy where the forms validate and confirm but send nothing. The 1½-minute video above walks through the film intro, the product story, the trade specs and a partnership enquiry.",
  },
  "mint-choc-media": {
    overview:
      "A one-page site for Mint Choc Media, a London social-first creative studio that pairs creative (the mint) with strategy (the choc), built so every section leads towards a campaign brief.",
    problem:
      "The studio needed a site as bold as its brand: playful but credible, quick to read on a phone, and set in its own typefaces. Every section had to lead a visitor towards sending a brief.",
    approach:
      "React 18 on Vite, with Tailwind CSS v4 and Motion for the animation. The brand's Aileron and Dunbar typefaces are self-hosted, so the headings render in the brand's own type on every device, and the layouts hold from phones to wide screens with no sideways scroll.",
    features: [
      { title: "Hero", detail: "Floating campaign cards and a scroll progress bar in the brand green." },
      { title: "Services as flavours", detail: "Four services, each with what's included." },
      { title: "Proof", detail: "The founder, a rolling campaign reel and results that count up as they come into view." },
      { title: "Client quotes", detail: "Rotating quotes with dot controls." },
      { title: "Brief form", detail: "Validates, confirms on the page and clears itself for the next one." },
    ],
    results:
      "Mint Choc Media is a client project. The live demo runs a separate copy where the brief form validates and confirms but sends nothing; the results and quotes on it are the studio's own content. The 1¼-minute video above walks through the page.",
  },
  "cad-interior-studio": {
    overview:
      "A proof of concept for an interior-design and quotation platform: an architect's IFC or GLB file becomes a 3D building in the browser, room by room, that customers walk through and furnish from a real product catalog.",
    problem:
      "Home buyers struggle to picture a space from drawings, and design firms lose time turning ideas into quotes. The client wanted customers to design their own interiors in 3D from the real building files, with every item a catalog product a quotation can be built from, and AI used for inspiration without ever passing a picture off as something you can buy.",
    approach:
      "Next.js 15 and React 19 with React Three Fiber on three.js. web-ifc, compiled to WebAssembly, parses the building file in the browser and splits it into rooms, so the file is never uploaded. Zustand holds the design, and zundo gives it undo and redo.",
    features: [
      { title: "From CAD to rooms", detail: "IFC and GLB files parsed in the browser and split into rooms." },
      { title: "Walk through it", detail: "An orbit view and an eye-height walkthrough with the keyboard." },
      { title: "Furnish from the catalog", detail: "Click-and-place catalog furniture with collision checks, drag, rotate, floor and wall finishes, undo and redo." },
      { title: "AI kept apart", detail: "Style concepts sit apart from the buildable design and are labelled as inspiration." },
      { title: "Auto-style", detail: "Refurnishes a room using only catalog products, as a single undo step." },
      { title: "Before and after", detail: "A before-and-after result with a 2× export, and designs saved in the browser." },
    ],
    results:
      "This is a proof of concept built for a client, not a live product: it has no database and no logins. The live demo opens on a sample apartment and can load a real IFC file; it has no AI keys, so its concept images are labelled demo renders. The 1½-minute video above shows furnishing, concepts, auto-style and a walkthrough.",
  },
  // DevoraX client work (the owner's answer, 11 Nov 2026).
  triagely: {
    overview:
      "A tool for a small online store: it reads an export of customer messages, sorts each one, drafts a reply in the store's own voice and scores the wholesale enquiries. Nothing is ever sent.",
    problem:
      "A small store's inbox mixes order questions, returns, complaints and the occasional bulk buyer, and the owner answers every one by hand. The valuable wholesale enquiries get buried, and an AI that replies on its own can promise a refund or claim an order has shipped when it hasn't.",
    approach:
      "A Python script sends each message to Google Gemini with the store's policy and sample replies, and gets back a category, a priority, the customer's mood, any quantity and company, and a draft. The script then decides: it checks the quantity and company are really in the message, scores leads by the owner's thresholds and tests every draft against the policy, before writing a review page and a CSV.",
    features: [
      { title: "Six categories, one priority", detail: "Order status, returns, product question, wholesale, complaint or other, each with a high, normal or low priority." },
      { title: "Drafts in the store's voice", detail: "Written from a one-page policy and a few of the owner's own replies." },
      { title: "Wholesale lead scoring", detail: "Hot, warm or cold by the owner's thresholds; a quantity or company the message doesn't contain is ignored." },
      { title: "Rules that run in code", detail: "Refunds, angry customers, claimed order statuses, promises and quoted prices are flagged “check before sending”." },
      { title: "Review page and CSV", detail: "A wholesale-only view and a copy button on every draft, with everything also saved to a CSV." },
    ],
    results:
      "Triagely is DevoraX client work. The live demo shows the review page from one real run on 30 fictional messages, with a demo-only panel for trying the scoring rules; it makes no AI calls. The 2-minute video above walks through the safety rules, the review page, the wholesale view and the sample output.",
  },
  // DevoraX client work (the owner's answer, 11 Nov 2026).
  tallyfile: {
    overview:
      "A tool for a bookkeeper: it reads a folder of PDF invoices and writes one CSV for Excel. The AI reads each invoice, and plain code checks every number before it reaches the books.",
    problem:
      "Typing invoices into a spreadsheet is slow, and every vendor lays its invoices out differently, so template tools keep breaking. An AI can read any layout, but a bookkeeper can't let it guess, round or quietly correct a number that ends up in the books.",
    approach:
      "A Python script pulls the text out of each PDF with pypdf and asks Google Gemini for eight fields as structured data, with the AI told to leave a field empty rather than guess. Five checks then run in plain code, and every invoice comes out as one CSV row, ok or needs review with the reason, plus a log of every file.",
    features: [
      { title: "Any layout, no templates", detail: "The AI reads the text of each PDF, so a new vendor needs no setup." },
      { title: "The code does the maths", detail: "Subtotal plus tax must equal the total, calculated by the script and never by the AI." },
      { title: "Nothing invented", detail: "Every amount and date must be printed on the invoice; tax may be the sum of up to three printed tax lines, such as GST and PST." },
      { title: "Nothing missing", detail: "All eight fields, real dates, a three-letter currency, and a due date that isn't before the invoice date." },
      { title: "Scans skipped, never guessed", detail: "PDFs with no text are logged for manual entry, and an AI outage is logged so the run can be repeated." },
    ],
    results:
      "Tallyfile is DevoraX client work. The live demo is a real run on seven fictional invoices, four that pass, two that need review and a skipped scan, with the same checks running in the browser; it makes no AI calls. The 2-minute video above shows Pioneer Concrete's total that doesn't add up, and the fix the checker refuses.",
  },
  // DevoraX client work, credited under the owner's standing instruction of 11 Nov 2026.
  learnhub: {
    overview:
      "A subscription learning platform where three paid tiers unlock video courses and a library of handbooks, audio sessions and e-books, with an admin console to run it.",
    problem:
      "Selling courses by tier means every lesson, video and file has to check the learner's plan, and the checks must hold even if someone calls the API or the storage directly. Learners expect to resume mid-video, and the business needs to manage plans without a developer.",
    approach:
      "Next.js 16 on Supabase: Postgres with row-level security on every table, Supabase Auth, and a private Storage bucket. The server checks the plan before it signs a short-lived link to any video or file. Stripe checkout and webhooks are built in; the demo runs with Stripe switched off.",
    features: [
      { title: "Tiers and previews", detail: "Each tier includes the one below; preview lessons are open to anyone signed in." },
      { title: "Private media", detail: "Videos and files served through signed links only after the plan check." },
      { title: "Lesson player", detail: "Resumes where you stopped, saves progress, completes at 90% and keeps timestamped notes." },
      { title: "Admin console", detail: "Learner and plan counts, filters, single and bulk plan grants, roles and publishing." },
      { title: "Audit log", detail: "Every admin change, who made it, for whom and when." },
    ],
    results:
      "The live demo runs on sample courses and learners with one-click logins for a Pro learner and a demo admin. The 2-minute video above walks through both sides.",
  },
  linguabridge: {
    overview:
      "A one-page marketing website for a translation agency under the LinguaBridge brand, built so every path through the page ends at a quote request.",
    problem:
      "People buying translation compare agencies quickly and leave when the price or the next step is unclear. The page had to show the services, the process and the price up front, and make asking for a quote the obvious next move.",
    approach:
      "Next.js 16 and React 19 in TypeScript, with Tailwind CSS and Framer Motion for the animation, served as static pages. The service cards talk to the quote form through a browser event, so choosing a service anywhere on the page fills it in on the form.",
    features: [
      { title: "Hero", detail: "A typed promise line and greetings in eight languages orbiting a globe." },
      { title: "Services", detail: "Six service cards; each Learn More opens the quote form with that service selected." },
      { title: "Process and pricing", detail: "Four steps on one line and per-word pricing, with the popular plan lifted forward." },
      { title: "Proof", detail: "A testimonials marquee, counters that climb into view and a drifting language list." },
      { title: "Quote form", detail: "Language pair, service, details and file attachments, checked before it confirms." },
    ],
    results:
      "The live demo runs the whole site; its quote form and newsletter send nothing, and the confirmation says so. The 1½-minute video above walks through the page.",
  },
  biscuit: {
    overview:
      "A chat assistant for a dog-grooming salon's website. Biscuit answers customers' questions from the salon's own FAQ, and points to the salon's email when it doesn't know.",
    problem:
      "A small salon gets the same questions all day, about prices, vaccines and walk-ins, and misses them in the evening. A general chatbot would happily invent a price or a policy, which is worse than no answer at all.",
    approach:
      "The widget calls a Vercel function, which sends the whole FAQ to Google Gemini with strict instructions: repeat the salon's details exactly, and reply with a fixed marker when the FAQ has no answer. The function turns that marker into a polite note with the salon's email, so an unknown question never becomes a guess.",
    features: [
      { title: "Answers from the FAQ", detail: "Gemini is told to repeat the salon's prices and policies exactly as the FAQ states them." },
      { title: "A polite “not sure”", detail: "When the FAQ doesn't cover a question, the code swaps in a short note with the salon's email." },
      { title: "Key on the server", detail: "A Vercel function holds the AI key, limits each visitor's rate and falls back to a second model when Gemini is busy." },
      { title: "Owner-editable FAQ", detail: "The FAQ and settings live in a Supabase table, and the site's FAQ page reads the same data." },
      { title: "One-line embed", detail: "A script tag for Wix, as a floating bubble or inline, with a full-screen chat on phones." },
    ],
    results:
      "Biscuit is DevoraX client work, built for a salon's Wix website. The live demo runs it on Sudsy Paws, a fictional salon; every answer there is a real Gemini call. The 1½-minute video above shows a price answer, a polite refusal and the FAQ page handing a question to Biscuit.",
  },
};
