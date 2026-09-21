import { Link } from "react-router-dom";
import { featuredProjects, moreProjects, links } from "../constants";
import { PageTransition } from "../components/fx";
import { FeaturedGrid } from "../components/projects";
import { Icon, PrimaryButton, PageHeader, Reveal } from "../components/shared";

const WorkPage = () => (
  <PageTransition>
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <PageHeader
        eyebrow={`~/work · ${featuredProjects.length} case studies`}
        title="Selected"
        accent="work."
        lede="Every project below shipped to production for a real client — web, mobile and AI platforms I led end to end."
        right={
          <Link
            to="/builds"
            data-cursor="button"
            className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
          >
            {moreProjects.length} more builds
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <div className="mt-14">
        {/* Cards inside the grid are h3s; without this the page steps h1 -> h3.
            sr-only because PageHeader above already carries the label visually. */}
        <h2 className="sr-only">Featured case studies</h2>
        <FeaturedGrid items={featuredProjects} />
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <Link
            to="/builds"
            data-cursor="button"
            className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
          >
            Browse {moreProjects.length} more builds
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <PrimaryButton href={links.booking} icon="calendar">
            Book a call
          </PrimaryButton>
        </div>
      </Reveal>
    </section>
  </PageTransition>
);

export default WorkPage;
