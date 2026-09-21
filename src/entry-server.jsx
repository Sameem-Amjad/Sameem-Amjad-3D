/* SSR entry, used only by scripts/prerender.mjs at build time.

   The app never runs a server: this renders each known route to static HTML
   once, during `npm run build`, so crawlers and link unfurlers get real
   markup instead of an empty <div id="root">. The browser bundle is
   unchanged — main.jsx hydrates whatever this produced. */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export const render = (url) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

/* Re-exported so the prerenderer can import one bundled file rather than
   reaching into extensionless source imports Node can't resolve. */
export { seoRoutes, seoForPath, ORIGIN } from "./constants/seo";
export { headTagsToHtml } from "./utils/head";
