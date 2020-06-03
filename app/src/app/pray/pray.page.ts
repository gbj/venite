import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, merge } from 'rxjs';
import { mapTo, switchMap, map, tap, filter, take } from 'rxjs/operators';
import { Liturgy, ClientPreferences, dateFromYMD, liturgicalDay, liturgicalWeek, addOneDay, LiturgicalDay, LiturgicalDocument, LiturgicalWeek } from '@venite/ldf';
import { DocumentService } from '../services/document.service';
import { CalendarService } from '../services/calendar.service';
import { PrayService } from './pray.service';

interface PrayState {
  liturgy: LiturgicalDocument;
  day: LiturgicalDay;
  prefs: ClientPreferences;
}

@Component({
  selector: 'venite-pray',
  templateUrl: './pray.page.html',
  styleUrls: ['./pray.page.scss'],
})
export class PrayPage implements OnInit {
  doc$ : Observable<LiturgicalDocument>;

  // Liturgy data to be loaded from the database if we come straight to this page
  state$ : Observable<PrayState>;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private documents : DocumentService,
    private calendarService : CalendarService,
    private prayService : PrayService
  ) { }

  ngOnInit() {
    // If passed through router state, it's simply a synchronous `PrayState` object
    // This probably means we came from the home page and clicked Pray, so the liturgy
    // and liturgical day had been preloaded
    const windowHistoryState$ : Observable<PrayState> = this.router.events.pipe(
      mapTo(window && window.history.state)
    );

    // If passed as router params (e.g., arrived at page from a link or refresh),
    // we have to do the work to wire these params together
  
    // `LiturgicalDocument`s that match the language/version/slug passed in the URL
    const liturgy$ : Observable<LiturgicalDocument[]> = this.route.params.pipe(
      switchMap(({ language, version, liturgy }) =>
        this.documents.findDocumentsBySlug(liturgy, language, version)
      )
    );
  
    // `LiturgicalDay` (via week) that matches the date/kalendar passed in the URL,
    // given the `LiturgicalDocument` found above (for `evening`)
    const week$ : Observable<LiturgicalWeek[]> = this.route.params.pipe(
      switchMap(({ language, version, y, m, d, liturgy, kalendar, vigil }) => 
        this.calendarService.buildWeek(of(dateFromYMD(y, m, d)), of(kalendar), of(vigil))
      )
    );
    const day$ = combineLatest(liturgy$, week$, this.route.params).pipe(
      switchMap(([liturgy, week, params]) => 
        this.calendarService.buildDay(
          of(dateFromYMD(params.y, params.m, params.d)),
          of(params.kalendar),
          of(liturgy).pipe(map(x => x[0])),
          of(week),
          of(params.vigil),
        )
      )
    )

    // `prefs` are passed as a JSON-encoded string in the param
    const prefs$ : Observable<ClientPreferences> = this.route.params.pipe(
      map(({ prefs }) => JSON.parse(prefs || '{}'))
    );

    // Unifies everything from the router params
    const routerParamState$ : Observable<PrayState> = combineLatest(liturgy$, day$, prefs$).pipe(
      map(([liturgy, day, prefs]) => ({ liturgy: liturgy[0], day, prefs }))
    );

    // Unite the data passed from the state and the data derived from the route
    // Note that this should never call the observables from the route params
    // if the state is already present, due to the take(1)
    this.state$ = merge(windowHistoryState$, routerParamState$).pipe(
      filter(state => state && state.hasOwnProperty('day') && state.hasOwnProperty('liturgy')),
 //     take(1)
    )

    this.doc$ = this.state$.pipe(
      switchMap(state => this.prayService.compile(state.liturgy, state.day, state.prefs))
    );
  }

}
