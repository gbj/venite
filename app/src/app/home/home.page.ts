import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { HolyDay, Kalendar, Liturgy, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex, liturgicalWeek, liturgicalDay } from '@venite/ldf';

import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'venite-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  // Exists to stash Subscriptions and is unsubscribed from OnDestroy
  subscription : Subscription = new Subscription();


  liturgicalDay : LiturgicalDay;
  liturgicalDay$ : Subscription;

  // Arguments into the liturgicalDay call, which we need to combine
  date : Subject<Date> = new Subject();
  week : Subject<LiturgicalWeek[]> = new Subject();
  holydays : Subject<HolyDay[]> = new Subject();
  liturgy : Subject<Liturgy> = new Subject();
  kalendar : BehaviorSubject<string> = new BehaviorSubject('bcp1979');   // Backbone of Kalendar: Seasons, Major Feasts
  sanctoral : BehaviorSubject<string> = new BehaviorSubject('bcp1979');  // Holy Days ('79, LFF, HWHM, GCOW, etc.)
  vigil : Subject<boolean> = new BehaviorSubject(false);

  // Database queries
  weekQuery$ : Subscription;
  holydayQuery$ : Subscription;

  // UI options
  kalendarOptions : Observable<Kalendar[]>;
  sanctoralOptions : Observable<Kalendar[]>;

  constructor(
    public calendarService : CalendarService
  ) {}

  ngOnInit() {
    this.updateWeek(new Date(), this.kalendar.getValue());
    this.updateHolyDays(new Date(), this.kalendar.getValue());

    this.loadLiturgicalDay();

    // load kalendar options
    this.kalendarOptions = this.calendarService.findKalendars();
    this.sanctoralOptions = this.calendarService.findSanctorals();

    // every time `date` or `kalendar` changes, need to recalculate `week`
    this.subscription.add(
      combineLatest(this.date, this.kalendar)
        .subscribe(([date, kalendar]) => {
          this.updateWeek(date, kalendar);
          this.updateHolyDays(date, kalendar);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.liturgicalDay$.unsubscribe();
    this.weekQuery$.unsubscribe();
    this.holydayQuery$.unsubscribe();
  }

  // Methods
  updateWeek(date : Date, kalendar : string) {
    if(this.weekQuery$) { this.weekQuery$.unsubscribe(); }

    const query : LiturgicalWeekIndex = liturgicalWeek(date);
    this.weekQuery$ = this.calendarService.findWeek(kalendar, query)
      .subscribe(data => this.week.next(data));
  }

  updateHolyDays(date : Date, kalendar : string) {
    if(this.holydayQuery$) { this.holydayQuery$.unsubscribe(); }

    this.holydayQuery$ = this.calendarService.findFeastDays(kalendar, date)
      .subscribe(data => this.holydays.next(data));
  }

  loadLiturgicalDay() {
    // every time `date`, `liturgy`, or `kalendar` changes,
    // we will need to refresh the calculated `LiturgicalDay`
    if(this.liturgicalDay$) { this.liturgicalDay$.unsubscribe(); }
    this.liturgicalDay$ = combineLatest(this.date, this.kalendar, this.liturgy, this.vigil, this.week, this.holydays)
      .subscribe(([date, kalendar, liturgy, vigil, week, holydays]) => {
        this.liturgicalDay = liturgicalDay(date, kalendar, liturgy?.metadata?.evening, vigil, week[0], holydays)
      }
    );
  }
}
