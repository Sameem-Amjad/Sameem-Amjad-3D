import { Link } from "react-router-dom";
import { guides } from "../constants/guides";
import { PageTransition } from "../components/fx";
import { Icon, Eyebrow } from "../components/shared";
import { formatDate } from "../utils/date";

/* The guides index. Plain and static on purpose — see GuidePage. */
const GuidesPage = () => (
  <PageTransition>
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
      <div className="anim-rise-sm">
        <Eyebrow>~/guides</Eyebrow>
      </div>
      <h1 className="anim-rise mt-5 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
        Fixes for apps <span className="text-tail">that break in production.</span>
      </h1>
      <p className="anim-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.08s" }}>
        Short, complete fixes for problems that apps built with Lovable, Bolt, Replit and Cursor
        commonly hit in production, with the exact code or config for each.
      </p>

      <h2 className="sr-only">All guides</h2>
      <div className="mt-14 flex flex-col gap-4">
        {guides.map((g) => (
          <Link
            key={g.slug}
            to={`/guides/${g.slug}`}
            data-cursor="button"
            className="panel panel-hover group flex flex-col gap-3 p-7"
          >
            <h3 className="font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-acid sm:text-2xl">
              {g.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-muted">{g.summary}</p>
            <span className="flex items-center justify-between gap-4 pt-1 font-mono text-[11px] uppercase tracking-wide text-faint">
              <time dateTime={g.updated}>Updated {formatDate(g.updated)}</time>
              <span className="inline-flex items-center gap-1.5 text-acid">
                Read
                <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  </PageTransition>
);

export default GuidesPage;
