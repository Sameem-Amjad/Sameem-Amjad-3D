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
 * Clarity and consent: for visitors from the EEA, UK and Switzerland, Clarity
 * sets no cookies until it gets a consent signal, which this site never sends.
 * Those visits are still recorded, but every page view counts as its own
 * session. Everyone else gets full sessions. */

const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;

export const initAnalytics = () => {
  // Skip in dev and in builds without an ID so local testing never pollutes
  // production data.
  if (!import.meta.env.PROD || typeof window === "undefined") return;

  if (id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
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
