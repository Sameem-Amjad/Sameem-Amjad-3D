import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { impactStats } from "../constants";
import { Icon } from "./shared";

/* Counts up to `value` — but starts AT it, not at zero.
   This began as useState(0), which meant the prerendered HTML shipped
   "0.0M+", "0.0%" and "0k+": the one band on the site whose entire job is
   stating the proof numbers rendered as zeros to anything that does not
   execute JavaScript. Google runs JS and would usually get there, but the
   figures are the page's substance and should not depend on it — and other
   crawlers and AI agents never will.

   So the real figure is the server-rendered text, and the zero is introduced
   on the client only. `armed` flips on mount, which happens long before this
   band is scrolled into view (it sits below the hero), so resetting to zero
   is never visible — the count-up then runs when `inView` fires. Someone
   with reduced motion, or with JS off, simply keeps the real number. */
const Counter = ({ value, decimals = 0, suffix = "", inView }) => {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setDisplay(0);
    setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView || reduce) return;
    let raf;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, value, reduce]);

  return (
    <span>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

/* Full-bleed band rather than a padded section, so the impact numbers read as
   a rule across the page and break up the rhythm of stacked sections. */
const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section id="impact" ref={ref} className="relative border-y border-line bg-white/[0.012]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16">
        <p className="mono-label mb-9 flex items-center gap-2 text-acid">
          <Icon name="terminal" className="h-4 w-4" />
          <span className="text-faint">$</span> cat impact.log
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {impactStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group border-l border-line pl-4 transition-colors duration-300 hover:border-acid"
            >
              <dd className="flex items-center gap-1.5">
                <span className="font-display text-3xl font-bold leading-none text-ink transition-colors duration-300 group-hover:text-acid sm:text-4xl">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} inView={inView} />
                </span>
                {s.isRating && <Icon name="star" className="h-4 w-4 shrink-0 text-acid" />}
              </dd>
              <dt className="mt-2.5 font-mono text-[11px] uppercase leading-tight tracking-wide text-muted">
                {s.label}
              </dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stats;
