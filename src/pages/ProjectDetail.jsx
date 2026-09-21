import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  getProjectBySlug,
  getAdjacentProjects,
  slugify,
  profile,
  links,
} from "../constants";
import { PageTransition } from "../components/fx";
import {
  Icon,
  PrimaryButton,
  GhostButton,
  MaskLine,
  Reveal,
  LiveLinks,
  SmartImage,
  Eyebrow,
  cn,
} from "../components/shared";

/* Terminal-style numbered section label: 01 // the problem.
   An h2, not a p: it is the visual section heading, and the feature cards
   below it are h3s — as a p the page stepped h1 -> h3 and the case-study
   structure was invisible to crawlers on the pages most meant to rank.
   `mono-label` carries the sizing, so nothing moves. */
const SectionLabel = ({ n, children }) => (
  <h2 className="mono-label mb-5 flex items-center gap-2 text-acid">
    <span className="text-faint">{n}</span>
    <span className="text-faint">//</span>
    {children}
  </h2>
);

/* One row in the spec.config panel */
const SpecRow = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-3 last:border-0 last:pb-0">
    <dt className="shrink-0 text-faint">{label}</dt>
    <dd className="min-w-0 break-words text-right text-ink">{value}</dd>
  </div>
);

/* Full-width kinetic prev / next strip */
const NavStrip = ({ dir, project }) => (
  <Link
    to={`/work/${slugify(project.title)}`}
    data-cursor="button"
    className={cn(
      "group relative flex flex-col gap-2 p-8 transition-colors hover:bg-acid/[0.03] sm:p-12",
      dir === "next" && "sm:items-end sm:border-l sm:border-line sm:text-right"
    )}
  >
    <span className="mono-label flex items-center gap-2 text-faint transition-colors group-hover:text-acid">
      {dir === "prev" && (
        <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
      )}
      {dir === "prev" ? "Previous" : "Next"} project
      {dir === "next" && (
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </span>
    <span className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-acid sm:text-3xl">
      {project.title}
    </span>
  </Link>
);

const ProjectDetail = () => {
  const { slug } = useParams();

  // Hooks must run unconditionally — keep them above the early return.
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.24]);

  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/work" replace />;

  const { prev, next } = getAdjacentProjects(slug);
  const features = project.features || [];
  const platforms = [
    project.web && "Web",
    project.android && "Android",
    project.ios && "iOS",
  ].filter(Boolean);

  const lead = project.overview || project.tagline || project.description;
  // Only show a separate "problem" block when it won't duplicate the lead.
  const problemText = project.problem || (project.tagline ? project.description : null);
  const hasLinks = project.web || project.android || project.ios;
  const previewUrl =
    project.web || project.android || project.ios || `devorax.tech/${slug}`;

  return (
    <PageTransition>
      {/* ── breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-10 sm:pt-32">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/work"
              data-cursor="button"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-acid"
            >
              <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
            <p className="mono-label min-w-0 truncate text-faint">
              <span className="text-acid">$</span> cd ~/work/{slug}
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── hero ── */}
      <section ref={heroRef} className="relative overflow-hidden mx-auto max-w-7xl px-6 pb-6 pt-10 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-20%] top-4 h-56 w-56 rounded-full bg-ember/12 blur-[100px] sm:right-[-4%] sm:top-12 sm:h-80 sm:w-80 lg:right-[4%] lg:h-96 lg:w-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] top-24 h-40 w-40 rounded-full bg-acid/10 blur-[80px] lg:right-[14%]"
        />

        <div className="relative">
          <Reveal>
            <Eyebrow>{project.category}</Eyebrow>
          </Reveal>
          <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight text-ink [overflow-wrap:anywhere] xs:text-5xl sm:text-7xl sm:leading-[0.95] lg:text-[5.5rem]">
            <MaskLine>{project.title}</MaskLine>
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {lead}
            </p>
          </Reveal>
          {hasLinks && (
            <Reveal delay={0.16}>
              <div className="mt-7">
                <LiveLinks web={project.web} android={project.android} ios={project.ios} size="lg" />
              </div>
            </Reveal>
          )}
        </div>

        {/* framed, parallax hero image */}
        <Reveal delay={0.12}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface/40 shadow-soft">
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-ember/70" />
              <span className="h-3 w-3 rounded-full bg-acid/60" />
              <span className="h-3 w-3 rounded-full bg-muted/40" />
              <span className="ml-3 min-w-0 truncate font-mono text-[11px] text-faint">{previewUrl}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                <SmartImage
                  src={project.image}
                  alt={project.title}
                  eager
                  width={1400}
                  className="h-full w-full object-cover"
                  fallback={
                    <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", project.accent)}>
                      <span className="font-display text-8xl font-bold text-night/70">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  }
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/50 via-transparent to-transparent" />
              <div className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── spec rail + narrative ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* sticky spec.config */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="panel p-6">
              <p className="mono-label mb-5 flex items-center gap-2 text-faint">
                <Icon name="terminal" className="h-4 w-4 text-acid" />
                spec.config
              </p>
              <dl className="flex flex-col gap-3 font-mono text-sm">
                <SpecRow label="role" value={profile.role} />
                <SpecRow label="category" value={project.category} />
                {platforms.length > 0 && <SpecRow label="platforms" value={platforms.join(" · ")} />}
                {project.year && <SpecRow label="year" value={project.year} />}
                <SpecRow label="discipline" value={project.filter} />
              </dl>

              {project.tags?.length > 0 && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="mono-label mb-3 text-faint">stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hasLinks && (
                <div className="mt-6 border-t border-line pt-5">
                  <LiveLinks web={project.web} android={project.android} ios={project.ios} />
                </div>
              )}
            </div>
          </aside>

          {/* narrative */}
          <div className="flex flex-col gap-14">
            {problemText && (
              <div>
                <SectionLabel n="01">the problem</SectionLabel>
                <Reveal>
                  <p className="text-xl leading-relaxed text-ink/90 sm:text-2xl">{problemText}</p>
                </Reveal>
              </div>
            )}

            {project.approach && (
              <div>
                <SectionLabel n="02">the approach</SectionLabel>
                <Reveal>
                  <p className="max-w-2xl text-lg leading-relaxed text-muted">{project.approach}</p>
                </Reveal>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <SectionLabel n="03">what I built</SectionLabel>
                <div className="mt-2 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                  {features.map((f, i) => (
                    <Reveal key={f.title} delay={(i % 2) * 0.06} className="h-full">
                      <div className="flex h-full flex-col bg-base p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <Icon name="check" className="h-4 w-4 text-acid" strokeWidth={2.4} />
                          <span className="font-mono text-[11px] uppercase tracking-wide text-faint">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.detail}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── impact band ── */}
      {project.stats?.length > 0 && (
        <section className="border-y border-line bg-surface/30">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-20">
            <p className="mono-label mb-10 text-acid">
              <span className="text-faint">//</span> the impact
            </p>
            <div className="flex flex-wrap gap-x-12 gap-y-10">
              {project.stats.map((s) => (
                <div key={s.k} className="min-w-[130px] flex-1">
                  <div className="font-display text-4xl font-bold leading-none text-acid sm:text-6xl">
                    {s.v}
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-wide text-faint sm:text-xs">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
            {project.results && (
              <Reveal delay={0.1}>
                <p className="mt-12 max-w-2xl text-lg leading-relaxed text-muted">{project.results}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ── pull quote ── */}
      {project.quote && (
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10 lg:py-28">
          <Reveal>
            <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-4xl sm:leading-[1.25]">
              <span className="text-acid">“</span>
              {project.quote}
              <span className="text-acid">”</span>
            </p>
            <p className="mono-label mt-6 text-faint">
              — {profile.name}, {profile.role}
            </p>
          </Reveal>
        </section>
      )}

      {/* ── prev / next ── */}
      <nav className="border-t border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2">
          {prev && <NavStrip dir="prev" project={prev} />}
          {next && <NavStrip dir="next" project={next} />}
        </div>
      </nav>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="mono-label mb-2 text-acid">// let's build yours</p>
            <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Have a product like this in mind?
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href={links.booking} icon="calendar">Book a call</PrimaryButton>
            <GhostButton href={links.email} icon="mail">Email me</GhostButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProjectDetail;
