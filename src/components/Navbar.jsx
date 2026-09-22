import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { links, profile } from "../constants";
import { Icon, PrimaryButton, cn } from "./shared";
import { useCommandPalette } from "./CommandPalette";

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
  const { setOpen: setPalette } = useCommandPalette();

  /* The shortcut hint reads ⌘K on Apple hardware and Ctrl K elsewhere.
     Decided after mount, not at render: the prerendered HTML is the same
     for everyone, so anything platform-specific in the first paint would
     be a hydration mismatch. The chip reserves its width, so the text swap
     for a Windows visitor moves nothing. */
  const [mac, setMac] = useState(true);
  useEffect(() => {
    const p = navigator.userAgentData?.platform || navigator.platform || "";
    setMac(/mac|iphone|ipad|ipod/i.test(p));
  }, []);

  const openPalette = () => {
    setOpen(false);
    setPalette(true);
  };

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

  /* CSS entrance, not framer-motion: the nav is above the fold, and a JS
     `initial` ships opacity:0 in the prerendered HTML — invisible until the
     bundle hydrates. See `.anim-*` in index.css. */
  return (
    <header className="anim-drop fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
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

        <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
          <button
            type="button"
            onClick={openPalette}
            data-cursor="button"
            aria-label="Open command menu"
            aria-keyshortcuts="Meta+K Control+K"
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-line pl-2.5 pr-1.5 font-mono text-[10px] uppercase tracking-wider text-faint transition-colors hover:border-acid/40 hover:text-ink"
          >
            <Icon name="search" className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="kbd min-w-[2.9rem]">{mac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <span className="hidden items-center gap-1.5 border-r border-line pr-4 font-mono text-[10px] uppercase tracking-wider text-faint lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            Available
          </span>
          <PrimaryButton href={links.booking} icon="calendar" className="px-5 py-2.5">
            Book a call
          </PrimaryButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openPalette}
            data-cursor="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-acid hover:text-acid"
            aria-label="Search"
          >
            <Icon name="search" />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink transition-colors hover:border-acid hover:text-acid"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
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
              href={links.booking}
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
    </header>
  );
};

export default Navbar;
