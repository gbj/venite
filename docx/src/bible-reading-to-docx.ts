/* TODO
 * Replace entities
 */

import { BibleReading, BibleReadingVerse, Heading } from "@venite/ldf/dist/cjs";
import { Paragraph, TextRun, TabStopType, TabStopPosition, HeadingLevel } from "docx";
import { DocxChild, docxChildrenFromLDF } from "./ldf-to-docx";
import { DisplaySettings } from "./display-settings";
import { notEmpty } from "./not-empty";
import { LDFStyles } from "./ldf-styles";
import { processText } from "./process-text";
import { LocaleStrings } from "./locale-strings";

export function bibleReadingToDocx(doc : BibleReading, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {

  if(doc.style === 'long') {
    const p = paragraphs(doc).map(p => paragraph(p, displaySettings, localeStrings)).flat(),
      heading = headingLine(doc),
      intro = introLine(doc, displaySettings, localeStrings);

    return [
      heading,
      ... intro,
      ... p
    ].filter(notEmpty);
  } else {
    const shortResponse : boolean = (doc?.metadata?.response?.length || 0) <= 5,
      responseNode = new TextRun({
        text: doc?.metadata?.response ?? localeStrings.amen,
        style: LDFStyles.Response
      }),
      includeResponse = !doc?.metadata?.omit_response,
      ps = paragraphs(doc),
      p = includeResponse && shortResponse 
        ? ps.slice(0, ps.length - 1).map(p => paragraph(p, displaySettings, localeStrings))
            .concat(paragraph(ps[ps.length-1], displaySettings, localeStrings, [responseNode]))
            .flat()
        : ps.map(p => paragraph(p, displaySettings, localeStrings)).flat();

    return [
      ... p,
      citationLine(doc.citation),
      includeResponse && !shortResponse ? new Paragraph({ children: [responseNode] }) : null
    ].filter(notEmpty);
  }
}

function headingLine(doc : BibleReading) : Paragraph {
  return new Paragraph({
    children: [
      new TextRun(doc?.label || ''),
      new TextRun(`\t${doc?.citation || ''}`)
    ],
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
    heading: HeadingLevel.HEADING_2
  })
}

function citationLine(citation : string) : Paragraph {
  return new Paragraph({
    children: [
      new TextRun(''),
      new TextRun({ style: LDFStyles.Citation, text: `\t${citation}`})
    ],
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
  })
}

function introLine(inDoc : BibleReading, displaySettings : DisplaySettings, localeStrings : LocaleStrings) : DocxChild[] {
  const doc = new BibleReading(inDoc);

  if(doc?.metadata?.intro) {
    doc.compileIntro();
    if(doc.metadata.compiled_intro) {
      return docxChildrenFromLDF(doc.metadata?.compiled_intro, displaySettings, localeStrings);
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function paragraphs(doc : BibleReading) : (BibleReadingVerse | Heading)[][] {
  const paragraphs : (BibleReadingVerse | Heading)[][] = new Array();
       let currentParagraph : (BibleReadingVerse | Heading)[] = new Array();
       doc.value.forEach(verse => {
         if(verse.hasOwnProperty('type') && (verse as Heading).type === 'heading') {
           paragraphs.push(currentParagraph);
           currentParagraph = new Array();
         } else {
           currentParagraph.push(verse);
         }
       });
       paragraphs.push(currentParagraph);
   return paragraphs;
 }

function paragraph(p : (BibleReadingVerse | Heading)[], displaySettings : DisplaySettings, localeStrings : LocaleStrings, addlRuns : TextRun[] = []) : DocxChild[] {
  let children : DocxChild[] = [],
    verses : BibleReadingVerse[] = [];

  function saveVerses(final : boolean = false) {
    children.push(new Paragraph({
      children: verses.map(v => [
        displaySettings.bibleVerses && v.verse
        ? new TextRun({
          text: v.verse?.toString()+' ' || '',
          style: LDFStyles.VerseNumber
        })
        : null,
        processText(v.text)
      ].flat().filter(notEmpty)).flat().concat(final ? addlRuns : []),
      style: LDFStyles.Normal
    }));
    verses = [];
  }

  p.forEach(v => {
    if(v.hasOwnProperty('type') && (v as Heading).type === 'heading') {
      if(verses.length > 0) {
        saveVerses();
      }
      children = children.concat(docxChildrenFromLDF(v as Heading, displaySettings, localeStrings));
    } else {
      verses.push(v as BibleReadingVerse);
    }
  });

  saveVerses(true);

  return children.filter(notEmpty);
}