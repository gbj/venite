import { LiturgicalDocument, Liturgy, Option, BibleReading, Heading, Image, Refrain, Rubric, Text, Psalm, ResponsivePrayer } from "@venite/ldf/dist/cjs";
import { DisplaySettings } from "./display-settings";
import { Document, HyperlinkRef, Paragraph, Table, TableOfContents } from "docx";
import { bibleReadingToDocx } from "./bible-reading-to-docx";
import { headingToDocx } from './heading-to-docx';
import { stylesFromLDF } from "./styles-from-ldf";
import { LocaleStrings, LOCALE_STRINGS } from "./locale-strings";
import { genericTextToDocx } from "./generic-text-to-docx";
import { LDFStyles } from "./ldf-styles";
import { imageToDocx } from "./image-to-docx";
import { psalmToDocx } from "./psalm-to-docx";
import { refrainToDocx } from "./refrain-to-docx";
import { responsivePrayerToDocx } from "./responsive-prayer-to-docx";

export async function ldfToDocx(inDoc : LiturgicalDocument, displaySettings : DisplaySettings) : Promise<Document> {
  const styles = stylesFromLDF(inDoc),
    outDoc = new Document({ styles }),
    localeStrings = LOCALE_STRINGS['en'],
    children = await docxChildrenFromLDF(inDoc, displaySettings, localeStrings, outDoc);
    
  outDoc.addSection({ children });

  return outDoc;
}

export type DocxChild = (Paragraph | Table | TableOfContents | HyperlinkRef);

export async function docxChildrenFromLDF(inDoc : LiturgicalDocument, displaySettings : DisplaySettings, localeStrings : LocaleStrings, docxDoc? : Document) : Promise<DocxChild[]> {
  switch(inDoc?.type) {
    case "liturgy":
      return (await Promise.all(
        ((inDoc as Liturgy).value || [])
        .map(async (subDoc : LiturgicalDocument) => await docxChildrenFromLDF(subDoc, displaySettings, localeStrings, docxDoc))
      )).flat();
    case "option":
      const selected = (inDoc as Option).value[inDoc.metadata?.selected ?? 0];
      return docxChildrenFromLDF(selected, displaySettings, localeStrings);
    case "bible-reading":
      return bibleReadingToDocx(inDoc as BibleReading, displaySettings, localeStrings);
    case "heading":
      return headingToDocx(inDoc as Heading, localeStrings);
    case "meditation":
      return []
    case "image":
      return docxDoc ? await imageToDocx(docxDoc, inDoc as Image, displaySettings, localeStrings) : [];
    case "psalm":
      return psalmToDocx(inDoc as Psalm, displaySettings, localeStrings);
    case "responsive":
      return responsivePrayerToDocx(inDoc as ResponsivePrayer, displaySettings, localeStrings);
    /** Text fields with various styles */
    case "refrain":
      return refrainToDocx(inDoc as Refrain, displaySettings, localeStrings);
    case "rubric":
      return genericTextToDocx(inDoc as Rubric, LDFStyles.Rubric, displaySettings, localeStrings);
    case "text":
      return genericTextToDocx(inDoc as Text, LDFStyles.Normal, displaySettings, localeStrings);
    default:
      return [];
      //throw new Error(`"${inDoc.type}" is not a valid LDF type.`);
  }
}