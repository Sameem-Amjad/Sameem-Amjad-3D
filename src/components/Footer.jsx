import { Link } from "react-router-dom";
import { links, profile } from "../constants";
import { Icon, Magnetic } from "./shared";

const explore = [
  { label: "Work", to: "/work" },
  { label: "Builds", to: "/builds" },
  { label: "Services", to: "/#services" },
  { label: "Stack", to: "/#stack" },
  { label: "Process", to: "/#process" },
  { label: "Experience", to: "/#experience" },
  { label: "Reviews", to: "/#testimonials" },
  { label: "FAQ", to: "/#faq" },
];
const socials = [
  { label: "DevoraX", href: links.devorax },
  { label: "Fiverr", href: links.fiverr },
  { label: "Email", href: links.email },
];

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-line">
    {/* oversized wordmark bleeding off the bottom edge — an editorial sign-off
        that costs one element and makes the page feel finished */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[3vw] left-1/2 w-full -translate-x-1/2 select-none text-center font-display text-[22vw] font-bold leading-none tracking-tighter text-ink/[0.035]"
    >
      DevoraX
    </span>

    <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-10">
      <div className="flex flex-col justify-between gap-14 lg:flex-row">
        <div className="max-w-md">
          <p className="mono-label text-acid">// let's build something</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            Ready when <br /> you are.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            Thirty minutes, no pitch deck. You'll leave with a scope, a timeline and a
            number — whether or not we work together.
          </p>
          <Magnetic>
            <a
              href={links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="group relative mt-7 inline-flex min-h-[48px] items-center gap-2 overflow-hidden rounded-full bg-acid px-6 font-mono text-[13px] font-semibold uppercase tracking-wider text-night shadow-glow-sm transition-shadow hover:shadow-glow"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
              />
              <Icon name="calendar" className="relative h-4 w-4" strokeWidth={2} />
              <span className="relative">Book a call</span>
            </a>
          </Magnetic>
        </div>

        <div className="flex gap-12 sm:gap-20">
          <nav aria-label="Footer">
            <p className="mono-label text-faint">Explore</p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {explore.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    data-cursor="button"
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-acid"
                  >
                    <span className="h-px w-0 bg-acid transition-all duration-300 group-hover:w-4" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mono-label text-faint">Connect</p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor="button"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-acid"
                  >
                    {s.label}
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.company}
        </p>
        <div className="flex items-center gap-5">
          <p className="hidden sm:block">Built with React · Framer Motion · Tailwind</p>
          <a
            href="#hero"
            data-cursor="button"
            className="inline-flex items-center gap-1.5 uppercase tracking-wide transition-colors hover:text-acid"
          >
            Back to top
            <Icon name="arrowDown" className="h-3.5 w-3.5 rotate-180" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
