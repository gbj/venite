import { Heading, ResponsivePrayer } from "@venite/ldf/dist/cjs";
import { LDFToHTMLConfig } from "./config";
import { headingToHTML } from "./heading";

export function responsivePrayerToHTML(
  doc: ResponsivePrayer,
  localeStrings: Record<string, string>,
  config: LDFToHTMLConfig
): string {
  const ldf = config.includeLDF
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
    return [
      header,
      `<article ${ldf} class="doc responsive-prayer litany">`,
      ...(doc.value || []).map(
        (line) =>
          `<p class="line ${
            line.optional ? "optional" : ""
          }"><span class="text">${
            line.text
          }</span><br/><strong class="response">${
            line.response || doc.metadata?.response
          }</strong></p>`
      ),
      `</article>`,
    ].join("\n");
  } else if (doc.style === "preces") {
    return [
      header,
      `<article ${ldf} class="doc responsive-prayer preces">`,
      ...(doc.value || []).map(
        (line) =>
          `<p class="line ${
            line.optional ? "optional" : ""
          }"><em class="label">${line.label}</em>\t<span class="text">${
            line.text
          }</span></p>`
      ),
      `</article>`,
    ].join("\n");
  } else {
    return [
      header,
      `<article ${ldf} class="doc responsive-prayer responsive"><p>`,
      ...(doc.value || []).map(
        (line) =>
          `${line.text}<br><strong class="response">${line.response}</strong>`
      ),
      `</p></article>`,
    ].join("\n");
  }
}
