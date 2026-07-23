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

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section id="impact" ref={ref} className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10">
      <p className="mono-label mb-10 flex items-center gap-2 text-acid">
        <Icon name="terminal" className="h-4 w-4" />
        <span className="text-faint">$</span> cat impact.log
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {impactStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="border-l border-line pl-4"
          >
            <div className="flex items-center gap-1">
              <span className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} inView={inView} />
              </span>
              {s.isRating && <Icon name="star" className="h-4 w-4 text-acid" />}
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
