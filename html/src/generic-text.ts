import { Heading, LiturgicalDocument } from "@venite/ldf/dist/cjs";
import { ldfToHTML } from ".";
import { LDFToHTMLConfig } from "./config";
import { processText } from "./process-text";

export function genericTextToHTML(
  doc: LiturgicalDocument,
  style: string,
  localeStrings: Record<string, string>,
  config: LDFToHTMLConfig
): string {
  const ldf =
    config.includeLDF || doc.compile_hidden || doc.hidden
      ? ` data-ldf="${encodeURI(JSON.stringify(doc))}"`
      : "";

  const heading =
    doc.label || doc.citation
      ? ldfToHTML(
          new Heading({
            type: "heading",
            metadata: { level: 3 },
            value: [doc.label],
            citation: doc.citation,
            source: doc.source,
          }),
          config
        )
      : "";

  return `<article ${ldf} class="doc ${doc.type} ${doc.style || ""} ${style} ${
    doc.hidden ? " hidden" : ""
  }" lang="${doc.language || "en"}">${heading}${((doc.value || []) as string[])
    .map(
      (line, lineIndex) =>
        `<p>${
          doc.type === "rubric"
            ? `<em class="rubric">${processText(line)}</em>`
            : processText(line)
        }${
          doc?.metadata?.response &&
          doc.value &&
          lineIndex == doc.value.length - 1
            ? ` <strong class="response">${doc.metadata.response}</strong>`
            : ""
        }${
          !doc?.metadata?.response &&
          doc.style == "prayer" &&
          doc.value &&
          lineIndex == doc.value.length - 1
            ? ` <strong class="response">${localeStrings.amen}</strong>`
            : ""
        }
        </p>`
    )
    .join("")}</article>`;
}
