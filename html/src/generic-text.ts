import { Heading, LiturgicalDocument } from "@venite/ldf/dist/cjs";
import { ldfToHTML } from ".";

export function genericTextToHTML(
  doc: LiturgicalDocument,
  style: string,
  localeStrings: Record<string, string>
): string {
  const heading =
    doc.label || doc.citation
      ? ldfToHTML(
          new Heading({
            type: "heading",
            metadata: { level: 3 },
            value: [doc.label],
            citation: doc.citation,
            source: doc.source,
          })
        )
      : "";

  return `<article class="${doc.type} ${doc.style || ""} ${style}">${heading}${(
    (doc.value || []) as string[]
  )
    .map(
      (line, lineIndex) =>
        `<p>${
          doc.type === "rubric"
            ? `<em class="rubric">${line}</em>`
            : line.replace(/\n/g, "<br>").replace(/\t/g, "    ")
        }
        ${
          doc?.metadata?.response &&
          doc.value &&
          lineIndex == doc.value.length - 1
            ? `<strong class="response">${doc.metadata.response}</strong>`
            : ""
        }
        ${
          !doc?.metadata?.response &&
          doc.style == "prayer" &&
          doc.value &&
          lineIndex == doc.value.length - 1
            ? `<strong class="response">${localeStrings.amen}</strong>`
            : ""
        }
        </p>`
    )
    .join("\n")}</article>`;
}
