import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background";
import Seo from "./components/Seo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnalyticsNotice from "./components/AnalyticsNotice";
import { CustomCursor, CursorTrail, ScrollProgress } from "./components/fx";
import { CommandPaletteProvider, CommandPalette } from "./components/CommandPalette";
import Home from "./pages/Home";
import WorkPage from "./pages/WorkPage";
import BuildsPage from "./pages/BuildsPage";
import ProjectDetail from "./pages/ProjectDetail";

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
    <CommandPaletteProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-base text-ink">
        <Background />
        <CursorTrail />
        <CustomCursor />
        <ScrollProgress />
        <ScrollManager />
        <Seo />
        <Navbar />
        {/* Renders nothing until opened, so the prerendered HTML is untouched. */}
        <CommandPalette />

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
        {/* Client-only, so the prerendered HTML is untouched. */}
        <AnalyticsNotice />
      </div>
    </CommandPaletteProvider>
  );
};

export default App;
