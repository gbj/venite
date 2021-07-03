import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists, walk } from "https://deno.land/std@0.98.0/fs/mod.ts";

import { Index } from "../index.tsx";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";
import { Category } from "../components/category/category.tsx";
import { Doc } from "../components/doc/doc.tsx";

const IGNORE = [".DS_Store", "index.json"],
  DIR_IGNORE_CHILDREN: string[] = ["psalter"];

export async function buildDoc(
  subpath: string | undefined,
  src: string,
  filename: string,
  isDev = false
): Promise<SSGRefreshMap> {
  try {
    const slug = filename.replace(/(\.ldf)?\.json/, ""),
      page = Doc(slug, subpath, src),
      html = await Index(page),
      dest = path.join(
        path.fromFileUrl(import.meta.url),
        "..",
        "..",
        "..",
        "www",
        subpath || "",
        slug
      );

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

export async function buildCategoryPage(
  srcDir: string,
  subpath: string,
  categoryName: string,
  isDev: boolean
): Promise<SSGRefreshMap> {
  // build category page
  const page = Category(srcDir, categoryName),
    html = await Index(page),
    dest = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "..",
      "www",
      subpath || "",
      categoryName
    );
  if (!(await exists(dest))) {
    await Deno.mkdir(dest, { recursive: true });
  }
  await Deno.writeTextFile(path.join(dest, "index.html"), html);

  const categoryPagePath = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "pages",
    "category.tsx"
  );

  // build category lookup JSON
  const categoryDocs = [];
  for await (const { name, isFile } of await Deno.readDir(srcDir)) {
    if (isFile && name.endsWith(".json") && name !== "index.json") {
      const json = await Deno.readTextFile(path.join(srcDir, name)),
        { data } = JSON.parse(json);
      for (const doc of data) {
        categoryDocs.push(doc);
      }
    }
  }
  await Deno.writeTextFile(
    path.join(dest, "category.json"),
    JSON.stringify(categoryDocs)
  );

  return {
    [srcDir]: () => buildCategoryPage(srcDir, subpath, categoryName, isDev),
    [categoryPagePath]: () =>
      buildCategoryPage(srcDir, subpath, categoryName, isDev),
  };
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
    // build a page for each LDF JSON file
    if (e.isFile) {
      if (!IGNORE.includes(e.name)) {
        map = { ...map, ...(await buildDoc(subpath, e.path, e.name, isDev)) };
      }
    }
    // for each directory,
    else {
      if (e.path !== src && !DIR_IGNORE_CHILDREN.includes(e.name)) {
        // a) build a category page
        map = {
          ...map,
          ...(await buildCategoryPage(e.path, subpath, e.name, isDev)),
        };

        // b) build pages for children
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
