import { dateFromYMDString, Heading, Psalm, PsalmVerse, Refrain } from "@venite/ldf/dist/cjs";
import { Paragraph, TextRun } from "docx";
import { DisplaySettings } from "./display-settings";
import { headingToDocx } from "./heading-to-docx";
import { LDFStyles } from "./ldf-styles";
import { DocxChild } from "./ldf-to-docx";
import { LocaleStrings } from "./locale-strings";
import { notEmpty } from "./not-empty";
import { refrainToDocx } from "./refrain-to-docx";

export function psalmToDocx(doc : Psalm, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  const obj = new Psalm(doc),
    includeAntiphon : boolean = obj.includeAntiphon(),
    filteredValue = obj.filteredVerses();
  
  function headingNode(value : string | undefined = undefined, level : number = 3, showLatinName : boolean = true) : DocxChild[] {
    let label : string = obj.label;
    if(obj.style == 'canticle' && obj.metadata && obj.metadata.number && obj.metadata.localname) {
      label = `${obj.metadata.number}. ${obj.metadata.localname}`;
    } else if(obj.style == 'canticle' && obj.metadata && obj.metadata.localname) {
      label = obj.metadata.localname;
    }
    const heading = new Heading({
      type: 'heading',
      metadata: { level },
      citation: obj?.citation,
      value: [value ?? label],
      source: obj?.source
    })
    return headingToDocx(heading, localeStrings);
  }

  function antiphonNode(antiphon : string | Refrain | { [x: string]: string | Refrain } | undefined) : DocxChild[] {
    if(typeof antiphon == 'string') {
      const refrain = new Refrain({ value: [ antiphon ], style: 'antiphon' });
      return refrainToDocx(refrain, displaySettings, localeStrings);
    } else if(antiphon instanceof Refrain || (typeof antiphon == 'object' && antiphon.type && antiphon.type == 'refrain')) {
      return refrainToDocx(antiphon as Refrain, displaySettings, localeStrings);
    } else if(typeof antiphon == 'object') {
      // antiphon is something like an O antiphon tree:
      // { '12/23': '...', '12/24': '...' }
      const date = obj.day ? dateFromYMDString(obj?.day?.date) : new Date();
      return antiphonNode(antiphon[`${date.getMonth()+1}/${date.getDate()}`]);
    } else {
      return [];
    }
  }

  function psalmVerseNode(verse : PsalmVerse) : DocxChild[] {
    return [
      new Paragraph({
        style: LDFStyles.Psalm,
        children: [
          displaySettings.psalmVerses && verse.number
            ? new TextRun({
              text: verse.number?.toString()+' ' || '',
              style: LDFStyles.VerseNumber
            })
            : null,
          verse.verse ? new TextRun(verse.verse) : null,
          verse.halfverse ? new TextRun(verse.halfverse).break() : null
        ].filter(notEmpty)
      })
    ];
  }

  function gloriaNode(gloria : string | Refrain) : DocxChild[] {
    if(typeof gloria === "string") {
      return [new Paragraph(gloria)];
    } else {
      return refrainToDocx(gloria, displaySettings, localeStrings);
    }
  }

  return [
    ... headingNode(),
    ... includeAntiphon ? antiphonNode(obj?.metadata?.antiphon) : [],
    ... filteredValue.map(section => [
      ... section.label ? headingNode(section.label, 4, false) : [],
      ... section.value.map((verse : any) => [
        ... verse.hasOwnProperty('type') && verse.type === 'heading'
        ? headingToDocx(verse as Heading, localeStrings)
        : psalmVerseNode(verse as PsalmVerse),
      ]).flat(),
      ... displaySettings.repeatAntiphon == "repeat" ? antiphonNode(obj?.metadata?.antiphon) : []
    ]).flat(),
    ... obj?.metadata?.gloria && !obj?.metadata?.omit_gloria ? gloriaNode(obj?.metadata?.gloria) : [],
    ... ((obj?.metadata?.gloria && !obj.metadata.omit_gloria) || (obj?.metadata?.gloria === undefined || Boolean(obj?.metadata?.omit_gloria))) && includeAntiphon ? antiphonNode(obj?.metadata?.antiphon) : []
  ].filter(notEmpty);
}