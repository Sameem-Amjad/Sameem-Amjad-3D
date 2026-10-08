/* Everything the command palette can do, built from the same data that
   drives the nav, the footer and the sitemap. A project added to
   featuredProjects or moreProjects shows up here with no further work,
   the same way it lands in sitemap.xml and llms.txt. */

import { allProjects, featuredProjects, slugify, links, profile, whatsappHref } from "./index";
import { servicePages } from "./services";
import { guides } from "./guides";

/* `to` is an in-app route (hash routes scroll to the section on the home
   page); `href` is external or mailto; `action` is handled in the palette.
   `keywords` are extra match terms that never render. */
export const buildCommands = () => {
  const featured = new Set(featuredProjects.map((p) => p.title));

  const navigate = [
    { id: "nav-home", label: "Home", sub: "Back to the top", to: "/", keywords: ["start", "hero", "top"] },
    { id: "nav-work", label: "Work", sub: `${featuredProjects.length} case studies`, to: "/work", keywords: ["projects", "portfolio", "case studies"] },
    { id: "nav-guides", label: "Guides", sub: "Fixes for apps that break in production", to: "/guides", keywords: ["how to", "fix", "supabase", "404", "help"] },
    { id: "nav-builds", label: "Builds", sub: "The lab — smaller products and experiments", to: "/builds", keywords: ["lab", "more", "projects"] },
    { id: "nav-services", label: "Services", sub: "What I build", to: "/services", keywords: ["web", "mobile", "ai", "agents", "backend", "architecture", "hire"] },
    { id: "nav-stack", label: "Stack", sub: "The tools I ship with", to: "/#stack", keywords: ["tech", "tools", "technologies"] },
    { id: "nav-process", label: "Process", sub: "How a project runs", to: "/#process", keywords: ["how", "method", "timeline"] },
    { id: "nav-experience", label: "Experience", sub: "Where I've done it", to: "/#experience", keywords: ["roles", "career", "history", "resume", "cv"] },
    { id: "nav-team", label: "Team", sub: "Who you'd be hiring", to: "/#team", keywords: ["people", "devorax"] },
    { id: "nav-testimonials", label: "Reviews", sub: "What clients said", to: "/#testimonials", keywords: ["testimonials", "clients", "feedback"] },
    { id: "nav-faq", label: "FAQ", sub: "Common questions", to: "/#faq", keywords: ["questions", "pricing", "how"] },
    { id: "nav-contact", label: "Contact", sub: "Send a message", to: "/#contact", keywords: ["message", "form", "hire", "reach"] },
  ].map((c) => ({ ...c, group: "navigate", icon: "arrowRight" }));

  const services = servicePages.map((s) => ({
    id: `service-${s.slug}`,
    group: "services",
    icon: s.icon,
    label: s.name,
    sub: s.summary,
    to: `/services/${s.slug}`,
    keywords: s.keywords || [],
  }));

  const guideCommands = guides.map((g) => ({
    id: `guide-${g.slug}`,
    group: "guides",
    icon: "terminal",
    label: g.title,
    sub: g.summary,
    to: `/guides/${g.slug}`,
    keywords: ["guide", "how to", "fix"],
  }));

  const projects = allProjects.map((p) => {
    const isCase = featured.has(p.title);
    return {
      id: `project-${slugify(p.title)}`,
      group: isCase ? "case-studies" : "builds",
      icon: isCase ? "terminal" : "zap",
      label: p.title,
      sub: p.tagline,
      to: `/work/${slugify(p.title)}`,
      keywords: [p.category, p.filter, ...(p.tags || [])].filter(Boolean),
    };
  });

  const connect = [
    { id: "act-book", label: "Book a call", sub: "Free · 30 minutes", href: links.booking, icon: "calendar", keywords: ["schedule", "meeting", "calendar", "hire"] },
    { id: "act-whatsapp", label: "WhatsApp", sub: profile.phone, href: whatsappHref("/"), icon: "whatsapp", keywords: ["chat", "message", "phone", "call", "contact", "hire"] },
    { id: "act-email", label: "Email me", sub: profile.email, href: links.email, icon: "mail", keywords: ["mail", "contact", "write"] },
    { id: "act-copy-email", label: "Copy email address", sub: profile.email, action: "copy-email", icon: "copy", keywords: ["clipboard", "mail"] },
    { id: "act-fiverr", label: "Fiverr", sub: "5.0 · Level 2 seller", href: links.fiverr, icon: "star", keywords: ["freelance", "reviews", "hire"] },
    { id: "act-devorax", label: "DevoraX", sub: "The studio I founded and lead", href: links.devorax, icon: "globe", keywords: ["studio", "agency", "company"] },
  ].map((c) => ({ ...c, group: "connect" }));

  return [...navigate, ...services, ...guideCommands, ...projects, ...connect];
};
