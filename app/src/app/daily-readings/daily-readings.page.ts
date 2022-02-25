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
  collects$: Observable<{ label: string; doc: LiturgicalDocument }>;

  settings$: Observable<DisplaySettings>;

  kalendar: FormControl = new FormControl("bcp1979");
  psalmCycle: FormControl = new FormControl("bcp1979_daily_psalms");
  timeOfDay: FormControl = new FormControl(
    new Date().getHours() <= 14 ? "morning" : "evening"
  );
  psalterVersion$: Observable<{ value: string; label: string }>;
  bibleVersion$: Observable<{ value: string; label: string }>;
  canticles$: Observable<{
    first: LiturgicalDocument;
    second: LiturgicalDocument;
  }>;

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

    const language$ = this.preferencesService
      .get("language")
      .pipe(map((pref) => pref?.value || "en"));

    const version$ = this.preferencesService
      .get("version")
      .pipe(map((pref) => pref?.value || "Rite-II"));

    this.liturgy$ = combineLatest([
      this.currentLiturgy$.pipe(startWith(this.currentLiturgy$.getValue())),
      language$,
      version$,
    ]).pipe(
      switchMap(([slug, language, version]) =>
        this.documentService
          .findDocumentsBySlug(slug, language, [version])
          .pipe(map((docs) => docs[0]))
      ),
      tap((liturgy) => console.log("liturgy = ", liturgy))
    );

    const preferences$ = this.liturgy$.pipe(
      switchMap((liturgy) =>
        this.preferencesService
          .getPreferencesForLiturgy(liturgy)
          .pipe(map((preferences) => ({ liturgy, preferences })))
      )
    );
    this.psalterVersion$ = preferences$.pipe(
      tap((data) => console.log("psalterVersion$ data = ", data)),
      map(({ liturgy, preferences }) => {
        const stored = preferences.find((pref) => pref.key == "psalterVersion"),
          psalterVersionOptions =
            ((liturgy as Liturgy).metadata?.preferences || {})["psalterVersion"]
              ?.options || [],
          defaultOption = psalterVersionOptions.find(
            (option) => option.default
          ),
          firstOption = psalterVersionOptions[0];
        if (stored?.value) {
          return {
            value: stored.value,
            label:
              psalterVersionOptions.find(
                (option) => option.value == stored.value
              )?.label || stored.value,
          };
        } else {
          return defaultOption || firstOption;
        }
      })
    );
    this.bibleVersion$ = preferences$.pipe(
      tap((data) => console.log("bibleVersion$ data = ", data)),
      map(({ liturgy, preferences }) => {
        const stored = preferences.find((pref) => pref.key == "bibleVersion"),
          bibleVersionOptions =
            ((liturgy as Liturgy).metadata?.preferences || {})["bibleVersion"]
              ?.options || [],
          defaultOption = bibleVersionOptions.find((option) => option.default),
          firstOption = bibleVersionOptions[0];
        if (stored?.value) {
          return {
            value: stored.value,
            label:
              bibleVersionOptions.find((option) => option.value == stored.value)
                ?.label || stored.value,
          };
        } else {
          return defaultOption || firstOption;
        }
      })
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
            this.bibleVersion$.pipe(
              switchMap(({ value }) =>
                this.prayService.lookupBibleReading(
                  new BibleReading({
                    type: "bible-reading",
                    style: "long",
                    citation: entry.citation,
                  }),
                  value
                )
              )
            )
          )
        )
      )
    );

    this.psalms$ = combineLatest([
      this.psalterVersion$.pipe(map(({ value }) => value)),
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

    //@ts-ignore
    this.collects$ = this.day$.pipe(
      switchMap((day) =>
        this.prayService.compile(COLLECT_RECIPE, day, {}, [], {})
      ),
      map((docs) =>
        docs.value?.length == 3
          ? [
              { label: "Contemporary", doc: (docs as Option).value[0] },
              { label: "Traditional", doc: (docs as Option).value[1] },
              { label: "Español", doc: (docs as Option).value[2] },
            ]
          : { label: "", doc: docs }
      )
    );

    const canticleTable$ = preferences$.pipe(
      map(({ liturgy, preferences }) => {
        const stored = preferences.find((pref) => pref.key == "canticleTable"),
          canticleTableOptions =
            ((liturgy as Liturgy).metadata?.preferences || {})["canticleTable"]
              ?.options || [],
          defaultOption = canticleTableOptions.find((option) => option.default),
          firstOption = canticleTableOptions[0];
        return stored?.value || (defaultOption || firstOption).value;
      })
    );
    const firstCanticle$ = combineLatest([
      this.liturgy$,
      canticleTable$,
      this.day$,
    ]).pipe(
      switchMap(([liturgy, table, day]) =>
        this.prayService.compile(
          new LiturgicalDocument({
            type: "psalm",
            lookup: {
              table,
              type: "canticle",
              rotate: false,
              item: 1,
            },
            language: liturgy.language,
          }),
          day,
          {},
          liturgy?.metadata?.liturgyversions || [],
          {}
        )
      )
    );
    const secondCanticle$ = combineLatest([
      this.liturgy$,
      canticleTable$,
      this.day$,
    ]).pipe(
      switchMap(([liturgy, table, day]) =>
        this.prayService.compile(
          new LiturgicalDocument({
            type: "psalm",
            lookup: {
              table,
              type: "canticle",
              rotate: false,
              item: 2,
            },
            language: liturgy.language,
          }),
          day,
          {},
          liturgy?.metadata?.liturgyversions || [],
          {}
        )
      )
    );
    this.canticles$ = combineLatest([firstCanticle$, secondCanticle$]).pipe(
      map(([first, second]) => ({ first, second })),
      tap((data) => console.log("canticles$", data))
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

const COLLECT_RECIPE = new LiturgicalDocument({
  type: "option",
  value: [
    new LiturgicalDocument({
      hidden: false,
      type: "text",
      style: "prayer",
      lookup: {
        type: "collect",
        allow_multiple: true,
      },
      language: "en",
      version: "bcp1979",
      version_label: "Contemporary",
    }),
    new LiturgicalDocument({
      hidden: false,
      type: "text",
      style: "prayer",
      lookup: {
        type: "collect",
        allow_multiple: true,
      },
      language: "en",
      version: "rite_i",
      version_label: "Traditional",
    }),
    new LiturgicalDocument({
      hidden: false,
      type: "text",
      style: "prayer",
      lookup: {
        type: "collect",
        allow_multiple: true,
      },
      language: "es",
      version: "loc",
      version_label: "Español",
    }),
  ],
});
