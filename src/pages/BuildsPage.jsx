import { Link } from "react-router-dom";
import { moreProjects, featuredProjects, links } from "../constants";
import { PageTransition } from "../components/fx";
import { BuildsGrid } from "../components/projects";
import { Icon, PrimaryButton, MaskLine, Reveal } from "../components/shared";

const BuildsPage = () => (
  <PageTransition>
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-36 sm:px-10">
      <Reveal>
        <p className="mono-label mb-5 text-acid">
          <span className="text-faint">$</span> cd ~/builds &nbsp;
          <span className="text-faint">// the lab</span>
        </p>
      </Reveal>
      <h1 className="font-display text-5xl font-bold leading-[1] tracking-tight text-ink sm:text-7xl">
        <MaskLine>More builds.</MaskLine>
      </h1>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          A wider cut of production work across web, mobile, AI and cloud. Filter by
          discipline to explore the range.
        </p>
      </Reveal>

      <div className="mt-16">
        <BuildsGrid items={moreProjects} />
      </div>

      <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
        <Link to="/work" data-cursor="button"
          className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid">
          <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          Back to {featuredProjects.length} featured case studies
        </Link>
        <PrimaryButton href={links.calendly} icon="calendar">Book a call</PrimaryButton>
      </div>
    </section>
  </PageTransition>
);

export default BuildsPage;
