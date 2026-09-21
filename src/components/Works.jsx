import { Link } from "react-router-dom";
import { featuredProjects, moreProjects, allProjects } from "../constants";
import { SectionHeading, Section, Reveal, Icon } from "./shared";
import Showcase from "./Showcase";

const routes = [
  {
    to: "/work",
    label: "// featured",
    title: `All ${featuredProjects.length} case studies`,
    sub: "Full write-ups: the problem, the build, the numbers",
  },
  {
    to: "/builds",
    label: "// the lab",
    title: `${moreProjects.length} more builds`,
    sub: "Smaller products, experiments and client one-offs",
  },
];

const Works = () => (
  <Section id="work">
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
          className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-sm uppercase tracking-wide text-acid"
        >
          All {allProjects.length} projects
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      }
    />

    <div className="mt-14">
      <Showcase items={featuredProjects.slice(0, 6)} />
    </div>

    <Reveal delay={0.1}>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {routes.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            data-cursor="button"
            className="panel panel-hover group flex items-center justify-between gap-4 p-6"
          >
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-wide text-faint">{r.label}</p>
              <p className="mt-1 font-display text-xl font-bold text-ink">{r.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted">{r.sub}</p>
            </div>
            <Icon
              name="arrowUpRight"
              className="h-6 w-6 shrink-0 text-acid transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        ))}
      </div>
    </Reveal>
  </Section>
);

export default Works;
