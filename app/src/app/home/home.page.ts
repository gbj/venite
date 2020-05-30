import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/app';

import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, mergeMap, tap, scan, shareReplay } from 'rxjs/operators';

import { HolyDay, Kalendar, LiturgicalDocument, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex, ProperLiturgy, ClientPreferences, liturgicalWeek, liturgicalDay, addOneDay, dateToYMD } from '@venite/ldf';

import { AuthService } from '../auth/auth.service';
import { CalendarService } from '../services/calendar.service';
import { DocumentService } from '../services/document.service';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'venite-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // The data the Pray button needs
  prayData : Observable<[User, LiturgicalDocument, ProperLiturgy, LiturgicalDay, ClientPreferences]>;

  // The `LiturgicalDay` that has currently been selected, without any holy day information
  liturgicalDay : Observable<LiturgicalDay>;

  // Arguments into the liturgicalDay call, which we need to combine
  date : BehaviorSubject<Date> = new BehaviorSubject(new Date());
  holydays : BehaviorSubject<HolyDay[]> = new BehaviorSubject([]);
  kalendar : BehaviorSubject<string> = new BehaviorSubject('bcp1979');   // Backbone of Kalendar: Seasons, Major Feasts
  liturgy : Subject<LiturgicalDocument> = new Subject();
  properLiturgy : BehaviorSubject<ProperLiturgy> = new BehaviorSubject(undefined);
  sanctoral : BehaviorSubject<string> = new BehaviorSubject('bcp1979');  // Holy Days ('79, LFF, HWHM, GCOW, etc.)
  vigil : BehaviorSubject<boolean> = new BehaviorSubject(false);
  week : Observable<LiturgicalWeek[]>;

  // UI options
  kalendarOptions : Observable<Kalendar[]>;
  sanctoralOptions : Observable<Kalendar[]>;

  // Preferences
  clientPreferences : Subject<ClientPreferences> = new Subject();

  constructor(
    private auth : AuthService,
    public calendarService : CalendarService,
    public documentService : DocumentService,
    private preferencesService : PreferencesService
  ) {}

  ngOnInit() {
    // load kalendar options
    this.kalendarOptions = this.calendarService.findKalendars();
    this.sanctoralOptions = this.calendarService.findSanctorals();

    // DB queries that depend on date change
    // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
    this.week = combineLatest(this.date, this.kalendar, this.vigil)
      .pipe(
        tap(val => console.log('looking for week', val)),
        mergeMap(([date, kalendar, vigil]) => this.calendarService.findWeek(kalendar, liturgicalWeek(vigil ? addOneDay(date) : date)))
      )

    // main liturgical day observable
    this.liturgicalDay = combineLatest(this.date, this.kalendar, this.liturgy, this.week, this.vigil)
      .pipe(
        // build the liturgical day from the data given
        map(([date, kalendar, liturgy, week, vigil]) => ({
          day: liturgicalDay(vigil ? addOneDay(date) : date, kalendar, liturgy?.metadata?.evening, week[0]),
          date,
          vigil
        })),
        // if vigil, add the unmodified date back in
        map(({day, date, vigil}) => ({
          day: vigil ? new LiturgicalDay({ ... day, date: dateToYMD(date) }) : day,
          vigil
        })),
        // add holy days to that liturgical day
        mergeMap(({day, vigil}) => this.calendarService.addHolyDays(day, vigil)),
      );

    // Pray button data
    this.prayData = combineLatest(this.auth.user, this.liturgy, this.properLiturgy, this.liturgicalDay, this.clientPreferences)
  }

  pray(args : { user: User; liturgy: LiturgicalDocument; day: LiturgicalDay; prefs: ClientPreferences; }) {
    const { user, liturgy, day, prefs } = args;
    // update preferences
    this.savePreferences(user?.uid, prefs, liturgy);
  }

  savePreferences(uid : string, prefs : ClientPreferences, liturgy : LiturgicalDocument) {
    Object.entries(prefs)
      // take only those properties that are listed in the liturgy's `preferences` metadata field
      // e.g., Evening Prayer will list `bibleVersion` but not `footwashing`—so don't save `footwashing`
      .filter(([key, value]) => liturgy.metadata?.preferences.hasOwnProperty(key))
      // store each key individually in the database
      .forEach(([key, value]) => this.preferencesService.set(key, value, uid, liturgy));
  }
}
