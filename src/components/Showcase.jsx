import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { slugify } from "../constants";
import { Icon, SmartImage, LiveLinks, cn } from "./shared";

/* ─────────────────────────────────────────────────────────────
   Expanding panel gallery.

   Desktop: projects are vertical slats. The open one grows to fill most of
   the row and shows its detail; the rest collapse to a spine with the title
   set vertically. Hover opens, so it explores itself as the pointer moves.

   Below lg the whole thing degrades to a snap-scrolling card rail, because
   slats need horizontal room and hover to make any sense.
   ───────────────────────────────────────────────────────────── */

const Cover = ({ p, className, width = 900 }) => (
  <SmartImage
    src={p.image}
    alt={`${p.title} — ${p.tagline}`}
    width={width}
    className={cn("h-full w-full object-cover object-top", className)}
    fallback={
      <div className={cn("grid h-full w-full place-items-center bg-gradient-to-br", p.accent)}>
        <span className="font-display text-6xl font-bold text-night/80">{p.title.charAt(0)}</span>
      </div>
    }
  />
);

const Panel = ({ p, i, open, onOpen }) => {
  const slug = slugify(p.title);

  return (
    <motion.article
      layout
      onMouseEnter={onOpen}
      onFocusCapture={onOpen}
      transition={{ type: "spring", stiffness: 210, damping: 30 }}
      style={{ flexGrow: open ? 1 : 0, flexBasis: open ? 0 : "5rem" }}
      className={cn(
        "group relative h-[30rem] min-w-0 shrink-0 overflow-hidden rounded-2xl border transition-colors duration-500",
        open ? "border-acid/35" : "border-line hover:border-line-strong"
      )}
    >
      <Cover
        p={p}
        width={open ? 900 : 320}
        className={cn(
          "absolute inset-0 transition-all duration-700",
          open ? "scale-100 grayscale-0" : "scale-110 grayscale brightness-[0.55]"
        )}
      />

      {/* scrim — heavier when collapsed so the spine title stays readable */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          open
            ? "bg-gradient-to-t from-base via-base/88 to-base/25"
            : "bg-base/88"
        )}
      />

      {/* ── collapsed spine ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-between py-6"
          >
            <span className="font-mono text-[11px] text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-muted transition-colors duration-300 group-hover:text-ink"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {p.title}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-faint transition-colors duration-300 group-hover:border-acid group-hover:text-acid">
              <Icon name="plus" className="h-3.5 w-3.5" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── expanded detail ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col justify-end p-7"
          >
            <Link
              to={`/work/${slug}`}
              data-cursor="card"
              aria-label={`View the ${p.title} case study`}
              className="absolute inset-0 z-10"
            />

            <span className="absolute right-5 top-5 rounded-full border border-line bg-base/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted backdrop-blur">
              {p.category}
            </span>

            <p className="font-mono text-xs text-acid">{p.tagline}</p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-ink">
              {p.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted line-clamp-3">
              {p.description}
            </p>

            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {p.stats.map((st) => (
                <div key={st.k}>
                  <dd className="font-display text-xl font-bold leading-none text-acid">{st.v}</dd>
                  <dt className="mt-1 font-mono text-[10px] uppercase tracking-wide text-faint">
                    {st.k}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="relative z-20 mt-6 flex flex-wrap items-center gap-3">
              <Link
                to={`/work/${slug}`}
                data-cursor="button"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-acid px-5 font-mono text-[12px] font-semibold uppercase tracking-wider text-night shadow-glow-sm transition-shadow hover:shadow-glow"
              >
                Case study
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" strokeWidth={2.2} />
              </Link>
              <LiveLinks web={p.web} android={p.android} ios={p.ios} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

/* Mobile / tablet fallback: a snap rail of ordinary cards. */
const Rail = ({ items }) => (
  <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 sm:-mx-10 sm:scroll-px-10 sm:px-10">
    {items.map((p, i) => (
      <article
        key={p.title}
        className="panel relative w-[82vw] shrink-0 snap-center overflow-hidden sm:w-[60vw]"
      >
        <Link
          to={`/work/${slugify(p.title)}`}
          data-cursor="card"
          aria-label={`View the ${p.title} case study`}
          className="absolute inset-0 z-10"
        />
        <div className="relative aspect-[16/10] overflow-hidden">
          <Cover p={p} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-line bg-base/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted backdrop-blur">
            {String(i + 1).padStart(2, "0")} · {p.category}
          </span>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <div>
            <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
            <p className="mt-1 font-mono text-[11px] text-acid">{p.tagline}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted line-clamp-2">{p.description}</p>
          <dl className="flex flex-wrap gap-x-6 gap-y-2">
            {p.stats.slice(0, 3).map((st) => (
              <div key={st.k}>
                <dd className="font-display text-[1rem] font-bold text-acid">{st.v}</dd>
                <dt className="font-mono text-[9px] uppercase tracking-wide text-faint">{st.k}</dt>
              </div>
            ))}
          </dl>
          <div className="relative z-20 pt-1">
            <LiveLinks web={p.web} android={p.android} ios={p.ios} />
          </div>
        </div>
      </article>
    ))}
  </div>
);

const Showcase = ({ items }) => {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <>
      <div className="lg:hidden">
        <Rail items={items} />
      </div>
      <div className="hidden gap-3 lg:flex">
        {items.map((p, i) => (
          <Panel
            key={p.title}
            p={p}
            i={i}
            open={i === open}
            onOpen={() => !reduce && setOpen(i)}
          />
        ))}
      </div>
      <p className="mt-4 hidden text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint lg:block">
        hover a panel to open it
      </p>
    </>
  );
};

export default Showcase;
