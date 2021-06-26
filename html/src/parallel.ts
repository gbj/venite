import { LiturgicalDocument, Parallel } from "@venite/ldf/dist/cjs";
import { ldfToHTML } from "..";
import { LDFToHTMLConfig } from "./config";

export function parallelToHTML(doc: Parallel, config: LDFToHTMLConfig): string {
  const docs = doc.value.map((doc) =>
    ldfToHTML(
      new LiturgicalDocument({ ...doc, language: doc.language || "en" }),
      { ...config, includeLDF: true }
    )
  );

  return `<article class="parallel">${docs.join("\n")}</article>`;
}
