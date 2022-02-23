import { Component, Inject, OnInit } from "@angular/core";
import {
  BibleReading,
  Condition,
  LectionaryEntry,
  LiturgicalDay,
  LiturgicalDocument,
  Liturgy,
  Psalm,
  Option,
  dateFromYMDString,
} from "@venite/ldf";
import { PrayService } from "@venite/ng-pray";
import {
  CALENDAR_SERVICE,
  DOCUMENT_SERVICE,
  LECTIONARY_SERVICE,
  PreferencesServiceInterface,
  PREFERENCES_SERVICE,
} from "@venite/ng-service-api";
import { Observable, of, BehaviorSubject, combineLatest } from "rxjs";
import { map, startWith, switchMap, take, tap } from "rxjs/operators";
import { CalendarService } from "../services/calendar.service";
import { DocumentService } from "../services/document.service";
import { LectionaryService } from "../services/lectionary.service";
import { DisplaySettings } from "@venite/ldf";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

type Lectionaries = "bcp1979_daily_office" | "bcp1979_30day_psalter";

@Component({
  selector: "venite-daily-readings",
  templateUrl: "./daily-readings.page.html",
  styleUrls: ["./daily-readings.page.scss"],
})
export class DailyReadingsPage implements OnInit {
  searchDate$: Observable<Date>;
  currentLiturgy$: BehaviorSubject<string | undefined> = new BehaviorSubject(
    undefined
  );
  liturgy$: Observable<LiturgicalDocument>;
  day$: Observable<LiturgicalDay>;
  readings$: Observable<LiturgicalDocument[]>;
  psalms$: Observable<LiturgicalDocument[]>;
  collects$: Observable<LiturgicalDocument[]>;

  settings$: Observable<DisplaySettings>;

  kalendar: FormControl = new FormControl("bcp1979");
  psalmCycle: FormControl = new FormControl("bcp1979_daily_psalms");
  timeOfDay: FormControl = new FormControl(
    new Date().getHours() <= 14 ? "morning" : "evening"
  );
  psalterVersion: FormControl = new FormControl("bcp1979");
  bibleVersion: FormControl = new FormControl("NRSV");

  constructor(
    @Inject(CALENDAR_SERVICE) private calendarService: CalendarService,
    @Inject(DOCUMENT_SERVICE) private documentService: DocumentService,
    @Inject(LECTIONARY_SERVICE) private lectionaryService: LectionaryService,
    private prayService: PrayService,
    @Inject(PREFERENCES_SERVICE)
    private preferencesService: PreferencesServiceInterface,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchDate$ = this.route.params.pipe(
      map((params) => {
        if (params.ymd) {
          try {
            return dateFromYMDString(params.ymd);
          } catch (e) {
            console.warn(e);
            return new Date();
          }
        } else {
          return new Date();
        }
      })
    );

    this.currentLiturgy$.next(
      new Date().getHours() <= 14 ? "morning-prayer" : "evening-prayer"
    );

    this.liturgy$ = this.currentLiturgy$.pipe(
      switchMap((slug) =>
        this.documentService
          .findDocumentsBySlug(slug)
          .pipe(map((docs) => docs[0]))
      )
    );

    const week$ = this.calendarService.buildWeek(
      this.searchDate$,
      this.kalendar.valueChanges.pipe(startWith(this.kalendar.value)),
      of(false)
    );
    this.day$ = this.liturgy$.pipe(
      switchMap((liturgy) =>
        this.calendarService.buildDay(
          this.searchDate$,
          this.kalendar.valueChanges.pipe(startWith(this.kalendar.value)),
          of(liturgy),
          week$,
          of(false)
        )
      )
    );

    this.readings$ = this.day$.pipe(
      switchMap((day) =>
        this.lectionaryService
          .getReadings(day, "bcp1979_daily_office", undefined, false)
          .pipe(
            // remove other year's readings for days of rank 2.5 (Christmas etc.)
            map((entries) =>
              entries.filter(
                (entry) =>
                  entry.type.startsWith("holy_day") ||
                  entry.whentype != "year" ||
                  entry.when == day.years["bcp1979_daily_office"]
              )
            )
          )
      ),
      map((entries) =>
        entries.sort((a, b) => (readingOrder(a) <= readingOrder(b) ? -1 : 1))
      ),
      switchMap((entries) =>
        combineLatest(
          entries.map((entry) =>
            this.bibleVersion.valueChanges.pipe(
              startWith(this.bibleVersion.value),
              switchMap((version) =>
                this.prayService.lookupBibleReading(
                  new BibleReading({
                    type: "bible-reading",
                    style: "long",
                    citation: entry.citation,
                  }),
                  version
                )
              )
            )
          )
        )
      )
    );

    this.psalms$ = combineLatest([
      this.psalterVersion.valueChanges.pipe(
        startWith(this.psalterVersion.value)
      ),
      this.psalmCycle.valueChanges.pipe(startWith(undefined)),
      this.timeOfDay.valueChanges.pipe(startWith(undefined)),
      this.day$,
    ]).pipe(
      switchMap(([version, table, timeOfDay, day]) =>
        this.prayService
          .lookupPsalter(
            new Psalm({
              type: "psalm",
              style: "psalm",
              version,
              lookup: {
                table: table || this.psalmCycle.value,
                item: `${timeOfDay || this.timeOfDay.value}_psalms`,
                type: "lectionary",
              },
            }),
            day,
            {},
            {}
          )
          .pipe(
            map((doc) =>
              doc.type === "liturgy" ? (doc as Liturgy).value : [doc]
            )
          )
      )
    );

    this.collects$ = this.day$.pipe(
      switchMap((day) =>
        this.prayService.compile(COLLECT_RECIPE, day, {}, [], {})
      ),
      map((doc) =>
        doc.type === "liturgy" || doc.type === "option"
          ? (doc as Liturgy).value.filter((d) => Boolean(d))
          : [doc]
      ),
      map((docs) =>
        docs
          .map((doc) =>
            doc.type === "liturgy" || doc.type === "option"
              ? (doc as Liturgy).value.filter((d) => Boolean(d))
              : [doc]
          )
          .flat()
      ),
      // set collect version labels
      map((docs) =>
        docs.map((doc) =>
          doc.type === "option"
            ? new LiturgicalDocument({
                ...doc,
                value: (doc as Option).value.map(
                  (opt) =>
                    new LiturgicalDocument({
                      ...opt,
                      version_label:
                        opt.version === "rite_i"
                          ? "Traditional"
                          : "Contemporary",
                      version: undefined,
                    })
                ),
              })
            : doc
        )
      )
    );

    // Grab display settings from preferences
    this.settings$ = this.preferencesService.displaySettings();

    this.initFormFromPref();
  }

  async initFormFromPref() {
    const preferredLanguage = this.preferencesService.get("language"),
      preferredVersion = this.preferencesService.get("version"),
      timeOfDay = this.timeOfDay.value;
    // psalmCycle pref
    combineLatest([preferredLanguage, preferredVersion])
      .pipe(
        switchMap(([language, version]) => {
          const key = `${timeOfDay}-prayer-${language.value}-${version.value}-psalmCycle`;
          return this.preferencesService.get(key);
        }),
        take(1)
      )
      .subscribe((data) => {
        if (data?.value) {
          this.psalmCycle.setValue(data.value);
        }
      });
    // kalendar pref
    this.preferencesService
      .get("kalendar")
      .pipe(take(1))
      .subscribe((data) => {
        console.log("kalendar pref =", data);
        if (data?.value) {
          this.kalendar.setValue(data.value);
        }
      });
  }
  navigate(ev: Event) {
    if ((ev.target as HTMLInputElement).value) {
      this.router.navigate([
        "/",
        "daily-readings",
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

  generateReading(citation: string): Observable<LiturgicalDocument> {
    return this.day$.pipe(
      switchMap((day) =>
        this.prayService.lookupBibleReading(
          new BibleReading({
            type: "bible-reading",
            style: "long",
            citation,
          }),
          "KJV"
        )
      )
    );
  }
}

function readingOrder(entry: LectionaryEntry): number {
  switch (entry.type) {
    case "first_reading":
    case "holy_day_morning_1":
      return 1;
    case "second_reading":
    case "holy_day_morning_2":
      return 2;
    case "gospel":
    case "holy_day_evening_1":
      return 3;
    case "holy_day_evening_4":
      return 5;
    default:
      return 6;
  }
}

const COLLECT_RECIPE: Liturgy = new Liturgy({
  type: "liturgy",
  value: [
    new LiturgicalDocument({
      hidden: false,
      type: "text",
      style: "prayer",
      lookup: {
        type: "collect",
        allow_multiple: true,
      },
    }),
  ],
});
