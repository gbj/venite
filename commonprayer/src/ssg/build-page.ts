import { Index } from "../index.tsx";
import { PageProps } from "./page.ts";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

export async function buildPage(
  page: string,
  isDev = false,
  isIndex = false
): Promise<SSGRefreshMap> {
  console.log("/", page);

  const srcPath = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "pages",
      page,
      `${page}.tsx`
    ),
    m = await import(srcPath),
    data: PageProps = await m.default(),
    html = await Index({ ...data }, isDev),
    www = path.join(path.fromFileUrl(import.meta.url), "..", "..", "..", "www"),
    pageDir = path.join(www, page);
  if (!(await exists(pageDir))) {
    console.log("/", page);
    await Deno.mkdir(pageDir);
  }
  await Deno.writeTextFile(
    isIndex ? path.join(www, "index.html") : path.join(pageDir, "index.html"),
    html
  );

  return {
    [srcPath]: () => buildPage(page, isDev),
  };
}
