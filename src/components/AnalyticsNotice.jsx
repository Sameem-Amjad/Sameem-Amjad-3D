import { useEffect, useState } from "react";
import {
  analyticsEnabled,
  clarityEnabled,
  gaEnabled,
  onOpenPrivacyChoices,
  readConsent,
  setConsent,
} from "../utils/analytics";

/* The analytics consent banner: Accept or Decline, equally easy.
 *
 * Both tools load either way; the answer decides whether they may use
 * cookies. Declining keeps measurement cookie-free (each page view stands
 * alone) and clears any analytics cookies already set. What happens before
 * an answer depends on the visitor's region — see the top of
 * utils/analytics.js. The footer's "Privacy choices" link reopens this.
 *
 * Renders nothing until after mount. The prerendered HTML must not contain
 * it — the visitor's answer lives in localStorage, which the prerenderer
 * cannot see, so putting it in the markup would make hydration disagree with
 * the server output for anyone who has already answered. */

const tools = [gaEnabled && "Google Analytics", clarityEnabled && "Microsoft Clarity"]
  .filter(Boolean)
  .join(" and ");

const choiceButton =
  "rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-acid hover:text-acid";

const AnalyticsNotice = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return undefined;
    if (readConsent() === null) setShow(true);
    return onOpenPrivacyChoices(() => setShow(true));
  }, []);

  const choose = (state) => {
    setConsent(state);
    setShow(false);
  };

  if (!show) return null;

  /* The right inset leaves the corner to the WhatsApp button on narrow
     screens. From md up the banner is centred and clears the resting
     button; the button's hover label can overlap it, and paints on top
     because App renders the button after this. */
  return (
    <div
      role="region"
      aria-label="Privacy choices"
      className="fixed bottom-4 left-4 right-20 z-40 mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-line bg-base-2/95 px-5 py-4 text-[13px] leading-snug text-muted shadow-2xl backdrop-blur sm:bottom-6 sm:left-6 sm:right-24 sm:flex-row sm:items-center sm:gap-4 md:inset-x-6"
    >
      <p className="flex-1">
        This site uses {tools} to see how visitors use it: pages, clicks and
        scrolling. Accept to allow their cookies; decline and each page view is
        counted without them. No ads, and nothing you type into a form is
        recorded.
      </p>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={() => choose("denied")} data-cursor="button" className={choiceButton}>
          Decline
        </button>
        <button type="button" onClick={() => choose("granted")} data-cursor="button" className={choiceButton}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default AnalyticsNotice;
