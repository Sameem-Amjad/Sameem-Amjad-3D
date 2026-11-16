// ─────────────────────────────────────────────────────────────
//  The pages on thedevorax.tech that own each offer. thedevorax.tech owns
//  every offer and landing page; this site keeps the portfolio, the guides
//  and the personal pages, and links across to these.
//
//  Every link to an offer, anywhere on this site, comes from this file, so a
//  URL can be corrected in one place. The URLs are written out in full, not
//  built from DEVORAX_URL: `npm run check:links` reads source text, and a built
//  string would never be tested. Link straight at these URLs: never at
//  a /services path on this site that redirects (vercel.json redirects the
//  three old service pages here, for people arriving from elsewhere).
//
//  `name`    anchor text for a list of links (DevoraX's own label for the page)
//  `phrase`  anchor text inside a sentence, descriptive of what the page covers
//
//  Plain data with no imports, so vite.config.js can read it in Node.
// ─────────────────────────────────────────────────────────────

export const DEVORAX_URL = "https://thedevorax.tech";

export const doors = {
  // AI-built app to the App Store and Google Play.
  lovable: {
    url: "https://thedevorax.tech/solutions/lovable-app-to-app-store",
    name: "Lovable App to the App Store",
    phrase: "taking an AI-built app to the App Store and Google Play",
  },
  // Vibe code audit, then fix and finish.
  audit: {
    url: "https://thedevorax.tech/solutions/fix-vibe-coded-app",
    name: "Vibe Code Audit",
    phrase: "the vibe code audit and the fix that follows it",
  },
  // The same page, at its payments section.
  "audit-payments": {
    url: "https://thedevorax.tech/solutions/fix-vibe-coded-app#payments",
    name: "Vibe Code Audit: payments",
    phrase: "fixing payments in an AI-built app",
  },
  // Sharetribe custom code and the native app.
  sharetribe: {
    url: "https://thedevorax.tech/solutions/sharetribe-developers",
    name: "Sharetribe Developers",
    phrase: "Sharetribe custom code and a native iOS and Android app",
  },
  // The marketplace hub: new marketplace builds.
  marketplace: {
    url: "https://thedevorax.tech/solutions/multi-vendor-marketplace-development",
    name: "Multi-Vendor Marketplace Development",
    phrase: "multi-vendor marketplace development",
  },
};

// Not a door: the self-check page, linked from the home page and the guides hub.
export const checklist = {
  url: "https://thedevorax.tech/insights/vibe-coded-app-security-checklist",
  name: "Vibe-coded app security checklist",
  investor: {
    url: "https://thedevorax.tech/insights/vibe-coded-app-security-checklist#investor-due-diligence",
    phrase: "the investor due diligence section of the vibe-coded app security checklist",
  },
};

// Services and prices, and booking, live on thedevorax.tech too.
export const devoraxPages = {
  services: "https://thedevorax.tech/services",
  pricing: "https://thedevorax.tech/pricing",
  book: "https://thedevorax.tech/book",
};
