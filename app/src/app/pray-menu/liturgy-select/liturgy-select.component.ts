import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import {
  ClientPreferences,
  dateFromYMDString,
  HolyDay,
  Kalendar,
  LiturgicalDay,
  LiturgicalDocument,
  LiturgicalWeek,
  Liturgy,
  Preference,
  ProperLiturgy,
  User,
  versionToString,
} from "@venite/ldf";
import { PrayMenuConfig } from "../pray-menu-config";
import { BulletinCommands } from "../bulletin-commands";
import {
  AUTH_SERVICE,
  AuthServiceInterface,
  CALENDAR_SERVICE,
  CalendarServiceInterface,
  PREFERENCES_SERVICE,
  PreferencesServiceInterface,
  LECTIONARY_SERVICE,
  LectionaryServiceInterface,
  DOCUMENT_SERVICE,
  DocumentServiceInterface,
  PLATFORM_SERVICE,
  PlatformServiceInterface,
} from "@venite/ng-service-api";
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  merge,
} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  first,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from "rxjs/operators";
import { LiturgyTimeRanges } from "@venite/ng-service-api";
import { h } from "@venite/components/dist/types/stencil-public-runtime";

type DateValues = {
  year: string;
  month: string;
  day: string;
};

type PrayData = {
  user: User;
  liturgy: LiturgicalDocument;
  date: Date;
  properLiturgy: ProperLiturgy;
  liturgicalDay: LiturgicalDay;
  clientPreferences: ClientPreferences;
  availableReadings: string[];
  vigil: boolean;
};

@Component({
  selector: "venite-liturgy-select",
  templateUrl: "./liturgy-select.component.html",
  styleUrls: ["./liturgy-select.component.scss"],
})
export class LiturgySelectComponent implements OnInit {
  @Input() showVigil: boolean = true;
  @Input() prayButton: boolean = true;
  @Input() bulletinButton: boolean = false;
  @Input() bulletinNotice: boolean = false;
  @Input() showOnlyAdvancedSettings: boolean = false;

  @Output() dayChosen: EventEmitter<PrayData> = new EventEmitter();
  @Output() createBulletin: EventEmitter<BulletinCommands> = new EventEmitter();

  isNavigating: boolean = false;

  week$: Observable<LiturgicalWeek[]>;
  day$: Observable<LiturgicalDay>;
  form: FormGroup;
  useBlackLetterCollect: FormControl;

  segmentMode: "ios" | "md";

  // Liturgies
  liturgyOptions$: Observable<LiturgicalDocument[]>;
  properLiturgy$: BehaviorSubject<ProperLiturgy | null> = new BehaviorSubject(
    null
  );
  availableProperLiturgies$: BehaviorSubject<ProperLiturgy[]> =
    new BehaviorSubject([]);

  // Language/version/kalendar
  languageOptions: { value: string; label: string }[];
  versionOptions$: Observable<{ value: string; label: string }[]>;
  kalendarOptions$: Observable<Kalendar[]>;
  language$: Observable<string>;
  version$: Observable<string>;
  kalendar$: Observable<string>;
  liturgy$: Observable<LiturgicalDocument>;
  vigil$: Observable<boolean>;

  // Heading
  dayName$: Observable<LiturgicalDay>;
  dayReset$: Subject<null> = new Subject();

  // Date
  date$: Observable<Date>;
  daysInMonth$: Observable<number[]>;

  // Preferences
  clientPreferences$: Observable<ClientPreferences>;
  menuPreferences$: BehaviorSubject<ClientPreferences> = new BehaviorSubject(
    {}
  );
  properLiturgyPreference$: BehaviorSubject<ClientPreferences> =
    new BehaviorSubject({});
  preferencesLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Readings available for the selected day
  availableReadings$: Observable<string[]>;

  // Data for Pray button
  prayData$: Observable<PrayData>;

  // Choice of day to observe
  observanceChoices$: Observable<{ slug: string; name: string }[]>;

  /* Records the last time we entered the page; will only reset the menu if
   * it's been longer than REMEMBER_TIME */
  lastPrayed: Date = new Date();
  readonly REMEMBER_TIME = 30 * 60 * 1000; // default to 30 minutes
  startingDate$: Subject<Date> = new Subject();

  // Time ranges
  ranges: LiturgyTimeRanges;

  constructor(
    @Inject("config") public config: PrayMenuConfig,
    private translate: TranslateService,
    private modal: ModalController,
    private alert: AlertController,
    private router: Router,
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface,
    @Inject(CALENDAR_SERVICE) public calendarService: CalendarServiceInterface,
    @Inject(PREFERENCES_SERVICE)
    private preferencesService: PreferencesServiceInterface,
    @Inject(LECTIONARY_SERVICE) private lectionary: LectionaryServiceInterface,
    @Inject(DOCUMENT_SERVICE) private documents: DocumentServiceInterface,
    @Inject(PLATFORM_SERVICE) private platform: PlatformServiceInterface
  ) {
    const today = new Date();
    this.form = new FormGroup({
      language: new FormControl(this.config.defaultLanguage),
      version: new FormControl(this.config.defaultVersion),
      kalendar: new FormControl(this.config.defaultKalendar),
      date: new FormGroup({
        year: new FormControl(today.getFullYear().toString()),
        month: new FormControl((today.getMonth() + 1).toString()),
        day: new FormControl(today.getDate().toString()),
      }),
      observance: new FormControl(undefined),
      liturgy: new FormControl(undefined),
      vigil: new FormControl(false),
    });

    this.useBlackLetterCollect = new FormControl(true);

    this.preferencesService
      .liturgyTimeRanges()
      .pipe(first())
      .subscribe((ranges) => {
        this.form.controls.liturgy.setValue(
          liturgyOfTheMoment(new Date(), ranges)
        );
      });

    // Liturgy options
    this.language$ = this.form.controls.language.valueChanges.pipe(
      startWith(this.form.controls.language.value)
    );
    this.version$ = this.form.controls.version.valueChanges.pipe(
      startWith(this.form.controls.version.value)
    );

    const allLiturgies$ = combineLatest([
      this.language$.pipe(startWith(this.config.defaultLanguage)),
      this.version$.pipe(startWith(this.config.defaultVersion)),
    ]).pipe(
      switchMap(([language, version]) =>
        this.documents.getLiturgyOptions(language, version)
      ),
      map((options) => {
        options.sort((a: any, b: any) => {
          if (!a.order) {
            return 1;
          }
          if (!b.order) {
            return -1;
          }
          return a.order < b.order ? -1 : 1;
        });
        return options;
      }),
      shareReplay()
    );

    this.clientPreferences$ = combineLatest([
      this.menuPreferences$,
      this.properLiturgyPreference$,
    ]).pipe(
      map(([menu, proper]) => ({ ...menu, ...proper })),
      shareReplay()
    );

    const availableProperLiturgiesLiturgies$: Observable<
      LiturgicalDocument[] | undefined
    > = this.availableProperLiturgies$.pipe(
      switchMap((liturgies) => {
        return combineLatest(
          liturgies
            .filter((proper) => proper?.hasOwnProperty("liturgy"))
            .map((proper) =>
              this.documents.findDocumentsBySlug(
                proper?.liturgy,
                this.form.controls.language.value,
                undefined
              )
            )
        ).pipe(
          startWith([]),
          map((l) => l.flat())
        );
      }),
      // transform from array of all documents with slug to first document found with correct language and version
      // or just the right language
      map((docs) => {
        const documents = docs.flat(),
          language = this.form.controls.language.value,
          version = this.form.controls.version.value;
        const matchesLanguageAndVersion = documents.filter(
          (doc) => doc.language == language && doc.version == version
        );
        if (!matchesLanguageAndVersion) {
          const matchesLanguage = documents.filter(
            (doc) => doc.language == language
          );
          return matchesLanguage?.length > 0 ? matchesLanguage : docs;
        } else {
          return matchesLanguageAndVersion;
        }
      })
    );

    this.liturgyOptions$ = combineLatest(
      allLiturgies$,
      availableProperLiturgiesLiturgies$,
      this.language$,
      this.version$
    ).pipe(
      map(([liturgies, availableProperLiturgies, language, version]) => {
        return availableProperLiturgies
          ? (Array.isArray(availableProperLiturgies)
              ? availableProperLiturgies
              : [availableProperLiturgies]
            ).concat(
              liturgies.filter(
                (liturgy) => !Boolean(liturgy?.metadata?.supplement)
              )
            )
          : liturgies.filter(
              (liturgy) =>
                !Boolean(liturgy?.metadata?.supplement) &&
                (!language || liturgy.language === language) &&
                (!version || liturgy.version === version)
            );
      }),
      shareReplay()
    );

    // Language, version, kalendar
    this.languageOptions = this.config.languageOptions;
    this.versionOptions$ = this.language$.pipe(
      tap((l) => console.log("versionOptions language = ", l)),
      map((language) => this.config.versionOptions[language]),
      tap((l) => console.log("versionOptions versions = ", l))
    );

    // Date observables
    this.daysInMonth$ = this.form.controls.date.valueChanges.pipe(
      map((values: DateValues) => daysInMonth(values.year, values.month)),
      startWith(daysInMonth(today.getFullYear(), today.getMonth() + 1))
    );
  }

  ngOnInit() {
    this.segmentMode =
      this.platform.is("ios") ||
      (this.platform.is("android") && window?.innerWidth < 450)
        ? "ios"
        : "md";

    this.kalendar$ = this.form.controls.kalendar.valueChanges.pipe(
      startWith(this.form.controls.kalendar.value)
    );
    this.vigil$ = this.form.controls.vigil.valueChanges.pipe(
      startWith(this.form.controls.vigil.value)
    );
    this.liturgy$ = combineLatest([
      this.form.controls.liturgy.valueChanges.pipe(
        startWith(this.form.controls.liturgy.value)
      ),
      this.liturgyOptions$,
    ]).pipe(
      map(
        ([slug, liturgies]) =>
          liturgies.find((liturgy) => liturgy.slug == slug) || liturgies[0]
      )
    );

    // load kalendar options
    this.kalendarOptions$ = this.calendarService.findKalendars();

    // Date when we re-enter the view
    this.startingDate$.subscribe((today) => {
      (this.form.controls.date as FormGroup).controls.year.setValue(
        today.getFullYear().toString()
      );
      (this.form.controls.date as FormGroup).controls.month.setValue(
        (today.getMonth() + 1).toString()
      );
      (this.form.controls.date as FormGroup).controls.day.setValue(
        today.getDate().toString()
      );
    });

    // Date from form
    this.date$ = this.form.controls.date.valueChanges.pipe(
      map((values: DateValues) =>
        dateFromYMDString(`${values.year}-${values.month}-${values.day}`)
      ),
      startWith(
        dateFromYMDString(
          `${this.form.controls.date.value.year}-${this.form.controls.date.value.month}-${this.form.controls.date.value.day}`
        )
      ),
      shareReplay()
    );

    // whether to use black-letter collects
    if (this.config.blackLetterCollectsOptional) {
      this.preferencesService
        .get("use-black-letter-collects")
        .pipe(first())
        .subscribe((pref) => {
          if (pref?.value === "false") {
            this.useBlackLetterCollect.setValue(false);
          }
        });

      this.useBlackLetterCollect.valueChanges.subscribe((value) => {
        this.preferencesService.set(
          "use-black-letter-collects",
          value ? "true" : "false",
          this.auth.currentUser()?.uid
        );
      });
    }

    if (!this.config.serverReturnsDate) {
      // DB queries that depend on date change
      // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
      this.week$ = this.calendarService.buildWeek(
        this.date$,
        this.form.controls.kalendar.valueChanges.pipe(
          startWith(this.form.controls.kalendar.value)
        ),
        this.form.controls.vigil.valueChanges.pipe(
          startWith(this.form.controls.vigil.value)
        )
      );

      // main liturgical day observable
      this.day$ = this.calendarService
        .buildDay(
          this.date$,
          this.kalendar$,
          this.liturgy$,
          this.week$,
          this.vigil$
        )
        .pipe(shareReplay());
    } else {
      this.day$ = this.calendarService
        .buildDay(
          this.date$,
          this.kalendar$,
          this.liturgy$,
          of([]),
          this.vigil$
        )
        .pipe(shareReplay());
    }
    this.dayName$ = merge(this.day$, this.dayReset$).pipe(shareReplay());

    this.date$.subscribe(() => {
      this.dayReset$.next(null);
    });

    // Proper Liturgies
    this.day$
      .pipe(
        distinctUntilKeyChanged("slug"),
        switchMap((day) =>
          this.calendarService.findProperLiturgies(
            day,
            this.form.controls.language.value
          )
        )
      )
      .subscribe((liturgies) => {
        // clear proper liturgy preferences
        this.properLiturgyPreference$.next({});

        if (
          JSON.stringify(liturgies) !==
          JSON.stringify(this.availableProperLiturgies$.getValue())
        ) {
          console.log(
            "sending more proper liturgies",
            JSON.stringify(liturgies),
            JSON.stringify(this.availableProperLiturgies$.getValue())
          );
          this.availableProperLiturgies$.next(liturgies);
        }
      });

    this.availableReadings$ = combineLatest(
      this.day$,
      this.clientPreferences$
    ).pipe(
      switchMap(([day, prefs]) =>
        this.lectionary.getReadings(day, prefs["lectionary"], undefined, false)
      ),
      map((entries) => entries.map((entry) => entry.type))
    );

    // Choices of which day to observe
    this.observanceChoices$ = combineLatest([this.day$, this.liturgy$]).pipe(
      map(([day, liturgy]) => {
        const date = dateFromYMDString(day.date);

        // either no liturgies listed in config, or the liturgy is one of those listed
        const liturgyOk =
          !this.config?.blackLetterObservanceLiturgies ||
          this.config.blackLetterObservanceLiturgies.includes(liturgy?.slug);

        // and either
        // the black-letter day would ordinarily be observed
        const decideWhetherToObserveBlackLetter =
          this.config?.blackLetterObservanceDays?.includes(
            day?.holy_day_observed?.slug
          ) &&
          (!day.holy_day_observed ||
            (day.holy_day_observed &&
              day.slug !== day.holy_day_observed?.slug) ||
            day.holy_day_observed?.slug === "thanksgiving-day") &&
          day.holy_days?.length > 0;

        // or
        // there's a red-letter day in holy_days, but it's not the day observed
        const decideWhetherToTransfer =
          (day?.holy_days || []).filter(
            (hd) =>
              hd.type?.rank >= 3 && hd.slug !== day.holy_day_observed?.slug
          ).length > 0;

        // or
        // there was a transferred holy day
        let isTransferred = false;
        if (day.holy_day_observed?.mmdd) {
          const [mm, dd] = day.holy_day_observed?.mmdd.split("/"),
            [y, m, d] = day.date.split("-");
          isTransferred = Number(m) !== Number(mm) || Number(d) !== Number(dd);
        }

        let baseDaySlug;
        const baseDayWeekdayFragment =
            date.getDay() === 0
              ? ""
              : `${date.toLocaleString("en", { weekday: "long" })} after ${
                  day.week.omit_the ? "" : "the "
                }`,
          baseDayName = `${baseDayWeekdayFragment}${day.week.name}`;

        // 12/29 if transferred
        const specialDate = (day.holy_days || []).find(
          (hd) => hd.type?.rank > 2 && hd.type?.rank < 3
        );
        if (specialDate) {
          baseDaySlug = specialDate.slug;
        } else {
          baseDaySlug = `${date
            .toLocaleString("en", { weekday: "long" })
            .toLowerCase()}-${day.week.propers || day.week.slug}`;
        }

        // decision tree
        const baseDay =
          date.getMonth() == 11 && date.getDate() >= 26 && date.getDate() <= 28
            ? null
            : { slug: baseDaySlug, name: baseDayName };
        if (liturgyOk && decideWhetherToObserveBlackLetter) {
          return [baseDay]
            .concat(
              day.holy_days.map((hd) => ({
                slug: hd.slug,
                name:
                  hd.slug == day.holy_day_observed?.slug
                    ? `${hd.name} (Default)`
                    : hd.name,
              }))
            )
            .filter((day) => day);
        } else if (liturgyOk && decideWhetherToTransfer) {
          return [baseDay]
            .concat(
              day.holy_days.map((hd) => ({
                slug: hd.slug,
                name:
                  hd.slug == day.holy_day_observed?.slug
                    ? `${hd.name} (Default)`
                    : hd.name,
              }))
            )
            .filter((day) => day);
        } else if (liturgyOk && isTransferred) {
          return [
            {
              slug: day.holy_day_observed.slug,
              name: `${day.holy_day_observed.name} (Default)`,
            },
            baseDay,
          ].filter((day) => day);
        } else {
          return [];
        }
      }),
      debounceTime(50),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      ),
      tap((oc) => console.log("observanceChoices$", oc))
    );

    this.observanceChoices$
      .pipe(first())
      .subscribe((oc) => this.form.controls.observance.setValue(oc[0]?.slug));

    this.prayData$ = combineLatest([
      this.auth.user,
      this.liturgy$,
      this.date$,
      this.properLiturgy$,
      this.dayName$, // use this instead of day$ because is null if day has been changed + not loaded yet (day$ is still the old one)
      this.clientPreferences$,
      this.availableReadings$.pipe(startWith([])),
      this.vigil$,
    ]).pipe(
      map(
        ([
          user,
          liturgy,
          date,
          properLiturgy,
          liturgicalDay,
          clientPreferences,
          availableReadings,
          vigil,
        ]) => ({
          user: user as User,
          liturgy: liturgy as LiturgicalDocument,
          date: date as Date,
          properLiturgy: properLiturgy as ProperLiturgy,
          liturgicalDay: liturgicalDay as LiturgicalDay,
          clientPreferences: clientPreferences as ClientPreferences,
          availableReadings: availableReadings as string[],
          vigil: vigil as boolean,
        })
      ),
      shareReplay(),
      // any time any of the data changes, set isNavigating to false;
      // so, for example, if we change date or liturgy the button is no longer disabled
      tap(() => (this.isNavigating = false))
    );

    // Load language/version/kalendar from preferences
    this.preferencesService
      .get("language")
      .pipe(
        filter((pref) => Boolean(pref?.value)),
        take(1)
      )
      .subscribe((pref) => {
        this.form.controls.language.setValue(pref.value);
      });
    this.preferencesService
      .get("version")
      .pipe(
        filter((pref) => Boolean(pref?.value)),
        take(1)
      )
      .subscribe((pref) => {
        this.form.controls.version.setValue(pref.value);
      });
    this.preferencesService
      .get("kalendar")
      .pipe(
        filter((pref) => Boolean(pref?.value)),
        take(1)
      )
      .subscribe((pref) => this.form.controls.kalendar.setValue(pref.value));

    // when reentering view, reset date if necessary
    this.router.events.subscribe(() => {
      this.isNavigating = false;

      if (
        !this.lastPrayed ||
        Math.abs(new Date().getTime() - this.lastPrayed.getTime()) >
          this.REMEMBER_TIME
      ) {
        this.startingDate$.next(new Date());
      }
    });
  }

  setMonth(value: string) {
    this.form.controls.observance.setValue(null);
    (this.form.controls.date as FormGroup).controls.month.setValue(value);
  }

  setDate(value: string) {
    this.form.controls.observance.setValue(null);
    (this.form.controls.date as FormGroup).controls.day.setValue(value);
  }

  setProperLiturgy(properLiturgy: ProperLiturgy, event: CustomEvent) {
    if (event.detail.checked) {
      // if it has a liturgy, set the liturgy to that
      if (properLiturgy.liturgy) {
        this.form.controls.liturgy.setValue(properLiturgy.liturgy);
      }
      // if it has a preference, set that preference
      if (properLiturgy.preference) {
        const prefs = new ClientPreferences();
        prefs[properLiturgy.preference] = "true";
        this.properLiturgyPreference$.next(prefs);
      }
    } else {
      // if it had a liturgy, reset to the default for this time
      if (properLiturgy.liturgy) {
        this.form.controls.liturgy.setValue(
          liturgyOfTheMoment(new Date(), this.ranges)
        );
      }
      // if it had a preference, clear it
      if (properLiturgy.preference) {
        const prefs = new ClientPreferences();
        prefs[properLiturgy.preference] = "false";
        this.properLiturgyPreference$.next(prefs);
      }
    }
  }

  pray(data: PrayData | undefined, bulletinMode: boolean = false) {
    this.lastPrayed = new Date();

    window.requestAnimationFrame(() => {
      this.isNavigating = true;
      console.log("set isNavigating to `true`");
    });

    window.requestAnimationFrame(() => {
      this.dayChosen.emit(data);

      const {
        user,
        liturgy,
        date,
        properLiturgy,
        liturgicalDay,
        clientPreferences,
        availableReadings,
        vigil,
      } = data;

      // update preferences
      this.savePreferences(
        user ? user.uid : undefined,
        clientPreferences,
        liturgy,
        this.form.controls.language.value,
        this.form.controls.version.value,
        this.form.controls.kalendar.value
      );

      // if proper liturgy is selected, use its preference value
      // e.g., Maundy Thursday `footwashing` preference
      if (properLiturgy?.preference) {
        clientPreferences[properLiturgy.preference] = "true";
      }

      // check to see if all selected readings are available; if not, notify the user
      const allReadingsAvailable = this.areReadingsAvailable(
        new Liturgy(liturgy),
        clientPreferences,
        availableReadings
      );
      if (!allReadingsAvailable) {
        this.isNavigating = false;
        this.readingsNotAvailableAlert(
          new Liturgy(liturgy),
          liturgicalDay,
          vigil,
          clientPreferences,
          availableReadings,
          bulletinMode
        );
      } else {
        const clientPrefs = this.config?.blackLetterCollectsOptional
          ? {
              ...clientPreferences,
              ublc: this.useBlackLetterCollect.value.toString(),
            }
          : clientPreferences;
        // navigate to the Pray page
        if (bulletinMode) {
          //this.isNavigating = true;
          this.navigate(
            "/bulletin",
            new Liturgy(liturgy),
            date,
            liturgicalDay,
            vigil,
            clientPrefs,
            true
          );
        } else {
          this.navigate(
            "/pray",
            new Liturgy(liturgy),
            date,
            liturgicalDay,
            vigil,
            clientPrefs
          );
        }
        this.isNavigating = false;
      }
    });
  }

  areReadingsAvailable(
    liturgy: Liturgy,
    prefs: ClientPreferences,
    availableReadings: string[]
  ): boolean {
    const readingPrefKeys = Object.keys(
      liturgy?.metadata?.preferences || {}
    ).filter((p) => ["readingA", "readingB", "readingC"].includes(p));
    let allReadingsAvailable: boolean = true;
    if (readingPrefKeys && readingPrefKeys.length > 0) {
      allReadingsAvailable = readingPrefKeys
        .filter((key) => prefs[key]?.toLowerCase() !== "none")
        .map((key) => {
          const t = prefs[key]?.endsWith("_alt")
            ? prefs[key].replace("_alt", "")
            : prefs[key];
          return availableReadings.includes(t);
        })
        .reduce((a, b) => a && b, true);
    }
    return allReadingsAvailable;
  }

  async prayersAndThanksgivings() {
    if (this.config?.prayersAndThanksgivings?.component) {
      const modal = await this.modal.create({
        component: this.config.prayersAndThanksgivings.component,
      });
      modal.componentProps = {
        modal,
      };
      await modal.present();
    }
  }

  async readingsNotAvailableAlert(
    liturgy: Liturgy,
    day: LiturgicalDay,
    vigil: boolean,
    prefs: ClientPreferences,
    availableReadings: string[],
    bulletinMode: boolean
  ) {
    const holy_day_readings = availableReadings.filter((reading) =>
        reading.match(/holy_day/)
      ),
      date = dateFromYMDString(day?.date);

    if (day) {
      if (
        holy_day_readings?.length > 0 &&
        (!this.form.controls.observance.value ||
          this.form.controls.observance.value === day.holy_day_observed?.slug)
      ) {
        const evening = liturgy.metadata?.evening,
          readingA = evening ? "holy_day_evening_1" : "holy_day_morning_1",
          readingB = evening ? "holy_day_evening_2" : "holy_day_morning_2";

        const modifiedPrefs = {
          ...prefs,
          readingA: availableReadings.includes(readingA)
            ? readingA
            : prefs["readingA"],
          readingB: availableReadings.includes(readingB)
            ? readingB
            : prefs["readingB"],
          readingC: ["morning-prayer", "evening-prayer"].includes(liturgy?.slug)
            ? "none"
            : prefs["readingC"],
        };

        const alert = await this.alert.create({
          header: this.translate.instant("home.holy_day_alert.title"),
          message: this.translate.instant("home.holy_day_alert.message"),
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Continue",
              handler: () => {
                if (bulletinMode) {
                  this.navigate(
                    "/bulletin",
                    liturgy,
                    date,
                    day,
                    vigil,
                    modifiedPrefs,
                    true
                  );
                } else {
                  this.navigate(
                    "/pray",
                    liturgy,
                    date,
                    day,
                    vigil,
                    modifiedPrefs
                  );
                }
              },
            },
          ],
        });

        await alert.present();
      } else {
        const a: string[] = availableReadings.filter((r) => r && r !== ""),
          availableList: string = `${a.slice(0, -1).join(",")} or ${a.slice(
            -1
          )}`;

        if (
          a.length > 0 &&
          (!this.form.controls.observance.value ||
            this.form.controls.observance.value === day.holy_day_observed?.slug)
        ) {
          const alert = await this.alert.create({
            header: this.translate.instant("home.missing_reading_alert.title"),
            message: this.translate.instant(
              "home.missing_reading_alert.message",
              { availableList }
            ),
            buttons: [
              {
                text: "Cancel",
                role: "cancel",
              },
              {
                text: "Continue",
                handler: () => {
                  if (bulletinMode) {
                    this.navigate(
                      "/bulletin",
                      liturgy,
                      date,
                      day,
                      vigil,
                      prefs,
                      true
                    );
                  } else {
                    this.navigate("/pray", liturgy, date, day, vigil, prefs);
                  }
                },
              },
            ],
          });

          await alert.present();
        } else {
          if (bulletinMode) {
            this.navigate("/bulletin", liturgy, date, day, vigil, prefs, true);
          } else {
            this.navigate("/pray", liturgy, date, day, vigil, prefs);
          }
        }
      }
    }
  }

  savePreferences(
    uid: string,
    prefs: ClientPreferences,
    liturgy: LiturgicalDocument,
    language: string,
    version: string,
    kalendar: string
  ) {
    Object.entries(prefs)
      // take only those properties that are listed in the liturgy's `preferences` metadata field
      // e.g., Evening Prayer will list `bibleVersion` but not `footwashing`—so don't save `footwashing`
      .filter(([key, value]) =>
        liturgy?.metadata?.preferences?.hasOwnProperty(key)
      )
      // store each key individually in the database
      .forEach(([key, value]) =>
        this.preferencesService.set(key, value, uid, liturgy)
      );

    this.preferencesService.set("language", language, uid);
    this.preferencesService.set("version", version, uid);
    this.preferencesService.set("kalendar", kalendar, uid);
  }

  navigate(
    root: string,
    liturgy: Liturgy,
    date: Date,
    day: LiturgicalDay,
    vigil: boolean,
    prefs: ClientPreferences,
    bulletinMode: boolean = false
  ) {
    const y = date.getFullYear().toString(),
      m = (date.getMonth() + 1).toString(),
      d = date.getDate().toString(),
      commands: string[] = [
        root,
        liturgy?.language || this.config.defaultLanguage,
        versionToString(liturgy?.version) || this.config.defaultVersion,
        day?.kalendar || this.config.defaultKalendar,
        y,
        m,
        d,
        liturgy?.slug,
      ];

    // if alternate observance selected, note it
    const observance = this.form.controls.observance.value,
      observanceDay = observance ? { ...day } : null;
    if (observance) {
      observanceDay.holy_day_observed = day.holy_days.find(
        (hd) => hd.slug == observance
      );
      observanceDay.slug = observance;
      observanceDay.propers = observance;
      if (observanceDay.holy_day_observed?.slug) {
        observanceDay.slug = observanceDay.holy_day_observed.slug;
      }
    }

    // in bulletin mode, send all params
    if (bulletinMode) {
      commands.push(vigil.toString());
      commands.push(JSON.stringify(prefs));
      commands.push(observance || day.propers || day.slug);
    } else {
      const nonDefaultPrefs = this.nonDefaultPrefs(liturgy, prefs);

      // if any prefs have changed, add them to URL params
      if (Object.keys(nonDefaultPrefs).length > 0 || vigil || observance) {
        commands.push(vigil.toString());
        commands.push(JSON.stringify(nonDefaultPrefs));
      }

      if (observance) {
        commands.push(observance);
      }
    }

    if (bulletinMode) {
      this.createBulletin.emit({
        commands,
        state: {
          liturgy,
          day: observanceDay ? new LiturgicalDay(observanceDay) : day,
          prefs,
        },
      });
    } else {
      console.log(
        "WHS navigating with day  = ",
        new LiturgicalDay(observanceDay) || day,
        "\n\nobservanceDay = ",
        observanceDay
      );
      this.router.navigate(commands, {
        state: {
          liturgy,
          day: observanceDay ? new LiturgicalDay(observanceDay) : day,
          prefs,
        },
      });
    }
  }

  nonDefaultPrefs(
    liturgy: Liturgy,
    prefs: ClientPreferences
  ): ClientPreferences {
    const uniquePrefKeys: string[] = Object.keys(
      liturgy.metadata?.preferences || {}
    )
      .concat(Object.keys(liturgy.metadata?.special_preferences || {}))
      .concat(Object.keys(prefs || {}))
      .reduce(
        (uniques, item) =>
          uniques.includes(item) ? uniques : [...uniques, item],
        []
      );

    const nonDefaultPrefs = {};

    if (liturgy.metadata?.preferences) {
      for (let key of uniquePrefKeys) {
        const liturgyPref = new Preference(liturgy.metadata.preferences[key]),
          clientPrefValue = prefs[key];
        let defaultPrefValue: string;
        try {
          defaultPrefValue = liturgyPref.getDefaultPref();
        } catch (e) {
          console.warn(e);
        }

        if (clientPrefValue !== defaultPrefValue) {
          nonDefaultPrefs[key] = clientPrefValue;
        }
      }
    }

    return nonDefaultPrefs;
  }

  setLanguage(lang: string) {
    this.form.controls.language.setValue(lang);
    if (this.config.versionOptions) {
      this.form.controls.version.setValue(
        this.config.versionOptions[lang][0].value
      );
    }
    this.preferencesService.set("language", lang, this.auth.currentUser()?.uid);
  }

  setVersion(version: string) {
    this.form.controls.version.setValue(version);
    this.form.controls.observance.setValue(undefined);
  }
}

// Returns a list of all possible dates in a given year and month
function daysInMonth(year: string | number, month: string | number): number[] {
  const days = new Date(Number(year), Number(month), 0).getDate(),
    range = new Array();
  for (let ii = 1; ii <= days; ii++) {
    range.push(ii);
  }
  return range;
}

// Hard-coded default liturgy slug for any given hour
function liturgyOfTheHour(now: Date): string {
  const hour: number = now.getHours();
  if (hour > 3 && hour < 11) {
    return "morning-prayer";
  } else if (hour >= 11 && hour <= 14) {
    return "noonday-prayer";
  } else if (hour >= 14 && hour <= 20) {
    return "evening-prayer";
  } else {
    return "compline";
  }
}

// Hard-coded default liturgy slug for any given hour
function liturgyOfTheMoment(now: Date, range: LiturgyTimeRanges): string {
  const hour: number = now.getHours(),
    minute: number = now.getMinutes();
  if (
    (hour > range.morning.start.hour ||
      (hour === range.morning.start.hour &&
        minute > range.morning.start.minute)) &&
    (hour < range.morning.end.hour ||
      (hour === range.morning.end.hour && minute < range.morning.end.minute) ||
      range.morning.end.hour < range.morning.start.hour)
  ) {
    return "morning-prayer";
  } else if (
    (hour > range.noon.start.hour ||
      (hour === range.noon.start.hour && minute > range.noon.start.minute)) &&
    (hour < range.noon.end.hour ||
      (hour === range.noon.end.hour && minute < range.noon.end.minute) ||
      range.noon.end.hour < range.noon.start.hour)
  ) {
    return "noonday-prayer";
  } else if (
    (hour > range.evening.start.hour ||
      (hour === range.evening.start.hour &&
        minute > range.evening.start.minute)) &&
    (hour < range.evening.end.hour ||
      (hour === range.evening.end.hour && minute < range.evening.end.minute) ||
      range.evening.end.hour < range.evening.start.hour)
  ) {
    return "evening-prayer";
  } else if (
    (hour > range.compline.start.hour ||
      (hour === range.compline.start.hour &&
        minute > range.compline.start.minute)) &&
    (hour < range.compline.end.hour ||
      (hour === range.compline.end.hour &&
        minute < range.compline.end.minute) ||
      range.compline.end.hour < range.compline.start.hour)
  ) {
    return "compline";
  } else {
    return "morning-prayer";
  }
}
