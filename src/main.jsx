import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initAnalytics } from "./utils/analytics";
import "./index.css";

/* Before render, so the tag request goes out in parallel with hydration
   rather than after it. */
initAnalytics();

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
