import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { services, links } from "../constants";
import { doors, checklist, devoraxPages } from "../constants/doors";
import { SectionHeading, Section, Icon, PrimaryButton, InlineLink, cn } from "./shared";

const DWELL = 7000; // ms each capability holds before advancing

/* Thin bar that drains while a tab is auto-playing. Keyed on `active` so it
   restarts cleanly on every change, including manual ones. */
const Progress = ({ playing }) => (
  <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-line">
    {playing && (
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DWELL / 1000, ease: "linear" }}
        className="block h-full origin-left bg-acid"
      />
    )}
  </span>
);

const Services = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  // Auto-advance only while the section is on screen and nobody is
  // interacting with it — an unattended carousel is just noise.
  const auto = inView && !paused && !reduce;
  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % services.length), DWELL);
    return () => clearTimeout(id);
  }, [auto, active]);

  return (
    <Section id="services">
      <SectionHeading
        index="01"
        eyebrow="what I do"
        title="Full-stack delivery,"
        accent="end to end."
        description="Six things people hire me for. Pick one — or tell me the business problem and I'll tell you which of these it actually is."
      />

      {/* Body-text links to the pages thedevorax.tech owns for these jobs, in
          the prerendered HTML: a sentence a reader and a crawler both follow,
          not only a button inside a tab. */}
      <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-muted">
        Some of this work has its own page on DevoraX's site:{" "}
        <InlineLink href={doors.lovable.url}>{doors.lovable.phrase}</InlineLink>,{" "}
        <InlineLink href={doors.audit.url}>{doors.audit.phrase}</InlineLink>,{" "}
        <InlineLink href={doors.sharetribe.url}>{doors.sharetribe.phrase}</InlineLink> and{" "}
        <InlineLink href={doors.marketplace.url}>{doors.marketplace.phrase}</InlineLink>. For an
        investor's technical due diligence, see{" "}
        <InlineLink href={checklist.investor.url}>{checklist.investor.phrase}</InlineLink>.
      </p>

      <div
        ref={ref}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="panel mt-14 overflow-hidden"
      >
        {/* tab rail */}
        <div
          role="tablist"
          aria-label="Capabilities"
          className="no-scrollbar flex overflow-x-auto border-b border-line"
        >
          {services.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.key}
                role="tab"
                id={`svc-tab-${item.key}`}
                aria-selected={on}
                aria-controls={`svc-panel-${item.key}`}
                onClick={() => setActive(i)}
                data-cursor="button"
                className={cn(
                  "group relative flex min-h-[56px] flex-1 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap px-5 py-4 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 sm:text-xs",
                  on ? "text-acid" : "text-muted hover:bg-white/[0.02] hover:text-ink"
                )}
              >
                <Icon name={item.icon} className="h-4 w-4 shrink-0" />
                {item.label}
                {on && <Progress playing={auto} />}
                {on && !auto && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-acid" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Panels.
            All five render; the inactive ones are `hidden`. Previously only
            the active tab existed in the DOM, so four of the five services —
            every word of the AI and architecture copy — were absent from the
            prerendered HTML and no crawler ever saw them. Content behind a
            tab is indexed; content that was never rendered is not. */}
        <div className="relative">
          {services.map((s, idx) => {
            const shown = idx === active;
            return (
            <div
              key={s.key}
              hidden={!shown}
              id={`svc-panel-${s.key}`}
              role="tabpanel"
              aria-labelledby={`svc-tab-${s.key}`}
              className={cn(
                "grid items-stretch gap-10 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14",
                shown && "anim-rise"
              )}
            >
              <div>
                <p className="mono-label flex items-center gap-2 text-acid">
                  <span className="text-faint">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-faint">//</span>
                  {s.title}
                </p>
                <h3 className="mt-4 text-balance font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {s.blurb}
                </h3>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">{s.detail}</p>
                {s.priceNote && (
                  <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-faint">
                    Prices and terms are on{" "}
                    <InlineLink href={devoraxPages.pricing}>thedevorax.tech/pricing</InlineLink>.
                  </p>
                )}

                <div className="mt-7 flex flex-wrap gap-1.5">
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryButton href="#contact" icon="arrowRight">
                    Talk about this
                  </PrimaryButton>
                  {/* A real link to the page that covers it, in every panel's
                      HTML: out to thedevorax.tech where it owns the offer, or
                      to this site's own Next.js page. */}
                  {s.door && (
                    <a
                      href={doors[s.door].url}
                      data-cursor="button"
                      className="group inline-flex min-h-[44px] items-center gap-2 px-2 font-mono text-[13px] uppercase tracking-wider text-muted transition-colors hover:text-acid"
                    >
                      {doors[s.door].name}
                      <Icon
                        name="arrowUpRight"
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                  {s.page && (
                    <Link
                      to={`/services/${s.page}`}
                      data-cursor="button"
                      className="group inline-flex min-h-[44px] items-center gap-2 px-2 font-mono text-[13px] uppercase tracking-wider text-muted transition-colors hover:text-acid"
                    >
                      {s.title}: how it works
                      <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* what's included */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br opacity-60 blur-2xl",
                    s.accent
                  )}
                />
                <div className="glass relative flex h-full flex-col rounded-2xl p-6">
                  <p className="mono-label mb-5 text-faint">What that includes</p>
                  <ul className="flex flex-col gap-4">
                    {s.points.map((p, i) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-acid/12 text-acid">
                          <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        <span className="text-sm leading-relaxed text-muted">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* guarantee strip */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { icon: "zap", title: "Senior-led, always", sub: "You get me on the hard parts, not a junior" },
          { icon: "shield", title: "Free fixes after handover", sub: "Defects in the work we delivered are fixed free for 35 days after handover." },
          {
            icon: "compass",
            title: "Prices and terms",
            sub: "Most work starts with the $400 audit, credited to the fix. Read the terms on thedevorax.tech/pricing.",
            href: `${devoraxPages.pricing}#terms`,
          },
        ].map((g) => {
          const body = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-acid">
                <Icon name={g.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{g.title}</span>
                <span className="mt-0.5 block text-[12px] leading-snug text-faint">{g.sub}</span>
              </span>
            </>
          );
          const cls = "panel panel-hover flex items-center gap-4 p-5";
          return g.href ? (
            <a key={g.title} href={g.href} data-cursor="button" className={cls}>
              {body}
            </a>
          ) : (
            <div key={g.title} className={cls}>
              {body}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <PrimaryButton href={links.booking} icon="calendar">
          Book a call
        </PrimaryButton>
        <Link
          to="/services"
          data-cursor="button"
          className="group inline-flex min-h-[44px] items-center gap-2 px-2 font-mono text-[13px] uppercase tracking-wider text-muted transition-colors hover:text-acid"
        >
          All services
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href={links.devorax}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="button"
          className="group inline-flex min-h-[44px] items-center gap-2 px-2 font-mono text-[13px] uppercase tracking-wider text-muted transition-colors hover:text-acid"
        >
          More at DevoraX
          <Icon
            name="arrowUpRight"
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </Section>
  );
};

export default Services;
