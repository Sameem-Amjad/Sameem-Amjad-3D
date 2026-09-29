import { Link, useLocation } from "react-router-dom";
import { links, whatsappHref } from "../constants";
import { servicePages } from "../constants/services";
import { PageTransition } from "../components/fx";
import { Icon, PrimaryButton, GhostButton, Eyebrow, Reveal } from "../components/shared";
import { track } from "../utils/analytics";

/* The services hub: one card per service page, so every one of them is a
   click from the nav and linked from a page that isn't the homepage. */
const ServicesPage = () => {
  const { pathname } = useLocation();

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
        <div className="max-w-3xl">
          <div className="anim-rise-sm">
            <Eyebrow>~/services · {servicePages.length} ways to work together</Eyebrow>
          </div>
          <h1 className="anim-rise mt-5 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            What I can build <span className="text-tail">or fix for you.</span>
          </h1>
          <p className="anim-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.08s" }}>
            Full-stack and AI engineering, senior-led from the first call to the launch. Pick the
            one that sounds like your problem, or book a call and I'll tell you which it actually is.
          </p>
        </div>

        <h2 className="sr-only">Services</h2>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {servicePages.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.06} className="h-full">
              <Link
                to={`/services/${s.slug}`}
                data-cursor="button"
                className="panel panel-hover group flex h-full flex-col gap-4 p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line text-acid transition-colors group-hover:border-acid">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-acid">
                  {s.name}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">{s.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-[12px] uppercase tracking-wide text-acid">
                  See how it works
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-10">
            <PrimaryButton href={links.booking} icon="calendar">
              Book a free call
            </PrimaryButton>
            <GhostButton
              href={whatsappHref(pathname)}
              icon="whatsapp"
              onClick={() => track("whatsapp_click", { placement: "services_hub", page_path: pathname })}
            >
              WhatsApp
            </GhostButton>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
