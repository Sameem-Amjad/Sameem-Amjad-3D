/* Turns a resolved SEO object into a flat list of tag descriptors.
   One list, two renderers: scripts/prerender.mjs serialises it to HTML at
   build time, <Seo> applies it to document.head on client navigation. */

import { SITE_NAME } from "../constants/seo";

export const headTagsFor = (seo) => {
  const tags = [
    { tag: "meta", key: "name:description", attrs: { name: "description", content: seo.description } },
    { tag: "meta", key: "name:robots", attrs: { name: "robots", content: seo.robots } },
    { tag: "link", key: "rel:canonical", attrs: { rel: "canonical", href: seo.canonical } },

    { tag: "meta", key: "prop:og:type", attrs: { property: "og:type", content: seo.type } },
    { tag: "meta", key: "prop:og:site_name", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", key: "prop:og:title", attrs: { property: "og:title", content: seo.title } },
    { tag: "meta", key: "prop:og:description", attrs: { property: "og:description", content: seo.description } },
    { tag: "meta", key: "prop:og:url", attrs: { property: "og:url", content: seo.canonical } },
    { tag: "meta", key: "prop:og:image", attrs: { property: "og:image", content: seo.image } },
    { tag: "meta", key: "prop:og:image:alt", attrs: { property: "og:image:alt", content: seo.title } },
    { tag: "meta", key: "prop:og:locale", attrs: { property: "og:locale", content: "en_US" } },

    // X/Twitter ignores og:* for card type, so these are not redundant.
    { tag: "meta", key: "name:twitter:card", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", key: "name:twitter:title", attrs: { name: "twitter:title", content: seo.title } },
    { tag: "meta", key: "name:twitter:description", attrs: { name: "twitter:description", content: seo.description } },
    { tag: "meta", key: "name:twitter:image", attrs: { name: "twitter:image", content: seo.image } },
  ];

  if (seo.graph?.length) {
    tags.push({
      tag: "script",
      key: "jsonld",
      attrs: { type: "application/ld+json" },
      html: JSON.stringify({ "@context": "https://schema.org", "@graph": seo.graph }),
    });
  }

  return tags.filter((t) => t.html || Object.values(t.attrs).every(Boolean));
};

const escapeAttr = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* JSON-LD sits in a <script>, so the only sequence that can break out of it
   is a literal "</script>" inside a string value. */
const escapeJsonLd = (json) => json.replace(/</g, "\\u003c");

/* `data-seo` is what makes the two renderers cooperate: every managed tag
   carries its key, so <Seo> can swap the prerendered head for the next
   route's without ever leaving a duplicate or a stale tag behind. */
export const headTagsToHtml = (seo, { indent = "    " } = {}) =>
  [
    `${indent}<title>${escapeAttr(seo.title)}</title>`,
    ...headTagsFor(seo).map(({ tag, key, attrs, html }) => {
      const a = Object.entries({ ...attrs, "data-seo": key })
        .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
        .join(" ");
      return html
        ? `${indent}<${tag} ${a}>${escapeJsonLd(html)}</${tag}>`
        : `${indent}<${tag} ${a} />`;
    }),
  ].join("\n");
