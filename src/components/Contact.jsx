import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile, links } from "../constants";
import { SectionHeading, Icon, Reveal, cn } from "./shared";
import { ShaderOrb } from "./fx";

const methods = [
  { icon: "calendar", label: "Book a call", value: "Free 30-min discovery call", href: links.calendly },
  { icon: "star", label: "Hire me on Fiverr", value: "5.0 rating · top-rated seller", href: links.fiverr },
  { icon: "globe", label: "DevoraX", value: "thedevorax.tech", href: links.devorax },
  { icon: "mail", label: "Email", value: profile.email, href: links.email },
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
    "w-full rounded-none border-b border-line bg-transparent px-0 py-3 text-ink outline-none transition-colors placeholder:text-faint focus:border-acid";

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10">
      <SectionHeading
        index="04"
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

              <button type="submit" disabled={status === "loading"} data-cursor="button"
                className="group mt-2 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-acid px-7 py-3.5 font-mono text-[13px] font-semibold uppercase tracking-wider text-night disabled:opacity-70">
                {status === "loading" ? "Sending…" : status === "ok" ? "Message sent" : "Send message"}
                <Icon name={status === "ok" ? "check" : "arrowUpRight"} className="h-4 w-4" strokeWidth={2} />
              </button>

              {status === "ok" && <p className="font-mono text-sm text-acid">// thanks — reply within 24h</p>}
              {status === "error" && (
                <p className="font-mono text-sm text-ember">// error — email {profile.email} directly</p>
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
              <ShaderOrb className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-40" />
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
    </section>
  );
};

export default Contact;
