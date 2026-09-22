import { useEffect, useState } from "react";
import { analyticsEnabled } from "../utils/analytics";

/* A one-line notice that the site uses Google Analytics.
 *
 * It is a notice, not a consent gate: GA4 does not store IP addresses and the
 * site expects little EU traffic, so a dismissable line is proportionate. If
 * that changes, swap the dismiss for a real accept/decline and only call
 * initAnalytics() on accept.
 *
 * Renders nothing until after mount. The prerendered HTML must not contain
 * it — the visitor's dismissal lives in localStorage, which the prerenderer
 * cannot see, so putting it in the markup would make hydration disagree with
 * the server output for anyone who has already dismissed it. */

const KEY = "ga-notice-dismissed";

const AnalyticsNotice = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    try {
      if (window.localStorage.getItem(KEY) !== "1") setShow(true);
    } catch {
      /* private mode / storage blocked: show it, it will just return next visit */
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* nothing to do — the notice simply reappears next visit */
    }
  };

  if (!show) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center gap-4 rounded-2xl border border-line bg-base-2/95 px-5 py-3.5 text-[13px] leading-snug text-muted shadow-2xl backdrop-blur sm:inset-x-6 sm:bottom-6"
    >
      <p className="flex-1">
        This site uses Google Analytics to count visits. No ads, no
        cross-site tracking — just page views.
      </p>
      <button
        type="button"
        onClick={dismiss}
        data-cursor="button"
        className="shrink-0 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-acid hover:text-acid"
      >
        OK
      </button>
    </div>
  );
};

export default AnalyticsNotice;
