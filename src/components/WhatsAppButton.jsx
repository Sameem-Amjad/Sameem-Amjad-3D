import { useLocation } from "react-router-dom";
import { whatsappHref } from "../constants";
import { seoForPath } from "../constants/seo";
import { Icon } from "./shared";
import { track } from "../utils/analytics";

/* The floating "chat on WhatsApp" button, on every page.

   Server-rendered on purpose: it is a plain link with nothing
   visitor-specific in it (the route is known at prerender time), so it
   hydrates cleanly and works before the bundle arrives. The entrance is a
   CSS keyframe for the same reason the hero's is — a framer-motion
   `initial` would ship it as opacity:0 until hydration.

   WhatsApp green rather than the site's acid: the colour is most of what
   makes the button recognisable at a glance, and a lead who has to work
   out what the round thing in the corner is will not tap it. Dark glyph
   and label, not WhatsApp's usual white: white on #25D366 is 1.98:1,
   under both WCAG minimums; near-black is about 10:1.

   The label only unfolds on hover-capable screens; on a phone the glyph
   alone is the convention, and a pill would cover content. */
const WhatsAppButton = () => {
  const { pathname } = useLocation();
  // An unknown URL is prerendered once, as /__not-found__, and served for
  // every bad path; the server's href survives hydration. Name the homepage
  // in the message there, so both sides agree and a lead never sends
  // "I found you on sameemamjad.com/__not-found__".
  const page = seoForPath(pathname).canonical ? pathname : "/";

  return (
    <a
      href={whatsappHref(page)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Sameem"
      data-cursor="button"
      onClick={() => track("whatsapp_click", { placement: "floating", page_path: pathname })}
      style={{ animationDelay: "0.9s" }}
      className="anim-pop group fixed bottom-5 right-5 z-40 flex h-14 items-center rounded-full bg-[#25D366] pl-4 pr-4 text-night shadow-[0_12px_40px_-10px_rgba(37,211,102,0.65)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-10px_rgba(37,211,102,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6"
    >
      <Icon name="whatsapp" className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[12px] font-semibold uppercase tracking-wider opacity-0 transition-all duration-300 [@media(hover:hover)]:group-hover:ml-2.5 [@media(hover:hover)]:group-hover:max-w-[12rem] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:ml-2.5 [@media(hover:hover)]:group-focus-visible:max-w-[12rem] [@media(hover:hover)]:group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
