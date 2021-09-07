import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

async function veniteCSS(): Promise<string> {
  const resp = await fetch(
    "https://cdn.skypack.dev/@venite/html@0.3.21/src/style.css"
  );
  return resp.text();
}

// Copy stylesheet from @venite/html and merge with local stylesheet
export async function buildCSS(): Promise<SSGRefreshMap> {
  console.log("Building CSS...");

  const localStylePath = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "styles"
  );

  const styles: string[] = [];

  for await (const style of await Deno.readDir(localStylePath)) {
    if (style.isFile) {
      styles.push(path.join(localStylePath, style.name));
    }
  }

  const css = await Promise.all([
    // load @venite/html CSS
    veniteCSS(),
    // load local CSS
    ...styles.map(async (file) => await Deno.readTextFile(file)),
  ]);
  await Deno.writeTextFile(
    path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "..",
      "www",
      "style.css"
    ),
    css.join("\n\n")
  );

  return styles.reduce(
    (acc, curr) => ({ ...acc, [curr]: () => buildCSS() }),
    {}
  );
}
