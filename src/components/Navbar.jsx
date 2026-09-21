import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { links, profile } from "../constants";
import { Icon, PrimaryButton, cn } from "./shared";

/* `watch` is the in-page section id this item highlights for, when we're on
   the home route. Route items (Work / Builds) highlight on pathname instead. */
const items = [
  { label: "Work", to: "/work" },
  { label: "Builds", to: "/builds" },
  { label: "Services", to: "/#services", watch: "services" },
  { label: "Stack", to: "/#stack", watch: "stack" },
  { label: "Process", to: "/#process", watch: "process" },
  { label: "Experience", to: "/#experience", watch: "experience" },
  { label: "Contact", to: "/#contact", watch: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the mobile sheet so the background doesn't scroll
  // under it when someone drags the menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll spy. A section counts as active once its top passes the upper
  // third of the viewport, which matches where the eye actually is.
  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const ids = items.filter((i) => i.watch).map((i) => i.watch);
    const spy = () => {
      const line = window.innerHeight * 0.34;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [onHome]);

  const isActive = (n) => (n.watch ? onHome && active === n.watch : pathname === n.to);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-300 sm:px-4",
          scrolled ? "glass shadow-lift" : "border border-transparent"
        )}
      >
        <Link
          to="/"
          data-cursor="button"
          className="flex shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2"
          aria-label={`${profile.name} — home`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-acid font-display text-sm font-bold text-night shadow-glow-sm">
            SA
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-bold text-ink">{profile.name}</span>
            <span className="font-mono text-[10px] text-faint">
              {profile.role} · {profile.company}
            </span>
          </span>
        </Link>

        {/* The active pill is a shared layoutId, so it slides between items
            instead of popping — the one bit of chrome people notice. */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {items.map((n) => {
            const on = isActive(n);
            return (
              <li key={n.label} className="relative">
                <Link
                  to={n.to}
                  data-cursor="button"
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 lg:px-4 lg:text-xs",
                    on ? "text-acid" : "text-muted hover:text-ink"
                  )}
                >
                  {n.label}
                </Link>
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-acid/25 bg-acid/10"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <span className="hidden items-center gap-1.5 border-r border-line pr-4 font-mono text-[10px] uppercase tracking-wider text-faint lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            Available
          </span>
          <PrimaryButton href={links.calendly} icon="calendar" className="px-5 py-2.5">
            Book a call
          </PrimaryButton>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          data-cursor="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-acid hover:text-acid md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute inset-x-4 top-[74px] rounded-2xl p-3 shadow-lift md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {items.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    className={cn(
                      "flex min-h-[48px] items-center justify-between rounded-xl px-4 font-mono text-sm uppercase tracking-wide transition-colors",
                      isActive(n) ? "bg-acid/10 text-acid" : "text-muted hover:bg-surface hover:text-ink"
                    )}
                  >
                    {n.label}
                    <Icon name="arrowUpRight" className="h-4 w-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-acid px-5 font-mono text-[13px] font-semibold uppercase tracking-wider text-night"
            >
              <Icon name="calendar" className="h-4 w-4" strokeWidth={2} />
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
