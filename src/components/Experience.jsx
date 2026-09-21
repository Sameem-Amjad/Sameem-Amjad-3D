import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "../constants";
import { SectionHeading, Section, Icon, SmartImage, cn } from "./shared";

/* Company mark on a light tile — most real logos are drawn for white
   backgrounds and vanish on near-black. Falls back to a monogram when we
   have no mark (ByteSight has no website to pull one from). */
const Mark = ({ org, logo }) => {
  const initials = org
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-white/95">
      {logo ? (
        <SmartImage
          src={logo}
          alt={`${org} logo`}
          className="h-8 w-8 object-contain"
          fallback={
            <span className="font-display text-sm font-bold text-night">{initials}</span>
          }
        />
      ) : (
        <span className="font-display text-sm font-bold text-night">{initials}</span>
      )}
    </span>
  );
};

const Row = ({ e }) => {
  const [open, setOpen] = useState(false);
  const Wrapper = e.href ? "a" : "div";

  return (
    <li className="relative grid grid-cols-[28px_1fr] gap-x-4 pb-5 sm:grid-cols-[36px_1fr] sm:gap-x-6">
      {/* Graph gutter. Node and tick share one `top` so they line up, and the
          tick runs past the gutter's own width to actually meet the card. */}
      <span className="relative" aria-hidden="true">
        <span
          className={cn(
            "absolute left-1/2 top-[44px] h-[1.5px] w-[32px] sm:w-[44px]",
            e.current ? "bg-acid/50" : "bg-line-strong"
          )}
        />
        <span
          className={cn(
            "absolute left-1/2 top-[44px] z-10 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
            e.current
              ? "border-acid bg-acid shadow-[0_0_10px_rgba(198,255,61,0.7)]"
              : "border-line-strong bg-base"
          )}
        />
      </span>

      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "panel panel-hover group p-5 sm:p-6",
          e.current && "border-acid/20 bg-acid/[0.015]"
        )}
      >
        <div className="flex items-start gap-4">
          <Mark org={e.org} logo={e.logo} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <h3 className="font-display text-[17px] font-bold leading-tight text-ink sm:text-xl">
                {e.role}
              </h3>
              {e.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/30 bg-acid/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-acid">
                  <span className="h-1 w-1 rounded-full bg-acid" />
                  active
                </span>
              )}
            </div>

            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs">
              <Wrapper
                {...(e.href
                  ? {
                      href: e.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-cursor": "button",
                      className:
                        "inline-flex items-center gap-1 text-acid transition-colors hover:text-acid-soft",
                    }
                  : { className: "text-acid" })}
              >
                {e.org}
                {e.href && <Icon name="arrowUpRight" className="h-3 w-3" />}
              </Wrapper>
              <span className="text-faint">·</span>
              <span className="text-faint">{e.kind}</span>
            </p>

            {/* Narrow screens can't fit the dates beside a wrapping job title
                without the two colliding, so they sit under the org line. */}
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-faint md:hidden">
              {e.period} <span className="text-line-strong">·</span> {e.location}
            </p>
          </div>

          <div className="hidden shrink-0 text-right md:block">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{e.period}</p>
            <p className="mt-0.5 font-mono text-[10px] text-faint">{e.location}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{e.summary}</p>

        {/* Bullets stay folded so the timeline scans as a timeline; the detail
            is one click away for anyone actually reading it. */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          data-cursor="button"
          className="mt-4 inline-flex min-h-[32px] items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-faint transition-colors hover:text-acid"
        >
          <Icon
            name={open ? "minus" : "plus"}
            className="h-3.5 w-3.5"
            strokeWidth={2.2}
          />
          {open ? "Hide detail" : `What I did (${e.bullets.length})`}
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <ul className="mt-4 flex flex-col gap-3 border-l border-line pl-4">
            {e.bullets.map((b) => (
              <li key={b} className="text-sm leading-relaxed text-muted">
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {e.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const current = experiences.filter((e) => e.current);
  const past = experiences.filter((e) => !e.current);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <Section id="experience">
      <SectionHeading
        index="05"
        eyebrow="experience"
        title="Four years of shipping,"
        accent="mostly in production."
        description="Agency work, product teams and my own studio — often at the same time. Every role below is something that went live."
      />

      <div ref={ref} className="relative mt-14">
        {/* the graph rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[13px] top-2 w-[3px] rounded-full bg-line sm:left-[17px]"
        >
          <motion.span
            style={{ scaleY: fill }}
            className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-acid via-acid to-acid/40 shadow-[0_0_12px_rgba(198,255,61,0.5)]"
          />
        </div>

        {/* HEAD */}
        <div className="relative mb-6 grid grid-cols-[28px_1fr] items-center gap-x-4 sm:grid-cols-[36px_1fr] sm:gap-x-6">
          <span className="flex justify-center" aria-hidden="true">
            <span className="relative z-10 grid h-[27px] w-[27px] place-items-center rounded-full border-2 border-acid bg-base shadow-[0_0_16px_rgba(198,255,61,0.45)]">
              <span className="h-2 w-2 rounded-full bg-acid" />
            </span>
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">
            HEAD <span className="text-faint">·</span> present{" "}
            <span className="text-faint">· {current.length} concurrent roles</span>
          </p>
        </div>

        <ul className="relative">
          {current.map((e) => (
            <Row key={e.org} e={e} />
          ))}
        </ul>

        {/* merge marker */}
        <div className="relative my-2 grid grid-cols-[28px_1fr] items-center gap-x-4 sm:grid-cols-[36px_1fr] sm:gap-x-6">
          <span className="flex justify-center" aria-hidden="true">
            <span className="relative z-10 grid h-[27px] w-[27px] rotate-45 place-items-center rounded-[6px] border-2 border-line-strong bg-base" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            merge <span className="text-line-strong">·</span> history
          </p>
        </div>

        <ul className="relative pt-4">
          {past.map((e) => (
            <Row key={e.org} e={e} />
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Experience;
