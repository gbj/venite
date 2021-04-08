import { Heading, Refrain, Rubric, Text } from "@venite/ldf/dist/cjs";
import { Paragraph, TextRun } from "docx";
import { DisplaySettings } from "./display-settings";
import { LDFStyles } from "./ldf-styles";
import { DocxChild, docxChildrenFromLDF } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import { processText } from "./process-text";

export async function genericTextToDocx(
  doc: Refrain | Text | Rubric,
  style: LDFStyles,
  displaySettings: DisplaySettings,
  localeStrings: LocaleStrings
): Promise<DocxChild[]> {
  const heading = await (doc.label || doc.citation
      ? docxChildrenFromLDF(
          new Heading({
            type: "heading",
            metadata: { level: 3 },
            value: [doc.label],
            citation: doc.citation,
          }),
          displaySettings,
          localeStrings
        )
      : Promise.resolve([])),
    response =
      (doc.metadata?.response || doc.style == "prayer") &&
      !doc.metadata?.omit_response
        ? [
            new TextRun(" "),
            new TextRun({
              style: LDFStyles.Response,
              text: doc.metadata?.response ?? localeStrings.amen,
            }),
          ]
        : [];

  return heading.concat(
    (doc.value || []).map(
      (p, ii) =>
        new Paragraph({
          style,
          children:
            ii == doc.value.length - 1
              ? processText(p).concat(response)
              : processText(p),
        })
    )
  );
}
