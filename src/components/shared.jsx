import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const cn = (...c) => c.filter(Boolean).join(" ");

/* ───────────────── Icons ───────────────── */
const PATHS = {
  web: (<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8M12 18v3" /></>),
  mobile: (<><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></>),
  ai: (<><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.2" /></>),
  cloud: (<path d="M6.5 19a4.5 4.5 0 0 1-.5-8.97 6 6 0 0 1 11.66-1.2A4 4 0 0 1 18 19H6.5Z" />),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>),
  apple: (<path d="M16.36 12.9c-.02-2.06 1.68-3.05 1.76-3.1-0.96-1.4-2.45-1.6-2.98-1.62-1.27-.13-2.48.75-3.12.75-.64 0-1.64-.73-2.7-.71-1.39.02-2.67.81-3.38 2.05-1.44 2.5-.37 6.2 1.04 8.23.69.99 1.51 2.1 2.58 2.06 1.04-.04 1.43-.67 2.68-.67 1.25 0 1.6.67 2.7.65 1.11-.02 1.82-1 2.5-2 .79-1.15 1.11-2.26 1.13-2.32-.02-.01-2.17-.83-2.19-3.29zM14.53 6.6c.56-.69.94-1.64.84-2.6-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.57-.86 2.5.9.07 1.83-.46 2.39-1.12z" fill="currentColor" stroke="none" />),
  android: (<><path d="M6 9v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9M6 9a6 6 0 0 1 12 0M6 9h12M9 6.5 7.5 4.5M15 6.5 16.5 4.5" /><path d="M4 11v4M20 11v4M9 17v2.5M15 17v2.5" /></>),
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  calendar: (<><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v3M16 3v3" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>),
  spark: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />,
  check: <path d="M4 12.5l5 5 11-11" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" fill="currentColor" stroke="none" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  terminal: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>),
};

export const Icon = ({ name, className = "w-5 h-5", strokeWidth = 1.6 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {PATHS[name]}
  </svg>
);

/* ───────────────── Magnetic ───────────────── */
export const Magnetic = ({ children, strength = 0.4, className }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
};

/* ───────────────── Buttons ───────────────── */
export const PrimaryButton = ({ children, href, to, icon = "arrowRight", onClick, className }) => {
  const Tag = href ? "a" : "button";
  const linkProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
    : { onClick };
  return (
    <Magnetic>
      <Tag {...linkProps}
        data-cursor="button"
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-acid px-6 py-3 font-mono text-[13px] font-semibold uppercase tracking-wider text-night transition-transform",
          className
        )}>
        <span className="absolute inset-0 -translate-x-full bg-base/20 transition-transform duration-500 group-hover:translate-x-0" aria-hidden="true" />
        <span className="relative">{children}</span>
        {icon && <Icon name={icon} className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />}
      </Tag>
    </Magnetic>
  );
};

export const GhostButton = ({ children, href, icon, onClick, className }) => {
  const Tag = href ? "a" : "button";
  const linkProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
    : { onClick };
  return (
    <Tag {...linkProps} data-cursor="button"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wider text-ink transition-colors hover:border-acid hover:text-acid",
        className
      )}>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </Tag>
  );
};

/* ───────────────── Reveal ───────────────── */
export const Reveal = ({ children, delay = 0, y = 24, className }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

/* Masked line reveal (kinetic). Reveals on mount + whileInView so above-the-fold
   titles never stay clipped, and below-the-fold ones still animate when reached. */
export const MaskLine = ({ children, delay = 0, className }) => (
  <span className="reveal-line">
    <motion.span
      initial={{ y: "110%" }}
      whileInView={{ y: 0 }}
      animate={{ y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("block", className)}>
      {children}
    </motion.span>
  </span>
);

/* ───────────────── Section heading (terminal + editorial) ───────────────── */
export const SectionHeading = ({ index, eyebrow, title, accent, description, right }) => (
  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      <Reveal>
        <p className="mono-label mb-5 flex items-center gap-2 text-acid">
          {index && <span className="text-faint">{index}</span>}
          <span className="text-faint">//</span> {eyebrow}
        </p>
      </Reveal>
      <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl md:text-6xl">
        <MaskLine>{title}{accent ? " " : ""}<span className="text-acid">{accent}</span></MaskLine>
      </h2>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
    {right && <Reveal delay={0.15}>{right}</Reveal>}
  </div>
);

/* ───────────────── Live links ───────────────── */
const isValid = (u) => u && u !== "null" && u !== '""' && u !== '"\\""';

export const LiveLinks = ({ web, android, ios, size = "sm" }) => {
  const items = [
    { url: web, icon: "globe", label: "Live" },
    { url: android, icon: "android", label: "Android" },
    { url: ios, icon: "apple", label: "iOS" },
  ].filter((i) => isValid(i.url));
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <a key={i.label} href={i.url} target="_blank" rel="noopener noreferrer"
          data-cursor="button" onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-line font-mono uppercase tracking-wide text-ink/90 transition-colors hover:border-acid hover:text-acid",
            size === "sm" ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-xs"
          )}>
          <Icon name={i.icon} className="h-3.5 w-3.5" />
          {i.label}
        </a>
      ))}
    </div>
  );
};

/* ───────────────── Scramble/decrypt hook ───────────────── */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_$#*";
export const useScramble = (text, { speed = 40, active = true } = {}) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (i < revealed || text[i] === " ") s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (revealed >= total) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);
  return out;
};

export { isValid };
