import { Link } from "react-router-dom";
import { links, profile } from "../constants";
import { Icon } from "./shared";

const explore = [
  { label: "Work", to: "/work" },
  { label: "Builds", to: "/builds" },
  { label: "Services", to: "/#services" },
  { label: "Contact", to: "/#contact" },
];
const socials = [
  { label: "DevoraX", href: links.devorax },
  { label: "Fiverr", href: links.fiverr },
  { label: "Email", href: links.email },
];

const Footer = () => (
  <footer className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 sm:px-10">
    <div className="border-t border-line pt-12">
      <div className="flex flex-col justify-between gap-12 lg:flex-row">
        <div className="max-w-md">
          <p className="mono-label text-acid">// let's build something</p>
          <h3 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Ready when <br /> you are.
          </h3>
          <a href={links.calendly} target="_blank" rel="noopener noreferrer" data-cursor="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 font-mono text-[13px] font-semibold uppercase tracking-wider text-night">
            <Icon name="calendar" className="h-4 w-4" strokeWidth={2} />
            Book a call
          </a>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="mono-label text-faint">Explore</p>
            <ul className="mt-4 flex flex-col gap-3">
              {explore.map((n) => (
                <li key={n.label}>
                  <Link to={n.to} data-cursor="button" className="text-sm text-muted transition-colors hover:text-acid">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label text-faint">Connect</p>
            <ul className="mt-4 flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor="button"
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-acid">
                    {s.label}
                    <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.company}</p>
        <p>Built with React · Framer Motion · Tailwind</p>
      </div>
    </div>
  </footer>
);

export default Footer;
