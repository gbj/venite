import { Injectable } from "@angular/core";
import {
  BibleReading,
  BibleReadingVerse,
  dateFromYMDString,
  Heading,
  LiturgicalDocument,
  Liturgy,
  Option,
  Psalm,
  PsalmVerse,
  Refrain,
  ResponsivePrayer,
  Rubric,
  Text,
} from "@venite/ldf";
import { PlatformService } from "@venite/ng-platform";
import { DisplaySettings } from "@venite/ldf";
import {
  concat,
  from,
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  throwError,
  timer,
} from "rxjs";
import { speak } from "rxjs-tts";
import {
  first,
  map,
  mapTo,
  switchMap,
  switchMapTo,
  takeUntil,
  tap,
} from "rxjs/operators";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { TranslateService } from "@ngx-translate/core";

export type SpeechServiceTracking = {
  subdoc: number;
  utterance: number;
  data: any;
};

export enum TTSState {
  Starting = "Starting",
  Ending = "Ending",
}

@Injectable({
  providedIn: "root",
})
export class SpeechService {
  public isPlaying: boolean = false;
  background: "silence" | "seashore" | "garden" | "night" | "silence-short";

  private _voices: Promise<{ voices: SpeechSynthesisVoice[] }>;
  private _languages: Promise<{ languages: string[] }>;

  constructor(
    private platform: PlatformService,
    private translate: TranslateService
  ) {}

  // Localized strings for nationalities are handled in localization files
  getNationality(voice: SpeechSynthesisVoice): string {
    return voice.lang;
  }

  // Controls
  cancel() {
    this.isPlaying = false;
    TextToSpeech.stop();
  }

  pause() {
    this.isPlaying = false;
    TextToSpeech.stop();
  }

  resume() {
    this.isPlaying = true;
    // noop with new TTS engine
  }

  // TODO need to handle all SpeechService preferences
  speakDoc(
    voices: SpeechSynthesisVoice[],
    doc: LiturgicalDocument,
    settings: DisplaySettings,
    index: number = 0,
    startingUtteranceIndex: number = 0
  ): Observable<SpeechServiceTracking> {
    //TextToSpeech.stop();

    // init TTS
    const BETWEEN_DOCS = 500 * (1 / settings.voiceRate),
      SILENCE = 4000 * (1 / settings.voiceRate),
      BETWEEN_PSALM_VERSE =
        (settings.psalmPause ?? 1000) * (1 / settings.voiceRate);

    function processText(s: string): string {
      return processEntities(
        s
          .replace(/&nbsp;/g, " ")
          .replace(/YHWH/g, "Addo-nigh")
          .replace(/Venite/g, "ven-EAT-aye")
          .replace(/Compline/g, "COMP-linn")
      );
    }

    function processEntities(str: string): string {
      try {
        const e = document.createElement("textarea");
        e.innerHTML = str;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      } catch (e) {
        console.warn(`(processEntities) error while processing "${str}": `, e);
      }
    }

    function docToUtterances(doc: LiturgicalDocument): (number | string)[] {
      if (doc) {
        switch (doc?.type) {
          case "liturgy":
            return ((doc as Liturgy).value || [])
              .map((child) => docToUtterances(child).concat([BETWEEN_DOCS]))
              .flat();
          case "option":
            const selected = (doc as Option).value[doc.metadata?.selected ?? 0];
            return docToUtterances(selected);
          case "responsive":
            return responsivePrayerToUtterances(doc as ResponsivePrayer);
          case "bible-reading":
            return bibleReadingToUtterances(doc as BibleReading);
          case "psalm":
            return psalmToUtterances(doc as Psalm, BETWEEN_PSALM_VERSE);
          case "rubric":
            return (doc.value || []).join("").includes("Silence")
              ? [SILENCE]
              : [];
          case "meditation":
          case "image":
            return [];
          default:
            return ((doc as Heading | Refrain | Rubric | Text)?.value || [])
              .map((piece: any) => piece.toString())
              .concat(
                doc?.metadata?.response && !doc?.metadata?.omit_response
                  ? doc.metadata.response
                  : []
              )
              .concat(
                doc.style === "prayer" &&
                  !doc?.metadata?.response &&
                  !doc?.metadata?.omit_response
                  ? ["Amen"]
                  : []
              );
        }
      } else {
        return [];
      }
    }

    function responsivePrayerToUtterances(
      doc: ResponsivePrayer,
      delayBetweenLines: number = 250
    ): (number | string)[] {
      if ((doc as ResponsivePrayer).style === "preces") {
        return doc.value.map((line) => [line.text, delayBetweenLines]).flat();
      } else if ((doc as ResponsivePrayer).style === "litany") {
        return doc.value
          .map((line) => [
            line.text,
            delayBetweenLines,
            doc?.metadata?.response ? doc?.metadata?.response : null,
            doc?.metadata?.response ? delayBetweenLines : null,
          ])
          .flat()
          .filter((n) => n !== null);
      } else {
        return doc.value
          .map((line) => [line.text ?? null, line.response ?? null])
          .flat()
          .filter((n) => n !== null);
      }
    }

    function bibleReadingToUtterances(d: BibleReading): (number | string)[] {
      const doc = new BibleReading(d);
      doc.compileIntro();

      return [
        // compiled intro
        ...(doc?.metadata?.compiled_intro
          ? docToUtterances(doc?.metadata?.compiled_intro)
          : []),
        // text
        ...((doc as BibleReading).value || [])
          .map((verse) =>
            verse.hasOwnProperty("type") &&
            (verse as Heading).type === "heading"
              ? docToUtterances(verse as Heading)
              : processText((verse as BibleReadingVerse).text).split(
                  /[^\w \t’'-]/g
                )
          )
          .flat(),
        // response
        ...(doc.style == "short" && !doc.metadata?.omit_response
          ? [doc.metadata?.response ?? "Amen."]
          : []),
      ].filter((n) => n !== null);
    }

    function psalmToUtterances(
      doc: Psalm,
      pauseLength: number = 1000
    ): (number | string)[] {
      const obj = new Psalm(doc),
        includeAntiphon: boolean = obj.includeAntiphon(),
        filteredValue =
          obj.style === "psalm" ? obj.filteredVerses() ?? [] : obj.value ?? [];

      function antiphonNode(
        antiphon:
          | string
          | Refrain
          | { [x: string]: string | Refrain }
          | undefined
      ): (number | string)[] {
        if (typeof antiphon == "string") {
          const refrain = new Refrain({
            type: "refrain",
            value: [antiphon],
            style: "antiphon",
          });
          return docToUtterances(refrain);
        } else if (
          antiphon instanceof Refrain ||
          (typeof antiphon == "object" &&
            antiphon.type &&
            antiphon.type == "refrain")
        ) {
          return docToUtterances(antiphon as Refrain);
        } else if (typeof antiphon == "object") {
          // antiphon is something like an O antiphon tree:
          // { '12/23': '...', '12/24': '...' }
          const date = obj.day ? dateFromYMDString(obj?.day?.date) : new Date();
          return antiphonNode(
            antiphon[`${date.getMonth() + 1}/${date.getDate()}`]
          );
        } else {
          return [];
        }
      }

      function headingNode(
        value: string | undefined = undefined,
        level: number = 3,
        showLatinName: boolean = true
      ): (number | string)[] {
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
          citation: obj?.citation,
          value: [value ?? label],
          source: obj?.source,
        });
        return docToUtterances(heading);
      }

      function psalmVerseNode(verse: PsalmVerse): (number | string)[] {
        return [
          verse.verse ?? null,
          pauseLength,
          verse.halfverse ?? null,
        ].filter((text) => text !== null);
      }

      function gloriaNode(gloria: string | Refrain): (number | string)[] {
        if (typeof gloria === "string") {
          return [gloria];
        } else {
          return docToUtterances(gloria);
        }
      }

      return [
        ...(doc.label ? [doc.label] : []),
        ...(includeAntiphon ? antiphonNode(obj?.metadata?.antiphon) : []),
        ...(filteredValue || doc.value)
          .map((section) => [
            ...(section.label ? headingNode(section.label, 4, false) : []),
            ...section.value
              .map((verse: any) => [
                ...(verse.hasOwnProperty("type") && verse.type === "heading"
                  ? docToUtterances(verse as Heading)
                  : psalmVerseNode(verse as PsalmVerse)),
              ])
              .flat(),
            ...(settings.repeatAntiphon == "repeat"
              ? antiphonNode(obj?.metadata?.antiphon)
              : []),
          ])
          .flat(),
        ...(obj?.metadata?.gloria && !obj?.metadata?.omit_gloria
          ? gloriaNode(obj?.metadata?.gloria)
          : []),
        ...(((obj?.metadata?.gloria && !obj.metadata.omit_gloria) ||
          obj?.metadata?.gloria === undefined ||
          Boolean(obj?.metadata?.omit_gloria)) &&
        includeAntiphon
          ? antiphonNode(obj?.metadata?.antiphon)
          : []),
      ];
    }

    // speakDoc() body
    this.isPlaying = true;
    const subdocs = doc?.type === "liturgy" ? (doc as Liturgy).value : [doc],
      unskippedSubdocs = subdocs.slice(index);
    const utterances = unskippedSubdocs
      .map((sd, subdocIdx) => {
        const u = docToUtterances(sd);
        return (
          docToUtterances(sd)
            // start at the given offset, but only for the first subdoc
            // (i.e., if we paused at v. 3 of the psalm, start at v 3 -- but don't slice other docs)
            .slice(subdocIdx === 0 ? startingUtteranceIndex : 0)
            .filter((value) => value || " ")
            .map((value, utteranceIdx) =>
              typeof value === "string"
                ? from(
                    this.utteranceFromText(
                      processText(value),
                      doc.language ?? "en",
                      settings
                    )
                  ).pipe(
                    switchMap((utterance) => this.speak(utterance, voices)),
                    map((data) => ({
                      subdoc: subdocIdx + index,
                      utterance: utteranceIdx + startingUtteranceIndex,
                      data,
                    }))
                  )
                : timer(value).pipe(
                    map((data) => ({
                      subdoc: subdocIdx + index,
                      utterance: utteranceIdx + startingUtteranceIndex,
                      data,
                    }))
                  )
            )
        );
      })
      .flat();
    return concat(...utterances);
  }

  speak(
    utterance: SpeechSynthesisUtterance,
    voices: SpeechSynthesisVoice[]
  ): Observable<any> {
    // use TextToSpeech plugin for Android -- browser SpeechSynthesis works better for web/iOS
    if (this.platform.is("android") && this.platform.is("capacitor")) {
      const voice$ = new Observable((observer) => {
        const end$ = from(
          TextToSpeech.speak({
            text: utterance.text || " ",
            pitch: utterance.pitch,
            rate: utterance.rate,
            lang: utterance.lang,
            category: "playback",
          })
        );

        const subscription = merge(
          interval(1).pipe(first(), mapTo(TTSState.Starting)),
          end$.pipe(mapTo(TTSState.Ending))
        )
          .pipe(
            takeUntil(end$),
            map((state) => ({
              state,
              utterance,
              target: utterance,
            }))
          )
          .subscribe(observer);

        // cancel all utterances on unsubscribe
        subscription.add(() => {
          TextToSpeech.stop();
        });

        return subscription;
      });

      // make a pause to let speechSynthesis.cancel pass
      return timer(4).pipe(switchMapTo(voice$));
    } else {
      return speak(utterance).pipe(
        map((ev: SpeechSynthesisEvent) => ({
          state: ev.type === "start" ? TTSState.Starting : undefined,
          target: ev.target,
          utterance: ev.utterance,
        }))
      );
    }
  }

  async utteranceFromText(
    text: string,
    lang: string,
    settings: DisplaySettings
  ): Promise<SpeechSynthesisUtterance> {
    const voices = await this.getVoices(),
      chosenVoice = voices.find((voice) => voice.name === settings.voiceChoice);

    const u: SpeechSynthesisUtterance =
      this.platform.is("capacitor") && this.platform.is("android")
        ? ({ text } as SpeechSynthesisUtterance)
        : new SpeechSynthesisUtterance(text || " ");
    if (chosenVoice && chosenVoice.voiceURI) {
      u.voice = chosenVoice;
    }
    u.lang = chosenVoice?.lang || lang;
    u.pitch = 1;
    u.rate = settings.voiceRate ?? 0.75;
    // iOS needs to sloooooow down if using Capacitor TextToSpeech
    // in this case I've just reverted to using the Web Speech Synthesis API on iOS because it's actually better
    // * (this.platform.is("ios") && this.platform.is("capacitor") ? 0.6 : 1);
    u.volume = settings.voiceBackgroundVolume ?? 1;

    return u;
  }

  async getVoices(): Promise<SpeechSynthesisVoice[]> {
    // load voices as Promise once (only calls native API once)
    if (!this._voices) {
      if (this.platform.is("capacitor") && this.platform.is("android")) {
        const { languages } = await TextToSpeech.getSupportedLanguages();
        this._voices = Promise.resolve({
          voices: languages
            .filter((lang) => lang.startsWith("en"))
            .map((lang) => ({
              lang,
              name: this.translate.instant(`speech.${lang}`),
              default: false,
              localService: true,
              voiceURI: lang,
            })),
        });
      } else {
        this._voices = Promise.resolve({ voices: speechSynthesis.getVoices() });
      }
    }

    // and wait for that Promise to resolve on any call
    const { voices } = await this._voices;

    return voices;
  }
}
