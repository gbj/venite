import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/app';

import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap, tap, scan, shareReplay } from 'rxjs/operators';

import { HolyDay, Kalendar, Liturgy, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex, ClientPreferences, liturgicalWeek, liturgicalDay, addOneDay, dateToYMD } from '@venite/ldf';

import { AuthService } from '../auth/auth.service';
import { CalendarService } from '../services/calendar.service';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'venite-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // The data the Pray button needs
  prayData : Observable<[User, Liturgy, LiturgicalDay, ClientPreferences]>;

  // The `LiturgicalDay` that has currently been selected, without any holy day information
  liturgicalDay : Observable<LiturgicalDay>;

  // Arguments into the liturgicalDay call, which we need to combine
  date : BehaviorSubject<Date> = new BehaviorSubject(new Date());
  week : Observable<LiturgicalWeek[]>;
  holydays : BehaviorSubject<HolyDay[]> = new BehaviorSubject([]);
  liturgy : Subject<Liturgy> = new Subject();
  kalendar : BehaviorSubject<string> = new BehaviorSubject('bcp1979');   // Backbone of Kalendar: Seasons, Major Feasts
  sanctoral : BehaviorSubject<string> = new BehaviorSubject('bcp1979');  // Holy Days ('79, LFF, HWHM, GCOW, etc.)
  vigil : BehaviorSubject<boolean> = new BehaviorSubject(false);

  // UI options
  kalendarOptions : Observable<Kalendar[]>;
  sanctoralOptions : Observable<Kalendar[]>;

  // Preferences
  clientPreferences : Subject<ClientPreferences> = new Subject();

  constructor(
    public calendarService : CalendarService,
    private preferencesService : PreferencesService,
    private auth : AuthService
  ) {}

  ngOnInit() {
    // load kalendar options
    this.kalendarOptions = this.calendarService.findKalendars();
    this.sanctoralOptions = this.calendarService.findSanctorals();

    // DB queries that depend on date change
    // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
    this.week = combineLatest(this.date, this.kalendar, this.vigil)
      .pipe(
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
        tap(({ day, vigil }) => console.log('vigil = ', vigil)),
        mergeMap(({day, vigil}) => this.calendarService.addHolyDays(day, vigil)),
      );

    // Pray button data
    this.prayData = combineLatest(this.auth.user, this.liturgy, this.liturgicalDay, this.clientPreferences);
  }

  pray(args : [User, Liturgy, LiturgicalDay, ClientPreferences]) {
    const [ user, liturgy, day, prefs ] = args;
    // update preferences
    this.savePreferences(user?.uid, prefs, liturgy);
  }

  savePreferences(uid : string, prefs : ClientPreferences, liturgy : Liturgy) {
    console.log(prefs)
    Object.entries(prefs)
      .forEach(([key, value]) => this.preferencesService.set(key, value, uid, liturgy));
  }
}
