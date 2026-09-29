import { Fragment } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { links, profile, whatsappHref } from "../constants";
import { getGuideBySlug } from "../constants/guides";
import { getServiceBySlug } from "../constants/services";
import { PageTransition } from "../components/fx";
import { Icon, PrimaryButton, GhostButton, Eyebrow } from "../components/shared";
import { formatDate } from "../utils/date";
import { track } from "../utils/analytics";

/* One guide, one problem, solved completely.

   No framer-motion anywhere on this page: it is a document, and every word
   of it should be in the prerendered HTML at full opacity — the text is
   what ranks and what gets quoted. CSS entrances only, above the fold. */

/* `inline code` in backticks → <code>. The only markup guides support, so
   the data stays plain strings and nothing can inject HTML. */
const Rich = ({ text }) =>
  text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
        {part.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

const Block = ({ block }) => {
  if (block.code) {
    return (
      // Focusable so a keyboard user can scroll the long lines on a phone.
      <pre
        tabIndex={0}
        role="region"
        aria-label={`${block.lang || "code"} example`}
        className="overflow-x-auto rounded-xl border border-line bg-base-2 p-5 font-mono text-[13px] leading-relaxed text-ink/90"
      >
        <code data-lang={block.lang}>{block.code}</code>
      </pre>
    );
  }
  if (block.list) {
    return (
      <ul className="flex flex-col gap-3">
        {block.list.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[16px] leading-relaxed text-muted">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acid" aria-hidden="true" />
            <span>
              <Rich text={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="text-[16px] leading-relaxed text-muted sm:text-[17px]">
      <Rich text={block.p} />
    </p>
  );
};

const GuidePage = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const guide = getGuideBySlug(slug);
  if (!guide) return <Navigate to="/guides" replace />;
  const service = getServiceBySlug(guide.service);

  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-6 pb-10 pt-28 sm:px-10 sm:pt-32">
        <div className="anim-rise-sm flex items-center justify-between gap-4">
          <Link
            to="/guides"
            data-cursor="button"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-acid"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            All guides
          </Link>
        </div>

        <header className="mt-10">
          <div className="anim-rise-sm">
            <Eyebrow>guide</Eyebrow>
          </div>
          <h1 className="anim-rise mt-5 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {guide.title}
          </h1>
          <p className="anim-rise mt-5 text-lg leading-relaxed text-muted" style={{ animationDelay: "0.08s" }}>
            {guide.summary}
          </p>
          {/* Byline: who wrote it and when, visibly — the same facts as the
              article's author and dateModified in the schema. */}
          <p className="anim-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-wide text-faint" style={{ animationDelay: "0.14s" }}>
            <span>
              By{" "}
              <Link to="/" className="text-ink transition-colors hover:text-acid">
                {profile.name}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={guide.updated}>Updated {formatDate(guide.updated)}</time>
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-12">
          {guide.sections.map((section) => (
            <section key={section.h2} className="flex flex-col gap-5">
              <h2 className="font-display text-2xl font-bold leading-snug text-ink sm:text-[1.7rem]">{section.h2}</h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}
        </div>

        {service && (
          <aside className="panel mt-16 flex flex-col gap-5 p-7 sm:p-8">
            <p className="mono-label text-acid">// need it fixed for you?</p>
            <p className="font-display text-2xl font-bold text-ink">{service.name}</p>
            <p className="text-[15px] leading-relaxed text-muted">{service.summary}</p>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryButton to={`/services/${service.slug}`} icon="arrowRight">
                How it works
              </PrimaryButton>
              <GhostButton
                href={whatsappHref(pathname)}
                icon="whatsapp"
                onClick={() => track("whatsapp_click", { placement: "guide", page_path: pathname })}
              >
                WhatsApp
              </GhostButton>
              <a
                href={links.booking}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="inline-flex min-h-[44px] items-center px-2 font-mono text-[13px] uppercase tracking-wider text-muted transition-colors hover:text-acid"
              >
                Book a call
              </a>
            </div>
          </aside>
        )}
      </article>
    </PageTransition>
  );
};

export default GuidePage;
