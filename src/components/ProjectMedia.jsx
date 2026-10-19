import { useEffect, useRef, useState } from "react";
import { localImage, sized } from "../utils/img";
import { Icon, cn } from "./shared";

/* ─────────────────────────────────────────────────────────────
   Case-study media: the recorded walkthrough and the three screens.

   Everything here is in the prerendered HTML and visible without JS: no
   framer `initial`, no opacity gate. The video is preload="none", so it
   costs one poster image until someone presses play, and the screens are
   lazy-loaded. Clicking a screen opens it in a native <dialog>, which
   brings Escape, focus trapping and focus return for free.
   ───────────────────────────────────────────────────────────── */

/* "PT2M6S" -> "2:06", for the label above the player. */
const clock = (iso = "") => {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return null;
  const s = (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/* The self-hosted WebP copies when scripts/project-images.mjs has made them,
   else Supabase's resizer. `sizes` is the caller's, because these are not
   full-width on mobile the way the cards are. */
const shot = (src, width, sizes) => {
  const local = localImage(src, width);
  return local
    ? { src: local.src, srcSet: local.srcSet, sizes }
    : { src: sized(src, width) };
};

const Walkthrough = ({ video, title }) => {
  const length = clock(video.duration);
  return (
    <figure className="min-w-0">
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-faint">
            <Icon name="play" className="h-3 w-3 shrink-0 text-acid" />
            <span className="truncate">walkthrough.mp4</span>
          </span>
          {length && (
            <span className="shrink-0 font-mono text-[11px] text-faint">
              <span className="sr-only">Length </span>
              {length}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/10] bg-night">
          <video
            controls
            playsInline
            preload="none"
            poster={video.poster}
            width={1280}
            height={800}
            aria-label={`${title}: walkthrough video`}
            className="absolute inset-0 h-full w-full object-contain"
          >
            <source src={video.src} type="video/mp4" />
            <a href={video.src}>Download the {title} walkthrough (MP4)</a>
          </video>
        </div>
      </div>
      {video.caption && (
        <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{video.caption}</figcaption>
      )}
    </figure>
  );
};

const Lightbox = ({ items, index, setIndex, title, dialogRef }) => {
  const closeRef = useRef(null);
  const n = items.length;
  const current = index === null ? null : items[index];

  // showModal after the content has rendered, then put focus on Close so
  // Enter or Escape never does something surprising.
  useEffect(() => {
    const d = dialogRef.current;
    if (index !== null && d && !d.open) {
      d.showModal();
      closeRef.current?.focus();
    }
  }, [index, dialogRef]);

  const close = () => dialogRef.current?.close();
  const step = (dir) => setIndex((i) => (i + dir + n) % n);

  const onKeyDown = (e) => {
    if (n < 2) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const big = current ? shot(current.src, 1600, "(min-width: 1200px) 1152px, 100vw") : null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} screens`}
      onClose={() => setIndex(null)}
      onKeyDown={onKeyDown}
      // A click on the dialog box itself, not its content, is a click on
      // the backdrop.
      onClick={(e) => e.target === e.currentTarget && close()}
      // Never wider than the image can be at the viewport's height, so a
      // short laptop screen gets a smaller box rather than letterboxing.
      // m-auto restores the UA centring that index.css's `* { margin: 0 }`
      // takes away.
      className="lightbox m-auto w-[calc(100%-2rem)] max-w-[min(72rem,calc((100dvh-14rem)*1.664))] bg-transparent p-0 text-ink backdrop:bg-night/95 backdrop:backdrop-blur-md"
    >
      {current && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs text-faint">
              <span className="text-acid">{String(index + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              data-cursor="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-base/80 text-ink transition-colors hover:border-acid hover:text-acid"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <figure>
            <img
              key={current.src}
              src={big.src}
              srcSet={big.srcSet}
              sizes={big.sizes}
              alt={current.alt}
              width={1280}
              height={769}
              decoding="async"
              className="block h-auto max-h-[calc(100dvh-14rem)] w-full rounded-xl border border-line bg-surface object-contain"
            />
            <figcaption className="mt-3 text-center text-sm leading-relaxed text-muted">{current.alt}</figcaption>
          </figure>

          {n > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                data-cursor="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-base/80 text-ink transition-colors hover:border-acid hover:text-acid"
              >
                <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
              </button>
              <span className="hidden font-mono text-[11px] uppercase tracking-wide text-faint sm:inline">
                ← → to browse · esc to close
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                data-cursor="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-base/80 text-ink transition-colors hover:border-acid hover:text-acid"
              >
                <Icon name="arrowRight" className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
};

/* `beside`: the screens sit in a column next to the video on desktop
   (stacked, one per row) and in a row of three under it on smaller screens.
   Without a video they get the full width as a row of three. */
const Screens = ({ items, title, beside }) => {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(null);
  const sizes = beside ? "(min-width: 1024px) 320px, 33vw" : "(min-width: 640px) 33vw, 100vw";

  return (
    <div className="min-w-0">
      <ul className={cn("grid gap-3", beside ? "grid-cols-3 lg:grid-cols-1" : "grid-cols-1 sm:grid-cols-3")}>
        {items.map((g, i) => {
          const s = shot(g.src, beside ? 480 : 800, sizes);
          return (
            <li key={g.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Enlarge image ${i + 1} of ${items.length}: ${g.alt}`}
                data-cursor="button"
                className="group relative block aspect-[1280/769] w-full overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-acid/50"
              >
                <img
                  src={s.src}
                  srcSet={s.srcSet}
                  sizes={s.sizes}
                  alt={g.alt}
                  width={1280}
                  height={769}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 hidden h-8 w-8 place-items-center rounded-full border border-line bg-base/75 text-acid opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:grid"
                >
                  <Icon name="expand" className="h-3.5 w-3.5" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-faint">
        {items.length} screens · <span className="sm:hidden">tap</span>
        <span className="hidden sm:inline">click</span> to enlarge
      </p>
      <Lightbox items={items} index={index} setIndex={setIndex} title={title} dialogRef={dialogRef} />
    </div>
  );
};

const ProjectMedia = ({ video, gallery = [], title }) => {
  const hasScreens = gallery.length > 0;
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6",
        video && hasScreens && "lg:grid-cols-[minmax(0,2.8fr)_minmax(0,1fr)] lg:gap-6",
        video && !hasScreens && "max-w-5xl"
      )}
    >
      {video && <Walkthrough video={video} title={title} />}
      {hasScreens && <Screens items={gallery} title={title} beside={Boolean(video)} />}
    </div>
  );
};

export default ProjectMedia;
