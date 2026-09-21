import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials, testimonialStats, links } from "../constants";
import { SectionHeading, Section, Icon, cn } from "./shared";

const SHOWN = 6;

const Stars = ({ n = 5 }) => (
  <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: n }).map((_, i) => (
      <Icon key={i} name="star" className="h-3 w-3 text-acid" />
    ))}
  </span>
);

const Card = ({ t, i }) => (
  <motion.figure
    layout
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
    className="panel panel-hover relative flex break-inside-avoid flex-col gap-5 p-6"
  >
    <div className="flex items-start justify-between gap-3">
      <Icon name="quote" className="h-6 w-6 shrink-0 text-acid/25" />
      <Stars n={t.rating} />
    </div>

    <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/90">{t.quote}</blockquote>

    <figcaption className="flex items-center gap-3 border-t border-line pt-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line font-display text-xs font-bold text-acid">
        {t.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-mono text-[13px] text-ink">{t.name}</span>
        <span className="block truncate font-mono text-[10px] uppercase tracking-wide text-faint">
          {t.country} · {t.when}
        </span>
      </span>
      <span className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-faint">
        {t.source}
      </span>
    </figcaption>
  </motion.figure>
);

/* Renders nothing until there are real reviews in constants/index.js. */
const Testimonials = () => {
  const [expanded, setExpanded] = useState(false);
  if (!testimonials.length) return null;

  const visible = expanded ? testimonials : testimonials.slice(0, SHOWN);
  const rest = testimonials.length - SHOWN;

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="what clients say"
        title="Reviewed by the people who"
        accent="paid for it."
        description="Every quote below is a verified Fiverr review, unedited. No curation beyond removing duplicates."
        right={
          <a
            href={links.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="button"
            className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
          >
            See them on Fiverr
            <Icon
              name="arrowUpRight"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        }
      />

      {/* proof strip */}
      <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {[
          { v: testimonialStats.average.toFixed(1), k: "average rating", star: true },
          { v: `${testimonialStats.total}`, k: "reviews, all 5★" },
          { v: `${testimonialStats.countries}`, k: "countries" },
        ].map((s) => (
          <div key={s.k} className="bg-base/60 px-4 py-5 text-center sm:px-6">
            <dd className="flex items-center justify-center gap-1.5">
              <span className="font-display text-2xl font-bold leading-none text-acid sm:text-3xl">
                {s.v}
              </span>
              {s.star && <Icon name="star" className="h-4 w-4 text-acid" />}
            </dd>
            <dt className="mt-2 font-mono text-[10px] uppercase leading-tight tracking-wide text-muted">
              {s.k}
            </dt>
          </div>
        ))}
      </dl>

      {/* Masonry keeps a one-line "very quick turn around" next to a paragraph
          without either being padded out to match the other. */}
      <motion.div layout className="mt-4 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence initial={false}>
          {visible.map((t, i) => (
            <Card key={`${t.name}-${t.when}-${i}`} t={t} i={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {rest > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            data-cursor="button"
            className="glass group inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-acid/50 hover:text-acid"
          >
            {expanded ? "Show fewer" : `Read all ${testimonials.length} reviews`}
            <Icon
              name="chevronDown"
              className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
            />
          </button>
        </div>
      )}
    </Section>
  );
};

export default Testimonials;
