import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/app';

import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { HolyDay, Kalendar, LiturgicalDocument, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex, ProperLiturgy, ClientPreferences, liturgicalWeek, liturgicalDay, addOneDay, dateToYMD, Liturgy } from '@venite/ldf';

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
  startingDate$ : Subject<Date> = new Subject();
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
  clientPreferences : BehaviorSubject<ClientPreferences> = new BehaviorSubject({});

  /* Records the last time we entered the page; will only reset the menu if 
   * it's been longer than REMEMBER_TIME */
  lastPrayed : Date = new Date();
  readonly REMEMBER_TIME = 30*60*1000; // default to 30 minutes

  hasStartedNavigating : boolean = false;

  constructor(
    private auth : AuthService,
    public calendarService : CalendarService,
    public documentService : DocumentService,
    private preferencesService : PreferencesService,
    private router : Router
  ) {}

  // Lifecycle events

  // ngOnInit() -- set up initial menu state
  ngOnInit() {
    // load kalendar options
    this.kalendarOptions = this.calendarService.findKalendars();
    this.sanctoralOptions = this.calendarService.findSanctorals();

    // DB queries that depend on date change
    // every time `date` or `kalendar` changes, need to send new querys to database for `week` and `holydays`
    this.week = this.calendarService.buildWeek(this.date, this.kalendar, this.vigil);

    // main liturgical day observable
    this.liturgicalDay = this.calendarService.buildDay(this.date, this.kalendar, this.liturgy as Observable<Liturgy>, this.week, this.vigil);

    // Pray button data
    this.prayData = combineLatest(this.auth.user, this.liturgy, this.properLiturgy, this.liturgicalDay, this.clientPreferences);
  }

  // ionViewWillEnter -- each time we return to this page, check last time we prayed and reset menu if necessary
  ionViewWillEnter() {
    if(!this.lastPrayed || (Math.abs(new Date().getTime() - this.lastPrayed.getTime())) > this.REMEMBER_TIME) {
      this.startingDate$.next(new Date());
    }
    this.hasStartedNavigating = false;
  }

  pray([user, liturgy, properLiturgy, day, prefs]) {
    // update preferences
    this.savePreferences(user ? user.uid : undefined, prefs, liturgy);
    this.navigate('/pray', liturgy, day, prefs)
  }

  savePreferences(uid : string, prefs : ClientPreferences, liturgy : LiturgicalDocument) {
    Object.entries(prefs)
      // take only those properties that are listed in the liturgy's `preferences` metadata field
      // e.g., Evening Prayer will list `bibleVersion` but not `footwashing`—so don't save `footwashing`
      .filter(([key, value]) => liturgy.metadata?.preferences.hasOwnProperty(key))
      // store each key individually in the database
      .forEach(([key, value]) => this.preferencesService.set(key, value, uid, liturgy));
  }

  navigate(root : string, liturgy : Liturgy, day : LiturgicalDay, prefs : ClientPreferences) {
    console.log('navigating', root, liturgy, day, prefs);
    const [y, m, d] = day?.date?.split('-'),
          commands : string[] = [
            root,
            liturgy?.language,
            liturgy?.version,
            day?.kalendar,
            y, m, d,
            liturgy?.slug
          ];
    console.log('commands = ', commands);
    this.router.navigate(commands, { state: { liturgy, day, prefs } });
  }
}
