/* Google Analytics 4 and Microsoft Clarity, loaded from the bundle rather
   than pasted into index.html.
 *
 * Both vendors' stock snippets are inline <script>s. The CSP in vercel.json
 * only allows inline scripts by sha256, so the browser would block them — and
 * the hash would change every time a vendor tweaks its snippet. Creating the
 * tags from JS at runtime sidesteps that, and also leaves the prerendered HTML
 * untouched, so hydration has nothing new to reconcile.
 *
 * Page views on client-side navigation come from GA4's Enhanced measurement
 * ("page changes based on browser history events"), which is on by default
 * for the data stream, and Clarity follows history changes on its own. No
 * manual page_view hook is needed.
 *
 * The IDs are VITE_ vars and so ship to the browser. That is fine — both are
 * public by design. GA abuse is limited in the GA console (Admin → Data
 * streams → Configure tag → Referral / unwanted-referrals).
 *
 * Consent (the banner in AnalyticsNotice.jsx):
 * - EEA, UK and Switzerland: no analytics cookies until the visitor accepts.
 *   Clarity behaves that way there on its own; GA gets a region default
 *   below. Both still measure cookie-free, each page view on its own.
 * - Everywhere else: cookies on, unless the visitor declines.
 * - Ad storage is always denied: in GA's defaults, and in every choice sent
 *   to Clarity. The site runs no ads.
 * A stored choice is re-sent on every page load, ahead of each tag's first
 * hit. */

const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;

// EU-27 + Iceland, Liechtenstein, Norway, + UK and Switzerland.
const OPT_IN_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
  "GB", "CH",
];

const CONSENT_KEY = "analytics-consent";
// Ask again after six months, so an old answer is not treated as permanent.
const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 182;
const OPEN_EVENT = "privacy-choices:open";

/* "granted" | "denied" | null (never asked, expired, or storage blocked). */
export const readConsent = () => {
  try {
    const { v, t } = JSON.parse(window.localStorage.getItem(CONSENT_KEY)) || {};
    if ((v === "granted" || v === "denied") && Date.now() - t < CONSENT_MAX_AGE) return v;
  } catch {
    /* blocked storage or a malformed value: treat as unanswered */
  }
  return null;
};

// GA's cookies (_ga, _ga_<stream>) and Clarity's first-party ones (_clck,
// _clsk). Clarity drops its own on a denial too, but only from the next page
// load; this clears them at the moment of the click.
const clearAnalyticsCookies = () => {
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^_(ga|clck|clsk)/.test(name)) continue;
    for (const d of ["", `; domain=${domain}`, `; domain=.${domain}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${d}`;
    }
  }
};

const sendConsent = (state) => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: state });
  }
  if (typeof window.clarity === "function") {
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: state });
  }
  if (state === "denied") clearAnalyticsCookies();
};

/* Called by the banner. Remembers the answer and tells both tools now. */
export const setConsent = (state) => {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: state, t: Date.now() }));
  } catch {
    /* not remembered: the banner returns next visit, which is the safe side */
  }
  sendConsent(state);
};

/* The footer's "Privacy choices" link. The banner listens for this. */
export const openPrivacyChoices = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onOpenPrivacyChoices = (fn) => {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
};

export const initAnalytics = () => {
  // Skip in dev and in builds without an ID so local testing never pollutes
  // production data.
  if (!import.meta.env.PROD || typeof window === "undefined") return;

  const stored = readConsent();

  if (id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    // Defaults must be queued before "config" so the first hit obeys them.
    // The more specific region entry wins over the global one.
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    window.gtag("consent", "default", { analytics_storage: "denied", region: OPT_IN_REGIONS });
    if (stored) window.gtag("consent", "update", { analytics_storage: stored });
    window.gtag("js", new Date());
    window.gtag("config", id);

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }

  if (clarityId) {
    // Clarity's own stub: queue calls until the tag arrives and drains them.
    window.clarity =
      window.clarity ||
      function clarity() {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
    if (stored) window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: stored });

    const c = document.createElement("script");
    c.async = true;
    c.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
    document.head.appendChild(c);
  }
};

/* Fire a custom event: a GA event, and a Clarity event of the same name so
   recordings can be filtered to the visitors who did it. A no-op for any tool
   that never loaded (dev, blocked by an ad blocker, no ID), so call sites
   never need to guard. */
export const track = (name, params) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  if (typeof window.clarity === "function") window.clarity("event", name);
};

/* Which tools are active in this build — the notice uses these so it names
   only what is really measuring, and shows nothing where nothing is. */
export const gaEnabled = Boolean(id) && import.meta.env.PROD;
export const clarityEnabled = Boolean(clarityId) && import.meta.env.PROD;
export const analyticsEnabled = gaEnabled || clarityEnabled;

/* "Book a call" links live in a dozen components (hero, nav, services,
   FAQ, footer, every case study and service page). One delegated listener
   counts them all as `book_call_click`, rather than threading an onClick
   through each. Mark it as a key event in GA alongside contact_submit and
   whatsapp_click (which the WhatsApp links fire themselves). */
export const initLeadTracking = (bookingUrl) => {
  if (!bookingUrl || typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (a && a.href.startsWith(bookingUrl)) {
        track("book_call_click", { page_path: window.location.pathname });
      }
    },
    { capture: true }
  );
};
