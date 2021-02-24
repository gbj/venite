import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ClientPreferences, dateFromYMDString, Kalendar, LiturgicalDay, LiturgicalDocument, LiturgicalWeek, Liturgy, Preference, ProperLiturgy, User, versionToString } from '@venite/ldf';
import { PrayMenuConfig } from '@venite/ng-pray-menu/lib/pray-menu-config';
import { BulletinCommands } from '@venite/ng-pray-menu/public-api';
import { BehaviorSubject, combineLatest, Observable, of, Subject, merge } from 'rxjs';
import { distinctUntilKeyChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PreferencesService } from 'src/app/preferences/preferences.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { DocumentService } from 'src/app/services/document.service';
import { LectionaryService } from 'src/app/services/lectionary.service';

type LanguageVersionKalendarValues = {
  language: string;
  version: string;
  kalendar: string;
}

type DateValues = {
  year: string;
  month: string;
  day: string;
}

type PrayData = {
  user: User;
  liturgy: LiturgicalDocument;
  date: Date;
  properLiturgy: ProperLiturgy,
  liturgicalDay: LiturgicalDay;
  clientPreferences: ClientPreferences;
  availableReadings: string[];
}

@Component({
  selector: 'venite-liturgy-select',
  templateUrl: './liturgy-select.component.html',
  styleUrls: ['./liturgy-select.component.scss'],
})
export class LiturgySelectComponent implements OnInit {
  @Input() showVigil : boolean = true;
  @Input() prayButton : boolean = true;
  @Input() bulletinButton : boolean = false;

  @Output() dayChosen : EventEmitter<PrayData> = new EventEmitter();
  @Output() createBulletin : EventEmitter<BulletinCommands> = new EventEmitter();

  week$ : Observable<LiturgicalWeek[]>;
  day$ : Observable<LiturgicalDay>;
  form : FormGroup;

  // Liturgies
  liturgyOptions$ : Observable<LiturgicalDocument[]>;
  properLiturgy$ : BehaviorSubject<ProperLiturgy | null> = new BehaviorSubject(null);
  availableProperLiturgies$ : BehaviorSubject<ProperLiturgy[]> = new BehaviorSubject([]);

  // Language/version/kalendar
  languageOptions$ : Observable<{ value: string; label: string; }[]>;
  versionOptions$ : Observable<{ value: string; label: string; }[]>;
  kalendarOptions$ : Observable<Kalendar[]>;
  language$ : Observable<string>;
  version$ : Observable<string>;
  kalendar$ : Observable<string>;
  liturgy$ : Observable<LiturgicalDocument>;
  vigil$ : Observable<boolean>;

  // Heading
  dayName$ : Observable<LiturgicalDay>;
  dayReset$ : Subject<null> = new Subject();

  // Date
  date$ : Observable<Date>;
  daysInMonth$ : Observable<number[]>;

  // Preferences
  clientPreferences$ : BehaviorSubject<ClientPreferences> = new BehaviorSubject({});

  // Readings available for the selected day
  availableReadings$ : Observable<string[]>;

  // Data for Pray button
  prayData$ : Observable<PrayData>;

  /* Records the last time we entered the page; will only reset the menu if
   * it's been longer than REMEMBER_TIME */
  lastPrayed : Date = new Date();
  readonly REMEMBER_TIME = 30*60*1000; // default to 30 minutes
  hasStartedNavigating : boolean = false;
  startingDate$ : Subject<Date> = new Subject();

  constructor(
    @Inject('config') public config : PrayMenuConfig,
    private translate : TranslateService,
    private calendarService : CalendarService,
    private documents : DocumentService,
    private auth : AuthService,
    private lectionary : LectionaryService,
    private preferencesService : PreferencesService,
    private modal : ModalController,
    private alert : AlertController,
    private router : Router,
  ) {
    const today = new Date();
    this.form = new FormGroup({
      language: new FormControl(this.config.defaultLanguage),
      version: new FormControl(this.config.defaultVersion),
      kalendar: new FormControl(this.config.defaultKalendar),
      date: new FormGroup({
        year: new FormControl(today.getFullYear().toString()),
        month: new FormControl((today.getMonth() + 1).toString()),
        day: new FormControl(today.getDate().toString())
      }),
      liturgy: new FormControl(liturgyOfTheHour(today)),
      vigil: new FormControl(false)
    });

    // Liturgy options
    this.language$ = this.form.controls.language.valueChanges;
    this.version$ = this.form.controls.version.valueChanges;

    const allLiturgies$ = combineLatest([
      this.language$.pipe(startWith(this.config.defaultLanguage)),
      this.version$.pipe(startWith(this.config.defaultVersion)),
    ]).pipe(
      switchMap(([language, version]) => this.documents.getLiturgyOptions(language, version))
    );

    const availableProperLiturgiesLiturgies$ = this.availableProperLiturgies$.pipe(
      switchMap(liturgies => {
          return combineLatest(
            liturgies.filter(proper => proper?.hasOwnProperty('liturgy'))
              .map(proper => this.documents.findDocumentsBySlug(proper?.liturgy, this.form.controls.language.value, undefined))
          ).pipe(startWith([]));
      }),
      // transform from array of all documents with slug to first document found with correct language and version
      // or just the right language
      map(docs => {
        const documents = docs.flat(),
          language = this.form.controls.language.value,
          version = this.form.controls.version.value;
        const matchesLanguageAndVersion = documents
          .find(doc => doc.language == language && doc.version == version);
        if(!matchesLanguageAndVersion) {
          const matchesLanguage = documents.find(doc => doc.language == language),
                firstOption = documents[0];
          return matchesLanguage || firstOption;
        } else {
          return matchesLanguageAndVersion;
        }
      })
    );

    this.liturgyOptions$ = combineLatest(
      allLiturgies$,
      availableProperLiturgiesLiturgies$
    ).pipe(
      map(([liturgies, availableProperLiturgies]) => availableProperLiturgies
        ? [availableProperLiturgies].concat(
          liturgies.filter(
            liturgy => !Boolean(liturgy?.metadata?.supplement)
          )
        )
        : liturgies.filter(
          liturgy => !Boolean(liturgy?.metadata?.supplement)
        )
    ));

    // Language, version, kalendar
    this.languageOptions$ = this.liturgyOptions$.pipe(
      map(liturgies => Array.from(new Set(liturgies.map(liturgy => liturgy.language || 'en')))),
      map(languages => languages.map(language => ({
        value: language,
        label: this.translate.instant(`language.${language}`) as string || language
      })))
    );
    this.versionOptions$ = of(this.config.versionOptions);

    // Date observables
    this.daysInMonth$ = this.form.controls.date.valueChanges.pipe(
      map((values: DateValues) => daysInMonth(values.month, values.year)),
      startWith(daysInMonth(today.getFullYear(), today.getMonth() + 1))
    )
  }

  ngOnInit() {
    this.kalendar$ = this.form.controls.kalendar.valueChanges.pipe(startWith(this.form.controls.kalendar.value));
    this.vigil$ = this.form.controls.vigil.valueChanges.pipe(startWith(this.form.controls.vigil.value));
    this.liturgy$ = combineLatest([
      this.form.controls.liturgy.valueChanges.pipe(startWith(this.form.controls.liturgy.value)),
      this.liturgyOptions$
    ]).pipe(
      map(([slug, liturgies]) => liturgies.find(liturgy => liturgy.slug == slug)),
    );

    // load kalendar options
    this.kalendarOptions$ = this.calendarService.findKalendars();

    this.date$ = this.form.controls.date.valueChanges.pipe(
      map((values: DateValues) => dateFromYMDString(`${values.year}-${values.month}-${values.day}`)),
      startWith(dateFromYMDString(`${this.form.controls.date.value.year}-${this.form.controls.date.value.month}-${this.form.controls.date.value.day}`))
    );

    if(!this.config.serverReturnsDate) {
      // DB queries that depend on date change
      // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
      this.week$ = this.calendarService.buildWeek(
        this.date$,
        this.form.controls.kalendar.valueChanges.pipe(startWith(this.form.controls.kalendar.value)),
        this.form.controls.vigil.valueChanges.pipe(startWith(this.form.controls.vigil.value))
      );
  
      // main liturgical day observable
      this.day$ = this.calendarService.buildDay(
          this.date$,
          this.kalendar$,
          this.liturgy$,
          this.week$,
          this.vigil$
        );
      } else {
        this.day$ = this.calendarService.buildDay(
          this.date$,
          this.kalendar$,
          this.liturgy$,
          of([]),
          this.vigil$
        ).pipe(tap(() => console.log('day$ changed')));
      }
      this.dayName$ = merge(this.day$, this.dayReset$);

      this.date$.subscribe(() => {
        this.dayReset$.next(null);
      });

      // Proper Liturgies
      this.day$.pipe(
        distinctUntilKeyChanged('slug'),
        switchMap(day => this.calendarService.findProperLiturgies(day, this.form.controls.language.value))
      ).subscribe(
        (liturgies) => {
          this.availableProperLiturgies$.next(liturgies);
        }
      );

      this.availableReadings$ = combineLatest(this.day$, this.clientPreferences$).pipe(
        switchMap(([day, prefs]) => this.lectionary.getReadings(
          day,
          prefs['lectionary'],
          undefined,
          false
        )),
        map(entries => entries.map(entry => entry.type))
      );

      this.prayData$ = combineLatest([
        this.auth.user,
        this.liturgy$,
        this.date$,
        this.properLiturgy$,
        this.dayName$, // use this instead of day$ because is null if day has been changed + not loaded yet (day$ is still the old one)
        this.clientPreferences$,
        this.availableReadings$.pipe(startWith([])),
      ]).pipe(
        map(([user, liturgy, date, properLiturgy, liturgicalDay, clientPreferences, availableReadings]) => ({
          user: user as User,
          liturgy: liturgy as LiturgicalDocument,
          date: date as Date,
          properLiturgy: properLiturgy as ProperLiturgy,
          liturgicalDay: liturgicalDay as LiturgicalDay,
          clientPreferences: clientPreferences as ClientPreferences,
          availableReadings: availableReadings as string[]
        }))
      )
  }

  setMonth(value : string) {
    (this.form.controls.date as FormGroup).controls.month.setValue(value);
  }

  setDate(value : string) {
    (this.form.controls.date as FormGroup).controls.day.setValue(value)
  }

  setProperLiturgy(properLiturgy : ProperLiturgy, event : CustomEvent) {
    if(event.detail.checked) {
      this.form.controls.liturgy.setValue(properLiturgy.liturgy);
    } else {
      this.form.controls.liturgy.setValue(liturgyOfTheHour(new Date()));
    }
  }

  // ionViewWillEnter -- each time we return to this page, check last time we prayed and reset menu if necessary
  ionViewWillEnter() {
    if(!this.lastPrayed || (Math.abs(new Date().getTime() - this.lastPrayed.getTime())) > this.REMEMBER_TIME) {
      this.startingDate$.next(new Date());
    }
    this.hasStartedNavigating = false;
  }

  pray(data : PrayData | undefined, bulletinMode : boolean = false) {
    this.dayChosen.emit(data);
    
    const { user, liturgy, date, properLiturgy, liturgicalDay, clientPreferences, availableReadings } = data;

    // update preferences
    this.savePreferences(user ? user.uid : undefined, clientPreferences, liturgy, this.form.controls.language.value, this.form.controls.version.value, this.form.controls.kalendar.value);

    // if proper liturgy is selected, use its preference value
    // e.g., Maundy Thursday `footwashing` preference
    if(properLiturgy?.preference) {
      clientPreferences[properLiturgy.preference] = "true";
    }

    // check to see if all selected readings are available; if not, notify the user
    const allReadingsAvailable = this.areReadingsAvailable(new Liturgy(liturgy), clientPreferences, availableReadings);
    if(!allReadingsAvailable) {
      this.readingsNotAvailableAlert(new Liturgy(liturgy), liturgicalDay, clientPreferences, availableReadings, bulletinMode);
    } else {
      // navigate to the Pray page
      if(bulletinMode) {
        this.navigate('/bulletin', new Liturgy(liturgy), date, liturgicalDay, clientPreferences, true);
      } else {
        this.navigate('/pray', new Liturgy(liturgy), date, liturgicalDay, clientPreferences);
      }
    }
  }

  areReadingsAvailable(liturgy : Liturgy, prefs : ClientPreferences, availableReadings : string[]) : boolean {
    const readingPrefKeys = Object.keys(liturgy?.metadata?.preferences || {}).filter(p => ['readingA', 'readingB', 'readingC'].includes(p));
    let allReadingsAvailable : boolean = true;
    if(readingPrefKeys && readingPrefKeys.length > 0) {
      allReadingsAvailable = readingPrefKeys
      .filter(key => prefs[key]?.toLowerCase() !== 'none')
      .map(key => {
        const t = prefs[key]?.endsWith('_alt') ? prefs[key].replace('_alt', '') : prefs[key];
        return availableReadings.includes(t);
      })
      .reduce((a, b) => a && b);
    }
    return allReadingsAvailable;
  }

  async prayersAndThanksgivings() {
    if(this.config?.prayersAndThanksgivings?.component) {
      const modal = await this.modal.create({
        component: this.config.prayersAndThanksgivings.component
      });
      modal.componentProps = {
        modal
      };
      await modal.present();
    }
  }

  async readingsNotAvailableAlert(liturgy : Liturgy, day : LiturgicalDay, prefs : ClientPreferences, availableReadings : string[], bulletinMode: boolean) {
    const holy_day_readings = availableReadings.filter(reading => reading.match(/holy_day/)),
      date = dateFromYMDString(day?.date);

    if(day) {
      if(holy_day_readings?.length > 0) {
        const evening : boolean = liturgy.metadata?.evening,
              readingA : string = evening ? 'holy_day_evening_1' : 'holy_day_morning_1',
              readingB : string = evening ? 'holy_day_evening_2' : 'holy_day_morning_2';
    
        console.log('availableReadings = ', availableReadings);

        console.log('holy_day_readings = ', holy_day_readings);

        const modifiedPrefs = {
          ... prefs,
          'readingA': availableReadings.includes(readingA) ? readingA : prefs['readingA'],
          'readingB': availableReadings.includes(readingB) ? readingB : prefs['readingB'],
          'readingC': ['morning-prayer', 'evening-prayer'].includes(liturgy?.slug) ? 'none' : prefs['readingC']
        };

        console.log('modifiedPrefs = ', modifiedPrefs);
    
        const alert = await this.alert.create({
          header: this.translate.instant('home.holy_day_alert.title'),
          message: this.translate.instant('home.holy_day_alert.message'),
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            }, {
              text: 'Continue',
              handler: () => {
                if(bulletinMode) {
                  this.navigate('/bulletin', liturgy, date, day, modifiedPrefs, true);
                } else {
                  this.navigate('/pray', liturgy, date, day, modifiedPrefs);
                }
              }
            }
          ]
        });
    
        await alert.present();
      } else {
        const a : string[] = availableReadings.filter(r => r && r !== ''),
              availableList : string = `${a.slice(0, -1).join(',')} or ${a.slice(-1)}`;
    
        if(a.length > 0) {
          const alert = await this.alert.create({
            header: this.translate.instant('home.missing_reading_alert.title'),
            message: this.translate.instant('home.missing_reading_alert.message', { availableList }),
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
              }, {
                text: 'Continue',
                handler: () => {
                  if(bulletinMode) {
                    this.navigate('/bulletin', liturgy, date, day, prefs, true);
                  } else {
                    this.navigate('/pray', liturgy, date, day, prefs);
                  }
                }
              }
            ]
          });

          await alert.present();
        } else {
          if(bulletinMode) {
            this.navigate('/bulletin', liturgy, date, day, prefs, true);
          } else {
            this.navigate('/pray', liturgy, date, day, prefs);
          }
        }
    
      }
    }
  }

  savePreferences(uid : string, prefs : ClientPreferences, liturgy : LiturgicalDocument, language : string, version: string, kalendar: string) {
    Object.entries(prefs)
      // take only those properties that are listed in the liturgy's `preferences` metadata field
      // e.g., Evening Prayer will list `bibleVersion` but not `footwashing`—so don't save `footwashing`
      .filter(([key, value]) => liturgy?.metadata?.preferences?.hasOwnProperty(key))
      // store each key individually in the database
      .forEach(([key, value]) => this.preferencesService.set(key, value, uid, liturgy));
    
    this.preferencesService.set("language", language, uid);
    this.preferencesService.set("version", version, uid);
    this.preferencesService.set("kalendar", kalendar, uid);
  }

  navigate(root : string, liturgy : Liturgy, date : Date, day : LiturgicalDay, prefs : ClientPreferences, bulletinMode : boolean = false) {
    const y = date.getFullYear().toString(),
      m = (date.getMonth() + 1).toString(),
      d = date.getDate().toString(),
      commands : string[] = [
        root,
        liturgy?.language || this.config.defaultLanguage,
        versionToString(liturgy?.version) || this.config.defaultVersion,
        day?.kalendar || this.config.defaultKalendar,
        y, m, d,
        liturgy?.slug,
      ];
    const nonDefaultPrefs = this.nonDefaultPrefs(liturgy, prefs);
    // if any prefs have changed, add them to URL params
    if(Object.keys(nonDefaultPrefs).length > 0) { // || this.data.isVigil) {
      commands.push(JSON.stringify(nonDefaultPrefs));
    }
    // TODO -- push vigil info as well
    if(bulletinMode) {
      this.createBulletin.emit({ commands, state: { liturgy, day, prefs } });
    } else {
      this.router.navigate(commands, { state: { liturgy, day, prefs } });
    }
  }

  nonDefaultPrefs(liturgy : Liturgy, prefs : ClientPreferences) : ClientPreferences {
    const uniquePrefKeys : string[] = Object.keys(liturgy.metadata?.preferences || {})
        .concat(Object.keys(liturgy.metadata?.special_preferences || {}))
        .concat(Object.keys(prefs || {}))
        .reduce((uniques, item) => uniques.includes(item) ? uniques : [...uniques, item], []);

    const nonDefaultPrefs = {};

    for(let key of uniquePrefKeys) {
      const liturgyPref = new Preference(liturgy.metadata?.preferences[key]),
          clientPrefValue = prefs[key];
      let defaultPrefValue : string;
      try {
        defaultPrefValue = liturgyPref.getDefaultPref();
      } catch(e) {
        console.warn(e);
      }

      if(clientPrefValue !== defaultPrefValue) {
        nonDefaultPrefs[key] = clientPrefValue;
      }
    }

    return nonDefaultPrefs;
  }
}

// Returns a list of all possible dates in a given year and month
function daysInMonth(year : string | number, month : string | number) : number[] {
  const days = new Date(Number(year), Number(month), 0).getDate(),
        range = new Array();
  for(let ii = 1; ii <= days; ii++) {
    range.push(ii);
  }
  return range;
}
// Hard-coded default liturgy slug for any given hour
function liturgyOfTheHour(now : Date) : string {
  const hour : number = now.getHours();
  if(hour > 3 && hour < 11) {
    return "morning-prayer"
  } else if(hour >= 11 && hour <= 14) {
    return "noonday-prayer"
  } else if(hour >= 14 && hour <= 20) {
    return "evening-prayer"
  } else {
    return "compline"
  }
}