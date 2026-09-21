import { motion } from "framer-motion";
import { stackGroups } from "../constants";
import { getTechSvg } from "../constants/techStack";
import { SectionHeading, Section, Reveal } from "./shared";

/* One technology. Falls back to a plain text chip when we have no mark for
   it, so the data file can name anything without breaking the row. */
const Chip = ({ name, i }) => {
  const svg = getTechSvg(name);
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
      className="group flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.015] px-3.5 py-2.5 transition-colors duration-300 hover:border-acid/40 hover:bg-acid/[0.04]"
    >
      {svg ? (
        <span
          aria-hidden="true"
          className="h-5 w-5 shrink-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100 [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-acid/60" />
      )}
      <span className="whitespace-nowrap text-[13px] font-medium text-muted transition-colors duration-300 group-hover:text-ink">
        {name}
      </span>
    </motion.li>
  );
};

const Stack = () => (
  <Section id="stack">
    <SectionHeading
      index="03"
      eyebrow="the stack"
      title="The tools I"
      accent="ship with."
      description="Boring where boring is right, modern where it earns the upgrade. You should never inherit a stack nobody else can hire for."
    />

    <div className="mt-14 grid gap-4 md:grid-cols-2">
      {stackGroups.map((g, gi) => (
        <Reveal key={g.label} delay={gi * 0.07}>
          <div className="panel h-full p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h3 className="font-display text-lg font-bold text-ink">{g.label}</h3>
              <span className="font-mono text-[10px] uppercase tracking-wide text-faint">
                {String(gi + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-faint">{g.hint}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.names.map((n, i) => (
                <Chip key={n} name={n} i={i} />
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Stack;
