import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/* Production HTML is prerendered (scripts/prerender.mjs), so #root already
   holds the page and React only needs to attach to it. `vite dev` serves the
   empty shell, hence the branch — hydrating nothing would blank the app. */
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}

/* Hand the hero back to framer-motion.
   index.html marks <html class="pre-hydrate"> and forces the above-the-fold
   block visible, so the prerendered text paints immediately instead of waiting
   for this bundle. Once React has mounted, the inline opacity:0 styles are
   framer-motion's to drive again, so the override comes off.

   Deferred a frame past createRoot so the removal lands after the first
   committed paint, not between hydration and it. */
requestAnimationFrame(() => {
  document.documentElement.classList.remove("pre-hydrate");
});
