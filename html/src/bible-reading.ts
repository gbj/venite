import { BibleReading, BibleReadingVerse, Heading } from "@venite/ldf/dist/cjs";
import { ldfToHTML } from ".";
import { LDFToHTMLConfig } from "./config";
import { headingToHTML } from "./heading";

function docToParagraphs(doc: BibleReading): (BibleReadingVerse | Heading)[][] {
  const paragraphs: (BibleReadingVerse | Heading)[][] = new Array();
  let currentParagraph: (BibleReadingVerse | Heading)[] = new Array();
  (doc.value || []).forEach((verse) => {
    if (verse.hasOwnProperty("type") && (verse as Heading).type === "heading") {
      paragraphs.push(currentParagraph);
      currentParagraph = new Array();
    } else {
      currentParagraph.push(verse);
    }
  });
  paragraphs.push(currentParagraph);
  return paragraphs;
}

export function bibleReadingToHTML(
  doc: BibleReading,
  localeStrings: Record<string, string>,
  config: LDFToHTMLConfig
): string {
  const paragraphs = docToParagraphs(doc);

  const ldf = config.includeLDF
    ? ` data-ldf="${encodeURI(JSON.stringify(doc))}"`
    : "";

  if (doc.style === "short") {
    const shortResponse =
      (doc.metadata?.response || localeStrings.amen).length <= 5;

    return [
      `<article ${ldf} lang="${
        doc.language || "en"
      }" class="doc bible-reading short ${doc.display_format || "default"}${
        doc.hidden ? " hidden" : ""
      }">`,
      "<p>",
      ...(doc.value || []).map((verse) =>
        verse.hasOwnProperty("type") && (verse as Heading).type === "heading"
          ? `</p>\n${headingToHTML(
              new Heading(verse as Heading),
              localeStrings,
              config
            )}<p>`
          : (verse as BibleReadingVerse).text
      ),
      shortResponse && !doc.metadata?.omit_response
        ? `<span class="response">${
            doc.metadata?.response || localeStrings.amen
          }</span>`
        : "",
      ` <span class="citation">${doc.citation}</span>`,
      "</p>",
      doc.metadata?.response && !shortResponse && !doc.metadata?.omit_response
        ? `<p class="response">${doc.metadata?.response}</p>`
        : "",
      "</article>",
    ].join("\n");
  } else {
    // TODO include intros etc.
    return [
      `<article ${ldf} class="doc bible-reading long ${
        doc.display_format || "default"
      }" lang="${doc.language || "en"}">`,
      headingToHTML(
        new Heading({
          type: "heading",
          metadata: { level: 3 },
          value: [doc.label],
          citation: doc.citation,
        }),
        localeStrings,
        config
      ),
      doc?.metadata?.compiled_intro
        ? ldfToHTML(doc.metadata.compiled_intro, config)
        : "",
      ...(paragraphs || []).map(
        (paragraph) => `<p lang="${doc.language || "en"}">
        ${(paragraph || [])
          .map((verse) =>
            verse.hasOwnProperty("type") &&
            (verse as Heading).type === "heading"
              ? headingToHTML(
                  new Heading(verse as Heading),
                  localeStrings,
                  config
                )
              : [
                  (verse as BibleReadingVerse).verse
                    ? `<sup class="bible-verse-number">${
                        (verse as BibleReadingVerse).verse
                      } </sup>`
                    : "",
                  (verse as BibleReadingVerse).text,
                ].join("")
          )
          .join(" ")}
      </p>`
      ),
      `</article>`,
    ].join("\n");
  }
}
