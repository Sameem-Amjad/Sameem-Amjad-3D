/* Supabase Storage serves the raw upload from /object/public/ — the project
   PNGs behind these URLs are 1.7–6.5 MB each, ~48 MB across the site. The
   /render/image/public/ endpoint resizes on the fly and negotiates WebP from
   the browser's Accept header, which takes the same images to 40–90 KB.

   `srcSet` gives retina screens the 2x variant without making everyone else
   pay for it. Non-Supabase and local paths pass through untouched. */

import localCopies from "../constants/project-images.json";

const OBJECT = "/storage/v1/object/public/";
const RENDER = "/storage/v1/render/image/public/";

const isTransformable = (src) =>
  typeof src === "string" && src.includes("supabase.co") && src.includes(OBJECT);

// `resize=contain` is load-bearing: with `width` alone Supabase keeps the
// source height and crops horizontally (a 1536x1024 came back 700x1024,
// visibly squashed). `contain` scales proportionally — and is smaller.
export const sized = (src, width, quality = 72) =>
  isTransformable(src)
    ? `${src.replace(OBJECT, RENDER)}?width=${width}&resize=contain&quality=${quality}`
    : src;

/* Pass straight into <img srcSet>. Returns undefined when there's nothing to
   transform, so the attribute is simply omitted. */
export const srcSetFor = (src, width, quality = 72) =>
  isTransformable(src)
    ? `${sized(src, width, quality)} 1x, ${sized(src, width * 2, quality)} 2x`
    : undefined;

/* Self-hosted copies (scripts/project-images.mjs) beat the render endpoint:
   it re-resizes whenever its one-hour cache lapses, which at this site's
   traffic is most visits, and costs a second connection. Returns
   { src, srcSet, sizes } for an image in the manifest, or null so the caller
   falls back to sized()/srcSetFor().

   `width` is the most the image is displayed at. Below that viewport width
   it is assumed to span the screen, which is true of every card and hero
   here on mobile, so phones fetch an 800w file rather than a desktop one. */
export const localImage = (src, width) => {
  const set = localCopies[src]?.srcset;
  if (!set) return null;
  const [, fallback] = set.find(([w]) => w >= width) || set[set.length - 1];
  return {
    src: fallback,
    srcSet: set.map(([w, path]) => `${path} ${w}w`).join(", "),
    sizes: `(min-width: ${width}px) ${width}px, 100vw`,
  };
};
