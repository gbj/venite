import {
  dateFromYMDString,
  Heading,
  LiturgicalDocument,
  Psalm,
  Refrain,
} from "@venite/ldf/dist/cjs";
import { ldfToHTML } from ".";
import { LDFToHTMLConfig } from "./config";
import { genericTextToHTML } from "./generic-text";
import { headingToHTML } from "./heading";
import { notEmpty } from "./not-empty";

export function psalmToHTML(
  doc: Psalm,
  localeStrings: Record<string, string>,
  config: LDFToHTMLConfig
): string {
  const ldf = config.includeLDF
    ? ` data-ldf="${encodeURI(JSON.stringify(doc))}"`
    : "";

  function headingNode(
    value: string | undefined = undefined,
    level: number = 3,
    showLatinName: boolean = true,
    omitCitation: boolean = false
  ): string {
    let label: string = doc.label;
    if (
      doc.style == "canticle" &&
      doc.metadata &&
      doc.metadata.number &&
      doc.metadata.localname
    ) {
      label = `${doc.metadata.number}. ${doc.metadata.localname}`;
    } else if (
      doc.style == "canticle" &&
      doc.metadata &&
      doc.metadata.localname
    ) {
      label = doc.metadata.localname;
    }
    const heading = new Heading({
      type: "heading",
      metadata: { level },
      citation:
        !omitCitation && doc?.citation !== doc?.label
          ? doc?.citation
          : undefined,
      value: [
        value ?? label,
        showLatinName ? doc?.metadata?.latinname : null,
      ].filter(notEmpty),
      source: doc?.source,
    });

    return headingToHTML(heading, localeStrings, config);
  }

  function antiphonNode(
    antiphon: string | Refrain | { [x: string]: string | Refrain },
    notEditable: boolean = false
  ): string {
    if (typeof antiphon == "string") {
      const refrain = new Refrain({
        type: "refrain",
        value: [antiphon],
        style: "antiphon",
      });
      return genericTextToHTML(refrain, "refrain", localeStrings, config);
    } else if (antiphon?.type) {
      return ldfToHTML(antiphon as LiturgicalDocument, config);
    } else if (typeof antiphon == "object") {
      // antiphon is something like an O antiphon tree:
      // dates can be either MM/DD or MM-DD
      // { '12/23': '...', '12/24': '...' }
      const date = doc.day ? dateFromYMDString(doc?.day?.date) : new Date();
      return antiphonNode(
        (antiphon as Record<string, string | Refrain>)[
          `${date.getMonth() + 1}/${date.getDate()}`
        ] ||
          (antiphon as Record<string, string | Refrain>)[
            `${date.getMonth() + 1}-${date.getDate()}`
          ],
        true
      );
    } else {
      return "";
    }
  }

  function gloriaNode(gloria: string | Refrain): string {
    if (typeof gloria == "string") {
      const refrain = new Refrain({ value: [gloria], style: "gloria" });
      return genericTextToHTML(refrain, "refrain", localeStrings, config);
    } else {
      return genericTextToHTML(gloria, "refrain", localeStrings, config);
    }
  }

  const p = new Psalm(doc),
    includeAntiphon = p.includeAntiphon(),
    sections = p.filteredVerses();

  return [
    `<article ${ldf} class="doc psalm ${doc.style}${
      doc.hidden ? " hidden" : ""
    }"  lang="${doc.language || "en"}">`,
    headingNode(),
    includeAntiphon && doc.metadata?.antiphon
      ? antiphonNode(doc.metadata.antiphon)
      : "",
    ...(sections || []).map((section, sectionIndex) =>
      [
        section.label ? headingNode(section.label, 4, false, true) : "",
        `<section class="psalm-section">`,
        ...(section.value || []).map((verse) =>
          verse instanceof Heading || (verse as any).type === "heading"
            ? headingToHTML(verse as any, localeStrings, config)
            : `<p class="psalm-verse ${verse.number ? "" : "no-number"}">${
                verse.number
                  ? `<sup class="psalm-verse-number">${verse.number} </sup>`
                  : ""
              }<span class="verse">${verse?.verse?.replace(
                /\n/g,
                "<br>"
              )}</span>${
                verse.halfverse
                  ? `<br><span class="half-verse">${(
                      verse.halfverse.split("\n") || []
                    )
                      .map((piece) => `\t${piece}`)
                      .join("\n")
                      .replace(/\n/g, "<br>")}</span>`
                  : ""
              }</p>`
        ),
        `</section>`,
      ].join("\n")
    ),
    doc.metadata?.gloria && !doc.metadata.omit_gloria
      ? gloriaNode(doc.metadata.gloria)
      : "",
    ((doc?.metadata?.gloria && !doc.metadata.omit_gloria) ||
      doc?.metadata?.gloria === undefined ||
      Boolean(doc?.metadata?.omit_gloria)) &&
    includeAntiphon &&
    doc.metadata?.antiphon
      ? antiphonNode(doc.metadata.antiphon)
      : "",
    `</article>`,
  ].join("\n");
}
