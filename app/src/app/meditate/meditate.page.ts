import { Component, Inject, NgZone, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Liturgy, Meditation } from "@venite/ldf";
import {
  CalendarServiceInterface,
  CALENDAR_SERVICE,
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { MediaSession } from "capacitor-media-session";
import { Observable, of } from "rxjs";
import { distinct, map, switchMap, tap } from "rxjs/operators";
import { AudioService } from "../pray/audio.service";
import { DocumentService } from "../services/document.service";

@Component({
  selector: "venite-meditate",
  templateUrl: "./meditate.page.html",
  styleUrls: ["./meditate.page.scss"],
})
export class MeditatePage implements OnInit {
  doc: Meditation;
  length: number = 5; // length in minutes
  delay: number = 3;
  @ViewChild("el") el: any;
  color$: Observable<string>;
  bell$: Observable<string>;

  constructor(
    @Inject(CALENDAR_SERVICE) private calendar: CalendarServiceInterface,
    @Inject(PREFERENCES_SERVICE)
    private preferences: PreferencesServiceInterface,
    private audio: AudioService,
    private translate: TranslateService,
    private documents: DocumentService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.preferences;

    const week$ = this.calendar.buildWeek(
      of(new Date()),
      of("bcp1979"),
      of(false)
    );
    this.color$ = this.calendar
      .buildDay(
        of(new Date()),
        of("bcp1979"),
        of(new Liturgy({ metadata: { evening: new Date().getHours() >= 17 } })),
        week$,
        of(false)
      )
      .pipe(
        map((day) => day?.color),
        switchMap((color) => this.documents.getColor(color)),
        distinct()
      );

    this.doc = new Meditation({
      type: "meditation",
      metadata: {
        length: this.length * 60,
        delay: this.delay,
      },
    });

    this.bell$ = this.preferences.get("meditationBell").pipe(
      map((pref) => pref?.value || "singing-bowl"),
      map((val) => (val === "silence" ? "silence-short" : "singing-bowl"))
    );
  }

  async timerChanged(
    ev: CustomEvent<
      "start" | "pause" | "resume" | "rewind" | "complete" | number
    >,
    bell: string
  ) {
    const audioFile = `/assets/audio/${bell}.mp3`;
    if (typeof ev.detail === "number") {
      const length =
        ((ev.target as any)?.doc as Meditation)?.metadata?.length ||
        this.length;
      MediaSession.setPositionState({
        duration: length,
        position: length - ev.detail,
        playbackRate: 1,
      });
    } else {
      switch (ev.detail) {
        case "start":
          await this.audio.create(audioFile, false);
          await this.audio.play();
          MediaSession.init({
            play: true,
            pause: true,
            stop: true,
            previoustrack: true,
          });
          MediaSession.addListener("play", () => {
            this.el.nativeElement.resume();
            this.audio.play();
          });
          MediaSession.addListener("pause", () => {
            this.el.nativeElement.pause();
            this.audio.pause();
          });
          MediaSession.addListener("previoustrack", async () => {
            this.el.nativeElement.rewind();
            await this.audio.destroy();
            await this.audio.create(audioFile, false);
            await this.audio.play();
          });
          MediaSession.setMetadata({
            artist: "Venite",
            album: "Venite",
            title: this.translate.instant("menu.meditate"),
            artwork: [
              {
                src: "/assets/icon/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
              },
            ],
          });
          break;
        case "pause":
          await this.audio.pause();
          break;
        case "resume":
          await this.audio.play();
          break;
        case "rewind":
          await this.audio.destroy();
          await this.audio.create(audioFile, false);
          await this.audio.play();
          break;
        case "complete":
          await this.audio.destroy();
          await this.audio.create(audioFile, false);
          this.audio.play();
          MediaSession.destroy();
          break;
      }
    }
  }
}

const MEDITATION = {};