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

/* Dismiss the pre-React boot splash once the app has painted. */
const boot = document.getElementById("boot");
if (boot) {
  requestAnimationFrame(() => {
    boot.classList.add("boot-done");
    boot.addEventListener("transitionend", () => boot.remove(), { once: true });
    // Fallback in case the transitionend event never fires.
    setTimeout(() => boot.remove(), 800);
  });
}
