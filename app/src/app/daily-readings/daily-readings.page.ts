import { Component, Inject, OnInit } from '@angular/core';
import { BibleReading, Condition, LectionaryEntry, LiturgicalDay, LiturgicalDocument, Liturgy, Psalm, Option } from '@venite/ldf';
import { PrayService } from '@venite/ng-pray';
import { CALENDAR_SERVICE, DOCUMENT_SERVICE, LECTIONARY_SERVICE, PreferencesServiceInterface, PREFERENCES_SERVICE } from '@venite/ng-service-api';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { CalendarService } from '../services/calendar.service';
import { DocumentService } from '../services/document.service';
import { LectionaryService } from '../services/lectionary.service';
import { DisplaySettings } from '@venite/ldf';
import { FormControl } from '@angular/forms';

type Lectionaries = 'bcp1979_daily_office' | 'bcp1979_30day_psalter';

@Component({
  selector: 'venite-daily-readings',
  templateUrl: './daily-readings.page.html',
  styleUrls: ['./daily-readings.page.scss'],
})
export class DailyReadingsPage implements OnInit {
  today : Date;
  currentLiturgy$ : BehaviorSubject<string | undefined> = new BehaviorSubject(undefined);
  liturgy$ : Observable<LiturgicalDocument>;
  day$ : Observable<LiturgicalDay>;
  readings$ : Observable<LiturgicalDocument[]>;
  psalms$ : Observable<LiturgicalDocument[]>;
  collects$ : Observable<LiturgicalDocument[]>;

  settings$ : Observable<DisplaySettings>;

  kalendar : FormControl = new FormControl('bcp1979');
  psalmCycle : FormControl = new FormControl('bcp1979_daily_psalms');
  timeOfDay : FormControl = new FormControl(new Date().getHours() <= 14 ? 'morning' : 'evening');
  bibleVersion : FormControl = new FormControl('NRSV');

  constructor(
    @Inject(CALENDAR_SERVICE) private calendarService : CalendarService,
    @Inject(DOCUMENT_SERVICE) private documentService : DocumentService,
    @Inject(LECTIONARY_SERVICE) private lectionaryService : LectionaryService,
    private prayService : PrayService,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesServiceInterface,
  ) { }

  ngOnInit() {
    this.today = new Date();

    this.currentLiturgy$.next(this.today.getHours() <= 14 ? 'morning-prayer' : 'evening-prayer')

    this.liturgy$ = this.currentLiturgy$.pipe(
      switchMap(slug => this.documentService.findDocumentsBySlug(slug).pipe(map(docs => docs[0])))
    )

    const week$ = this.calendarService.buildWeek(of(this.today), of('bcp1979'), of(false));
    this.day$ = this.liturgy$.pipe(
      switchMap(liturgy => this.calendarService.buildDay(
        of(this.today),
        of('bcp1979'),
        of(liturgy),
        week$,
        of(false)
      ))
    );

    this.readings$ = this.day$.pipe(
      switchMap(day => this.lectionaryService.getReadings(
        day,
        'bcp1979_daily_office',
        undefined,
        false
      )),
      map(entries => entries.sort((a, b) => readingOrder(a) <= readingOrder(b) ? -1 : 1)),
      map(entries => entries.map(entry => this.prayService.lookupBibleReading(new BibleReading({
        type: "bible-reading",
        style: "long",
        citation: entry.citation
      }), this.bibleVersion.value))),
      switchMap(readings => combineLatest(readings)),
    );

    this.psalms$ = combineLatest([
      this.psalmCycle.valueChanges.pipe(startWith(undefined)),
      this.timeOfDay.valueChanges.pipe(startWith(undefined)),
      this.day$
    ]).pipe(
      switchMap(([table, timeOfDay, day]) => this.prayService.lookupPsalter(
        new Psalm({
          type: "psalm",
          style: "psalm",
          lookup: {
            table: table || this.psalmCycle.value,
            item: `${timeOfDay || this.timeOfDay.value}_psalms`,
            type: "lectionary"
          }
        }),
        day,
        {},
        {}
      ).pipe(
        map(doc => doc.type === 'liturgy' ? (doc as Liturgy).value : [doc])
      ))
    );

    this.collects$ = this.day$.pipe(
      switchMap(day => this.prayService.compile(
        COLLECT_RECIPE,
        day,
        {},
        [],
        {}
      )),
      map(doc => doc.type === 'liturgy' || doc.type === 'option' ? (doc as Liturgy).value.filter(d => Boolean(d)) : [doc]),
      map(docs => docs.map(doc => doc.type === 'liturgy' || doc.type === 'option' ? (doc as Liturgy).value.filter(d => Boolean(d)) : [doc]).flat()),
      // set collect version labels
      map(docs => docs.map(doc => doc.type === 'option'
        ? new LiturgicalDocument({
          ...doc,
          value: (doc as Option).value.map(opt => new LiturgicalDocument({
            ...opt,
            version_label: opt.version === 'rite_i' ? 'Traditional' : 'Contemporary',
            version: undefined
          }))
        })
        : doc)),
      tap(docs => console.log('collects = ', docs))
    );

    // Grab display settings from preferences
    this.settings$ = combineLatest([
      this.grabPreference('dropcaps'),
      this.grabPreference('response'),
      this.grabPreference('repeatAntiphon'),
      this.grabPreference('fontscale'),
      this.grabPreference('font'),
      this.grabPreference('voiceChoice'),
      this.grabPreference('voiceRate'),
      this.grabPreference('voiceBackground'),
      this.grabPreference('voiceBackgroundVolume'),
      this.grabPreference('psalmVerses'),
      this.grabPreference('bibleVerses'),
      this.grabPreference('meditationBell'),
      this.grabPreference('darkmode')
    ]).pipe(
      map(settings => new DisplaySettings( ... settings))
    );

    this.initFormFromPref();
  }

  async initFormFromPref() {
    const preferredLanguage = this.preferencesService.get('language'),
      preferredVersion = this.preferencesService.get('version'),
      timeOfDay = this.timeOfDay.value;
    // psalmCycle pref
    combineLatest([preferredLanguage, preferredVersion]).pipe(
      switchMap(([language, version]) => {
        const key = `${timeOfDay}-prayer-${language.value}-${version.value}-psalmCycle`;
        return this.preferencesService.get(key);
      }),
      take(1)
    ).subscribe(data => {
      console.log('psalmCycle pref is', data.value);
      if(data?.value) {
        this.psalmCycle.setValue(data.value);
      }
    });
    // kalendar pref
    this.preferencesService.get('kalendar').pipe(take(1)).subscribe(data => {
      console.log('kalendar pref =', data);
      if(data?.value) {
        this.kalendar.setValue(data.value);
      }
    });
  }

  grabPreference(key : string) : Observable<any> {
    return this.preferencesService.get(key).pipe(startWith(undefined)).pipe(
      map(keyvalue => keyvalue?.value)
    );
  }
  
  processSettings(settings : DisplaySettings) : string[] {
    return [
      'pray-container',
      `dropcaps-${settings.dropcaps}`,
      `response-${settings.response}`,
      `repeat-antiphon-${settings.repeatAntiphon}`,
      `fontscale-${settings.fontscale.toString()}`,
      `font-${settings.font}`,
      `psalmverses-${settings.psalmVerses}`,
      `bibleverses-${settings.bibleVerses}`
    ];
  }

  generateReading(citation : string) : Observable<LiturgicalDocument> {
      return this.day$.pipe(
        switchMap(
          day => this.prayService.lookupBibleReading(
            new BibleReading({
              type: "bible-reading",
              style: "long",
              citation
            }),
            'KJV'
          )
        )
      );
  }
}

function readingOrder(entry : LectionaryEntry) : number {
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

const COLLECT_RECIPE : Liturgy = new Liturgy({
  "type": "liturgy",
  "value": [
    new LiturgicalDocument({
      "hidden": false,
      "type": "text",
      "style": "prayer",
      "lookup": {
        "type": "collect"
      }
    }),
    new LiturgicalDocument({
      "type": "text",
      "style": "prayer",
      "label": "Seasonal Collect",
      "condition": {
        "mode": "and",
        "conditions": [
          new Condition({
            "season": {
              "only": ["Advent-Ember"]
            }
          })
        ]
      },
      "category": [
        "Collect",
        "Collect of the Day"
      ],
      "slug": "advent",
      "value": [
        "Almighty God, give us grace that we may cast away the works of darkness, and put upon us the armour of light, now in the time of this mortal life, in which thy Son Jesus Christ came to visit us in great humility; that in the last day, when he shall come again in his glorious Majesty, to judge both the quick and the dead, we may rise to the life immortal; through him who liveth and reigneth with thee and the Holy Spirit, now and ever."          ]
    }),
    new LiturgicalDocument({
      "type": "text",
      "style": "prayer",
      "label": "Seasonal Collect",
      "condition": {
        "mode": "and",
        "conditions": [
          new Condition({
            "season": {
              "only": ["Lent-Ember"]
            }
          })
        ]
      },
      "category": [
        "Collect",
        "Collect of the Day"
      ],
      "slug": "lent",
      "value": [
        "ALMIGHTY and everlasting God, who hatest nothing that thou hast made, and dost forgive the sins of all them that are penitent: Create and make in us new and contrite hearts, that we worthily lamenting our sins, and acknowledging our wretchedness, may obtain of thee, the God of all mercy, perfect remission and forgiveness; through Jesus Christ our Lord."
      ]
    })
  ]
});