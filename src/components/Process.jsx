import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "../constants";
import { SectionHeading, Section, Icon } from "./shared";

const Process = () => {
  const ref = useRef(null);
  // Rail fills as the list scrolls past — a progress cue for the whole process,
  // which is the one thing a five-step list should communicate.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });

  return (
    <Section id="process">
      <SectionHeading
        index="04"
        eyebrow="how we work"
        title="From idea to"
        accent="scale."
        description="A transparent, senior-led process. You always know what's being built, why, and what happens next."
      />

      <div ref={ref} className="relative mt-16">
        {/* rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[10px] top-0 w-[3px] rounded-full bg-line md:left-[14px]"
        >
          <motion.span
            style={{ scaleY: fill }}
            className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-acid via-acid to-acid/40 shadow-[0_0_12px_rgba(198,255,61,0.55)]"
          />
        </div>

        <ol className="flex flex-col">
          {processSteps.map((s, i) => (
            <motion.li
              key={s.no}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="card"
              className="group relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-7 md:grid-cols-[auto_minmax(0,14rem)_1fr] md:gap-x-10 md:py-8"
            >
              {/* node */}
              <span className="relative z-10 mt-1 grid h-[23px] w-[23px] place-items-center rounded-full border border-line bg-base text-acid transition-colors duration-300 group-hover:border-acid md:h-[31px] md:w-[31px]">
                <Icon
                  name="check"
                  className="h-2.5 w-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:h-3.5 md:w-3.5"
                  strokeWidth={3}
                />
                <span className="absolute inset-0 grid place-items-center font-mono text-[9px] text-faint transition-opacity duration-300 group-hover:opacity-0 md:text-[10px]">
                  {s.no}
                </span>
              </span>

              <h3 className="self-start font-display text-2xl font-bold text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-[1.75rem]">
                {s.title}
              </h3>

              <p className="col-start-2 max-w-xl text-[15px] leading-relaxed text-muted md:col-start-3">
                {s.blurb}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

export default Process;
