import { motion } from "framer-motion";
import { team, links } from "../constants";
import { Section, Eyebrow, Reveal, MaskLine, Icon, PrimaryButton, GhostButton, SmartImage, cn } from "./shared";

const TeamCard = ({ m, i }) => (
  <motion.article
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
          "h-full w-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0",
          m.imgPos
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"
      />
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
  </motion.article>
);

const Team = () => (
  <Section id="team">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal>
          <Eyebrow index="06">leadership</Eyebrow>
        </Reveal>
        <h2 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl">
          <MaskLine>
            The team behind <span className="text-tail">DevoraX.</span>
          </MaskLine>
        </h2>
      </div>
      <Reveal delay={0.1}>
        <p className="max-w-sm leading-relaxed text-muted">
          Two engineers, one standard — production-grade products, built to scale and backed
          after launch.
        </p>
      </Reveal>
    </div>

    <div className="mt-12 grid gap-4 md:grid-cols-2">
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
  </Section>
);

export default Team;
