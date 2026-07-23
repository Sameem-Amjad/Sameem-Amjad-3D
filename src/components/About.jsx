import { motion } from "framer-motion";
import { services, profile, links } from "../constants";
import { SectionHeading, Icon, Reveal, PrimaryButton, GhostButton, cn } from "./shared";

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

    {/* Founder */}
    <Reveal delay={0.1}>
      <div className="group mt-4 grid grid-cols-1 gap-8 border border-line bg-surface/40 p-6 sm:p-8 lg:grid-cols-[240px_1fr] lg:items-center lg:gap-12 lg:p-10">
        {/* portrait */}
        <div className="relative mx-auto w-48 sm:w-56 lg:mx-0 lg:w-[240px]">
          <div
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-acid/25 via-ember/10 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
            aria-hidden="true"
          />
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line">
            <img
              src="/myimage/profile.png"
              alt="Sameem Amjad, Founder & Lead Engineer at DevoraX"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-base px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-acid">
            <span className="h-1.5 w-1.5 rounded-full bg-acid" />
            Founder
          </span>
        </div>

        {/* bio */}
        <div>
          <p className="mono-label mb-4 text-acid">// the person behind the work</p>
          <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
            Hi, I'm Sameem. I don't just write code — I lead teams that turn ideas
            into products <span className="text-acid">real people use every day.</span>
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Not a template shop. Every product on this page was scoped, architected
            and shipped under my direction — engineered to survive real users, real
            load and real revenue.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <PrimaryButton href={links.calendly} icon="calendar" className="px-5 py-2.5">
              Book a call
            </PrimaryButton>
            <GhostButton href={links.fiverr} icon="arrowUpRight" className="px-5 py-2.5">
              Fiverr 5.0
            </GhostButton>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default About;
