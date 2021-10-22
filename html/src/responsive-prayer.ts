import { Heading, ResponsivePrayer } from "@venite/ldf/dist/cjs";
import { LDFToHTMLConfig } from "./config";
import { headingToHTML } from "./heading";
import { processText } from "./process-text";

export function responsivePrayerToHTML(
  doc: ResponsivePrayer,
  localeStrings: Record<string, string>,
  config: LDFToHTMLConfig
): string {
  const ldf =
    config.includeLDF || doc.compile_hidden || doc.hidden
      ? ` data-ldf="${encodeURI(JSON.stringify(doc))}"`
      : "";

  const header = headingToHTML(
    new Heading({
      type: "heading",
      metadata: { level: 3 },
      value: [doc.label],
      citation: doc.citation,
      source: doc.source,
    }),
    localeStrings,
    config
  );
  if (doc.style === "litany") {
    return `<article ${ldf} class="doc responsive-prayer litany${
      doc.hidden ? " hidden" : ""
    }"  lang="${doc.language || "en"}">
      ${[
        header,
        ...(doc.value || []).map((line) => {
          const response = line.response || doc.metadata?.response || "";

          return `<p class="line ${
            line.optional ? "optional" : ""
          }"><span class="text">${processText(line.text)}</span><br/>${
            ["[Silence]", "[Silencio]"].includes(response.trim())
              ? `<em class="rubric silence">${response.replace(
                  /[\[\]]/g,
                  ""
                )}</em>`
              : `<strong class="response">${processText(response)}</strong>`
          }</p>`;
        }),
      ].join("\n")}
      </article>`;
  } else if (doc.style === "preces") {
    return `<article ${ldf} class="doc responsive-prayer preces${
      doc.hidden ? " hidden" : ""
    }"  lang="${doc.language || "en"}">${[
      header,
      ...(doc.value || []).map(
        (line, lineIndex) =>
          `<p class="line ${
            line.optional ? "optional" : ""
          }"><em class="label">${line.label}</em>\t<span class="text${
            lineIndex % 2 === 1 ? " response" : ""
          }">${processText(line.text)}</span></p>`
      ),
    ].join("\n")}</article>`;
  } else {
    return `<article ${ldf} class="doc responsive-prayer responsive${
      doc.hidden ? " hidden" : ""
    }" lang="${doc.language || "en"}">${[
      header,
      `<p>`,
      ...(doc.value || []).map(
        (line, lineIndex) =>
          `${lineIndex > 0 ? "<br>" : ""}${processText(line.text)}${
            line.response
              ? `<br><strong class="response">${processText(
                  line.response
                )}</strong>`
              : ""
          }`
      ),
      `</p>`,
    ].join("\n")}</article>`;
  }
}
