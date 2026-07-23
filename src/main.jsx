import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

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
