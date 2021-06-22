import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

export async function buildScript(src: string, outDir: string) {
  if (!(await exists(outDir))) {
    await Deno.mkdir(outDir, { recursive: true });
  }

  const { files } = await Deno.emit(
    src,
    src.endsWith("-service.ts") ? { bundle: "module" } : undefined
  );
  const baseFileName = src.split("/").pop();
  for (const [fileName, text] of Object.entries(files)) {
    const jsFileName = baseFileName
        .replace(".ts.js", ".js")
        .replace(".ts", ".js"),
      outFileName = fileName.endsWith(".js.map")
        ? `${jsFileName}.map`
        : jsFileName;
    await Deno.writeTextFile(path.join(outDir, outFileName), text);
    console.log("Bundled", outFileName);
  }

  return { map: { [src]: () => buildScript(src, outDir) } };
}

export async function buildLDFBundle() {
  const src = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "ldf.ts"
  );
  const outDir = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "..",
    "www"
  );
  await buildScript(src, outDir);
  return { [src]: () => buildLDFBundle() };
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
    await Deno.mkdir(outDir, { recursive: true });
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
