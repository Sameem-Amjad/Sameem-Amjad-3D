import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import {
  links,
  profile,
  whatsappHref,
  slugify,
  getProjectBySlug,
  testimonials,
} from "../constants";
import { getServiceBySlug, SERVICES_UPDATED } from "../constants/services";
import { formatDate } from "../utils/date";
import { PageTransition } from "../components/fx";
import { Icon, PrimaryButton, GhostButton, Reveal, Eyebrow, cn } from "../components/shared";
import { track } from "../utils/analytics";

/* One page per thing people hire Sameem for.

   These exist because a service that only lives as a tab on the homepage
   can't rank for anything: it has no URL, no title of its own and no
   heading a crawler weighs. Each page answers one buyer query, backs it
   with the case studies and reviews that prove it, and ends in the same
   two asks — book a call, or message on WhatsApp.

   Everything a crawler or an assistant needs is in the static HTML: the
   FAQ answers are rendered open, not behind an accordion, because the
   answer text is the part most likely to be quoted. */

const SectionLabel = ({ n, children }) => (
  <h2 className="mono-label mb-6 flex items-center gap-2 text-acid">
    <span className="text-faint">{n}</span>
    <span className="text-faint">//</span>
    {children}
  </h2>
);

const WhatsAppCta = ({ pathname, placement }) => (
  <GhostButton
    href={whatsappHref(pathname)}
    icon="whatsapp"
    onClick={() => track("whatsapp_click", { placement, page_path: pathname })}
  >
    WhatsApp
  </GhostButton>
);

/* Reviews tagged for this service, verbatim, newest first — the same
   objects the homepage shows, so a quote can't drift between the two. */
const reviewsFor = (tags = []) =>
  testimonials.filter((t) => t.tags?.some((tag) => tags.includes(tag))).slice(0, 4);

const ServicePage = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const service = getServiceBySlug(slug);
  if (!service) return <Navigate to="/services" replace />;

  const projects = (service.projects || [])
    .map((title) => getProjectBySlug(slugify(title)))
    .filter(Boolean);
  const reviews = reviewsFor(service.reviewTags);
  const related = (service.related || []).map(getServiceBySlug).filter(Boolean);

  return (
    <PageTransition>
      {/* ── breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-10 sm:pt-32">
        <div className="anim-rise-sm flex items-center justify-between gap-4">
          <Link
            to="/services"
            data-cursor="button"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-acid"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            All services
          </Link>
          <p className="mono-label min-w-0 truncate text-faint">
            <span className="text-acid">$</span> cd ~/services/{service.slug}
          </p>
        </div>
      </div>

      {/* ── hero ──
          CSS entrances, not framer-motion: this is above the fold, and a JS
          `initial` would ship the headline as opacity:0 until hydration. */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-10 pt-10 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-20%] top-4 h-56 w-56 rounded-full bg-acid/10 blur-[100px] sm:right-[4%] sm:h-80 sm:w-80"
        />
        <div className="relative max-w-4xl">
          <div className="anim-rise-sm">
            <Eyebrow>{service.eyebrow}</Eyebrow>
          </div>
          <h1 className="anim-rise mt-5 text-balance font-display text-[2.5rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {service.h1}
            {service.h1Accent ? " " : ""}
            <span className="text-tail">{service.h1Accent}</span>
          </h1>
          <p className="anim-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={{ animationDelay: "0.08s" }}>
            {service.lede}
          </p>
          <div className="anim-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.14s" }}>
            <PrimaryButton href={links.booking} icon="calendar">
              Book a free call
            </PrimaryButton>
            <WhatsAppCta pathname={pathname} placement="service_hero" />
          </div>
          <p className="anim-rise mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] uppercase tracking-wide text-faint" style={{ animationDelay: "0.2s" }}>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="star" className="h-3.5 w-3.5 text-acid" />
              5.0 on Fiverr · 50+ projects
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="shield" className="h-3.5 w-3.5 text-acid" />
              Fixed scope, fixed price
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="zap" className="h-3.5 w-3.5 text-acid" />
              Reply within 24 hours
            </span>
            {/* Visible freshness date — these pages name tools that change
                monthly, and the same date is dateModified in the schema. */}
            <time dateTime={SERVICES_UPDATED}>Updated {formatDate(SERVICES_UPDATED)}</time>
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6 pb-8 pt-8 sm:px-10 lg:gap-24">
        {/* ── the problem ── */}
        {service.problems?.length > 0 && (
          <section>
            <SectionLabel n="01">{service.problemsTitle || "sound familiar?"}</SectionLabel>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* <li> outermost: a Reveal (a div) directly inside a <ul> breaks
                  the list for screen readers. */}
              {service.problems.map((p, i) => (
                <li key={p}>
                  <Reveal delay={(i % 2) * 0.05} className="h-full">
                    <div className="panel flex h-full items-start gap-3 p-5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
                      <span className="text-[15px] leading-relaxed text-ink/90">{p}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── what you get ── */}
        <section>
          <SectionLabel n="02">what you get</SectionLabel>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {service.includes.map((f, i) => (
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
          {service.tech?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* ── how it works ── */}
        {service.steps?.length > 0 && (
          <section>
            <SectionLabel n="03">how it works</SectionLabel>
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {service.steps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <div className="panel flex h-full flex-col p-6">
                      <span className="font-display text-4xl font-bold leading-none text-acid">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.detail}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ── proof ── */}
        {(projects.length > 0 || reviews.length > 0) && (
          <section>
            <SectionLabel n="04">proof</SectionLabel>
            {projects.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <Link
                    key={p.title}
                    to={`/work/${slugify(p.title)}`}
                    data-cursor="button"
                    className="panel panel-hover group flex h-full flex-col gap-2 p-5"
                  >
                    <span className="mono-label text-faint">{p.category}</span>
                    <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-acid">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{p.tagline || p.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-[11px] uppercase tracking-wide text-acid">
                      Read the case study
                      <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {reviews.length > 0 && (
              <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-2", projects.length > 0 && "mt-4")}>
                {reviews.map((t) => (
                  <Reveal key={`${t.name}-${t.quote.slice(0, 24)}`}>
                    <figure className="panel flex h-full flex-col gap-4 p-6">
                      <span className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Icon key={i} name="star" className="h-3 w-3 text-acid" />
                        ))}
                      </span>
                      <blockquote className="flex-1 text-[15px] leading-relaxed text-ink/90">{t.quote}</blockquote>
                      <figcaption className="font-mono text-[11px] uppercase tracking-wide text-faint">
                        {t.name} · {t.country} · {t.source}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── FAQ ── rendered open: the answers are the quotable part */}
        {service.faqs?.length > 0 && (
          <section>
            <SectionLabel n="05">questions</SectionLabel>
            <div className="border-t border-line">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-b border-line px-1 py-6 sm:px-3">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">{f.q}</h3>
                  <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{f.a}</p>
                  {f.link && (
                    <Link
                      to={f.link.to}
                      data-cursor="button"
                      className="group mt-3 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-wide text-acid"
                    >
                      {f.link.label}
                      <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── related ── */}
        {related.length > 0 && (
          <section>
            <SectionLabel n="06">related services</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  data-cursor="button"
                  className="panel panel-hover group flex items-center gap-4 p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-acid transition-colors group-hover:border-acid">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">{r.name}</span>
                    <span className="block text-[12px] leading-snug text-faint">{r.summary}</span>
                  </span>
                  <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-acid" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
        <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <p className="mono-label mb-2 text-acid">// next step</p>
            <p className="font-display text-2xl font-bold text-ink sm:text-3xl">{service.ctaTitle}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Thirty minutes with {profile.name.split(" ")[0]}, free. You leave with a scope, a timeline and a
              price — whether or not we work together.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href={links.booking} icon="calendar">Book a call</PrimaryButton>
            <WhatsAppCta pathname={pathname} placement="service_cta" />
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicePage;
