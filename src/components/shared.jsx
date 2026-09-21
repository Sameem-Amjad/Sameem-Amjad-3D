import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sized, srcSetFor } from "../utils/img";

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
  check: <path d="M4 12.5l5 5 11-11" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" fill="currentColor" stroke="none" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  terminal: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  quote: (<path d="M9.5 6C6.5 7.5 5 10.2 5 14v4h6v-6H8.2c.1-1.9.9-3.3 2.4-4.2L9.5 6Zm9 0c-3 1.5-4.5 4.2-4.5 8v4h6v-6h-2.8c.1-1.9.9-3.3 2.4-4.2L18.5 6Z" fill="currentColor" stroke="none" />),
  shield: (<><path d="M12 3l8 3v6c0 4.6-3.2 8.3-8 9.5C7.2 20.3 4 16.6 4 12V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>),
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  compass: (<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>),
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

/* ───────────────── Eyebrow pill ─────────────────
   One consistent section marker. Keeps the terminal `//` signature but
   frames it, so every section opens with the same visual note. */
export const Eyebrow = ({ children, index, dot = true, className }) => (
  <span className={cn("eyebrow", className)}>
    {dot && (
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
      </span>
    )}
    {index && (
      <>
        <span className="text-faint">{index}</span>
        <span className="h-2.5 w-px bg-line-strong" aria-hidden="true" />
      </>
    )}
    <span className="text-muted">{children}</span>
  </span>
);

/* ───────────────── Buttons ───────────────── */
/* Link resolution —
   One rule for both buttons. An external href opens in a new tab; an
   in-app path ("/work", "/#contact") goes through the router instead of a
   bare <a>, which would full-reload the SPA and throw away the loaded
   bundle. `to` was previously accepted by PrimaryButton and silently
   ignored — it works now. */
const resolveTag = ({ href, to, onClick }) => {
  const dest = to || href;
  const external = typeof dest === "string" && /^(https?:|mailto:|tel:)/.test(dest);

  if (!dest) return ["button", { onClick }];
  if (external)
    return ["a", { href: dest, target: dest.startsWith("http") ? "_blank" : undefined,
                   rel: dest.startsWith("http") ? "noopener noreferrer" : undefined, onClick }];
  return [Link, { to: dest, onClick }];
};

export const PrimaryButton = ({ children, href, to, icon = "arrowRight", onClick, className }) => {
  const [Tag, linkProps] = resolveTag({ href, to, onClick });
  return (
    <Magnetic>
      <Tag {...linkProps}
        data-cursor="button"
        className={cn(
          "group relative inline-flex min-h-[44px] items-center gap-2 overflow-hidden rounded-full bg-acid px-6 py-3 font-mono text-[13px] font-semibold uppercase tracking-wider text-night shadow-glow-sm transition-shadow duration-300 hover:shadow-glow",
          className
        )}>
        {/* light sweeps across the face on hover */}
        <span
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
          aria-hidden="true"
        />
        <span className="relative">{children}</span>
        {icon && <Icon name={icon} className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />}
      </Tag>
    </Magnetic>
  );
};

export const GhostButton = ({ children, href, to, icon, onClick, className }) => {
  const [Tag, linkProps] = resolveTag({ href, to, onClick });
  return (
    <Tag {...linkProps} data-cursor="button"
      className={cn(
        "glass group inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wider text-ink transition-colors duration-300 hover:border-acid/50 hover:text-acid",
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

/* ───────────────── Section heading (terminal + editorial) ─────────────────
   `accent` is the tail phrase — it gets the cream→acid gradient so the
   sentence reads as one line that brightens, not two colours bolted together. */
export const SectionHeading = ({ index, eyebrow, title, accent, description, right, align = "between" }) => (
  <div
    className={cn(
      "flex flex-col gap-6",
      align === "between" && "md:flex-row md:items-end md:justify-between"
    )}
  >
    <div className="max-w-3xl">
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl md:text-[3.5rem]">
        <MaskLine>
          {title}
          {accent ? " " : ""}
          <span className="text-tail">{accent}</span>
        </MaskLine>
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

/* ───────────────── Page header ─────────────────
   Top-of-page counterpart to SectionHeading: same eyebrow pill and gradient
   tail, but with the clearance the fixed nav needs. */
export const PageHeader = ({ eyebrow, title, accent, lede, right }) => (
  <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
        <MaskLine>
          {title}
          {accent ? " " : ""}
          <span className="text-tail">{accent}</span>
        </MaskLine>
      </h1>
      {lede && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
        </Reveal>
      )}
    </div>
    {right && <Reveal delay={0.15}>{right}</Reveal>}
  </div>
);

/* ───────────────── Section shell ─────────────────
   One source of truth for section rhythm and width, so vertical spacing
   can't drift between sections the way it had. */
export const Section = ({ id, children, className, width = "max-w-7xl" }) => (
  <section id={id} className={cn("relative mx-auto px-6 py-16 sm:px-10 sm:py-24", width, className)}>
    {children}
  </section>
);

/* ───────────────── Smart image (shimmer skeleton + fade-in) ─────────────────
   Wrap in a `relative overflow-hidden` box. While the image loads, a shimmer
   skeleton fills the box; the image fades in on load. `className` should carry a
   transition (e.g. `transition-all`) so the opacity fade animates. If the src is
   missing or errors, `fallback` is rendered instead (must fill the box). */
export const SmartImage = ({
  src,
  alt,
  className,
  skeletonClassName,
  fallback = null,
  eager = false,
  width,
}) => {
  const [status, setStatus] = useState("loading"); // loading | loaded | error
  const imgRef = useRef(null);
  const valid = src && src !== '""' && src !== "null";

  /* Pages are prerendered, so the <img> is in the HTML and the browser often
     finishes fetching it before React hydrates. That load fires no React
     onLoad — the handler attaches afterwards — leaving the image stuck at
     opacity:0 behind its skeleton forever. Reconcile with the DOM on mount. */
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete) setStatus(el.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  if ((!valid || status === "error") && fallback) return fallback;

  // `width` opts the image into Supabase's resize + WebP pipeline. Without it
  // the original src is used, which is what local assets want.
  const finalSrc = width ? sized(src, width) : src;
  const set = width ? srcSetFor(src, width) : undefined;

  return (
    <>
      {status !== "loaded" && (
        <span className={cn("skeleton absolute inset-0", skeletonClassName)} aria-hidden="true" />
      )}
      <img
        ref={imgRef}
        src={finalSrc}
        srcSet={set}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        style={{ opacity: status === "loaded" ? 1 : 0 }}
        className={className}
      />
    </>
  );
};

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

