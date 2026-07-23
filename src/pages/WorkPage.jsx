import { Link } from "react-router-dom";
import { featuredProjects, moreProjects } from "../constants";
import { PageTransition } from "../components/fx";
import { FeaturedGrid } from "../components/projects";
import { Icon, PrimaryButton, MaskLine, Reveal } from "../components/shared";
import { links } from "../constants";

const WorkPage = () => (
  <PageTransition>
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:px-10">
      <Reveal>
        <p className="mono-label mb-5 text-acid">
          <span className="text-faint">$</span> cd ~/work &nbsp;
          <span className="text-faint">// {featuredProjects.length} case studies</span>
        </p>
      </Reveal>
      <h1 className="font-display text-5xl font-bold leading-[1] tracking-tight text-ink sm:text-7xl">
        <MaskLine>Selected work.</MaskLine>
      </h1>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Every project below shipped to production for a real client — web, mobile
          and AI platforms I led end to end at DevoraX.
        </p>
      </Reveal>

      <div className="mt-16">
        <FeaturedGrid items={featuredProjects} />
      </div>

      {/* footer nav */}
      <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
        <Link to="/builds" data-cursor="button"
          className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid">
          Browse {moreProjects.length} more builds
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <PrimaryButton href={links.calendly} icon="calendar">Book a call</PrimaryButton>
      </div>
    </section>
  </PageTransition>
);

export default WorkPage;
