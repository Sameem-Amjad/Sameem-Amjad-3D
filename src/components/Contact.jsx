import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile, links } from "../constants";
import { SectionHeading, Section, Icon, Reveal, cn } from "./shared";

const methods = [
  { icon: "calendar", label: "Book a call", value: "Free · 30 minutes", href: links.booking },
  { icon: "star", label: "Fiverr", value: "5.0 · top rated", href: links.fiverr },
  { icon: "globe", label: "DevoraX", value: "thedevorax.tech", href: links.devorax },
  { icon: "mail", label: "Email", value: "Reply within 24h", href: links.email },
];

const availability = [
  ["status", '"open for projects"'],
  ["location", '"remote · worldwide"'],
  ["clients", '"4 continents"'],
  ["response", '"< 24 hours"'],
];

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: profile.name,
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("ok");
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setStatus("idle"), 5000);
        },
        (err) => {
          console.error(err);
          setStatus("error");
        }
      );
  };

  const inputCls =
    "w-full min-h-[44px] rounded-none border-b border-line bg-transparent px-0 py-3 text-ink outline-none transition-colors placeholder:text-faint hover:border-line-strong focus:border-acid";

  return (
    <Section id="contact">
      <SectionHeading
        index="08"
        eyebrow="let's build"
        title="Have a product"
        accent="in mind?"
        description="Tell me what you're building. I'll reply within 24 hours with honest thoughts on scope, timeline and what it'll take to ship."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        {/* form */}
        <Reveal>
          <div className="panel p-7 sm:p-9">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">
              <label className="flex flex-col gap-1">
                <span className="mono-label text-faint">01 / name</span>
                <input required name="name" value={form.name} onChange={handleChange}
                  placeholder="Jane Doe" className={inputCls} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="mono-label text-faint">02 / email</span>
                <input required type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="jane@company.com" className={inputCls} />
              </label>
              <label className="flex flex-col gap-1">
                <span className="mono-label text-faint">03 / project</span>
                <textarea required rows={4} name="message" value={form.message} onChange={handleChange}
                  placeholder="What are you building, and what does success look like?"
                  className={cn(inputCls, "resize-none")} />
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                data-cursor="button"
                className="group relative mt-2 inline-flex min-h-[48px] w-fit items-center gap-2 overflow-hidden rounded-full bg-acid px-7 font-mono text-[13px] font-semibold uppercase tracking-wider text-night shadow-glow-sm transition-shadow hover:shadow-glow disabled:cursor-wait disabled:opacity-70 disabled:shadow-none"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
                />
                <span className="relative">
                  {status === "loading" ? "Sending…" : status === "ok" ? "Message sent" : "Send message"}
                </span>
                <Icon
                  name={status === "ok" ? "check" : "arrowUpRight"}
                  className={cn("relative h-4 w-4", status === "loading" && "animate-pulse")}
                  strokeWidth={2}
                />
              </button>

              <p aria-live="polite" className="sr-only">
                {status === "loading" ? "Sending your message" : status === "ok" ? "Message sent" : ""}
              </p>
              {status === "ok" && (
                <p className="font-mono text-sm text-acid">// thanks — reply within 24h</p>
              )}
              {status === "error" && (
                <p role="alert" className="font-mono text-sm text-ember">
                  // error — email {profile.email} directly
                </p>
              )}
            </form>
          </div>
        </Reveal>

        {/* methods + terminal availability panel */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {methods.map((m) => (
                <a key={m.label} href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor="button"
                  className="panel panel-hover group flex items-center gap-3 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-acid transition-colors group-hover:border-acid">
                    <Icon name={m.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">{m.label}</span>
                    <span className="block truncate font-mono text-[11px] text-faint">{m.value}</span>
                  </span>
                  <Icon name="arrowUpRight" className="h-4 w-4 text-faint transition-colors group-hover:text-acid" />
                </a>
              ))}
            </div>

            {/* terminal panel */}
            <div className="panel relative flex-1 overflow-hidden p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-acid/10 blur-[70px]"
              />
              <div className="relative font-mono text-sm leading-relaxed">
                <p className="mb-4 flex items-center gap-1.5 text-faint">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-acid/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="ml-2">~/availability.json</span>
                </p>
                <div className="text-muted">
                  <div>{"{"}</div>
                  {availability.map(([k, v]) => (
                    <div key={k} className="pl-5">
                      <span className="text-acid">{`"${k}"`}</span>
                      <span className="text-faint">: </span>
                      <span className="text-ink">{v}</span>
                      <span className="text-faint">,</span>
                    </div>
                  ))}
                  <div className="flex items-center">
                    {"}"}
                    <span className="caret" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
