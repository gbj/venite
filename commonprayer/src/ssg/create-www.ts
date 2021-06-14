import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.98.0/path/mod.ts";

export async function createWWW(): Promise<void> {
  const www = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "..",
      "www",
    ),
    ex = await exists(www);
  if (!ex) {
    Deno.mkdir(www);
  }
  return;
}
