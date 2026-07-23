import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { links, profile } from "../constants";
import { Icon, PrimaryButton, cn } from "./shared";

const items = [
  { label: "Work", to: "/work" },
  { label: "Builds", to: "/builds" },
  { label: "Services", to: "/#services" },
  { label: "Process", to: "/#process" },
  { label: "Contact", to: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled ? "border border-line bg-base/70 backdrop-blur-xl" : "border border-transparent"
        )}
      >
        <Link to="/" data-cursor="button" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-acid font-display text-sm font-bold text-night">
            SA
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-bold text-ink">{profile.name}</span>
            <span className="font-mono text-[10px] text-faint">{profile.role} · {profile.company}</span>
          </span>
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {items.map((n) => {
            const active = n.to === pathname;
            return (
              <li key={n.label}>
                <Link
                  to={n.to}
                  data-cursor="button"
                  className={cn(
                    "rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
                    active ? "text-acid" : "text-muted hover:text-ink"
                  )}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <PrimaryButton href={links.calendly} icon="calendar" className="px-5 py-2.5">
            Book a call
          </PrimaryButton>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          data-cursor="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink md:hidden"
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-[70px] rounded-2xl border border-line bg-base/95 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {items.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    className="block rounded-lg px-4 py-3 font-mono text-sm uppercase tracking-wide text-muted hover:bg-surface hover:text-acid"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-acid px-5 py-3 font-mono text-[13px] font-semibold uppercase tracking-wider text-night"
            >
              <Icon name="calendar" className="h-4 w-4" strokeWidth={2} />
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
