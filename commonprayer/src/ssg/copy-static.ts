import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists, walk } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

const IGNORE = [".DS_Store"];

async function copyRecursive(src: string, dest: string): Promise<void> {
  // if no src, do nothing
  if (!(await exists(src))) {
    console.log("\t/assets does not exist");
    return;
  } // otherwise, recursively walk the directory and copy each file and sub-directory
  else {
    for await (const e of walk(src)) {
      if (e.isFile) {
        if (!IGNORE.includes(e.name)) {
          Deno.copyFile(e.path, path.join(dest, e.path.replace(src, "")));
        }
      } else {
        const newDir = path.join(dest, e.path.replace(src, ""));
        if (!(await exists(newDir))) {
          await Deno.mkdir(newDir);
        }
      }
    }

    return;
  }
}

export async function copyStatic(): Promise<SSGRefreshMap> {
  console.log("Copying static assets...");
  const src = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "assets"
    ),
    dest = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "..",
      "www",
      "assets"
    );
  if (!(await exists(dest))) {
    await Deno.mkdir(dest);
  }
  copyRecursive(src, dest);
  console.log("Copying liturgies...");
  const lSrc = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "liturgy"
    ),
    lDest = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "..",
      "www",
      "assets",
      "liturgy"
    );
  if (!(await exists(lDest))) {
    await Deno.mkdir(lDest);
  }
  copyRecursive(lSrc, lDest);

  // TODO
  return {};
}
