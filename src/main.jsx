import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initAnalytics, initLeadTracking } from "./utils/analytics";
import { links } from "./constants";
import "./index.css";

/* Analytics waits for the load event and then an idle moment. Started up
   front, gtag (~175 KB) and Clarity (~25 KB) downloaded alongside the hero
   and the app bundle, and PageSpeed counted them against first paint and
   LCP on mobile (Oct 2026: ~330 ms main thread, 3 long tasks). The cost is
   that a visitor who leaves before the page finishes loading isn't counted.
   A consent answer given before then is stored, and initAnalytics reads it. */
const afterLoad = (fn) => {
  const idle = () =>
    "requestIdleCallback" in window ? window.requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 0);
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
};
afterLoad(initAnalytics);
initLeadTracking(links.booking);

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
