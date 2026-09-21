import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { impactStats } from "../constants";
import { Icon } from "./shared";

const Counter = ({ value, decimals = 0, suffix = "", inView }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
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
  }, [inView, value]);
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
