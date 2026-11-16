import { Fragment } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { links, profile, whatsappHref } from "../constants";
import { guides, getGuideBySlug } from "../constants/guides";
import { doors } from "../constants/doors";
import { PageTransition } from "../components/fx";
import { Icon, PrimaryButton, GhostButton, Eyebrow, InlineLink } from "../components/shared";
import { formatDate } from "../utils/date";
import { track } from "../utils/analytics";

/* One guide, one problem, solved completely.

   No framer-motion anywhere on this page: it is a document, and every word
   of it should be in the prerendered HTML at full opacity — the text is
   what ranks and what gets quoted. CSS entrances only, above the fold. */

/* `inline code` in backticks → <code>, and [anchor text](door) → a link to the
   guide's door on thedevorax.tech (the URL comes from constants/doors.js, so
   it is written once). The only markup guides support, so the data stays
   plain strings and nothing can inject HTML. */
const TOKEN = /(`[^`]+`|\[[^\]]+\]\(door\))/;

const Rich = ({ text, door }) =>
  text.split(TOKEN).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\(door\)$/.exec(part);
    if (link) {
      if (!door) throw new Error(`Guide text links to its door, but the guide has none: "${link[1]}"`);
      return (
        <InlineLink key={i} href={door.url}>
          {link[1]}
        </InlineLink>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });

const Block = ({ block, door }) => {
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
              <Rich text={item} door={door} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="text-[16px] leading-relaxed text-muted sm:text-[17px]">
      <Rich text={block.p} door={door} />
    </p>
  );
};

const GuidePage = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const guide = getGuideBySlug(slug);
  if (!guide) return <Navigate to="/guides" replace />;
  // The one page on thedevorax.tech this guide leads to (constants/doors.js).
  const door = doors[guide.door];
  const others = guides.filter((g) => g.slug !== guide.slug);

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
          {/* The guide's door, once, in the first screen: a sentence a reader and
              a crawler both follow. The close below names it again. */}
          {door && (
            <p className="anim-rise mt-4 text-[15px] leading-relaxed text-muted" style={{ animationDelay: "0.11s" }}>
              The wider job is described on DevoraX's page for{" "}
              <InlineLink href={door.url}>{door.phrase}</InlineLink>.
            </p>
          )}
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
                <Block key={i} block={block} door={door} />
              ))}
            </section>
          ))}
        </div>

        {/* The close: the guide's last section names its door once, with a link.
            This strip is only how to reach Sameem, with one link to /book. */}
        <aside className="panel mt-16 flex flex-col gap-5 p-7 sm:p-8">
          <p className="mono-label text-acid">// questions about your own app?</p>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton href={links.booking} icon="calendar">
              Book a call
            </PrimaryButton>
            <GhostButton
              href={whatsappHref(pathname)}
              icon="whatsapp"
              onClick={() => track("whatsapp_click", { placement: "guide", page_path: pathname })}
            >
              WhatsApp
            </GhostButton>
          </div>
        </aside>

        {others.length > 0 && (
          <nav aria-labelledby="more-guides" className="mt-16 border-t border-line pt-10">
            <h2 id="more-guides" className="mono-label text-faint">
              More guides
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/guides/${g.slug}`}
                    data-cursor="button"
                    className="group inline-flex items-start gap-2 text-[16px] leading-snug text-muted transition-colors hover:text-acid"
                  >
                    <Icon name="arrowRight" className="mt-1 h-4 w-4 shrink-0 text-acid transition-transform group-hover:translate-x-0.5" />
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>
    </PageTransition>
  );
};

export default GuidePage;
