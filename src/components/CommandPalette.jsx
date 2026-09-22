import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "../constants";
import { buildCommands } from "../constants/commands";
import { filterCommands, readSystem, GROUPS } from "../utils/palette";
import { Icon, cn } from "./shared";

/* ⌘K / Ctrl+K command menu.

   Closed, it renders nothing — so the prerendered HTML is unchanged, there
   is no hydration mismatch, and nothing is added to the LCP path. Open, it
   is a single combobox + listbox: focus stays in the field and the arrow
   keys drive the list, which is the pattern screen readers already know
   from cmdk / Spotlight-style menus. Every entry comes from
   constants/commands.js, so it can never disagree with the nav or the
   sitemap about what exists. */

const Ctx = createContext({
  open: false,
  setOpen: () => {},
  toggle: () => {},
  returnTo: { current: null },
});
export const useCommandPalette = () => useContext(Ctx);

export const CommandPaletteProvider = ({ children }) => {
  const [open, setOpenState] = useState(false);

  /* Mirror of `open` for the callbacks below, so they can read the current
     value without depending on it. If they closed over `open` they would
     take a new identity on every toggle, and the palette's "close when the
     route changes" effect — which lists setOpen as a dependency — would
     fire the instant the menu opened and shut it again. */
  const openRef = useRef(false);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  /* Where focus was when the menu was asked for, so Escape can hand it
     back. Captured here, at the request, and not in the palette's own
     effect: the field's autoFocus fires during React's commit, so by the
     time any effect runs document.activeElement is already the field and
     the trail back to the trigger is gone. */
  const returnTo = useRef(null);
  const setOpen = useCallback((next) => {
    if (next && !openRef.current && typeof document !== "undefined") {
      returnTo.current = document.activeElement;
    }
    setOpenState(next);
  }, []);
  const toggle = useCallback(() => setOpen(!openRef.current), [setOpen]);

  const value = useMemo(() => ({ open, setOpen, toggle, returnTo }), [open, setOpen, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

/* "/" must never steal a keystroke from a field the visitor is typing in. */
const isEditable = (t) =>
  !!t &&
  (t.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(String(t.tagName).toUpperCase()));

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older Safari / non-secure contexts: fall back to a hidden textarea.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
};

const Row = ({ cmd, index, active, tag, flash, onHover, onSelect }) => (
  <div
    id={`palette-${cmd.id}`}
    role="option"
    aria-selected={active}
    data-index={index}
    data-cursor="button"
    /* mousemove, not mouseenter: when the list scrolls under a resting
       pointer, the row that slides beneath it must not steal the selection
       from the arrow keys. */
    onMouseMove={() => onHover(index)}
    onClick={() => onSelect(cmd)}
    className={cn(
      "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-100",
      active ? "bg-acid/10" : "hover:bg-white/[0.02]"
    )}
  >
    <span
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors",
        active ? "border-acid/30 text-acid" : "border-line text-faint"
      )}
    >
      <Icon name={cmd.icon} className="h-4 w-4" />
    </span>
    <span className="min-w-0 flex-1">
      <span className={cn("block truncate text-[14px] font-medium", active ? "text-ink" : "text-ink/85")}>
        {cmd.label}
      </span>
      {cmd.sub && <span className="block truncate text-[12px] text-faint">{cmd.sub}</span>}
    </span>
    {tag && (
      <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-wide text-faint sm:inline">
        {tag}
      </span>
    )}
    <span className="flex min-w-[3rem] shrink-0 justify-end whitespace-nowrap font-mono text-[10px] text-faint">
      {flash ? (
        <span className="text-acid">copied ✓</span>
      ) : active ? (
        <kbd className="kbd palette-keys">↵</kbd>
      ) : cmd.href ? (
        <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
      ) : null}
    </span>
  </div>
);

export const CommandPalette = () => {
  const { open, setOpen, toggle, returnTo } = useCommandPalette();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState(null);
  const [sys, setSys] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(buildCommands, []);
  const visible = useMemo(() => filterCommands(commands, query), [commands, query]);
  const searching = query.trim().length > 0;
  const groupLabel = useMemo(() => new Map(GROUPS.map((g) => [g.key, g.label])), []);
  const indexOf = useMemo(() => new Map(visible.map((c, i) => [c.id, i])), [visible]);

  /* Global shortcut. ⌘K on Mac, Ctrl+K elsewhere — both are accepted
     everywhere, since a Mac user with a PC keyboard exists. "/" opens too,
     GitHub-style, unless the visitor is typing somewhere. */
  useEffect(() => {
    const onKey = (e) => {
      const key = (e.key || "").toLowerCase();
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && key === "k") {
        e.preventDefault();
        toggle();
        return;
      }
      if (key === "/" && !open && !e.metaKey && !e.ctrlKey && !e.altKey && !isEditable(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, toggle, setOpen]);

  /* Open: reset the field, lock the page behind the overlay, read the
     capability line. Close: undo it, and put focus back where the provider
     saw it — without scrolling, because the visitor may have just jumped
     to a section and a plain .focus() on a footer link would yank them
     back. AnimatePresence keeps the dialog mounted through its exit, so
     the field still holds focus when this cleanup runs; that is why it
     has to be handed back explicitly rather than left to the browser. */
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    setFlash(null);
    setSys(readSystem());
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      const el = returnTo.current;
      if (el && el.isConnected && typeof el.focus === "function" && el !== document.body) {
        el.focus({ preventScroll: true });
      }
    };
  }, [open, returnTo]);

  // Anything that changes the page underneath closes the menu.
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // New query, new list — start from the top of it.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep the active row in view as the arrow keys walk past the fold.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open, visible]);

  /* Reset on the way out as well as on the way in, so a reopened palette
     is empty on its very first frame rather than after a follow-up render. */
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setFlash(null);
  }, [setOpen]);

  /* In-app targets go through the router, which the ScrollManager in
     App.jsx already turns into a scroll for hash routes. The two cases the
     router will not react to are handled by hand: the same hash again, and
     "Home" while already at the top of the home page. */
  const go = useCallback(
    (to) => {
      const [path = "/", id = ""] = to.split("#");
      const samePage = (path || "/") === pathname;
      const behavior = reduce ? "auto" : "smooth";
      if (samePage && id && hash === `#${id}`) {
        document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
        return;
      }
      if (samePage && !id && !hash) {
        window.scrollTo({ top: 0, behavior });
        return;
      }
      navigate(to);
    },
    [pathname, hash, navigate, reduce]
  );

  const run = useCallback(
    async (cmd) => {
      if (cmd.action === "copy-email") {
        const ok = await copyText(profile.email);
        if (!ok) {
          // Nothing to copy into: open the mail client instead of failing silently.
          close();
          window.location.href = `mailto:${profile.email}`;
          return;
        }
        setFlash(cmd.id);
        setTimeout(close, 900);
        return;
      }
      close();
      if (cmd.to) {
        go(cmd.to);
      } else if (cmd.href) {
        if (/^https?:/.test(cmd.href)) window.open(cmd.href, "_blank", "noopener,noreferrer");
        else window.location.href = cmd.href;
      }
    },
    [close, go]
  );

  const onKeyDown = (e) => {
    const n = visible.length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (n) setActive((i) => (i + 1) % n);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (n) setActive((i) => (i - 1 + n) % n);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(Math.max(0, n - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (visible[active]) run(visible[active]);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        // The field is the only stop; the list is driven by the arrows.
        e.preventDefault();
        break;
      default:
    }
  };

  const activeCmd = visible[active];
  const rowProps = (cmd) => ({
    cmd,
    index: indexOf.get(cmd.id),
    active: indexOf.get(cmd.id) === active,
    flash: flash === cmd.id,
    onHover: setActive,
    onSelect: run,
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.18 }}
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh] sm:pt-[15vh]"
        >
          <div
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 bg-base/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: reduce ? 0 : -10, scale: reduce ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.985 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass bevel relative w-full max-w-xl overflow-hidden rounded-2xl shadow-lift"
          >
            {/* prompt */}
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span aria-hidden="true" className="font-mono text-[15px] text-acid">
                $
              </span>
              <input
                ref={inputRef}
                autoFocus
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={activeCmd ? `palette-${activeCmd.id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search pages, projects and actions"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="go"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a project, section or action…"
                /* The dialog is the focus indicator here: it is the only
                   thing on screen and the field is its only stop, so the
                   global :focus-visible ring would draw a second, larger box
                   around the first. */
                className="min-h-[56px] w-full bg-transparent font-mono text-[15px] text-ink outline-none placeholder:text-faint focus-visible:outline-none"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close command menu"
                className="hidden sm:block"
                tabIndex={-1}
              >
                <kbd className="kbd">esc</kbd>
              </button>
            </div>

            {/* results */}
            <div
              ref={listRef}
              id="palette-list"
              role="listbox"
              aria-label="Results"
              className="max-h-[min(56vh,420px)] overflow-y-auto p-2"
            >
              {visible.length === 0 ? (
                <p className="px-3 py-10 text-center font-mono text-sm text-faint">
                  <span className="text-acid">$</span> no matches for “{query.trim()}”
                </p>
              ) : searching ? (
                /* Ranked flat when searching — the best hit belongs at the
                   top regardless of which group it came from. */
                visible.map((cmd) => (
                  <Row key={cmd.id} {...rowProps(cmd)} tag={groupLabel.get(cmd.group)} />
                ))
              ) : (
                GROUPS.map((g) => {
                  const items = visible.filter((c) => c.group === g.key);
                  if (!items.length) return null;
                  return (
                    <div key={g.key} role="group" aria-labelledby={`palette-group-${g.key}`}>
                      <p
                        id={`palette-group-${g.key}`}
                        className="mono-label px-3 pb-1.5 pt-3 text-faint"
                      >
                        <span className="text-acid/70">//</span> {g.label}
                      </p>
                      {items.map((cmd) => (
                        <Row key={cmd.id} {...rowProps(cmd)} />
                      ))}
                    </div>
                  );
                })
              )}
            </div>

            {/* status line */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide text-faint">
              <div className="palette-keys flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="kbd">↑</kbd>
                  <kbd className="kbd">↓</kbd>
                  <span className="ml-0.5">move</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="kbd">↵</kbd>
                  <span className="ml-0.5">open</span>
                </span>
                <span className="hidden items-center gap-1 sm:inline-flex">
                  <kbd className="kbd">esc</kbd>
                  <span className="ml-0.5">close</span>
                </span>
              </div>
              {sys && (
                <span className="truncate normal-case" title="What the page adapts to">
                  {sys}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
