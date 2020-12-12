import { Injectable } from '@angular/core';
import { BibleReading, BibleReadingVerse, dateFromYMDString, Heading, LiturgicalDocument, Liturgy, Option, Psalm, PsalmVerse, Refrain, ResponsivePrayer, Rubric, Text } from '@venite/ldf';
import { PlatformService } from '@venite/ng-platform';
import { DisplaySettings } from '@venite/ng-pray';
import { concat, Observable, timer } from 'rxjs';
import { speak, SpeechSynthesisUtteranceConfig } from 'rxjs-tts';
import { delay, map } from 'rxjs/operators';

export type SpeechServiceTracking = { subdoc: number; utterance: number; data: any; };

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  public isPlaying : boolean = false;
  background : 'silence'|'seashore'|'garden'|'night'|'silence-short';

  constructor(
    private platform : PlatformService
  ) { }

  // Localized strings for nationalities are handled in localization files
  getNationality(voice : SpeechSynthesisVoice) : string {
    return voice.lang;
  }

  // Controls
  cancel() {
    this.isPlaying = false;
    const synth = window?.speechSynthesis;
    if(synth) {
      synth.cancel();
    }
  }

  pause() {
    this.isPlaying = false;
    const synth = window?.speechSynthesis;
    if(synth) {
      synth.pause();
    }
  }

  resume() {
    this.isPlaying = true;
    const synth = window?.speechSynthesis;
    if(synth) {
      synth.resume();
    }
  }

  // TODO need to handle all SpeechService preferences

  speakDoc(doc : LiturgicalDocument, settings : DisplaySettings, index : number = 0, startingUtteranceIndex : number = 0) : Observable<SpeechServiceTracking> {
    const BETWEEN_DOCS = 500 * (1/settings.voiceRate),
      SILENCE = 4000 * (1/settings.voiceRate),
      BETWEEN_PSALM_VERSE = 1000 * (1/settings.voiceRate);

    function processText(s : string) : string {
      return processEntities(s
        .replace(/&nbsp;/g, ' ')
        .replace(/YHWH/g, 'Addo-nigh')
        .replace(/Venite/g, 'ven-EAT-aye')
        .replace(/Compline/g, 'COMP-linn')
      );
    }

    function processEntities(str : string) : string {
      try {
        const e = document.createElement('textarea');
        e.innerHTML = str;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      } catch(e) {
        console.warn(`(processEntities) error while processing "${str}": `, e);
      }
    }

    function docToUtterances(doc : LiturgicalDocument) : (number | string)[] {
      if(doc) {
        switch(doc?.type) {
          case 'liturgy':
            return ((doc as Liturgy).value || [])
              .map(child => docToUtterances(child).concat([BETWEEN_DOCS]))
              .flat();
          case 'option':
            const selected = (doc as Option).value[doc.metadata?.selected ?? 0];
            return docToUtterances(selected);
          case 'responsive':
            return responsivePrayerToUtterances(doc as ResponsivePrayer);
          case 'bible-reading':
            return bibleReadingToUtterances(doc as BibleReading);
          case 'psalm':
            return psalmToUtterances(doc as Psalm, BETWEEN_PSALM_VERSE);
          case 'rubric':
            return (doc.value || []).join('').includes('Silence') ? [SILENCE] : [];
          case 'meditation':
          case 'image':
            return [];
          default:
            return ((doc as Heading | Refrain | Rubric | Text)?.value || [])
              .map((piece : any) => piece.toString())
              .concat(doc?.metadata?.response && !doc?.metadata?.omit_response ? doc.metadata.response : [])
              .concat(doc.style === 'prayer' && !doc?.metadata?.response && !doc?.metadata?.omit_response ? ['Amen'] : [])
        }
      } else {
        return [];
      }
    }
  
    function responsivePrayerToUtterances(doc : ResponsivePrayer, delayBetweenLines : number = 250) : (number | string)[] {
      if((doc as ResponsivePrayer).style === 'preces') {
        return doc.value.map(line => [
          line.text,
          delayBetweenLines
        ]).flat();
      } else if((doc as ResponsivePrayer).style === 'litany') {
        return doc.value.map(line => [
          line.text,
          delayBetweenLines,
          doc?.metadata?.response
            ? doc?.metadata?.response
            : null,
          doc?.metadata?.response
            ? delayBetweenLines
          : null
        ]).flat().filter(n => n !== null);
      } else {
        return doc.value.map(line => [
          line.text ?? null,
          line.response ?? null,
        ]).flat().filter(n => n !== null);
      }
    }
  
    function bibleReadingToUtterances(d : BibleReading) : (number | string)[] {
      const doc = new BibleReading(d);
      doc.compileIntro();

      return [
        // compiled intro
        ... doc?.metadata?.compiled_intro
        ? docToUtterances(doc?.metadata?.compiled_intro)
        : [],
        // text
        ... ((doc as BibleReading).value || []).map(verse =>
          verse.hasOwnProperty('type') && (verse as Heading).type === 'heading'
          ? docToUtterances(verse as Heading)
          : processText((verse as BibleReadingVerse).text).split(/[^\w \t]/g)
        ).flat()
      ].filter(n => n !== null);
    }
  
    function psalmToUtterances(doc : Psalm, pauseLength : number = 1000) : (number | string)[] {
      const obj = new Psalm(doc),
        includeAntiphon : boolean = obj.includeAntiphon(),
        filteredValue = obj.style === 'psalm' ? obj.filteredVerses() ?? [] : obj.value ?? [];
        
      function antiphonNode(antiphon : string | Refrain | { [x: string]: string | Refrain } | undefined) : (number | string)[] {
        if(typeof antiphon == 'string') {
          const refrain = new Refrain({ value: [ antiphon ], style: 'antiphon' });
          return docToUtterances(refrain);
        } else if(antiphon instanceof Refrain || (typeof antiphon == 'object' && antiphon.type && antiphon.type == 'refrain')) {
          return docToUtterances(antiphon as Refrain);
        } else if(typeof antiphon == 'object') {
          // antiphon is something like an O antiphon tree:
          // { '12/23': '...', '12/24': '...' }
          const date = obj.day ? dateFromYMDString(obj?.day?.date) : new Date();
          return antiphonNode(antiphon[`${date.getMonth()+1}/${date.getDate()}`]);
        } else {
          return [];
        }
      }
  
      function headingNode(value : string | undefined = undefined, level : number = 3, showLatinName : boolean = true) : (number | string)[] {
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
        return docToUtterances(heading);
      }
  
      function psalmVerseNode(verse : PsalmVerse) : (number | string)[] {
        return [
          verse.verse ?? null,
          pauseLength,
          verse.halfverse ?? null
        ].filter(text => text !== null)
      }
  
      function gloriaNode(gloria : string | Refrain) : (number | string)[] {
        if(typeof gloria === "string") {
          return [gloria];
        } else {
          return docToUtterances(gloria);
        }
      }
  
      return [
        ... doc.label ? [doc.label] : [],
        ... includeAntiphon ? antiphonNode(obj?.metadata?.antiphon) : [],
        ... (filteredValue || doc.value).map(section => [
          ... section.label ? headingNode(section.label, 4, false) : [],
          ... section.value.map((verse : any) => [
            ... verse.hasOwnProperty('type') && verse.type === 'heading'
            ? docToUtterances(verse as Heading)
            : psalmVerseNode(verse as PsalmVerse),
          ]).flat(),
          ... settings.repeatAntiphon == "repeat" ? antiphonNode(obj?.metadata?.antiphon) : []
        ]).flat(),
        ... obj?.metadata?.gloria && !obj?.metadata?.omit_gloria ? gloriaNode(obj?.metadata?.gloria) : [],
        ... ((obj?.metadata?.gloria && !obj.metadata.omit_gloria) || (obj?.metadata?.gloria === undefined || Boolean(obj?.metadata?.omit_gloria))) && includeAntiphon ? antiphonNode(obj?.metadata?.antiphon) : []
      ]
    }

    // speakDoc() body
    this.isPlaying = true;
    const subdocs = doc?.type === 'liturgy' ? (doc as Liturgy).value : [doc],
      unskippedSubdocs = subdocs.slice(index),
      utterances = unskippedSubdocs.map((sd, subdocIdx) => docToUtterances(sd)
        .filter(value => Boolean(value))
        .map((value, utteranceIdx) =>
          typeof value === 'string'
          ? speak(this.utteranceFromText(
            processText(value),
            doc.language ?? 'en',
            settings
          )).pipe(
            map(data => ({ subdoc: subdocIdx + index, utterance: utteranceIdx + startingUtteranceIndex, data }))
          )
          : timer(value).pipe(
            map(data => ({ subdoc: subdocIdx + index, utterance: utteranceIdx + startingUtteranceIndex, data }))
          )
        )
      )
      .flat();
    console.log('(speech) speakDoc', utterances);
    return concat(
      ... utterances
    );
  }

  utteranceFromText(text : string, lang : string, settings : DisplaySettings) : SpeechSynthesisUtterance {
    const voices = window?.speechSynthesis?.getVoices() ?? [],
      chosenVoice = voices.find(voice => voice.name === settings.voiceChoice);

    const u = new SpeechSynthesisUtterance(text);
    if(chosenVoice) {
      u.voice = chosenVoice;
    } else {
      u.lang = lang;
    }
    u.pitch = 1;
    u.rate = settings.voiceRate ?? 1;
    u.volume = settings.voiceBackgroundVolume ?? 1;

    return u;
  }
}
