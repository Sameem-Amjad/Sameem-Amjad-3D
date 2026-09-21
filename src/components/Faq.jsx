import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, profile, links } from "../constants";
import { SectionHeading, Section, Icon, Reveal, cn } from "./shared";

const Item = ({ q, a, open, onToggle, index }) => {
  const id = useId();
  return (
    <div
      className={cn(
        "border-b border-line transition-colors duration-300",
        open && "bg-white/[0.015]"
      )}
    >
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          data-cursor="button"
          className="group flex w-full items-start gap-5 px-2 py-6 text-left sm:px-4"
        >
          <span className="mt-1 font-mono text-[11px] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "flex-1 font-display text-lg font-bold leading-snug transition-colors duration-200 sm:text-xl",
              open ? "text-acid" : "text-ink group-hover:text-acid"
            )}
          >
            {q}
          </span>
          <span
            className={cn(
              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
              open
                ? "rotate-180 border-acid/45 bg-acid/10 text-acid"
                : "border-line text-muted group-hover:border-acid group-hover:text-acid"
            )}
            aria-hidden="true"
          >
            <Icon name="chevronDown" className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl px-2 pb-7 pl-[3.1rem] text-[15px] leading-relaxed text-muted sm:px-4 sm:pl-[3.6rem]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq">
      <SectionHeading
        index="07"
        eyebrow="questions"
        title="The things people ask"
        accent="before they hire."
        description="Short answers, no sales language. If yours isn't here, ask it on the call."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <div className="border-t border-line">
          {faqs.map((f, i) => (
            <Item
              key={f.q}
              index={i}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>

        {/* still-stuck card */}
        <Reveal delay={0.1}>
          <div className="panel sticky top-28 flex flex-col gap-5 p-7">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-acid/12 text-acid">
              <Icon name="mail" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Still deciding?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Send the messy version of your idea. I'll tell you honestly whether it's a
                four-week build or a four-month one — before you commit to anything.
              </p>
            </div>
            <a
              href={links.booking}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-acid px-5 font-mono text-[12px] font-semibold uppercase tracking-wider text-night shadow-glow-sm transition-shadow hover:shadow-glow"
            >
              <Icon name="calendar" className="h-4 w-4" strokeWidth={2} />
              Book 30 minutes
            </a>
            <a
              href={links.email}
              data-cursor="button"
              className="break-all text-center font-mono text-[11px] text-faint transition-colors hover:text-acid"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default Faq;
