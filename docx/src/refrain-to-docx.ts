import { Refrain } from "@venite/ldf/dist/cjs";
import { DisplaySettings } from "./display-settings";
import { genericTextToDocx } from "./generic-text-to-docx";
import { LDFStyles } from "./ldf-styles";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";

export function refrainToDocx(inDoc : Refrain, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  const styleMap : Record<string, LDFStyles> = {
    'normal': LDFStyles.Normal,
    'antiphon': LDFStyles.Antiphon,
    'gloria': LDFStyles.Gloria
  }
  return genericTextToDocx(inDoc, styleMap[inDoc.style || 'normal'], displaySettings, localeStrings);
}