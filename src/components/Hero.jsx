import { motion } from "framer-motion";
import { profile, heroStats, links } from "../constants";
import { PrimaryButton, GhostButton } from "./shared";
import { ShaderOrb } from "./fx";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Line = ({ children, delay, className }) => (
  <span className="reveal-line">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`block ${className || ""}`}
    >
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28 sm:px-10"
    >
      <ShaderOrb className="pointer-events-none absolute right-[-6%] top-1/2 h-64 w-64 -translate-y-1/2 opacity-70 sm:h-80 sm:w-80 lg:right-[4%] lg:h-[22rem] lg:w-[22rem]" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* status row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="mono-label flex items-center gap-2 text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            {profile.availability}
          </span>
          <span className="mono-label text-faint">{profile.location}</span>
        </motion.div>

        {/* kinetic headline */}
        <h1 className="font-display text-[15vw] font-bold uppercase leading-[0.88] tracking-tight text-ink sm:text-[12vw] lg:text-[6.25rem] xl:text-[7rem]">
          <Line delay={0.32}>Full-stack</Line>
          <Line delay={0.44} className="text-outline">engineer</Line>
        </h1>

        {/* terminal role line */}
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="mt-5 font-mono text-sm text-acid sm:text-[1rem]">
          <span className="text-faint">$</span>{" "}
          <span className="caret">Founder &amp; Lead Engineer @ DevoraX</span>
        </motion.p>

        {/* subheadline */}
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[1rem]">
          {profile.subheadline}
        </motion.p>

        {/* CTAs + metrics */}
        <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="flex flex-wrap items-center gap-3">
            <PrimaryButton href={links.calendly} icon="calendar">Book a call</PrimaryButton>
            <GhostButton href="#work" icon="arrowDown">View work</GhostButton>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-wrap gap-x-8 gap-y-3">
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-acid">{s.value}</span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
