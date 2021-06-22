import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { buildScript } from "./build-scripts.ts";

export type PageProps = {
  main: Promise<string>;
  style?: string | undefined;
  styles?: string[] | undefined;
  script?: string | undefined;
  scripts?: string[] | undefined;
  head?: string | undefined;
};

type PageBuilderProps = {
  main: (...args: any[]) => Promise<string>;
  scripts?: string[] | undefined;
  styles?: string[] | undefined;
};

export async function Page({
  main,
  styles,
  scripts,
}: PageBuilderProps): Promise<(...args: any[]) => PageProps> {
  const outDir = path.join(
    path.fromFileUrl(import.meta.url),
    "..",
    "..",
    "..",
    "www"
  );

  // build scripts
  await Promise.all(
    (scripts || []).map((url) => buildScript(url, path.join(outDir, "scripts")))
  );

  // concatenate styles
  const style =
    (await Promise.all((styles || []).map((url) => Deno.readTextFile(url))))
      .join("\n\n")
      .trim() || undefined;

  return (...args: any[]) => ({
    main: main(...args),
    style,
    scripts: (scripts || []).map(
      (fileName) =>
        "/scripts/" +
        (fileName.split("/").pop() || "")
          ?.replace(".ts.js", ".js")
          .replace(".ts", ".js")
    ),
  });
}
