import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  dateFromYMDString,
  DisplaySettings,
  LiturgicalDocument,
  Liturgy,
  sundayBefore,
  Option,
  LectionaryEntry,
  LiturgicalDay,
  Psalm,
  BibleReading,
} from "@venite/ldf";
import {
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { PrayService } from "../pray/pray.service";
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of,
  Subject,
} from "rxjs";
import {
  filter,
  first,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { CalendarService } from "../services/calendar.service";
import { LectionaryService } from "../services/lectionary.service";
import { BibleService } from "../services/bible.service";
import { DocumentService } from "../services/document.service";
import { MediaSession } from "capacitor-media-session";
import { MediaSessionService } from "../services/media-session.service";
import { IonContent } from "@ionic/angular";
import { SpeechService } from "../services/speech.service";
import { EditorService } from "../editor/ldf-editor/editor.service";

import * as json1 from "ot-json1";

@Component({
  selector: "venite-lectionary",
  templateUrl: "./lectionary.page.html",
  styleUrls: ["./lectionary.page.scss"],
})
export class LectionaryPage implements OnInit, OnDestroy {
  searchDate$: Observable<Date>;
  lectionary = new FormControl("rclsundayTrack1");
  bibleVersion = new FormControl("NRSV");
  leavingPage$: Subject<void> = new Subject();
  day$: Observable<LiturgicalDay>;
  entries$: Observable<LectionaryEntry[]>;
  liturgy$: Observable<LiturgicalDocument>;
  settings$: Observable<DisplaySettings>;
  modifiedDoc$: Subject<LiturgicalDocument> = new Subject();

  @ViewChild(IonContent, { read: IonContent, static: false })
  contentEl: IonContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PREFERENCES_SERVICE)
    private preferences: PreferencesServiceInterface,
    private auth: AuthService,
    private lectionaryService: LectionaryService,
    private calendar: CalendarService,
    private prayService: PrayService,
    public mediaSessionService: MediaSessionService,
    public speechService: SpeechService,
    private editorService: EditorService
  ) {}

  ngOnDestroy(): void {
    this.leavingPage$.next();
  }

  ionViewWillLeave() {
    this.mediaSessionService.destroyMediaSession();
  }

  ngOnInit() {
    this.searchDate$ = this.route.params.pipe(
      map((params) => {
        if (params.ymd) {
          try {
            return dateFromYMDString(params.ymd);
          } catch (e) {
            console.warn(e);
            return sundayAfter(new Date());
          }
        } else {
          return sundayAfter(new Date());
        }
      })
    );

    // Calendar
    const week$ = this.calendar.buildWeek(
      this.searchDate$,
      of("bcp1979"),
      of(false)
    );
    this.day$ = this.calendar.buildDay(
      this.searchDate$,
      of("bcp1979"),
      of(generateLiturgy(this.lectionary.value, this.bibleVersion.value)),
      week$,
      of(false)
    );

    // Load and set lectionary/Bible version preferences
    this.preferences
      .get("lectionary-lectionary")
      .pipe(
        map((pref) => pref?.value),
        filter((n) => Boolean(n)),
        first()
      )
      .subscribe((data) => this.lectionary.setValue(data));
    this.preferences
      .get("lectionary-bibleVersion")
      .pipe(
        map((pref) => pref?.value),
        filter((n) => Boolean(n)),
        first()
      )
      .subscribe((data) => this.bibleVersion.setValue(data));

    combineLatest([
      this.auth.user,
      this.lectionary.valueChanges.pipe(startWith(this.lectionary.value)),
    ])
      .pipe(takeUntil(this.leavingPage$))
      .subscribe(([user, value]) => {
        this.preferences.set("lectionary-lectionary", value, user?.uid);
      });

    combineLatest([
      this.auth.user,
      this.bibleVersion.valueChanges.pipe(startWith(this.bibleVersion.value)),
    ])
      .pipe(takeUntil(this.leavingPage$))
      .subscribe(([user, value]) =>
        this.preferences.set("lectionary-bibleVersion", value, user?.uid)
      );

    // Grab display settings from preferences
    this.settings$ = this.preferences.displaySettings();

    // Load readings
    this.entries$ = combineLatest([
      this.day$,
      this.lectionary.valueChanges,
    ]).pipe(
      switchMap(([day, lectionary]) =>
        this.lectionaryService.getReadings(day, lectionary, undefined, false)
      )
    );
    this.liturgy$ = merge(
      this.modifiedDoc$.pipe(tap((doc) => console.log("modifiedDoc$ ", doc))),
      combineLatest([
        this.day$,
        this.lectionary.valueChanges.pipe(startWith(this.lectionary.value)),
        this.bibleVersion.valueChanges.pipe(startWith(this.bibleVersion.value)),
      ]).pipe(
        tap(([day, lectionary, bibleVersion]) =>
          console.log("generating new version")
        ),
        switchMap(([day, lectionary, bibleVersion]) =>
          this.prayService.compile(
            generateLiturgy(lectionary, bibleVersion),
            day,
            {},
            [],
            {}
          )
        )
      )
    ).pipe(shareReplay());
  }

  navigate(ev: Event) {
    if ((ev.target as HTMLInputElement).value) {
      this.router.navigate([
        "/",
        "lectionary",
        (ev.target as HTMLInputElement).value,
      ]);
    }
  }

  processSettings(settings: DisplaySettings): string[] {
    return [
      "pray-container",
      `dropcaps-${settings.dropcaps}`,
      `response-${settings.response}`,
      `repeat-antiphon-${settings.repeatAntiphon}`,
      `fontscale-${settings.fontscale.toString()}`,
      `font-${settings.font}`,
      `psalmverses-${settings.psalmVerses}`,
      `bibleverses-${settings.bibleVerses}`,
    ];
  }

  async read(doc: LiturgicalDocument, settings: DisplaySettings) {
    const voices = await this.speechService.getVoices();

    this.mediaSessionService.setContentEl(this.contentEl);
    this.mediaSessionService.initMediaSession(doc, settings);
    this.mediaSessionService.startSpeechAt(
      voices,
      doc,
      settings,
      0,
      0,
      true,
      undefined,
      this.liturgy$,
      this.settings$
    );
  }

  changeDoc(doc: LiturgicalDocument, event: CustomEvent) {
    const op = this.editorService.opFromChange(event.detail);
    const newValue = new LiturgicalDocument(
      json1.type.apply(
        JSON.parse(JSON.stringify(doc)),
        op
      ) as Partial<LiturgicalDocument>
    );

    this.modifiedDoc$.next(newValue);
  }
}

function sundayAfter(date: Date): Date {
  return new Date(sundayBefore(date).getTime() + 7 * 60 * 60 * 24 * 1000);
}

function generateLiturgy(lectionary: string, version: string): Liturgy {
  return new Liturgy({
    type: "liturgy",
    metadata: {
      evening: false,
      liturgyversions: ["bcp1979", "rite_i"],
    },
    value: [
      new Option({
        type: "option",
        metadata: { selected: 0 },
        value: [
          new LiturgicalDocument({
            hidden: false,
            type: "text",
            style: "prayer",
            lookup: {
              type: "collect",
            },
            version: "bcp1979",
            version_label: "Rite II",
          }),
          new LiturgicalDocument({
            hidden: false,
            type: "text",
            style: "prayer",
            lookup: {
              type: "collect",
            },
            version: "rite_i",
            version_label: "Rite I",
          }),
        ],
      }),
      new BibleReading({
        hidden: false,
        type: "bible-reading",
        style: "long",
        lookup: {
          type: "lectionary",
          table: lectionary,
          item: "first_reading",
        },
        label: "The First Lesson",
      }),
      new Psalm({
        hidden: false,
        type: "psalm",
        style: "psalm",
        lookup: {
          type: "lectionary",
          table: lectionary,
          item: "morning_psalms",
          allow_multiple: false,
        },
        metadata: {
          omit_gloria: true,
        },
      }),
      new BibleReading({
        hidden: false,
        type: "bible-reading",
        style: "long",
        lookup: {
          type: "lectionary",
          table: lectionary,
          item: "second_reading",
        },
        label: "The Epistle",
      }),
      new BibleReading({
        hidden: false,
        type: "bible-reading",
        style: "long",
        lookup: {
          type: "lectionary",
          table: lectionary,
          item: "gospel",
        },
        label: "The Gospel",
      }),
    ],
  });
}
