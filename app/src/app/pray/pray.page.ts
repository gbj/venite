import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, merge } from 'rxjs';
import { mapTo, switchMap, map, tap, filter, startWith } from 'rxjs/operators';
import { Liturgy, ClientPreferences, dateFromYMD, LiturgicalDay, LiturgicalDocument, LiturgicalWeek, Preference, Sharing, dateFromYMDString } from '@venite/ldf';
import { ModalController } from '@ionic/angular';
import { DOCUMENT_SERVICE, DocumentServiceInterface, CALENDAR_SERVICE, CalendarServiceInterface, PREFERENCES_SERVICE, PreferencesServiceInterface, AUTH_SERVICE } from '@venite/ng-service-api';
import { DisplaySettings, PrayService, DisplaySettingsComponent } from '@venite/ng-pray';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';
import { DocumentService } from '../services/document.service';
import { UserProfile } from '../auth/user/user-profile';

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
  color$ : Observable<string | null>;
  userProfile$ : Observable<UserProfile | null>;

  // Liturgy data to be loaded from the database if we come straight to this page
  state$ : Observable<PrayState>;

  // Display settings
  settings$ : Observable<DisplaySettings>;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    @Inject(DOCUMENT_SERVICE) private documents : DocumentService,
    @Inject(CALENDAR_SERVICE) private calendarService : CalendarServiceInterface,
    public prayService : PrayService,
    private modal : ModalController,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesServiceInterface,
    @Inject(AUTH_SERVICE) public auth : AuthService
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
      tap(({ orgId, slug, language, version, liturgy }) => console.log('params = ', orgId, slug, language, version, liturgy)),
      switchMap(({ orgId, slug, language, version, liturgy }) =>
        orgId && slug
        ? this.documents.findOrganizationLiturgy(orgId, slug)
        : this.documents.findDocumentsBySlug(liturgy, language, new Array(version))
      )
    );
  
    // `LiturgicalDay` (via week) that matches the date/kalendar passed in the URL,
    // given the `LiturgicalDocument` found above (for `evening`)
    const week$ : Observable<LiturgicalWeek[]> = combineLatest([this.route.params, liturgy$]).pipe(
      switchMap(([{ y, m, d, kalendar, vigil }, liturgies]) => 
        liturgies[0] && liturgies[0].day
        ? of(new Array(liturgies[0].day.week))
        : this.calendarService.buildWeek(of(dateFromYMD(y, m, d)), of(kalendar), of(vigil))
      )
    );
    const day$ = combineLatest(liturgy$, week$, this.route.params).pipe(
      switchMap(([liturgy, week, params]) =>
        liturgy[0] && liturgy[0].day
        ? of(liturgy[0].day)
        : this.calendarService.buildDay(
          of(dateFromYMD(params.y, params.m, params.d)),
          of(params.kalendar),
          of(liturgy).pipe(map(x => x[0])),
          of(week),
          of(params.vigil),
        )
      )
    )

    // `prefs` are passed as a JSON-encoded string in the param
    const prefs$ : Observable<ClientPreferences> = combineLatest(liturgy$, this.route.params).pipe(
      map(([liturgy, { prefs }]) => ({liturgy, prefs: JSON.parse(prefs || '{}')})),
      map(({liturgy, prefs}) => liturgy[0] && liturgy[0].type == 'liturgy'
        ? Object.assign(
          (
            // convert `Liturgy` preference tree into a key-default value object
            Object.values((liturgy[0] as Liturgy).metadata?.preferences || {})
              .reduce((acc, curr) => {
                acc[curr.key] = new Preference(curr).getDefaultPref();
                return acc;
              }, {})
          )
          , prefs)
        : prefs
      )
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
      filter(state => state.hasOwnProperty('liturgy') && state.hasOwnProperty('day') && state.hasOwnProperty('prefs')),
      switchMap(state => this.prayService.compile(state.liturgy, state.day, state.prefs, state.liturgy?.metadata?.liturgyversions || [state.liturgy?.version], state.liturgy?.metadata?.preferences)),
    );

    this.color$ = combineLatest([
      of(true),
      merge(windowHistoryState$, routerParamState$)]
    ).pipe(
      map(([useBackgroundColor, state]) => useBackgroundColor && state?.day?.color ? state.day.color : null),
      switchMap(color => this.documents.getColor(color).pipe(startWith(null))),
      startWith('var(--ldf-background-color)')
    )

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

    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => user ? this.auth.getUserProfile(user.uid) : null)
    );
  }

  /* Display Settings */
  async openSettings(settings : DisplaySettings) {
    const modal = await this.modal.create({
      component: DisplaySettingsComponent,
    });

    modal.componentProps = {
      settings,
      modal
    };

    await modal.present();
  }

  grabPreference(key : string) : Observable<any> {
    return this.preferencesService.get(key).pipe(startWith(undefined)).pipe(
      map(keyvalue => keyvalue?.value)
    );
  }

  processSettings(settings : DisplaySettings) : string[] {
    return [
      `ldf-wrapper`,
      `dropcaps-${settings.dropcaps}`,
      `response-${settings.response}`,
      `repeat-antiphon-${settings.repeatAntiphon}`,
      `fontscale-${settings.fontscale.toString()}`,
      `font-${settings.font}`,
      `psalmverses-${settings.psalmVerses}`,
      `bibleverses-${settings.bibleVerses}`
    ];
  }

  async editBulletin(userProfile : UserProfile, doc : LiturgicalDocument) {
    const docDate = doc.day?.date ? dateFromYMDString(doc.day.date) : null,
      formattedDocDate = docDate ? `${docDate.getFullYear()}-${docDate.getMonth()+1}-${docDate.getDate()}` : null;
    console.log('editBulletin -- date is', docDate, formattedDocDate);
    const id = await this.documents.newDocument(new LiturgicalDocument({
      ... doc,
      slug : formattedDocDate ? `${doc.slug}-${formattedDocDate}` : doc.slug,
      sharing: new Sharing({
        owner: userProfile.uid,
        organization: (userProfile.orgs || [''])[0],
        collaborators: [],
        status: 'draft',
        privacy: 'organization'
      })
    }));
    this.router.navigate(['editor', id]);
  }
}
