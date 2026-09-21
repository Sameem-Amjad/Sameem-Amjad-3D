import { Link } from "react-router-dom";
import { moreProjects, featuredProjects, links } from "../constants";
import { PageTransition } from "../components/fx";
import { BuildsGrid } from "../components/projects";
import { Icon, PrimaryButton, PageHeader, Reveal } from "../components/shared";

const BuildsPage = () => (
  <PageTransition>
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <PageHeader
        eyebrow={`~/builds · the lab`}
        title="More"
        accent="builds."
        lede="A wider cut of production work across web, mobile, AI and cloud. Filter by discipline to explore the range."
        right={
          <Link
            to="/work"
            data-cursor="button"
            className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            {featuredProjects.length} case studies
          </Link>
        }
      />

      <div className="mt-14">
        {/* Same reason as /work: the grid renders h3 cards, so the page needs
            an h2 between them and the PageHeader h1. */}
        <h2 className="sr-only">More builds</h2>
        <BuildsGrid items={moreProjects} />
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <Link
            to="/work"
            data-cursor="button"
            className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to {featuredProjects.length} featured case studies
          </Link>
          <PrimaryButton href={links.calendly} icon="calendar">
            Book a call
          </PrimaryButton>
        </div>
      </Reveal>
    </section>
  </PageTransition>
);

export default BuildsPage;
