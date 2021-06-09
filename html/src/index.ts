import { LiturgicalDocument } from "@venite/ldf/dist/cjs";

import {
  Liturgy,
  Option,
  BibleReading,
  Heading,
  Image,
  Refrain,
  Rubric,
  Text,
  Psalm,
  ResponsivePrayer,
} from "@venite/ldf/dist/cjs";
import { bibleReadingToHTML } from "./bible-reading";
import { genericTextToHTML } from "./generic-text";
import { headingToHTML } from "./heading";
import { LOCALE_STRINGS } from "./locale";
import { psalmToHTML } from "./psalm";
import { responsivePrayerToHTML } from "./responsive-prayer";

export function ldfToHTML(inDoc: LiturgicalDocument): string {
  const localeStrings = LOCALE_STRINGS["en"];

  switch (inDoc?.type) {
    case "liturgy":
      return ((inDoc as Liturgy).value || [])
        .map((subDoc: LiturgicalDocument) => ldfToHTML(subDoc))
        .flat()
        .join("\n");
    case "option":
      /*console.log("option = ", inDoc.value);
      ((inDoc as Option).value || [])
        .map((sub) => {
          console.log("\tsub = ", sub);
          return `<pre>${JSON.stringify(sub)}</pre>`;
        })
        .join(`<p><em class="rubric">${localeStrings.or}</em></p>`);*/
      return ((inDoc as Option).value || [])
        .map((sub) => ldfToHTML(sub))
        .join(ldfToHTML(new Rubric({ type: "rubric", value: ["or"] })));
    case "bible-reading":
      return bibleReadingToHTML(inDoc as BibleReading, localeStrings);
    case "heading":
      return headingToHTML(inDoc as Heading, localeStrings);
    case "meditation":
      return "";
    case "image":
      return ((inDoc as Image).value || [])
        .map((src) => `<img src="${src}">`)
        .join("\n");
    case "psalm":
      return psalmToHTML(inDoc as Psalm, localeStrings);
    case "responsive":
      return responsivePrayerToHTML(inDoc as ResponsivePrayer, localeStrings);
    /** Text fields with various styles */
    case "refrain":
      return genericTextToHTML(inDoc as Refrain, "refrain", localeStrings);
    case "rubric":
      return genericTextToHTML(inDoc as Rubric, "rubric", localeStrings);
    case "text":
      return genericTextToHTML(
        inDoc as Text,
        inDoc?.display_format === "unison" ? "unison" : "normal",
        localeStrings
      );
    default:
      return "";
    //throw new Error(`"${inDoc.type}" is not a valid LDF type.`);
  }
}
