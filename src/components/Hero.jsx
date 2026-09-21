import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { profile, heroStats, links } from "../constants";
import { PrimaryButton, GhostButton, Icon, cn } from "./shared";

/* Staggered fade-up for everything below the headline.
   CSS, not framer-motion: this is above-the-fold entrance, and a JS-driven
   `initial` serialises opacity:0 into the prerendered HTML, leaving the hero
   blank until the bundle hydrates. See `.anim-*` in index.css.

   The base delay came down from 0.6s to 0.35s. It used to start only after
   hydration, so the long lead-in was hidden inside that wait; now the
   sequence begins at first paint and 0.6s would just be dead air. */
const riseDelay = (i = 0) => ({ animationDelay: `${0.35 + i * 0.08}s` });

/* One masked line of the name. The mask is what makes it read as type
   sliding up from behind a rule, rather than just fading in. */
const Line = ({ children, delay, className }) => (
  <span className="reveal-line">
    <span
      style={{ animationDelay: `${delay}s` }}
      className={cn("anim-unmask", className)}
    >
      {children}
    </span>
  </span>
);

/* Small credential card that floats over the portrait. */
const Badge = ({ icon, title, sub, href, className, delay }) => {
  const Tag = href ? "a" : "div";
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className={cn("anim-pop absolute z-20 hidden sm:block", className)}
    >
      <Tag
        {...(href
          ? { href, target: "_blank", rel: "noopener noreferrer", "data-cursor": "button" }
          : {})}
        className="glass group flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift transition-colors duration-300 hover:border-acid/40"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-acid/12 text-acid">
          <Icon name={icon} className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0">
          <span className="block whitespace-nowrap text-[13px] font-semibold leading-tight text-ink">
            {title}
          </span>
          <span className="block whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-faint">
            {sub}
          </span>
        </span>
        {href && (
          <Icon
            name="arrowUpRight"
            className="h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover:text-acid"
          />
        )}
      </Tag>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Portrait drifts slightly slower than the page — a parallax depth cue that
  // costs nothing, and is switched off entirely for reduced-motion users.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.25]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex items-center overflow-hidden px-6 pb-20 pt-28 sm:px-10 sm:pb-24 sm:pt-36 lg:min-h-[100svh]"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ─────────── Copy ─────────── */}
        <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10">
          {/* status row */}
          <div
            style={{ animationDelay: "0.15s" }}
            className="anim-rise-sm mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              {profile.availability}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:inline">
              {profile.location}
            </span>
          </div>

          {/* name — the headline of a portfolio is the person */}
          <h1 className="font-display text-[clamp(3rem,11vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-ink">
            <Line delay={0.3}>{profile.headline[0]}</Line>
            <Line delay={0.42} className="text-tail">
              {profile.headline[1]}
            </Line>
          </h1>

          {/* role, in the terminal voice that runs through the whole site */}
          <p
            style={riseDelay(0)}
            className="anim-rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-acid sm:text-[1rem]"
          >
            <span className="inline-flex items-center gap-2">
              <Icon name="terminal" className="h-4 w-4 shrink-0" />
              {profile.kicker}
            </span>
            <span className="hidden text-faint sm:inline">·</span>
            <span className="caret text-muted">
              {profile.role} @ {profile.company}
            </span>
          </p>

          <p
            style={riseDelay(1)}
            className="anim-rise mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[1rem]"
          >
            {profile.subheadline}
          </p>

          {/* CTAs */}
          <div
            style={riseDelay(2)}
            className="anim-rise mt-9 flex flex-wrap items-center gap-3"
          >
            <PrimaryButton href={links.booking} icon="calendar">
              Book a call
            </PrimaryButton>
            <GhostButton href="#work" icon="arrowDown">
              View work
            </GhostButton>
            <a
              href={links.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="group inline-flex min-h-[44px] items-center gap-2 px-2 font-mono text-[13px] uppercase tracking-wider text-muted transition-colors hover:text-acid"
            >
              <Icon name="star" className="h-4 w-4 text-acid" />
              5.0 on Fiverr
              <Icon
                name="arrowUpRight"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* stat strip */}
          <dl
            style={riseDelay(3)}
            className="anim-rise mt-12 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="bg-base/60 px-4 py-4 backdrop-blur-sm">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold leading-none text-ink sm:text-[1.75rem]">
                    {s.value}
                  </span>
                  <span className="mt-1.5 block font-mono text-[10px] uppercase leading-tight tracking-wide text-faint">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ─────────── Portrait ─────────── */}
        <motion.div
          style={{ y: portraitY }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[24rem]"
        >
          {/* ember bloom behind the frame — picks up the warm circuitry in the
              photo so the portrait sits in the palette rather than on top of it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%] rounded-full bg-ember/20 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-1/4 h-40 w-40 rounded-full bg-acid/15 blur-[80px]"
          />

          {/* CSS entrance: the portrait is the largest element on wide
              viewports, so a JS-gated opacity:0 would make it the LCP and
              hold it until hydration. */}
          <div
            style={{ animationDelay: "0.25s" }}
            className="anim-pop relative aspect-square overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-card"
          >
            <img
              src="/myimage/profile.webp"
              alt={`${profile.name}, ${profile.role} at ${profile.company}`}
              width={1254}
              height={1254}
              fetchpriority="high"
              decoding="async"
              className="h-full w-full scale-[1.03] object-cover object-center"
            />

            {/* scrim: grounds the photo into the page background at the edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base/95 via-base/40 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base/70 via-transparent to-transparent lg:from-base/50"
            />
            {/* scanline sweep — the one bit of motion on the portrait itself */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-sweep-y bg-gradient-to-b from-transparent via-acid/8 to-transparent"
            />

            {/* viewfinder brackets */}
            <div className="brackets pointer-events-none absolute inset-3" aria-hidden="true" />

            {/* plate — says what the photo can't, not what the headline already did */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                {profile.company}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Web · Mobile · AI
              </p>
            </div>
          </div>

          {/* floating credentials */}
          <Badge
            icon="star"
            title="5.0 · Top Rated"
            sub="Fiverr seller"
            href={links.fiverr}
            delay={0.95}
            className="-top-6 left-2 sm:left-6"
          />
          <Badge
            icon="check"
            title="24+ products shipped"
            sub="2.4M+ users reached"
            delay={1.1}
            className="-bottom-6 right-2 sm:-right-4"
          />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#impact"
        aria-label="Scroll to impact numbers"
        data-cursor="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="grid h-9 w-5 place-items-start rounded-full border border-line p-1.5">
          <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-acid" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-faint">scroll</span>
      </motion.a>
    </section>
  );
};

export default Hero;
