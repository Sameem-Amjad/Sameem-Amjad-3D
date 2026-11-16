import { useLocation } from "react-router-dom";
import { links, whatsappHref, profile, devoraxStatement } from "../constants";
import { doors, devoraxPages } from "../constants/doors";
import { PageTransition } from "../components/fx";
import { PrimaryButton, GhostButton, Eyebrow, InlineLink } from "../components/shared";
import { track } from "../utils/analytics";

/* A short personal page. thedevorax.tech owns every offer and landing page,
   so this page says who Sameem is, then links to the page there for each kind
   of job. No offer ladder, no prices, no packages: the links carry those.

   Plain text and CSS entrances only, like /guides: every word is in the
   prerendered HTML at full opacity. */

const jobs = [
  {
    lead: "An AI-built app that works in a demo and breaks with real users:",
    link: { href: doors.audit.url, text: doors.audit.phrase },
    after: ".",
  },
  {
    lead: "An AI-built app that should be in the App Store and Google Play:",
    link: { href: doors.lovable.url, text: doors.lovable.phrase },
    after: ". The stores decide approval.",
  },
  {
    lead: "A marketplace already running on Sharetribe:",
    link: { href: doors.sharetribe.url, text: doors.sharetribe.phrase },
    after: ".",
  },
  {
    lead: "A new marketplace to build:",
    link: { href: doors.marketplace.url, text: doors.marketplace.phrase },
    after: ".",
  },
  {
    lead: "Everything else, with the prices:",
    link: { href: devoraxPages.services, text: "services and prices on thedevorax.tech" },
    after: ".",
  },
];

const ServicesPage = () => {
  const { pathname } = useLocation();

  return (
    <PageTransition>
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
        <div className="anim-rise-sm">
          <Eyebrow>~/services</Eyebrow>
        </div>
        <h1 className="anim-rise mt-5 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
          Services, <span className="text-tail">and where to find them.</span>
        </h1>

        <div className="anim-rise mt-8 flex flex-col gap-5" style={{ animationDelay: "0.08s" }}>
          <p className="text-lg leading-relaxed text-muted">
            I'm {profile.name}, a freelance full-stack developer based in Pakistan, and I founded
            DevoraX. I work on Next.js, React Native, Supabase, Stripe and AWS, including apps built
            with AI tools such as Lovable, Bolt, Replit and Cursor.
          </p>
          <p className="text-lg leading-relaxed text-muted">{devoraxStatement}</p>
          <p className="text-lg leading-relaxed text-muted">
            The page for each kind of job, and its price, is on thedevorax.tech. This site keeps my
            portfolio and my guides.
          </p>
        </div>

        <h2 className="mono-label mt-14 text-acid">where each job is described</h2>
        <ul className="anim-rise mt-6 flex flex-col gap-4" style={{ animationDelay: "0.14s" }}>
          {jobs.map((j) => (
            <li key={j.link.href} className="flex items-start gap-3 text-[16px] leading-relaxed text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acid" aria-hidden="true" />
              <span>
                {j.lead} <InlineLink href={j.link.href}>{j.link.text}</InlineLink>
                {j.after}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[16px] leading-relaxed text-muted">
          My own page about the work I do in Next.js is{" "}
          <InlineLink to="/services/nextjs-developer">Next.js development</InlineLink>. For the fixes
          behind each of these jobs, see the <InlineLink to="/guides">guides</InlineLink>.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-10">
          <PrimaryButton href={links.booking} icon="calendar">
            Book a call
          </PrimaryButton>
          <GhostButton
            href={whatsappHref(pathname)}
            icon="whatsapp"
            onClick={() => track("whatsapp_click", { placement: "services_hub", page_path: pathname })}
          >
            WhatsApp
          </GhostButton>
        </div>
      </section>
    </PageTransition>
  );
};

export default ServicesPage;
