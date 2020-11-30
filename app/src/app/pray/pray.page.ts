import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, merge, BehaviorSubject, interval, Subscription, concat, timer } from 'rxjs';
import { mapTo, switchMap, map, tap, filter, startWith, withLatestFrom, take, shareReplay, mergeMap, share, catchError, flatMap } from 'rxjs/operators';
import { unwrapOptions, Liturgy, ClientPreferences, dateFromYMD, LiturgicalDay, LiturgicalDocument, LiturgicalWeek, Preference, Sharing, dateFromYMDString } from '@venite/ldf';
import { ActionSheetController, IonContent, LoadingController, ModalController } from '@ionic/angular';
import { DOCUMENT_SERVICE, CALENDAR_SERVICE, CalendarServiceInterface, PREFERENCES_SERVICE, PreferencesServiceInterface, AUTH_SERVICE } from '@venite/ng-service-api';
import { DisplaySettings, DisplaySettingsComponent } from '@venite/ng-pray';
import { PrayService } from './pray.service';
import { AuthService } from '../auth/auth.service';
import { DocumentService } from '../services/document.service';
import { UserProfile } from '../auth/user/user-profile';
import { Organization } from '../organization/organization';
import { OrganizationService } from '../organization/organization.module';
import { EditorService } from '../editor/ldf-editor/editor.service';
import * as json1 from 'ot-json1';
import { TranslateService } from '@ngx-translate/core';
import { DownloadService } from '../services/download.service';
import { SpeechService, SpeechServiceTracking } from '../services/speech.service';
import { querySelectorDeep } from 'query-selector-shadow-dom';
import { LoginComponent } from '../auth/login/login.component';

interface PrayState {
  liturgy: LiturgicalDocument;
  day: LiturgicalDay;
  prefs: ClientPreferences;
}

type ActionSheetData = {
  doc: LiturgicalDocument;
  settings: DisplaySettings;
  userProfile: UserProfile | null;
  userOrgs: Organization[];
}

type CanticleData = { liturgyVersions: Record<string, string>; canticleOptions: LiturgicalDocument[]};

@Component({
  selector: 'venite-pray',
  templateUrl: './pray.page.html',
  styleUrls: ['./pray.page.scss'],
})
export class PrayPage implements OnInit, OnDestroy {
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

  actionSheetData$ : Observable<ActionSheetData>;

  // TTS
  speechPlaying : boolean = false;
  speechSubscription : Subscription;
  speechPlayingSubDoc : number = 0;
  speechPlayingUtterance : number = 0;
  speechUtteranceAtStartOfSubDoc : number = 0;
  @ViewChild(IonContent, {read: IonContent, static: false}) contentEl: IonContent;

  // Canticle Swap
  canticleData$ : Observable<CanticleData>;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    @Inject(DOCUMENT_SERVICE) private documents : DocumentService,
    @Inject(CALENDAR_SERVICE) private calendarService : CalendarServiceInterface,
    public prayService : PrayService,
    //public prayService : PrayService,
    private modal : ModalController,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesServiceInterface,
    @Inject(AUTH_SERVICE) public auth : AuthService,
    private organizationService : OrganizationService,
    private editorService : EditorService,
    private translate : TranslateService,
    private downloadService : DownloadService,
    private actionSheetController : ActionSheetController,
    public speechService : SpeechService,
    private loadingController : LoadingController
  ) { }

  ngOnDestroy() {
    if(this.speechSubscription) {
      this.speechSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    // if we accessed this page through the route /bulletin/... instead of /pray/..., set it in
    // bulletin mode (i.e., include all possibilities as options)
    this.prayService.bulletinMode = Boolean(location?.pathname?.startsWith('/bulletin'))

    // If passed through router state, it's simply a synchronous `PrayState` object
    // This probably means we came from the home page and clicked Pray, so the liturgy
    // and liturgical day had been preloaded
    const windowHistoryState$ : Observable<PrayState> = this.router.events.pipe(
      mapTo(window?.history?.state),
      tap(windowHistoryState => console.log('windowHistoryState', windowHistoryState)),
    );

    // If passed as router params (e.g., arrived at page from a link or refresh),
    // we have to do the work to wire these params together
  
    // `LiturgicalDocument`s that match the language/version/slug passed in the URL
    const liturgy$ : Observable<LiturgicalDocument[]> = this.route.params.pipe(
      switchMap(({ docId, orgId, slug, language, version, liturgy }) => {
        if(docId) {
          return this.documents.findDocumentById(docId).pipe(
            map(doc => [doc])
          );
        } else if(orgId && slug) {
          return this.documents.findOrganizationLiturgy(orgId, slug);
        } else {
          return this.documents.findDocumentsBySlug(liturgy, language, new Array(version));
        }
      }),
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
      map(([liturgy, day, prefs]) => ({ liturgy: liturgy[0], day, prefs })),
      tap(state => console.log('routerParamState', state))
    );

    // Unite the data passed from the state and the data derived from the route
    this.state$ = merge(windowHistoryState$, routerParamState$).pipe(
      filter(state => state && Boolean(state.liturgy) && (Boolean(state.day) || Boolean(state.liturgy.day))),
      take(1)
    );

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
    const prefSettings$ = combineLatest([
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

    const docSettings$ = this.doc$.pipe(
      map(doc => doc?.display_settings)
    )

    this.settings$ = combineLatest([prefSettings$, docSettings$]).pipe(
      map(([prefSettings, docSettings]) =>
        // basically — use the document's settings for everything except font size and dark mode
        ({
          ...(docSettings ?? prefSettings),
          darkmode: prefSettings.darkmode ?? docSettings.darkmode ?? "auto",
          fontscale: prefSettings.fontscale ?? docSettings.fontscale ?? "m",
        })
      )
    )

    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => user ? this.auth.getUserProfile(user.uid) : null)
    );
    this.userOrgs$ = this.userProfile$.pipe(
      switchMap(user => user ? this.organizationService.organizationsWithUser(user?.uid) : [])
    );

    this.actionSheetData$ = combineLatest([
      this.doc$.pipe(startWith(new LiturgicalDocument())),
      this.settings$.pipe(startWith(new DisplaySettings())),
      this.userOrgs$.pipe(startWith([])),
      this.userProfile$.pipe(startWith(null))
    ]).pipe(
      map(([doc, settings, userOrgs, userProfile]) => ({
        doc,
        settings,
        userOrgs,
        userProfile
      }))
    )

    // Canticle Options
    const liturgyVersions$ = this.doc$.pipe(
      switchMap(doc => this.documents.getVersions(doc?.language ?? 'en', 'liturgy'))
    );

    const canticleOptions$ = this.doc$.pipe(
      switchMap(doc => this.documents.find({
        language: doc?.language || 'en',
        style: 'canticle'
      })),
      map(docs => docs.map(doc => new LiturgicalDocument({
        ...doc,
        metadata: {
          ...doc.metadata,
          changeable: true
        }
      })))
    );

    this.canticleData$ = combineLatest([liturgyVersions$, canticleOptions$]).pipe(
      map(([liturgyVersions, canticleOptions]) => ({
        liturgyVersions,
        canticleOptions
      }))
    );
  }

  /* Display Settings */
  async openSettings(doc : LiturgicalDocument, settings : DisplaySettings) {
    const modal = await this.modal.create({
      component: DisplaySettingsComponent,
    });

    const voiceChoices = (window?.speechSynthesis?.getVoices() ?? [])
      .filter(voice => voice.lang.startsWith(doc.language ?? 'en'));

    modal.componentProps = {
      settings,
      modal,
      voiceChoices
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
      `bibleverses-${settings.bibleVerses}`,
      `bolded-${settings.bolded}`
    ];
  }

  async editBulletin(userProfile : UserProfile, doc : LiturgicalDocument, orgs : Organization[]) {
    const loading = await this.loadingController.create();

    await loading.present();

    const docDate = doc.day?.date ? dateFromYMDString(doc.day.date) : null,
      formattedDocDate = docDate ? `${docDate.getFullYear()}-${docDate.getMonth()+1}-${docDate.getDate()}` : null,
      prettyDocDate = docDate ? `${docDate.getMonth()+1}/${docDate.getDate()}/${docDate.getFullYear()}` : null,
      label = (prettyDocDate ? `${doc?.label} (${prettyDocDate})` : doc?.slug) ?? 'Bulletin',
      slug = (formattedDocDate ? `${doc?.slug}-${formattedDocDate}` : doc?.slug) ?? 'bulletin';

    // if the document already exists in the database, just open it in the editor
    let id : string;
    if(doc.id) {
      id = doc.id.toString();
    }
    // otherwise, create a new document
    else {
      id = await this.documents.newDocument(new LiturgicalDocument({
        ... unwrapOptions(doc),
        label,
        slug,
        sharing: new Sharing({
          owner: userProfile.uid,
          organization: (orgs[0])?.slug,
          collaborators: [],
          status: 'draft',
          privacy: 'organization'
        })
      }));
    }

    await loading.dismiss();

    this.router.navigate(['editor', id]);
  }

  changeDoc(doc : LiturgicalDocument, event : CustomEvent) {
    const op = this.editorService.opFromChange(event.detail);
    const newValue = new LiturgicalDocument(json1.type.apply(JSON.parse(JSON.stringify(doc)), op) as Partial<LiturgicalDocument>);
    this.modifiedDoc$.next(newValue);
  }

  async convertToDocx(doc : LiturgicalDocument, settings : DisplaySettings) {
    // show loading
    const loading = await this.loadingController.create();
    await loading.present();

    // post data to create blob
    const filename = `${doc.label}${doc?.day?.date ? ` - ${doc.day.date}` : ''}.docx`,
      resp = await fetch(`https://us-central1-venite-2.cloudfunctions.net/docx`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ doc, settings })
      }),
      blob = await resp.blob();

    // download the blob
    await this.downloadService.download(blob, filename, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    // hide loading
    await loading.dismiss();
  }

  async actionSheet(data : ActionSheetData) {
    const canDownloadWord = !!URL.createObjectURL;

    // Action Sheet
    let buttons : any[] = [
      {
        text: this.translate.instant('Cancel'),
        icon: 'close',
        role: 'cancel'
      }
    ];
    // TODO — when should Speech option be displayed?
    if(true) { //this.voiceChoices && !this.speechPlaying && !this.hasPending) {
      buttons.push({
        text: 'Read Aloud',
        icon: 'headset',
        handler: () => this.startSpeechAt(data.doc, data.settings, 0, 0)
      })
    }

    if(canDownloadWord) {
      buttons.push({
        text: this.translate.instant('Open in Word'),
        icon: 'document',
        handler: () => this.convertToDocx(data.doc, data.settings)
      });
    }

    // Edit Bulletin if logged in
    if(data.userProfile) {
      buttons.push({
        text: 'Edit Bulletin',
        icon: 'create',
        handler: () => {
          this.actionSheetController.dismiss();
          this.editBulletin(data.userProfile, data.doc, data.userOrgs);
        }
      })
    } else {
      buttons.push({
        text: 'Log in to Edit Bulletin',
        icon: 'create',
        handler: async () => {
          const login = await this.modal.create({ component: LoginComponent });
          await login.present();
        }
      });
    }
    /*if(this.isBulletin && !this.bulletinDraftId) {
      buttons.push({
        text: 'Bookmark this Bulletin',
        icon: 'bookmark',
        handler: async () => {
          this.bulletin.bookmarkBulletin(this.loadedBulletin).then(async () => {
            const toast = await this.toast.create({
              message: 'The bulletin has been bookmarked and will appear in the Bulletins page.',
              duration: 2000
            });
            toast.present();
          });
        }
      });
    }
    buttons.push({
      text: 'Pray Together',
      icon: 'chatbubbles',
      //@ts-ignore
      handler: async () => TogetherJS()
    });*/
    buttons = buttons.concat([
      {
        text: 'Show Settings',
        icon: 'cog',
        handler: () => {
          this.actionSheetController.dismiss();
          this.openSettings(data.doc, data.settings);
        }
      },
      {
        text: 'Download JSON',
        icon: 'download',
        handler: () => {
          this.downloadService.download(
            new Blob([JSON.stringify(data.doc)], { type: 'application/json' }),
            `${data.doc?.slug}.ldf.json`,
            'application/json'
          )
        }
      },
      /*{
        text: 'Share Bulletin Link',
        icon: 'link',
        handler: () => {
          this.actionsheet.dismiss();
          this.saveBulletin();
        }
      }*/
    ]);
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons
    });
    await actionSheet.present();
  }

  // TTS
  startSpeechAt(doc : LiturgicalDocument, settings : DisplaySettings, subdoc : number = 0, utterance : number = 0) {
    this.speechPlaying = true;
    this.speechPlayingSubDoc = subdoc;
    this.speechPlayingUtterance = utterance;
    this.scrollToSubdoc(subdoc);
    const utterances$ = //this.speechService.speakDoc(doc, settings, this.speechPlayingSubDoc ?? subdoc, this.speechPlayingUtterance ?? utterance);
    combineLatest([this.doc$, this.settings$]).pipe(
      filter(([doc, settings]) => Boolean(doc && settings)),
      //any time the document or settings change, 
      // cancels the previous TTS reading and restarts it with the new document
      // and/or settings, starting at the sub-document/utterance indices that had been reached 
      switchMap(([doc, settings]) => this.speechService.speakDoc(doc, settings, this.speechPlayingSubDoc ?? 0, this.speechPlayingUtterance ?? 0)),
      catchError(e => { console.warn('Caught error', e); return of({subdoc: 0, utterance: 0, data: null})})
    );
    this.speechSubscription = utterances$
    .subscribe(
      (data : SpeechServiceTracking) => {
        console.log('(speech) speechService', data);
        if(this.speechPlayingSubDoc !== data.subdoc) {
          this.speechUtteranceAtStartOfSubDoc = data.utterance;
        }

        if(this.speechPlayingSubDoc !== data.subdoc) {
          this.scrollToSubdoc(data.subdoc);
        }

        this.speechPlayingSubDoc = data.subdoc ?? 0;
        this.speechPlayingUtterance = data.utterance ?? 0;
      },
      // TODO
      error => {

      },
      // TODO: Complete
      () => {

      }
    )
  }
  scrollToSubdoc(subdoc : number) {
    const domRepresentation = querySelectorDeep(`[path='/value/${subdoc}']`);
    console.log('scrolling to subdoc', subdoc, domRepresentation, domRepresentation.getBoundingClientRect());
    if(domRepresentation) {
      const y = domRepresentation.getBoundingClientRect().top;
      this.contentEl.scrollByPoint(0, y - 100, 50);
    }
  }
  pauseSpeech() {
    this.speechSubscription.unsubscribe();
    this.speechService.pause();
  }
  resumeSpeech(doc : LiturgicalDocument, settings : DisplaySettings) {
    this.startSpeechAt(doc, settings, this.speechPlayingSubDoc, this.speechPlayingUtterance);
    this.speechService.resume();
  }
  rewind(doc : LiturgicalDocument, settings : DisplaySettings) {
    this.speechSubscription.unsubscribe();
    if(this.speechPlayingUtterance - this.speechUtteranceAtStartOfSubDoc < 5) {
      console.log('rewind to previous doc')
      this.startSpeechAt(doc, settings, this.speechPlayingSubDoc - 2 >= 0 ? this.speechPlayingSubDoc - 2 : 0);
    } else {
      console.log('rewind to beginning of this doc')
      this.startSpeechAt(doc, settings, this.speechPlayingSubDoc);
    }
  }
  fastForward(doc : LiturgicalDocument, settings : DisplaySettings) {
    this.speechSubscription.unsubscribe();
    console.log('skipping ahead to ', this.speechPlayingSubDoc + 1)
    this.startSpeechAt(doc, settings, this.speechPlayingSubDoc + 1);
  }

  // Canticle swap
  // TODO -- add logic onPrayPage
  /*     // Canticle swapper
    */
  sendCanticleOptions(ev : any, data : CanticleData) : void {
    const target = querySelectorDeep('ldf-editable-filter-documents');
    if(target) {
      // TODO
      console.log('liturgyVersions = ', data.liturgyVersions);
      target.setVersions(data.liturgyVersions);
      target.setOptions(
        data.canticleOptions
        .sort((a, b) => (a?.metadata?.number > b?.metadata?.number) ? 1 : -1).sort((a, b) => {
            try {
              return (parseInt(a?.metadata?.number) > parseInt(b?.metadata?.number)) ? 1 : -1;
            } catch(e) {
              return (a?.metadata?.number > b?.metadata?.number) ? 1 : -1;
            }
          })
      );
    }
  }
}
