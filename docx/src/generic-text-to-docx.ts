import { LiturgicalDocument, Refrain, Rubric, Text } from "@venite/ldf/dist/cjs";
import { Paragraph } from "docx";
import { DisplaySettings } from "./display-settings";
import { LDFStyles } from "./ldf-styles";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import { processText } from "./process-text";

export function genericTextToDocx(doc : Refrain | Text | Rubric, style : LDFStyles, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  return [
    new Paragraph({
      style,
      children: doc.value?.map(s => processText(s)).flat()
    })
  ]
}