import { Index } from "../index.tsx";
import { PageProps } from "./page.ts";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

type BuildPageConfig = {
  isDev?: boolean;
  isIndex?: boolean;
  route?: string;
  args?: any[];
};

export async function buildPage(
  page: string,
  config: BuildPageConfig
): Promise<SSGRefreshMap> {
  const { isDev, isIndex, route, args } = config;

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
    data: PageProps = await m.default(...(args || [])),
    html = await Index({ ...data }, isDev),
    www = path.join(path.fromFileUrl(import.meta.url), "..", "..", "..", "www"),
    pageDir = path.join(www, route ?? page);
  if (!(await exists(pageDir))) {
    console.log("/", page);
    await Deno.mkdir(pageDir, { recursive: true });
  }
  await Deno.writeTextFile(
    isIndex ? path.join(www, "index.html") : path.join(pageDir, "index.html"),
    html
  );

  return {
    [srcPath]: () => buildPage(page, config),
  };
}
