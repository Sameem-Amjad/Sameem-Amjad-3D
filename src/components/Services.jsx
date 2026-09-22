import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { services, links } from "../constants";
import { SectionHeading, Section, Icon, PrimaryButton, cn } from "./shared";

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
        description="Five things people hire me for. Pick one — or tell me the business problem and I'll tell you which of these it actually is."
      />

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
          {services.map((svc, idx) => {
            const s = svc;
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
                  <span className="text-faint">{String(active + 1).padStart(2, "0")}</span>
                  <span className="text-faint">//</span>
                  {s.title}
                </p>
                <h3 className="mt-4 text-balance font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {s.blurb}
                </h3>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">{s.detail}</p>

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

                <div className="mt-8">
                  <PrimaryButton href="#contact" icon="arrowRight">
                    Talk about this
                  </PrimaryButton>
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
          { icon: "shield", title: "35 days free support", sub: "Every build ships with maintenance included" },
          { icon: "compass", title: "Fixed scope, fixed price", sub: "Quoted per project, not per hour" },
        ].map((g) => (
          <div key={g.title} className="panel panel-hover flex items-center gap-4 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-acid">
              <Icon name={g.icon} className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{g.title}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-faint">{g.sub}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <PrimaryButton href={links.booking} icon="calendar">
          Book a call
        </PrimaryButton>
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
