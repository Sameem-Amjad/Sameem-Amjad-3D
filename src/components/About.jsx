import { motion } from "framer-motion";
import { services, links, team } from "../constants";
import { SectionHeading, Icon, Reveal, PrimaryButton, GhostButton, SmartImage, cn } from "./shared";

const ServiceCard = ({ s, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: i * 0.08 }}
    data-cursor="card"
    className={cn(
      "panel panel-hover group relative flex flex-col overflow-hidden p-7",
      s.span
    )}
  >
    <div className="mb-8 flex items-start justify-between">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-line text-acid transition-colors group-hover:border-acid">
        <Icon name={s.icon} className="h-6 w-6" />
      </div>
      <span className="font-mono text-xs text-faint">0{i + 1}</span>
    </div>
    <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.blurb}</p>
    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-acid transition-all duration-500 group-hover:w-full" />
  </motion.div>
);

const TeamCard = ({ m, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    data-cursor="card"
    className="panel panel-hover group relative flex flex-col overflow-hidden"
  >
    <div className="relative aspect-[3/2] w-full overflow-hidden">
      <SmartImage
        src={m.image}
        alt={`${m.name}, ${m.role} at DevoraX`}
        className={cn(
          "h-full w-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.04]",
          m.imgPos
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-line bg-base/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-acid backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-acid" />
        {m.badge}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <div>
        <h4 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-acid">
          {m.name}
        </h4>
        <p className="mt-1 font-mono text-xs text-acid">{m.role}</p>
        <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-faint">{m.title}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{m.bio}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {m.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const About = () => (
  <section id="services" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10">
    <SectionHeading
      index="01"
      eyebrow="what I do"
      title="Full-stack delivery,"
      accent="end to end."
      description="At DevoraX I lead the design, engineering and launch of digital products across four core areas — the same stack that powers the work below."
    />

    <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard key={s.title} s={s} i={i} />
      ))}
    </div>

    {/* Leadership / team */}
    <div className="mt-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <div>
            <p className="mono-label mb-4 text-acid">// leadership</p>
            <h3 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl">
              The team behind <span className="text-acid">DevoraX.</span>
            </h3>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm leading-relaxed text-muted">
            Two engineers, one standard — production-grade products, built to scale
            and backed after launch.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {team.map((m, i) => (
          <TeamCard key={m.name} m={m} i={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PrimaryButton href={links.calendly} icon="calendar">
            Book a call
          </PrimaryButton>
          <GhostButton href="#contact" icon="arrowDown">
            Start a project
          </GhostButton>
        </div>
      </Reveal>
    </div>
  </section>
);

export default About;
