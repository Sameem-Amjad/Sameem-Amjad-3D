import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoForPath } from "../constants/seo";
import { headTagsFor } from "../utils/head";

/* Keeps <head> in step with the route.

   Every page is prerendered with its own head (see scripts/prerender.mjs),
   so a crawler that never runs JS already gets the right tags. This handles
   the other half: once React takes over, client-side navigation changes the
   URL without a document load, and the head would otherwise stay frozen on
   whichever page the visitor happened to land on first.

   Managed tags are the ones carrying `data-seo` — the prerenderer stamps the
   same keys, so the first pass adopts the static head rather than duplicating
   it. */
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoForPath(pathname);
    document.title = seo.title;

    const seen = new Set();

    for (const { tag, key, attrs, html } of headTagsFor(seo)) {
      seen.add(key);
      let el = document.head.querySelector(`[data-seo="${key}"]`);

      // A tag can change element type between routes only in theory, but
      // replacing on mismatch is cheaper than reasoning about it.
      if (el && el.tagName.toLowerCase() !== tag) {
        el.remove();
        el = null;
      }
      if (!el) {
        el = document.createElement(tag);
        el.setAttribute("data-seo", key);
        document.head.appendChild(el);
      }

      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      if (html !== undefined) el.textContent = html;
    }

    for (const el of document.head.querySelectorAll("[data-seo]")) {
      if (!seen.has(el.getAttribute("data-seo"))) el.remove();
    }
  }, [pathname]);

  return null;
};

export default Seo;
