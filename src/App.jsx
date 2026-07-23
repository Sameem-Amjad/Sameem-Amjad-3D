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
