import { Injectable, NgZone } from "@angular/core";
import {
  LiturgicalDocument,
  DisplaySettings,
  docsToLiturgy,
  Liturgy,
  Option,
} from "@venite/ldf";
//import { MediaSession } from "media-session";
import { MediaSession } from "@jofr/capacitor-media-session";
import { PlatformService } from "@venite/ng-platform";
import { combineLatest, Observable, of, Subscription } from "rxjs";
import { AudioService } from "../pray/audio.service";
import { SpeechService, SpeechServiceTracking } from "./speech.service";
import { querySelectorDeep } from "query-selector-shadow-dom";
import {
  startWith,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
  catchError,
} from "rxjs/operators";
import { IonContent } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class MediaSessionService {
  docLabel: string | null = null;
  speechPlaying: boolean = false;
  speechPlayingSubDoc: number = 0;
  speechPlayingUtterance: number = 0;
  speechUtteranceAtStartOfSubDoc: number = 0;
  speechSubscription: Subscription;
  contentEl: IonContent;

  doc$: Observable<LiturgicalDocument>;
  settings$: Observable<DisplaySettings>;

  constructor(
    private audio: AudioService,
    private zone: NgZone,
    private speechService: SpeechService,
    private platform: PlatformService
  ) {}

  isAvailable(): boolean {
    //@ts-ignore
    return this.platform.is("capacitor") || Boolean(navigator.mediaSession);
  }

  async initMediaSession(doc: LiturgicalDocument, settings: DisplaySettings) {
    if (this.isAvailable()) {
      await this.audio.create("/assets/audio/silence-short.mp3");
      await this.audio.play();

      this.docLabel = doc.label || "";
      /*
      await MediaSession.init({
        play: true,
        pause: true,
        nexttrack: true,
        previoustrack: true,
      });
      */

      await MediaSession.setMetadata({
        artist: "Venite",
        album: this.docLabel || "",
        title: doc.label,
        artwork: [
          {
            src: "/assets/icon/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
      await MediaSession.setPlaybackState({ playbackState: "playing" });

      MediaSession.setActionHandler({ action: "play" }, () => {
        this.zone.run(() => this.resumeSpeech(doc, settings));
      });
      MediaSession.setActionHandler({ action: "pause" }, () => {
        this.zone.run(() => this.pauseSpeech());
      });
      MediaSession.setActionHandler({ action: "nexttrack" }, () => {
        this.zone.run(() => this.fastForward(doc, settings));
      });
      MediaSession.setActionHandler({ action: "previoustrack" }, () => {
        this.zone.run(() => this.rewind(doc, settings));
      });
    }
  }

  pauseSpeech() {
    this.zone.run(async () => {
      this.speechSubscription.unsubscribe();
      this.speechService.pause();
      this.audio?.pause();
      if (this.isAvailable()) {
        MediaSession.setPositionState({
          playbackRate: 0,
        });
      }
    });
  }

  async resumeSpeech(doc: LiturgicalDocument, settings: DisplaySettings) {
    const voices = await this.speechService.getVoices();
    this.startSpeechAt(
      voices,
      doc,
      settings,
      this.speechPlayingSubDoc,
      this.speechPlayingUtterance,
      false,
      undefined,
      this.doc$,
      this.settings$
    );
    this.speechService.resume();
    this.audio?.play();
    if (this.isAvailable()) {
      MediaSession.setPositionState({
        playbackRate: 1,
      });
    }
  }
  async rewind(doc: LiturgicalDocument, settings: DisplaySettings) {
    const voices = await this.speechService.getVoices();
    this.zone.run(() => {
      this.speechSubscription?.unsubscribe();
      this.speechService.pause();
      this.speechPlayingUtterance = 0;
      if (
        this.speechPlayingUtterance - this.speechUtteranceAtStartOfSubDoc <
        5
      ) {
        //console.log('rewind to previous doc')
        this.startSpeechAt(
          voices,
          doc,
          settings,
          this.speechPlayingSubDoc - 1 >= 0 ? this.speechPlayingSubDoc - 1 : 0
        );
      } else {
        //console.log('rewind to beginning of this doc')
        this.startSpeechAt(
          voices,
          doc,
          settings,
          this.speechPlayingSubDoc,
          0,
          false,
          undefined,
          this.doc$,
          this.settings$
        );
      }
      if (this.isAvailable()) {
        MediaSession.setPositionState({
          playbackRate: 1,
        });
      }
    });
  }
  async fastForward(doc: LiturgicalDocument, settings: DisplaySettings) {
    const voices = await this.speechService.getVoices();

    this.zone.run(() => {
      this.speechSubscription?.unsubscribe();
      this.speechService.pause();
      this.speechPlayingUtterance = 0;
      this.startSpeechAt(
        voices,
        doc,
        settings,
        this.speechPlayingSubDoc + 1,
        0,
        false,
        undefined,
        this.doc$,
        this.settings$
      );
    });
    if (this.isAvailable()) {
      MediaSession.setPositionState({
        playbackRate: 1,
      });
    }
  }

  startSpeechAt(
    voices: SpeechSynthesisVoice[],
    doc: LiturgicalDocument,
    settings: DisplaySettings,
    subdoc: number = 0,
    utterance: number = 0,
    firstTime: boolean = false,
    loading?: HTMLIonLoadingElement | undefined,
    doc$?: Observable<LiturgicalDocument>,
    settings$?: Observable<DisplaySettings>
  ) {
    this.doc$ = doc$;
    this.settings$ = settings$;

    console.log("doc$ = ", doc$, "settings$ = ", settings$);

    if (this.isAvailable()) {
      MediaSession.setPositionState({
        playbackRate: 1,
      });
    }

    if (firstTime && this.isAvailable()) {
      this.initMediaSession(doc, settings);
    }

    // init speech
    this.speechPlaying = true;
    this.speechPlayingSubDoc = subdoc;
    this.speechPlayingUtterance = utterance;
    this.scrollToSubdoc(subdoc);
    const utterances$ = combineLatest([
      this.doc$ || of(doc),
      this.settings$ || of(settings),
    ]).pipe(
      filter(([doc, settings]) => Boolean(doc && settings)),
      map(([doc, settings]) => ({
        doc,
        settings,
      })),
      // any time the document or settings change,
      // cancels the previous TTS reading and restarts it with the new document
      // and/or settings, starting at the sub-document/utterance indices that had been reached
      switchMap(({ doc, settings }) =>
        this.speechService.speakDoc(
          voices,
          // insert saints' biographies at the beginning, if relevant
          firstTime &&
            (doc?.day?.holy_days || [])
              .map((day) => day?.bio)
              .filter((bio) => bio?.length > 0)?.length > 0
            ? new Liturgy({
                type: "liturgy",
                value: [
                  ...doc.day.holy_days.map(
                    (day) =>
                      new LiturgicalDocument({
                        type: "text",
                        style: "text",
                        value: day.bio,
                      })
                  ),
                  doc.type === "liturgy" ? (doc as Liturgy).value : doc,
                ].flat(),
              })
            : doc,
          settings,
          this.speechPlayingSubDoc ?? 0,
          this.speechPlayingUtterance ?? 0
        )
      ),
      tap(() => {
        if (loading) {
          loading.dismiss();
        }
      }),
      catchError((e) => {
        console.warn("Caught error", e);
        return of({ subdoc: 0, utterance: 0, data: null });
      })
    );
    this.speechSubscription = utterances$.subscribe(
      (data: SpeechServiceTracking) => {
        if (this.speechPlayingSubDoc !== data.subdoc) {
          this.speechUtteranceAtStartOfSubDoc = data.utterance;
        }

        if (this.speechPlayingSubDoc !== data.subdoc) {
          this.scrollToSubdoc(data.subdoc);
        }

        this.speechPlayingSubDoc = data.subdoc ?? 0;
        this.speechPlayingUtterance = data.utterance ?? 0;

        // update metadata for doc
        const utterance: SpeechSynthesisUtterance =
          (data?.data as SpeechSynthesisEvent)?.utterance || data?.data?.target;

        if (utterance && data?.data?.state == "Starting") {
          const docLabel = (childDoc: LiturgicalDocument) => {
            function processEntities(str: string): string {
              try {
                const e = document.createElement("textarea");
                e.innerHTML = str;
                // handle case of empty input
                return e.childNodes.length === 0
                  ? ""
                  : e.childNodes[0].nodeValue;
              } catch (e) {
                console.warn(
                  `(processEntities) error while processing "${str}": `,
                  e
                );
              }
            }

            try {
              const txt =
                childDoc?.type === "option"
                  ? docLabel(
                      (childDoc as Option).value[
                        childDoc?.metadata?.selected ?? 0
                      ]
                    )
                  : childDoc?.style === "canticle"
                  ? childDoc.label
                  : childDoc?.citation ||
                    childDoc?.label ||
                    (typeof (childDoc?.value || [])[0] === "string"
                      ? childDoc?.value[0]
                      : undefined) ||
                    utterance?.text ||
                    doc?.label;
              return processEntities(txt);
            } catch (e) {
              return utterance?.text;
            }
          };
          const subdoc = (
              doc.value[data.subdoc]?.hasOwnProperty("type")
                ? doc.value[data.subdoc]
                : undefined
            ) as LiturgicalDocument,
            title = docLabel(subdoc);

          if (title && this.isAvailable()) {
            console.log("setting metadata to", title);
            MediaSession.setPlaybackState({ playbackState: "playing" });
            MediaSession.setMetadata({
              artist: "Venite",
              album: this.docLabel || "",
              title,
              artwork: [
                {
                  src: "/assets/icon/icon-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                },
              ],
            });
          }
        }
      },
      // TODO: speech errors
      (error) => {},
      // TODO: speech complete
      () => {}
    );
  }

  setContentEl(contentEl: IonContent) {
    this.contentEl = contentEl;
  }

  scrollToSubdoc(subdoc: number) {
    const domRepresentation = querySelectorDeep(`[path='/value/${subdoc}']`);
    if (domRepresentation) {
      const y = domRepresentation.getBoundingClientRect().top;
      this.contentEl.scrollByPoint(0, y - 100, 50);
    }
  }

  destroyMediaSession() {
    this.speechPlaying = false;
    this.speechService.pause();
    this.audio.pause();
    this.audio.destroy();
    if (this.isAvailable()) {
      MediaSession.setPlaybackState({ playbackState: "paused" });
    }
  }
}
