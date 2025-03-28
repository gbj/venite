import { Component, Inject, NgZone, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LiturgicalDay, Liturgy, Meditation } from "@venite/ldf";
import {
  CalendarServiceInterface,
  CALENDAR_SERVICE,
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { KeepAwake } from '@capacitor-community/keep-awake';
//import { MediaSession } from "media-session";
import { MediaSession } from "@jofr/capacitor-media-session";
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
  day$: Observable<LiturgicalDay>;
  bell$: Observable<string>;
  isPlaying: boolean = false;

  constructor(
    @Inject(CALENDAR_SERVICE) private calendar: CalendarServiceInterface,
    @Inject(PREFERENCES_SERVICE)
    private preferences: PreferencesServiceInterface,
    private audio: AudioService,
    private translate: TranslateService,
    private documents: DocumentService,
    private zone: NgZone
  ) {}
gg
  ngOnInit() {
    this.preferences;

    const week$ = this.calendar.buildWeek(
      of(new Date()),
      of("bcp1979"),
      of(false)
    );
    this.day$ = this.calendar.buildDay(
      of(new Date()),
      of("bcp1979"),
      of(new Liturgy({ metadata: { evening: new Date().getHours() >= 17 } })),
      week$,
      of(false)
    );
    this.color$ = this.day$.pipe(
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
      const duration = await this.el.nativeElement.duration();

      if (ev.detail > 0) {
	console.log("setPositionState", duration - ev.detail);
        MediaSession.setPositionState({
          duration,
          position: duration - ev.detail,
          playbackRate: 1,
        });
    	MediaSession.setPlaybackState({ playbackState: "playing" });
      } else {
	MediaSession.setPlaybackState({ playbackState: "paused" });
        //MediaSession.destroy();
      }
    } else {
      switch (ev.detail) {
        case "start":
          await this.audio.create(audioFile, false);
          await this.audio.play();
	  if(!await KeepAwake.isSupported()) {
		  console.log("KeepAwake not supported.");
	  } else {
	  	await KeepAwake.keepAwake();
	  }

          try {
		  /*
            MediaSession.init({
              play: true,
              pause: true,
              stop: true,
              previoustrack: true,
            });
	    */

            MediaSession.setActionHandler({ action: "play"}, () => {
              this.el.nativeElement.resume();
              this.audio.play();
            });
            MediaSession.setActionHandler({ action: "pause"}, () => {
              this.el.nativeElement.pause();
              this.audio.pause();
            });
            MediaSession.setActionHandler({ action: "previoustrack" }, async () => {
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
	    MediaSession.setPlaybackState({ playbackState: "playing" });
            this.isPlaying = true;
          } catch (e) {
            console.warn("MediaSession not supported on Android.");
          }
          break;
        case "pause":
          await this.audio.pause();
		MediaSession.setPlaybackState({ playbackState: "paused" });
	  if(!await KeepAwake.isSupported()) {
		  console.log("KeepAwake not supported.");
	  } else {
	  	await KeepAwake.allowSleep();
	  }
          break;
        case "resume":
          await this.audio.play();
		MediaSession.setPlaybackState({ playbackState: "playing" });
	  if(!await KeepAwake.isSupported()) {
		  console.log("KeepAwake not supported.");
	  } else {
	 	await KeepAwake.keepAwake();
	  }
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
	  if(!await KeepAwake.isSupported()) {
		  console.log("KeepAwake not supported.");
	  } else {
	  	await KeepAwake.allowSleep();
	  }
          try {
            //MediaSession.destroy();
          } catch (e) {
            console.warn("MediaSession not supported on Android.");
          }
          break;
      }
    }
  }

  async reset() {
    this.el.nativeElement.reset();
    this.isPlaying = false;
  }
}

const MEDITATION = {};
