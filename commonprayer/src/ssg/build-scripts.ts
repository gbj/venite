import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

export async function buildScript(src: string, outDir: string) {
  const { files } = await Deno.emit(src);
  for (const [fileName, text] of Object.entries(files)) {
    const jsFileName = (fileName.split("/").pop() || "")?.replace(
      ".ts.js",
      ".js"
    );
    await Deno.writeTextFile(path.join(outDir, jsFileName), text);
    console.log("Bundled", jsFileName);
  }

  return { map: { [src]: () => buildScript(src, outDir) } };
}

export async function buildScripts(): Promise<SSGRefreshMap> {
  const outDir = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "..",
    "www",
    "scripts"
  );
  if (!(await exists(outDir))) {
    await Deno.mkdir(outDir);
  }

  const srcDir = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "scripts"
    ),
    scripts = await Deno.readDir(srcDir);

  let map = {};

  for await (const script of scripts) {
    if (script.isFile) {
      const scriptPath = path.join(srcDir, script.name);
      map = { ...map, ...(await buildScript(scriptPath, outDir)) };
    }
  }

  return map;
}
