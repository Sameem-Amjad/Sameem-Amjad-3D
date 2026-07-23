import { Link } from "react-router-dom";
import { featuredProjects, moreProjects } from "../constants";
import { SectionHeading, Reveal, Icon } from "./shared";
import { FeaturedCard } from "./projects";

const Works = () => {
  const teaser = featuredProjects.slice(0, 3);
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10">
      <SectionHeading
        index="02"
        eyebrow="selected work"
        title="Products people"
        accent="actually use."
        description="Platforms I've led at DevoraX — live in production, on the App Store, Google Play and the web. Real clients, real scale, real revenue."
        right={
          <Link
            to="/work"
            data-cursor="button"
            className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
          >
            All {featuredProjects.length} projects
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teaser.map((p, i) => (
          <FeaturedCard key={p.title} p={p} i={i} />
        ))}
      </div>

      {/* route CTAs */}
      <Reveal delay={0.1}>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/work"
            data-cursor="button"
            className="panel panel-hover group flex items-center justify-between p-6"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-faint">// featured</p>
              <p className="mt-1 font-display text-xl font-bold text-ink">
                All {featuredProjects.length} case studies
              </p>
            </div>
            <Icon name="arrowUpRight" className="h-6 w-6 text-acid transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <Link
            to="/builds"
            data-cursor="button"
            className="panel panel-hover group flex items-center justify-between p-6"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-faint">// the lab</p>
              <p className="mt-1 font-display text-xl font-bold text-ink">
                {moreProjects.length} more builds
              </p>
            </div>
            <Icon name="arrowUpRight" className="h-6 w-6 text-acid transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default Works;
