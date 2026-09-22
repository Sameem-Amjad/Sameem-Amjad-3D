/* Google Analytics 4, loaded from the bundle rather than pasted into
   index.html.
 *
 * Google's stock snippet is an inline <script>. The CSP in vercel.json only
 * allows inline scripts by sha256, so the browser would block it — and the
 * hash would change every time Google tweaks the snippet. Creating the tag
 * from JS at runtime sidesteps that, and also leaves the prerendered HTML
 * untouched, so hydration has nothing new to reconcile.
 *
 * Page views on client-side navigation come from GA4's Enhanced measurement
 * ("page changes based on browser history events"), which is on by default
 * for the data stream. No manual page_view hook is needed.
 *
 * The ID is a VITE_ var and so ships to the browser. That is fine — a GA
 * measurement ID is public by design; abuse is limited in the GA console
 * (Admin → Data streams → Configure tag → Referral / unwanted-referrals). */

const id = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initAnalytics = () => {
  // Skip in dev and in builds without an ID so local testing never pollutes
  // production data.
  if (!id || !import.meta.env.PROD || typeof window === "undefined") return;

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
};

/* Fire a custom event. A no-op when GA never loaded (dev, blocked by an ad
   blocker, no ID), so call sites never need to guard. */
export const track = (name, params) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};

/* True when analytics is active in this build — the notice uses it so nothing
   is shown where nothing is measured. */
export const analyticsEnabled = Boolean(id) && import.meta.env.PROD;
