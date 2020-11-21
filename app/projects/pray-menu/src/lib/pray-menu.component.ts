import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { User, LiturgicalDocument, ProperLiturgy, LiturgicalDay, ClientPreferences, HolyDay, LiturgicalWeek, Preference, Liturgy, Kalendar, versionToString, dateFromYMDString } from '@venite/ldf';
import { PrayMenuConfig } from './pray-menu-config';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PREFERENCES_SERVICE, PreferencesServiceInterface, LectionaryServiceInterface, AuthServiceInterface, CalendarServiceInterface, AUTH_SERVICE, CALENDAR_SERVICE, LECTIONARY_SERVICE } from '@venite/ng-service-api';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import { DOCUMENT_SERVICE } from '@venite/ng-service-api';
import { DocumentServiceInterface } from '@venite/ng-service-api';
import { PrayService } from '@venite/ng-pray';

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
  selector: 'venite-pray-menu',
  templateUrl: './pray-menu.component.html',
  styleUrls: ['./pray-menu.component.scss'],
})
export class PrayMenuComponent implements OnInit {
  @Input() showVigil : boolean = true;

  // The data the Pray button needs
  prayData : Observable<PrayData>;

  // The `LiturgicalDay` that has currently been selected, without any holy day information
  liturgicalDay : Observable<LiturgicalDay | null>;

  // `language` and `version` used to filter Liturgies to display as options
  language$ : BehaviorSubject<string>;
  version$ : BehaviorSubject<string>;
  liturgyOptions$ : BehaviorSubject<LiturgicalDocument[]> = new BehaviorSubject([]);
  languageOptions$ : Observable<{ value: string; label: string; }[]>;
  versionOptions$ : Observable<{ value: string; label: string; }[]>;

  // Arguments into the liturgicalDay call, which we need to combine
  startingDate$ : Subject<Date> = new Subject();
  date : BehaviorSubject<Date> = new BehaviorSubject(new Date());
  holydays : BehaviorSubject<HolyDay[]> = new BehaviorSubject([]);
  kalendar : BehaviorSubject<string> = new BehaviorSubject(this.config.defaultKalendar);   // Backbone of Kalendar: Seasons, Major Feasts
  liturgy : Subject<LiturgicalDocument> = new Subject();
  properLiturgy : BehaviorSubject<ProperLiturgy | null> = new BehaviorSubject(undefined);
  sanctoral : BehaviorSubject<string> = new BehaviorSubject(this.config.defaultKalendar);  // Holy Days ('79, LFF, HWHM, GCOW, etc.)
  vigil : BehaviorSubject<boolean> = new BehaviorSubject(false);
  week : Observable<LiturgicalWeek[]>;

  // Readings available for the selected day
  availableReadings$ : Observable<string[]>;

  // UI options
  kalendarOptions : Observable<Kalendar[]>;
  sanctoralOptions : Observable<Kalendar[]>;

  // Preferences
  clientPreferences : BehaviorSubject<ClientPreferences> = new BehaviorSubject({});

  /* Records the last time we entered the page; will only reset the menu if
    * it's been longer than REMEMBER_TIME */
  lastPrayed : Date = new Date();
  readonly REMEMBER_TIME = 30*60*1000; // default to 30 minutes

  hasStartedNavigating : boolean = false;

  constructor(
    @Inject('config') public config : PrayMenuConfig,
    @Inject(AUTH_SERVICE) private auth : AuthServiceInterface,
    @Inject(CALENDAR_SERVICE) public calendarService : CalendarServiceInterface,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesServiceInterface,
    @Inject(LECTIONARY_SERVICE) private lectionary : LectionaryServiceInterface,
    @Inject(DOCUMENT_SERVICE) private documentService : DocumentServiceInterface,
    private prayService : PrayService,
    private router : Router,
    private alert : AlertController,
    private translate : TranslateService,
    private modal : ModalController
  ) {
    this.language$ = new BehaviorSubject(config.defaultLanguage);
    this.version$ = new BehaviorSubject(config.defaultVersion);
  }

 // ngOnInit() -- set up initial menu state
 ngOnInit() {
  // init with default language and version
  this.languageOptions$ = this.liturgyOptions$.pipe(
    map(liturgies => Array.from(new Set(liturgies.map(liturgy => liturgy.language || 'en')))),
    map(languages => languages.map(language => ({
      value: language,
      label: this.translate.instant(`language.${language}`) as string || language
    })))
  );
  this.versionOptions$ = of(this.config.versionOptions);

  // load kalendar options
  this.kalendarOptions = this.calendarService.findKalendars();
  this.sanctoralOptions = this.calendarService.findSanctorals();

  // DB queries that depend on date change
  // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
  this.week = this.calendarService.buildWeek(this.date, this.kalendar, this.vigil);

  // main liturgical day observable
  this.liturgicalDay = this.calendarService.buildDay(this.date, this.kalendar, this.liturgy, this.week, this.vigil)
    .pipe(tap(day => console.log('day = ', day)));

  // Check readings
  this.availableReadings$ = combineLatest(this.liturgicalDay, this.clientPreferences).pipe(
    switchMap(([day, prefs]) => this.lectionary.getReadings(
      day,
      prefs['lectionary'],
      undefined
    )),
    map(entries => entries.map(entry => entry.type))
  )

  // Pray button data
  this.prayData = combineLatest([
    this.auth.user,
    this.liturgy,
    this.date,
    this.properLiturgy,
    this.liturgicalDay,
    this.clientPreferences,
    this.availableReadings$
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

// ionViewWillEnter -- each time we return to this page, check last time we prayed and reset menu if necessary
ionViewWillEnter() {
  if(!this.lastPrayed || (Math.abs(new Date().getTime() - this.lastPrayed.getTime())) > this.REMEMBER_TIME) {
    this.startingDate$.next(new Date());
  }
  this.hasStartedNavigating = false;
}

pray({user, liturgy, date, properLiturgy, liturgicalDay, clientPreferences, availableReadings} : PrayData) {
  // update preferences
  this.savePreferences(user ? user.uid : undefined, clientPreferences, liturgy);

  // check to see if all selected readings are available; if not, notify the user
  const allReadingsAvailable = this.areReadingsAvailable(new Liturgy(liturgy), clientPreferences, availableReadings);
  if(!allReadingsAvailable) {
    this.readingsNotAvailableAlert(new Liturgy(liturgy), liturgicalDay, clientPreferences, availableReadings);
  } else {
    // navigate to the Pray page
    this.navigate('/pray', new Liturgy(liturgy), date, liturgicalDay, clientPreferences);
  }
}

areReadingsAvailable(liturgy : Liturgy, prefs : ClientPreferences, availableReadings : string[]) : boolean {
  const readingPrefKeys = Object.keys(liturgy?.metadata?.preferences || {}).filter(p => ['readingA', 'readingB', 'readingC'].includes(p));
  let allReadingsAvailable : boolean = true;
  if(readingPrefKeys && readingPrefKeys.length > 0) {
    allReadingsAvailable = readingPrefKeys
     .filter(key => prefs[key].toLowerCase() !== 'none')
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

async readingsNotAvailableAlert(liturgy : Liturgy, day : LiturgicalDay, prefs : ClientPreferences, availableReadings : string[]) {
  const holy_day_readings = availableReadings.filter(reading => reading.match(/holy_day/)),
    date = dateFromYMDString(day?.date);

  if(holy_day_readings?.length > 0) {
    const evening : boolean = liturgy.metadata?.evening,
          readingA : string = evening ? 'holy_day_evening_1' : 'holy_day_morning_1',
          readingB : string = evening ? 'holy_day_evening_2' : 'holy_day_morning_2';

    const modifiedPrefs = {
      ... prefs,
      'readingA': readingA,
      'readingB': readingB,
      'readingC': 'none'
    };

    const alert = await this.alert.create({
      header: this.translate.instant('home.holy_day_alert.title'),
      message: this.translate.instant('home.holy_day_alert.message'),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Continue',
          handler: () => this.navigate('/pray', liturgy, date, day, modifiedPrefs)
        }
      ]
    });

    await alert.present();
  } else {
    const a : string[] = availableReadings.filter(r => r && r !== ''),
          availableList : string = `${a.slice(0, -1).join(',')} or ${a.slice(-1)}`;

    const alert = await this.alert.create({
      header: this.translate.instant('home.missing_reading_alert.title'),
      message: this.translate.instant('home.missing_reading_alert.message', { availableList }),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Continue',
          handler: () => this.navigate('/pray', liturgy, date, day, prefs)
        }
      ]
    });

    await alert.present();
  }
}

savePreferences(uid : string, prefs : ClientPreferences, liturgy : LiturgicalDocument) {
  Object.entries(prefs)
    // take only those properties that are listed in the liturgy's `preferences` metadata field
    // e.g., Evening Prayer will list `bibleVersion` but not `footwashing`—so don't save `footwashing`
    .filter(([key, value]) => liturgy?.metadata?.preferences?.hasOwnProperty(key))
    // store each key individually in the database
    .forEach(([key, value]) => this.preferencesService.set(key, value, uid, liturgy));
}

navigate(root : string, liturgy : Liturgy, date : Date, day : LiturgicalDay, prefs : ClientPreferences) {
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
  this.router.navigate(commands, { state: { liturgy, day, prefs } });
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
