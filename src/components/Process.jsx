import { motion } from "framer-motion";
import { processSteps } from "../constants";
import { SectionHeading } from "./shared";

const Process = () => (
  <section id="process" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10">
    <SectionHeading
      index="03"
      eyebrow="how we work"
      title="From idea to"
      accent="scale."
      description="A transparent, senior-led process. You always know what's being built, why, and what happens next."
    />

    <div className="mt-16 divide-y divide-line border-y border-line">
      {processSteps.map((s, i) => (
        <motion.div
          key={s.no}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          data-cursor="card"
          className="group grid grid-cols-1 gap-4 py-7 transition-colors hover:bg-surface/30 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-10 md:px-4"
        >
          <span className="font-mono text-sm text-acid">{s.no}</span>
          <h3 className="font-display text-2xl font-bold text-ink transition-transform duration-300 group-hover:translate-x-2">
            {s.title}
          </h3>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">{s.blurb}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Process;
