import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap, mergeMap, tap, scan } from 'rxjs/operators';

import { HolyDay, Kalendar, Liturgy, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex, liturgicalWeek, liturgicalDay } from '@venite/ldf';

import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'venite-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // The `LiturgicalDay` that has currently been selected, without any holy day information
  baseDay : Observable<LiturgicalDay>;
  liturgicalDay : Observable<LiturgicalDay>;
  liturgicalDay2 : Observable<LiturgicalDay>;

  // Arguments into the liturgicalDay call, which we need to combine
  date : Subject<Date> = new Subject();
  week : Observable<LiturgicalWeek[]>;
  holydays : Subject<HolyDay[]> = new Subject();
  liturgy : Subject<Liturgy> = new Subject();
  kalendar : BehaviorSubject<string> = new BehaviorSubject('bcp1979');   // Backbone of Kalendar: Seasons, Major Feasts
  sanctoral : BehaviorSubject<string> = new BehaviorSubject('bcp1979');  // Holy Days ('79, LFF, HWHM, GCOW, etc.)
  vigil : Subject<boolean> = new BehaviorSubject(false);


  // UI options
  kalendarOptions : Observable<Kalendar[]>;
  sanctoralOptions : Observable<Kalendar[]>;

  constructor(
    public calendarService : CalendarService
  ) {}

  ngOnInit() {
    // load kalendar options
    this.kalendarOptions = this.calendarService.findKalendars();
    this.sanctoralOptions = this.calendarService.findSanctorals();

    // DB queries that depend on date change
    // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
    this.week = combineLatest(this.date, this.kalendar)
      .pipe(
        switchMap(([date, kalendar]) => this.calendarService.findWeek(kalendar, liturgicalWeek(date)))
      )

    // main liturgical day observable
    this.liturgicalDay = combineLatest(this.date, this.kalendar, this.liturgy, this.vigil, this.week)
      .pipe(
        // build the liturgical day from the data given
        map(([date, kalendar, liturgy, vigil, week]) =>
          liturgicalDay(date, kalendar, liturgy?.metadata?.evening, vigil, week[0])
        ),
        // add holy days to that liturgical day
        switchMap(day => this.calendarService.addHolyDays(day)),
      );
  }
}
