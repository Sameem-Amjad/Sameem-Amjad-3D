import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projectFilters, slugify } from "../constants";
import { LiveLinks, Icon, SmartImage, cn } from "./shared";

/* image with shimmer skeleton while loading + graceful gradient fallback */
const ProjectImage = ({ image, title, accent, className }) => (
  <SmartImage
    src={image}
    alt={title}
    className={cn("h-full w-full object-cover", className)}
    fallback={
      <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", accent)}>
        <span className="font-display text-6xl font-bold text-night/80">{title.charAt(0)}</span>
      </div>
    }
  />
);

const StatRow = ({ stats }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-2">
    {stats.map((s) => (
      <div key={s.k}>
        <div className="font-display text-lg font-bold text-acid">{s.v}</div>
        <div className="font-mono text-[10px] uppercase tracking-wide text-faint">{s.k}</div>
      </div>
    ))}
  </div>
);

const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((t) => (
      <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
        {t}
      </span>
    ))}
  </div>
);

/* ── Featured card ── */
export const FeaturedCard = ({ p, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
    className="panel panel-hover group relative flex flex-col overflow-hidden"
  >
    {/* stretched link — makes the whole card open the case study while
        keeping the live-link buttons (higher z) independently clickable */}
    <Link
      to={`/work/${slugify(p.title)}`}
      data-cursor="card"
      aria-label={`View ${p.title} case study`}
      className="absolute inset-0 z-10"
    />

    <div className="relative h-56 overflow-hidden">
      <ProjectImage image={p.image} title={p.title} accent={p.accent}
        className="grayscale-[0.35] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full border border-line bg-base/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink backdrop-blur">
        {p.category}
      </span>
      <span className="absolute right-4 top-4 font-mono text-xs text-acid">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-4 right-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full border border-line bg-base/70 text-acid opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Icon name="arrowUpRight" className="h-4 w-4" />
      </span>
    </div>

    <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-acid">
          {p.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted">{p.tagline}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted line-clamp-3">{p.description}</p>
      <StatRow stats={p.stats} />
      <Tags tags={p.tags} />
      <div className="relative z-20 mt-auto pt-2">
        <LiveLinks web={p.web} android={p.android} ios={p.ios} />
      </div>
    </div>
  </motion.article>
);

/* ── Compact build card ── */
export const GridCard = ({ p }) => (
  <motion.article
    layout
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.35 }}
    className="panel panel-hover group relative flex flex-col overflow-hidden"
  >
    <Link
      to={`/work/${slugify(p.title)}`}
      data-cursor="card"
      aria-label={`View ${p.title} case study`}
      className="absolute inset-0 z-10"
    />

    <div className="relative h-40 overflow-hidden">
      <ProjectImage image={p.image} title={p.title} accent={p.accent}
        className="grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
      <span className="absolute bottom-3 right-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full border border-line bg-base/70 text-acid opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div>
        <h4 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-acid">{p.title}</h4>
        <p className="font-mono text-[11px] text-faint">{p.category}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted line-clamp-2">{p.description}</p>
      <StatRow stats={p.stats} />
      <div className="relative z-20 mt-auto pt-1">
        <LiveLinks web={p.web} android={p.android} ios={p.ios} />
      </div>
    </div>
  </motion.article>
);

/* ── Grids ── */
export const FeaturedGrid = ({ items }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((p, i) => (
      <FeaturedCard key={p.title} p={p} i={i} />
    ))}
  </div>
);

export const BuildsGrid = ({ items }) => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((p) => p.filter === active);
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {projectFilters.map((f) => (
          <button key={f} onClick={() => setActive(f)} data-cursor="button"
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-all",
              active === f
                ? "border-acid bg-acid text-night"
                : "border-line text-muted hover:border-acid hover:text-acid"
            )}>
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <GridCard key={p.title} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
