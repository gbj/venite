import { Heading, ResponsivePrayer } from "@venite/ldf/dist/cjs";
import { Paragraph, TextRun } from "docx";
import { DisplaySettings } from "./display-settings";
import { headingToDocx } from "./heading-to-docx";
import { LDFStyles } from "./ldf-styles";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import { notEmpty } from "./not-empty";

export function responsivePrayerToDocx(doc : ResponsivePrayer, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  function nodes() : DocxChild[] {
    if(doc.style == 'preces') {
      return [new Paragraph({
        children: doc.value.map((line, lineIndex) => [
          lineIndex == 0
          ? new TextRun({
            style: LDFStyles.ResponsivePrayerLabel,
            text: line.label
          })
          : new TextRun({
            style: LDFStyles.ResponsivePrayerLabel,
            text: line.label
          }).break(),
          new TextRun('\t'),
          new TextRun({
            style: lineIndex % 2 == 0 ? LDFStyles.Normal : LDFStyles.Response,
            text: line.text
          })
        ]).flat()
      })];
    } else if(doc.style == 'litany') {
      return doc.value.map((line, lineIndex) => new Paragraph({
        children: [
          new TextRun({
            style: LDFStyles.Normal,
            text: line.text
          }),
          new TextRun({
            style: LDFStyles.Response,
            text: line.response || doc.metadata?.response
          }).break()
        ]
      }));
    } else {
      return doc.value.map((line, lineIndex) => new Paragraph({
        children: [
          new TextRun({
            style: LDFStyles.Normal,
            text: line.text
          }),
          new TextRun({
            style: lineIndex % 2 == 0 ? LDFStyles.Normal : LDFStyles.Response,
            text: line.response
          }).break()
        ]
      }));
    }
  }

  return [
    ... headingToDocx(new Heading({ type: 'heading', metadata: { level: 3 }, value: [doc.label], citation: doc.citation, source: doc.source }), localeStrings),
    ... nodes()
  ].filter(notEmpty);
}
