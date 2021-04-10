import {
  dateFromYMDString,
  Heading,
  Psalm,
  PsalmVerse,
  Refrain,
} from "@venite/ldf/dist/cjs";
import { Paragraph, TextRun } from "docx";
import { DisplaySettings } from "./display-settings";
import { headingToDocx } from "./heading-to-docx";
import { LDFStyles } from "./ldf-styles";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import { notEmpty } from "./not-empty";
import { refrainToDocx } from "./refrain-to-docx";

export async function psalmToDocx(
  doc: Psalm,
  displaySettings: DisplaySettings,
  localeStrings: LocaleStrings
): Promise<DocxChild[]> {
  const obj = new Psalm(doc),
    includeAntiphon: boolean = obj.includeAntiphon(),
    filteredValue = obj.filteredVerses();

  function headingNode(
    value: string | undefined = undefined,
    level: number = 3,
    showLatinName: boolean = true,
    showCitation: boolean = true
  ): DocxChild[] {
    let label: string = obj.label;
    if (
      obj.style == "canticle" &&
      obj.metadata &&
      obj.metadata.number &&
      obj.metadata.localname
    ) {
      label = `${obj.metadata.number}. ${obj.metadata.localname}`;
    } else if (
      obj.style == "canticle" &&
      obj.metadata &&
      obj.metadata.localname
    ) {
      label = obj.metadata.localname;
    }
    const heading = new Heading({
      type: "heading",
      metadata: { level },
      citation: showCitation ? obj?.citation : undefined,
      value: [value ?? label],
      source: showCitation ? obj?.source : undefined,
    });
    return headingToDocx(heading, localeStrings);
  }

  async function antiphonNode(
    antiphon: string | Refrain | { [x: string]: string | Refrain } | undefined
  ): Promise<DocxChild[]> {
    if (typeof antiphon == "string") {
      const refrain = new Refrain({ value: [antiphon], style: "antiphon" });
      return refrainToDocx(refrain, displaySettings, localeStrings);
    } else if (
      antiphon instanceof Refrain ||
      (typeof antiphon == "object" &&
        antiphon.type &&
        antiphon.type == "refrain")
    ) {
      return refrainToDocx(antiphon as Refrain, displaySettings, localeStrings);
    } else if (typeof antiphon == "object") {
      // antiphon is something like an O antiphon tree:
      // { '12/23': '...', '12/24': '...' }
      const date = obj.day ? dateFromYMDString(obj?.day?.date) : new Date();
      return antiphonNode(antiphon[`${date.getMonth() + 1}/${date.getDate()}`]);
    } else {
      return [];
    }
  }

  let evenVerse = false;
  function psalmVerseNode(verse: PsalmVerse): DocxChild[] {
    evenVerse = !evenVerse;
    return [
      new Paragraph({
        style: LDFStyles.Psalm,
        children: [
          displaySettings.psalmVerses && verse.number
            ? new TextRun({
                text: verse.number?.toString() + " " || "",
                style: LDFStyles.VerseNumber,
              })
            : null,
          verse.verse
            ? new TextRun({
                style:
                  obj.display_format === "unison" ||
                  (obj.display_format === "wholeverse" && evenVerse)
                    ? LDFStyles.Response
                    : undefined,
                text: verse.verse,
              })
            : null,
          verse.halfverse
            ? new TextRun({
                style:
                  obj.display_format === "unison" ||
                  (obj.display_format === "wholeverse" && evenVerse) ||
                  obj.display_format === "halfverse"
                    ? LDFStyles.Response
                    : undefined,
                text: verse.halfverse,
              }).break()
            : null,
        ].filter(notEmpty),
      }),
    ];
  }

  async function gloriaNode(gloria: string | Refrain): Promise<DocxChild[]> {
    if (typeof gloria === "string") {
      return [new Paragraph(gloria)];
    } else {
      return refrainToDocx(gloria, displaySettings, localeStrings);
    }
  }

  const gloria =
      obj?.metadata?.gloria && !obj?.metadata?.omit_gloria
        ? await gloriaNode(obj?.metadata?.gloria)
        : [],
    antiphon = includeAntiphon
      ? await antiphonNode(obj?.metadata?.antiphon)
      : [];

  return [
    ...headingNode(),
    ...(includeAntiphon ? await antiphonNode(obj?.metadata?.antiphon) : []),
    ...filteredValue
      .map((section) => [
        ...(section.label ? headingNode(section.label, 4, false, false) : []),
        ...section.value
          .map((verse: any) => [
            ...(verse.hasOwnProperty("type") && verse.type === "heading"
              ? headingToDocx(verse as Heading, localeStrings)
              : psalmVerseNode(verse as PsalmVerse)),
          ])
          .flat(),
        ...(displaySettings.repeatAntiphon == "repeat" ? antiphon : []),
      ])
      .flat(),
    ...gloria,
    ...((obj?.metadata?.gloria && !obj.metadata.omit_gloria) ||
    obj?.metadata?.gloria === undefined ||
    Boolean(obj?.metadata?.omit_gloria)
      ? antiphon
      : []),
  ].filter(notEmpty);
}
