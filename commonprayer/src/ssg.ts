import { buildCSS } from "./ssg/build-css.ts";
import { buildPage } from "./ssg/build-page.ts";
import { buildLDFBundle, buildScripts } from "./ssg/build-scripts.ts";
import { buildTOC } from "./ssg/build-toc.ts";
import { copyStatic } from "./ssg/copy-static.ts";
import { createWWW } from "./ssg/create-www.ts";
import { devServer } from "./ssg/dev-server.ts";
import { SSGRefreshMap } from "./ssg/ssg-refresh-map.ts";

async function build(isDev = false, pagesOnly = false): Promise<SSGRefreshMap> {
  // Create `www` if it doesn't exist
  await createWWW();

  const map = await Promise.all(
    [
      // Copy CSS/assets
      buildCSS(),
      !pagesOnly && copyStatic(),
      !pagesOnly && buildScripts(),

      // Crawl all liturgies and build them as pages with TOC
      !pagesOnly && buildTOC(isDev),

      // Build pages
      buildPage("home", { isDev, isIndex: true }),
      buildPage("psalter", { isDev }),
      buildPage("canticle-table", { isDev }),
      buildPage("calendar", {
        isDev,
        route: "calendar/bcp",
        args: ["bcp1979"],
      }),
      buildPage("calendar", {
        isDev,
        route: "calendar/lff",
        args: ["lff2018"],
      }),
      buildPage("calendar-about", {
        isDev,
        route: "calendar/about",
      }),
      buildPage("calendar-calculator", {
        isDev,
        route: "calendar/date",
      }),
    ].filter((n) => n)
  );

  return map.reduce((acc, curr) => ({ ...acc, ...curr }));
}

function main() {
  const dev = Deno.args[0] === "--dev",
    pagesOnly = Deno.args.includes("--pages");
  console.log("Deno.args = ", Deno.args);
  // for dev, watch and rebuild
  if (dev) {
    devServer(() => build(true, pagesOnly));
  }
  // for prod just build
  else {
    build();
  }
}

main();
