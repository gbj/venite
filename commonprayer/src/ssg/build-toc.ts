import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists, walk } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { ldfToHTML } from "https://cdn.pika.dev/@venite/html@0.1.12";
import { LiturgicalDocument } from "https://cdn.pika.dev/@venite/ldf@^0.19.5";

import { Index } from "../index.tsx";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

const IGNORE = [".DS_Store"],
  DIR_IGNORE_CHILDREN: string[] = [];

export async function buildDoc(
  subpath: string | undefined,
  src: string,
  filename: string,
  isDev = false
): Promise<SSGRefreshMap> {
  try {
    const slug = filename.replace(/(\.ldf)?\.json/, ""),
      dest = path.join(
        path.fromFileUrl(import.meta.url),
        "..",
        "..",
        "..",
        "www",
        subpath || "",
        slug
      ),
      json = await Deno.readTextFile(src),
      data = JSON.parse(json),
      docs = data.data ? data.data : [data],
      main = `<main><div class="cp-doc" data-category="${subpath}" data-slug="${slug}">${docs.map(
        (doc: LiturgicalDocument) => ldfToHTML(new LiturgicalDocument(doc))
      )}</div></main>`,
      html = Index({ main }, isDev);

    if (!(await exists(dest))) {
      await Deno.mkdir(dest, { recursive: true });
    }

    try {
      await Deno.writeTextFile(path.join(dest, "index.html"), html);
    } catch (e) {
      console.warn("Trouble writing ", subpath, filename, e);
    }
  } catch (e) {
    console.error("Error building", subpath, filename);
    console.error(e);
  }

  return { [src]: () => buildDoc(subpath, src, filename, isDev) };
}

export async function buildTOC(
  isDev = false,
  subpath: string | undefined = undefined
): Promise<SSGRefreshMap> {
  console.log("Building TOC", subpath || "");

  const src = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "liturgy",
    subpath || ""
  );

  let map: SSGRefreshMap = {};

  for await (const e of walk(src, { maxDepth: 1 })) {
    if (e.isFile) {
      if (!IGNORE.includes(e.name)) {
        map = { ...map, ...(await buildDoc(subpath, e.path, e.name, isDev)) };
      }
    } else {
      if (e.path !== src) {
        if (!DIR_IGNORE_CHILDREN.includes(e.name)) {
          map = {
            ...map,
            ...(await buildTOC(
              isDev,
              subpath ? `${subpath}/${e.name}` : e.name
            )),
          };
        }
      }
    }
  }

  return map;
}
