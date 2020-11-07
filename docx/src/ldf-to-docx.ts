import { LiturgicalDocument, Liturgy, Option, BibleReading } from "@venite/ldf/dist/cjs";
import { DisplaySettings } from "./display-settings";
import { Document, HyperlinkRef, Paragraph, Table, TableOfContents } from "docx";
import { bibleReadingToDocx } from "./bible-reading-to-docx";
import { stylesFromLDF } from "./styles-from-ldf";
import { LocaleStrings, LOCALE_STRINGS } from "./locale-strings";

export function ldfToDocx(inDoc : LiturgicalDocument, displaySettings : DisplaySettings) : Document {
  const styles = stylesFromLDF(inDoc),
    outDoc = new Document({ styles }),
    localeStrings = LOCALE_STRINGS['en'],
    children = docxChildrenFromLDF(inDoc, displaySettings, localeStrings);
    
  outDoc.addSection({ children });

  return outDoc;
}

export type DocxChild = (Paragraph | Table | TableOfContents | HyperlinkRef);

export function docxChildrenFromLDF(inDoc : LiturgicalDocument, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  switch(inDoc?.type) {
    case "liturgy":
      return ((inDoc as Liturgy).value || [])
        .map((subDoc : LiturgicalDocument) => docxChildrenFromLDF(subDoc, displaySettings, localeStrings))
        .flat();
    case "option":
      const selected = (inDoc as Option).value[inDoc.metadata?.selected ?? 0];
      return docxChildrenFromLDF(selected, displaySettings, localeStrings);
    case "bible-reading":
      return bibleReadingToDocx(inDoc as BibleReading, displaySettings, localeStrings);
    default:
      return [];
      //throw new Error(`"${inDoc.type}" is not a valid LDF type.`);
  }
}