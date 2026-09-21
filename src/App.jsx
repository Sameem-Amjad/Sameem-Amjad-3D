import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CustomCursor, CursorTrail, ScrollProgress } from "./components/fx";
import Home from "./pages/Home";
import WorkPage from "./pages/WorkPage";
import BuildsPage from "./pages/BuildsPage";
import ProjectDetail from "./pages/ProjectDetail";
import { getProjectBySlug } from "./constants";

const ORIGIN = "https://sameem-the-dev.vercel.app";

/* Keeps <link rel="canonical"> pointing at the current route. A static
   canonical in index.html would be wrong here: one index.html is served for
   every path, so it would declare every route a duplicate of "/".

   Only real routes get a canonical. The router renders Home for any unmatched
   path and Vercel serves 200 for all of them, so canonicalising blindly would
   have /banana assert itself as a legitimate page — minting unbounded
   duplicates of the homepage. Unmatched paths get noindex instead. */
const isRealRoute = (pathname) => {
  if (["/", "/work", "/builds"].includes(pathname)) return true;
  const m = pathname.match(/^\/work\/([^/]+)$/);
  return Boolean(m && getProjectBySlug(m[1]));
};

const head = (selector, make) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = make();
    document.head.appendChild(el);
  }
  return el;
};

const Canonical = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const clean =
      pathname !== "/" && pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    const link = head('link[rel="canonical"]', () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    });
    const robots = head('meta[name="robots"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "robots");
      return el;
    });

    if (isRealRoute(clean)) {
      link.setAttribute("href", `${ORIGIN}${clean}`);
      robots.setAttribute("content", "index, follow");
    } else {
      link.removeAttribute("href");
      robots.setAttribute("content", "noindex, follow");
    }
  }, [pathname]);
  return null;
};

/* Scroll to top on route change, or to a #section when a hash is present. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 30) {
          setTimeout(attempt, 50);
        }
      };
      attempt();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }, [pathname, hash]);
  return null;
};

const App = () => {
  const location = useLocation();
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-base text-ink">
      <Background />
      <CursorTrail />
      <CustomCursor />
      <ScrollProgress />
      <ScrollManager />
      <Canonical />
      <Navbar />

      <main className="relative z-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;
