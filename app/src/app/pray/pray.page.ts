import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, merge, BehaviorSubject, interval } from 'rxjs';
import { mapTo, switchMap, map, tap, filter, startWith, withLatestFrom, take, shareReplay } from 'rxjs/operators';
import { unwrapOptions, Liturgy, ClientPreferences, dateFromYMD, LiturgicalDay, LiturgicalDocument, LiturgicalWeek, Preference, Sharing, dateFromYMDString } from '@venite/ldf';
import { ModalController } from '@ionic/angular';
import { DOCUMENT_SERVICE, CALENDAR_SERVICE, CalendarServiceInterface, PREFERENCES_SERVICE, PreferencesServiceInterface, AUTH_SERVICE } from '@venite/ng-service-api';
import { DisplaySettings, PrayService, DisplaySettingsComponent } from '@venite/ng-pray';
import { AuthService } from '../auth/auth.service';
import { DocumentService } from '../services/document.service';
import { UserProfile } from '../auth/user/user-profile';
import { Organization } from '../organization/organization';
import { OrganizationService } from '../organization/organization.module';
import { EditorService } from '../editor/ldf-editor/editor.service';
import * as json1 from 'ot-json1';
import { Subject } from 'rxjs/internal/Subject';

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
  userOrgs$ : Observable<Organization[]>;
  modifiedDoc$ : BehaviorSubject<LiturgicalDocument | null> = new BehaviorSubject(null);

  // Liturgy data to be loaded from the database if we come straight to this page
  state$ : Observable<PrayState>;

  // Display settings
  settings$ : Observable<DisplaySettings>;

  day$ : Observable<LiturgicalDay>;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    @Inject(DOCUMENT_SERVICE) private documents : DocumentService,
    @Inject(CALENDAR_SERVICE) private calendarService : CalendarServiceInterface,
    public prayService : PrayService,
    private modal : ModalController,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesServiceInterface,
    @Inject(AUTH_SERVICE) public auth : AuthService,
    private organizationService : OrganizationService,
    private editorService : EditorService
  ) { }

  ngOnInit() {
    // If passed through router state, it's simply a synchronous `PrayState` object
    // This probably means we came from the home page and clicked Pray, so the liturgy
    // and liturgical day had been preloaded
    const windowHistoryState$ : Observable<PrayState> = this.router.events.pipe(
      mapTo(window && window.history.state),
      tap(windowHistoryState => console.log('windowHistoryState', windowHistoryState)),
    );

    // If passed as router params (e.g., arrived at page from a link or refresh),
    // we have to do the work to wire these params together
  
    // `LiturgicalDocument`s that match the language/version/slug passed in the URL
    const liturgy$ : Observable<LiturgicalDocument[]> = this.route.params.pipe(
      switchMap(({ orgId, slug, language, version, liturgy }) =>
        orgId && slug
        ? this.documents.findOrganizationLiturgy(orgId, slug)
        : this.documents.findDocumentsBySlug(liturgy, language, new Array(version))
      ),
      startWith([])
    );
  
    // `LiturgicalDay` (via week) that matches the date/kalendar passed in the URL,
    // given the `LiturgicalDocument` found above (for `evening`)
    const week$ : Observable<LiturgicalWeek[]> = combineLatest([this.route.params, liturgy$]).pipe(
      switchMap(([{ y, m, d, kalendar, vigil }, liturgies]) => {
        if(liturgies[0] && liturgies[0].day) {
          return of(new Array(liturgies[0].day?.week));
        } else if(y && m && d) {
          return this.calendarService.buildWeek(of(dateFromYMD(y, m, d)), of(kalendar), of(vigil));
        } else {
          return of([]);
        }
      })
    );

    const day$ = merge(
      windowHistoryState$.pipe(map(state => state.day)),
      combineLatest(liturgy$, week$, this.route.params).pipe(
        tap(([liturgy, week, params]) => console.log('day$ A', liturgy, week, params)),
        switchMap(([liturgy, week, params]) => {
          if(liturgy[0] && liturgy[0].day) {
            return of(liturgy[0].day);
          } else if(params.y && params.m && params.d) {
            return this.calendarService.buildDay(
              of(dateFromYMD(params.y, params.m, params.d)),
              of(params.kalendar),
              of(liturgy).pipe(map(x => x[0])),
              of(week),
              of(params.vigil)
            );
          } else {
            return of(undefined);
          }
        })
      ),
    ).pipe(
      tap(day => console.log('day$ B = ', day)),
    );
    this.day$ = day$;

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
    this.state$ = merge(windowHistoryState$, routerParamState$).pipe(
      filter(state => state && Boolean(state.liturgy) && (Boolean(state.day) || Boolean(state.liturgy.day))),
    )

    const stateDoc$ = this.state$.pipe(
      filter(state => (state.hasOwnProperty('liturgy') && state.hasOwnProperty('day') && state.hasOwnProperty('prefs'))),
      switchMap(state => this.prayService.compile(state.liturgy, state.day || state.liturgy?.day, state.prefs, state.liturgy?.metadata?.liturgyversions || [state.liturgy?.version], state.liturgy?.metadata?.preferences)),
    );

    this.doc$ = merge(
      stateDoc$,
      this.modifiedDoc$
    );

    this.color$ = this.day$.pipe(
      map(day => day?.color),
      switchMap(color => this.documents.getColor(color).pipe(startWith(null))),
      startWith('var(--ldf-background-color)'),
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
    this.userOrgs$ = this.userProfile$.pipe(
      switchMap(user => user ? this.organizationService.organizationsWithUser(user?.uid) : [])
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

  async editBulletin(userProfile : UserProfile, doc : LiturgicalDocument, orgs : Organization[]) {
    const docDate = doc.day?.date ? dateFromYMDString(doc.day.date) : null,
      formattedDocDate = docDate ? `${docDate.getFullYear()}-${docDate.getMonth()+1}-${docDate.getDate()}` : null,
      prettyDocDate = docDate ? `${docDate.getMonth()+1}/${docDate.getDate()}/${docDate.getFullYear()}` : null;
    console.log('editBulletin  doc = ', doc);
    const id = await this.documents.newDocument(new LiturgicalDocument({
      ... unwrapOptions(doc),
      label: prettyDocDate ? `${doc.label} (${prettyDocDate})` : doc.slug,
      slug: formattedDocDate ? `${doc.slug}-${formattedDocDate}` : doc.slug,
      sharing: new Sharing({
        owner: userProfile.uid,
        organization: (orgs[0]).slug,
        collaborators: [],
        status: 'draft',
        privacy: 'organization'
      })
    }));
    this.router.navigate(['editor', id]);
  }

  changeDoc(doc : LiturgicalDocument, event : CustomEvent) {
    console.log('changeDoc');
    const op = this.editorService.opFromChange(event.detail);
    const newValue = new LiturgicalDocument(json1.type.apply(JSON.parse(JSON.stringify(doc)), op) as Partial<LiturgicalDocument>);
    console.log('newValue = ', newValue)
    this.modifiedDoc$.next(newValue);
  }
}
