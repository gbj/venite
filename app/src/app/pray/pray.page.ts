import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  Observable,
  of,
  combineLatest,
  merge,
  BehaviorSubject,
  from,
  Subject,
} from "rxjs";
import {
  mapTo,
  switchMap,
  map,
  tap,
  filter,
  startWith,
  take,
  catchError,
  takeWhile,
  distinct,
  timeout,
  debounceTime,
  first,
  takeUntil,
  shareReplay,
} from "rxjs/operators";
import {
  Liturgy,
  ClientPreferences,
  dateFromYMD,
  LiturgicalDay,
  LiturgicalDocument,
  LiturgicalWeek,
  Preference,
  Sharing,
  dateFromYMDString,
  Option,
  Change,
  unwrapOptions,
  DisplaySettings,
  SelectableCitation,
  docsToLiturgy,
} from "@venite/ldf";
import {
  ActionSheetController,
  AlertController,
  IonContent,
  LoadingController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import {
  DOCUMENT_SERVICE,
  CALENDAR_SERVICE,
  CalendarServiceInterface,
  PREFERENCES_SERVICE,
  PreferencesServiceInterface,
  AUTH_SERVICE,
  LOCAL_STORAGE,
  LocalStorageServiceInterface,
} from "@venite/ng-service-api";
import { DisplaySettingsComponent } from "@venite/ng-pray";
import { PrayService } from "./pray.service";
import { AuthService } from "../auth/auth.service";
import { DocumentService } from "../services/document.service";
import { UserProfile } from "../auth/user/user-profile";
import { Organization } from "../organization/organization";
import { OrganizationService } from "../organization/organization.module";
import {
  EditorService,
  EditorStatus,
} from "../editor/ldf-editor/editor.service";
import * as json1 from "ot-json1";
import { TranslateService } from "@ngx-translate/core";
import { DownloadService } from "../services/download.service";
import {
  SpeechService,
  SpeechServiceTracking,
} from "../services/speech.service";
import { querySelectorDeep } from "query-selector-shadow-dom";
import { EditorState } from "../editor/ldf-editor/editor-state";
import { isCompletelyCompiled } from "./is-completely-compiled";
import { PlatformService } from "@venite/ng-platform";
import { Location } from "@angular/common";

import { AudioService } from "./audio.service";
import { selectableCitationToString } from "./selectable-citation-to-string";
import { environment } from "src/environments/environment";
import { Share } from "@capacitor/share";
import { Clipboard } from "@capacitor/clipboard";
import * as clipboardPolyfill from "clipboard-polyfill";

import { MediaSession } from "capacitor-media-session";
import { LoginComponent } from "../auth/login/login.component";
import { MediaSessionService } from "../services/media-session.service";

import { App } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";

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
  editorState: EditorState | null;
};

type CanticleData = {
  liturgyVersions: Record<string, string>;
  canticleOptions: LiturgicalDocument[];
};
type PAndTData = LiturgicalDocument[];

type SelectionData = {
  target: HTMLElement;
  text: string;
  citation: SelectableCitation;
  fragment: string;
};

@Component({
  selector: "venite-pray",
  templateUrl: "./pray.page.html",
  styleUrls: ["./pray.page.scss"],
  host: {
    "(document:ldfAskForPrayersAndThanksgivings)": "sendPAndTs($event)",
  },
})
export class PrayPage implements OnInit, OnDestroy {
  doc$: Observable<LiturgicalDocument>;
  color$: Observable<string | null>;
  userProfile$: Observable<UserProfile | null>;
  userOrgs$: Observable<Organization[]>;
  modifiedDoc$: BehaviorSubject<LiturgicalDocument | undefined | null> =
    new BehaviorSubject(undefined);
  docNotFound$: Subject<null> = new Subject();

  // Liturgy data to be loaded from the database if we come straight to this page
  state$: Observable<PrayState>;

  // Display settings
  settings$: Observable<DisplaySettings>;

  actionSheetData$: Observable<ActionSheetData>;

  // TTS
  @ViewChild(IonContent, { read: IonContent, static: false })
  contentEl: IonContent;

  // Canticle Swap/Prayers & Thanksgivings
  swapData$: Observable<[CanticleData, PAndTData]>;

  // Bulletin editor
  bulletinMode: boolean = false;
  bulletinDocId$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  editorState$: Observable<EditorState>;
  editorStatus$: Observable<EditorStatus>;
  latestDoc: LiturgicalDocument | undefined;
  newSlug: string | undefined;
  newLabel: string | undefined;
  bulletinLabel: string | undefined;
  bulletinSlug: string | undefined;
  isBulletin: boolean = false;

  // Sharing
  canShare: boolean = false;
  clipboardIcon: string = "clipboard";

  selection: SelectionData;

  storedOptionSelections: number = 0;

  pronouns: Promise<Record<string, string>> | undefined;

  // Redirecting to today's liturgy
  todaysLiturgyListener: PluginListenerHandle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT_SERVICE) private documents: DocumentService,
    @Inject(CALENDAR_SERVICE) private calendarService: CalendarServiceInterface,
    public prayService: PrayService,
    private modal: ModalController,
    @Inject(PREFERENCES_SERVICE)
    private preferencesService: PreferencesServiceInterface,
    @Inject(AUTH_SERVICE) public auth: AuthService,
    private organizationService: OrganizationService,
    private editorService: EditorService,
    private translate: TranslateService,
    private downloadService: DownloadService,
    private actionSheetController: ActionSheetController,
    public speechService: SpeechService,
    private loadingController: LoadingController,
    private toast: ToastController,
    private platform: PlatformService,
    private location: Location,
    private alert: AlertController,
    @Inject(LOCAL_STORAGE) private storage: LocalStorageServiceInterface,
    public mediaSessionService: MediaSessionService
  ) {}

  ngOnDestroy() {
    if (this.mediaSessionService.speechSubscription) {
      this.mediaSessionService.speechSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    if (!this.bulletinMode) {
      // window location hash
      this.doc$.subscribe(() => {
        const hash = window?.location?.hash;

        // TODO kludgey
        setTimeout(() => {
          if (hash) {
            const el = querySelectorDeep(hash.replace(/\//g, "-"));
            if (el) {
              el.scrollIntoView();
            }
          }
        }, 1000);
      });

      // When you reopen app, check if it's on previous day's liturgy
      this.todaysLiturgyListener = App.addListener(
        "appStateChange",
        async ({ isActive }) => {
          if (isActive) {
            const today = new Date(),
              todayYear = today.getFullYear(),
              todayDate = today.getDate(),
              todayMonth = today.getMonth() + 1;
            const params = this.route.snapshot.params;
            if (
              //@ts-ignore
              this.route.snapshot._routerState.url.startsWith("/pray") &&
              !this.bulletinMode &&
              params.y &&
              params.m &&
              params.d &&
              (Number(params.y) < todayYear ||
                (Number(params.y) == todayYear &&
                  Number(params.m) < todayMonth) ||
                (Number(params.y) == todayYear &&
                  Number(params.m) == todayMonth &&
                  Number(params.d) < todayDate))
            ) {
              const alert = await this.alert.create({
                header: "Go to today’s liturgy?",
                message:
                  "It looks like you may be using a previous day’s liturgy. Do you want to choose today’s liturgy instead?",
                buttons: [
                  {
                    text: "No, thanks.",
                    role: "cancel",
                  },
                  {
                    text: "Yes, please!",
                    handler: () => {
                      this.router.navigateByUrl("/");
                    },
                  },
                ],
              });
              await alert.present();
            }
          }
        }
      );
    }
  }

  ionViewWillLeave() {
    if (this.bulletinMode && this.editorState$) {
      this.editorState$.pipe(take(1)).subscribe((state) => {
        this.editorService.leave(state.localManager.docId);
        this.bulletinDocId$.next(null);
      });
    }

    if (this.mediaSessionService.speechPlaying) {
      this.mediaSessionService.pauseSpeech();
      this.mediaSessionService.destroyMediaSession();
    }

    this.pronouns = undefined;

    if (!this.bulletinMode) {
      this.todaysLiturgyListener.remove();
    }
  }

  ngOnInit() {
    this.canShare =
      Boolean((navigator as any).share) || this.platform.is("capacitor");

    // if we accessed this page through the route /bulletin/... instead of /pray/..., set it in
    // bulletin mode (i.e., include all possibilities as options)
    this.bulletinMode = Boolean(location?.pathname?.startsWith("/bulletin"));
    this.prayService.bulletinMode = this.bulletinMode;

    // If passed through router state, it's simply a synchronous `PrayState` object
    // This probably means we came from the home page and clicked Pray, so the liturgy
    // and liturgical day had been preloaded
    const windowHistoryState$: Observable<PrayState> = this.router.events.pipe(
      mapTo(window?.history?.state),
      // store bulletin slug and label from router state, to override whatever's loaded from server
      tap((state: PrayState) => {
        console.log("WHS day = ", state.day, state);
        if (this.bulletinMode) {
          this.bulletinLabel = state?.liturgy?.label;
          this.bulletinSlug = state?.liturgy?.slug;
        }
      })
    );

    // If passed as router params (e.g., arrived at page from a link or refresh),
    // we have to do the work to wire these params together

    // `LiturgicalDocument`s that match the language/version/slug passed in the URL
    const liturgy$: Observable<LiturgicalDocument[]> = this.route.params.pipe(
      switchMap(
        ({
          docId,
          orgId,
          slug,
          language,
          version,
          liturgy,
          newSlug,
          newLabel,
        }) => {
          this.newSlug = newSlug;
          this.newLabel = newLabel;
          if (docId) {
            this.isBulletin = true;
            return this.documents
              .findDocumentById(docId)
              .pipe(map((doc) => [doc]));
          } else if (orgId && slug) {
            this.isBulletin = true;
            return this.documents.findOrganizationLiturgy(orgId, slug).pipe(
              tap((docs) => {
                if (docs?.length == 0) {
                  this.docNotFound$.next(null);
                }
              })
            );
          } else {
            return this.documents
              .findDocumentsBySlug(liturgy, language, new Array(version))
              .pipe(
                map((docs) =>
                  docs.map((doc) =>
                    docId
                      ? doc
                      : new LiturgicalDocument({ ...doc, id: undefined })
                  )
                )
              );
          }
        }
      ),
      startWith([])
    );

    // `LiturgicalDay` (via week) that matches the date/kalendar passed in the URL,
    // given the `LiturgicalDocument` found above (for `evening`)
    const week$: Observable<LiturgicalWeek[]> = combineLatest([
      this.route.params,
      liturgy$,
    ]).pipe(
      switchMap(([{ y, m, d, kalendar, vigil }, liturgies]) => {
        if (liturgies[0] && liturgies[0].day) {
          return of(new Array(liturgies[0].day?.week));
        } else if (y && m && d) {
          return this.calendarService.buildWeek(
            of(dateFromYMD(y, m, d)),
            of(kalendar),
            of(vigil === "true")
          );
        } else {
          return of([]);
        }
      })
    );

    const day$ = merge(
      windowHistoryState$.pipe(map((state) => state.day)),
      combineLatest(liturgy$, week$, this.route.params).pipe(
        switchMap(([liturgy, week, params]) => {
          if (liturgy[0] && liturgy[0].day) {
            return of(liturgy[0].day);
          } else if (params.y && params.m && params.d) {
            console.log("observance observed = ", params?.observance);
            return params?.observance
              ? this.calendarService
                  .buildDay(
                    of(dateFromYMD(params.y, params.m, params.d)),
                    of(params.kalendar),
                    of(liturgy).pipe(map((x) => x[0])),
                    of(week),
                    of(params.vigil === "true")
                  )
                  .pipe(
                    map(
                      (day) =>
                        new LiturgicalDay({
                          ...day,
                          slug: params.observance,
                          propers: params.observance,
                          holy_day_observed: (day.holy_days || []).find(
                            (hd) => hd.slug === params.observance
                          ),
                        })
                    ),
                    tap((day) => console.log("day = ", day))
                  )
              : this.calendarService.buildDay(
                  of(dateFromYMD(params.y, params.m, params.d)),
                  of(params.kalendar),
                  of(liturgy).pipe(map((x) => x[0])),
                  of(week),
                  of(params.vigil === "true")
                );
          } else {
            return of(undefined);
          }
        })
      )
    ).pipe(
      filter((day) => Boolean(day)),
      shareReplay()
    );

    // `prefs` are passed as a JSON-encoded string in the param
    const prefs$: Observable<ClientPreferences> = combineLatest(
      liturgy$,
      this.route.params
    ).pipe(
      //tap(data => //console.log('prefs$ prefs = ', data)),
      map(([liturgy, { prefs }]) => ({
        liturgy,
        prefs: JSON.parse(prefs ?? "{}"),
      })),
      switchMap(({ liturgy, prefs }) => {
        let userPrefs = prefs;

        const liturgyDefaults =
            liturgy[0] && liturgy[0].type == "liturgy"
              ? // convert `Liturgy` preference tree into a key-default value object
                Object.values(
                  (liturgy[0] as Liturgy).metadata?.preferences || {}
                ).reduce((acc, curr) => {
                  acc[curr.key] = new Preference(curr).getDefaultPref();
                  return acc;
                }, {})
              : {},
          chosenPrefs: ClientPreferences = Object.assign(
            liturgyDefaults,
            prefs || {}
          );

        if (!userPrefs || JSON.stringify(userPrefs) === "{}") {
          return this.preferencesService
            .getPreferencesForLiturgy(liturgy[0])
            .pipe(
              map((prefs) =>
                prefs.reduce(
                  (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
                  {} as ClientPreferences
                )
              )
            );
        } else {
          return of(chosenPrefs);
        }
      }),
      shareReplay()
    );

    // Unifies everything from the router params
    const routerParamState$: Observable<PrayState> = combineLatest(
      liturgy$,
      day$,
      prefs$
    ).pipe(
      map(([liturgy, day, prefs]) => ({ liturgy: liturgy[0], day, prefs })),
      shareReplay()
    );

    // Unite the data passed from the state and the data derived from the route
    this.state$ = merge(windowHistoryState$, routerParamState$).pipe(
      filter(
        (state) =>
          state &&
          Boolean(state.liturgy) &&
          state.liturgy.value &&
          state.liturgy.value[0] !== "Loading..." &&
          (Boolean(state.day) || Boolean(state.liturgy.day))
      ),
      // allow more changes if orgId is in the URL (i.e., it's a published bulletin)
      // to prevent issues with caching old bulletins with same URL
      take(this.route.snapshot.params["orgId"] ? 1000 : 4),
      shareReplay()
      //take(2)
    );

    const stateDoc$ = this.state$.pipe(
      filter(
        (state) =>
          state.hasOwnProperty("liturgy") &&
          state.hasOwnProperty("day") &&
          state.hasOwnProperty("prefs")
      ),
      switchMap((state) => {
        const bulletinPrefs = (state.liturgy["selected_prefs"] ||
          {}) as ClientPreferences;
        // get default preferences
        const basePrefs = Object.entries(
          (state.liturgy.type === "liturgy"
            ? (state.liturgy as Liturgy).metadata?.preferences
            : {}) || {}
        )
          .map(([key, pref]) => [
            key,
            (
              pref.options.find((opt) => Boolean(opt.default)) ||
              pref.options[0]
            )?.value,
          ])
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        return this.prayService
          .compile(
            state.liturgy,
            state.day || state.liturgy?.day,
            { ...basePrefs, ...state.prefs, ...bulletinPrefs },
            state.liturgy?.metadata?.liturgyversions || [
              state.liturgy?.version,
            ],
            state.liturgy?.metadata?.preferences
          )
          .pipe(
            map(
              (doc) =>
                new LiturgicalDocument({
                  ...doc,
                  //@ts-ignore
                  selected_prefs: doc.selected_prefs || state.prefs,
                })
            )
          );
      }),
      shareReplay()
    );

    if (this.bulletinMode) {
      this.doc$ = from(this.launchBulletinMode(stateDoc$)).pipe(
        switchMap((doc$) => doc$),
        shareReplay()
      );
    } else {
      // in normal Pray mode, start with window history/router state doc, and follow it with any modifications
      // e.g., "Change Canticle" button
      this.doc$ = merge(
        stateDoc$.pipe(takeWhile((doc) => !isCompletelyCompiled(doc), true)),
        this.modifiedDoc$.pipe(
          filter((doc) => Boolean(doc)),
          tap((doc) => console.log("modifiedDoc$ = ", doc))
        ),
        this.docNotFound$
      ).pipe(
        // flatten for TTS purposes
        map((doc) => {
          if (doc) {
            const flattened = docsToLiturgy(this.flattenDoc(doc));
            return new LiturgicalDocument({
              ...doc,
              value: flattened?.value || doc?.value,
            });
          } else if (doc === null) {
            return new LiturgicalDocument({
              type: "liturgy",
              slug: "LDF_ERROR_NOT_FOUND",
            });
          } else {
            return undefined;
          }
        }),
        debounceTime(10),
        shareReplay(),
        tap((doc) => console.log("new doc$ value", doc))
      );
    }

    if (this.bulletinMode) {
      this.color$ = combineLatest(
        day$,
        this.bulletinDocId$.pipe(
          filter((id) => Boolean(id)),
          switchMap((id) => this.editorService.editorState(id)),
          map((state) => state.localManager.document)
        )
      ).pipe(
        map(([day, doc]) => doc?.metadata?.color ?? day?.color),
        switchMap((color) => this.documents.getColor(color)),
        distinct()
      );
    } else {
      this.color$ = combineLatest(day$, this.doc$).pipe(
        tap(([day, doc]) =>
          console.log("color$ ==> day = ", day, "doc = ", doc)
        ),
        map(([day, doc]) => doc?.metadata?.color ?? day?.color),
        filter((color) => Boolean(color)),
        switchMap((color) =>
          this.documents.getColor(color).pipe(startWith(null))
        )
      );
    }

    // Grab display settings from preferences
    const prefSettings$ = this.preferencesService.displaySettings();

    const docSettings$ = this.doc$.pipe(map((doc) => doc?.display_settings));

    this.settings$ = combineLatest([prefSettings$, docSettings$]).pipe(
      map(([prefSettings, docSettings]) =>
        // basically — use the document's settings for everything except font size and dark mode
        ({
          ...(docSettings ?? prefSettings),
          darkmode: prefSettings.darkmode ?? docSettings.darkmode ?? "auto",
          fontscale: prefSettings.fontscale ?? docSettings.fontscale ?? "m",
        })
      )
    );

    this.userProfile$ = this.auth.user.pipe(
      switchMap((user) => (user ? this.auth.getUserProfile(user.uid) : null))
    );
    this.userOrgs$ = this.auth.user.pipe(
      filter((user) => Boolean(user)),
      switchMap((user) =>
        this.organizationService.organizationsWithUser(user?.uid)
      )
    );

    this.actionSheetData$ = combineLatest([
      this.doc$,
      this.settings$.pipe(startWith(new DisplaySettings())),
      this.userOrgs$.pipe(startWith([])),
      this.userProfile$.pipe(startWith(null)),
      this.doc$.pipe(
        switchMap((doc) =>
          doc?.id && this.bulletinMode
            ? this.editorService.editorState(doc.id.toString())
            : of(null)
        )
      ),
    ]).pipe(
      map(([doc, settings, userOrgs, userProfile, editorState]) => ({
        doc,
        settings,
        userOrgs,
        userProfile,
        editorState,
      }))
    );

    // Canticle Options
    const liturgyVersions$ = this.doc$.pipe(
      switchMap((doc) =>
        this.documents.getVersions(doc?.language ?? "en", "liturgy")
      )
    );

    const canticleOptions$ = this.doc$.pipe(
      // replaced with category search to enable offline mode
      /*switchMap(doc => this.documents.find({
        language: doc?.language || 'en',
        style: 'canticle'
      })),*/
      switchMap((doc) =>
        this.documents.findDocumentsByCategory(
          ["Canticle"],
          doc?.language || "en",
          ["bcp1979", "rite_i", "eow"]
        )
      ),
      map((docs) =>
        docs.map(
          (doc) =>
            new LiturgicalDocument({
              ...doc,
              metadata: {
                ...doc.metadata,
                changeable: true,
              },
            })
        )
      )
    );

    const pAndTs$ = this.doc$.pipe(
      switchMap((doc) =>
        this.documents.findDocumentsByCategory(
          ["Prayers and Thanksgivings"],
          doc?.language ?? "en",
          ["bcp1979"]
        )
      ),
      filter((docs) => docs?.length > 1),
      map((docs) => docs.sort((a, b) => (a.slug <= b.slug ? -1 : 1)))
    );

    this.swapData$ = combineLatest([
      liturgyVersions$,
      canticleOptions$,
      pAndTs$,
    ]).pipe(
      map(([liturgyVersions, canticleOptions, pAndTs]) => [
        {
          liturgyVersions,
          canticleOptions,
        },
        pAndTs,
      ])
    );
  }

  /* Display Settings */
  async openSettings(doc: LiturgicalDocument, settings: DisplaySettings) {
    const modal = await this.modal.create({
      component: DisplaySettingsComponent,
    });

    const voiceChoices = (await this.speechService.getVoices()).filter(
      (voice) => voice.lang.startsWith(doc.language ?? "en")
    );

    modal.componentProps = {
      settings,
      modal,
      voiceChoices,
    };

    await modal.present();
  }

  flattenDoc(doc: LiturgicalDocument | undefined): LiturgicalDocument[] {
    if (!doc) {
      return [];
    } else if (doc.type === "liturgy") {
      return ((doc as Liturgy).value || [])
        .map((doc) => this.flattenDoc(doc))
        .flat();
    } else {
      return [doc];
    }
  }

  processSettings(settings: DisplaySettings): string[] {
    return [
      `ldf-wrapper`,
      `dropcaps-${settings.dropcaps}`,
      `response-${settings.response}`,
      `repeat-antiphon-${settings.repeatAntiphon}`,
      `fontscale-${settings.fontscale.toString()}`,
      `font-${settings.font}`,
      `psalmverses-${settings.psalmVerses}`,
      `bibleverses-${settings.bibleVerses}`,
      `bolded-${settings.bolded}`,
    ];
  }

  /* Bulletin Editing */
  async launchBulletinMode(
    stateDoc$: Observable<LiturgicalDocument>
  ): Promise<Observable<LiturgicalDocument>> {
    const loading = await this.loadingController.create({
      backdropDismiss: true,
      duration: 10000,
    });
    await loading.present();

    // in bulletin mode, show a loading screen until the doc is fully compiled,
    // then create an and join an editing session
    let latestDoc: null | LiturgicalDocument = null;

    const doc$ = stateDoc$.pipe(
      takeWhile((doc) => !isCompletelyCompiled(doc), true),
      timeout(30000),
      shareReplay()
    );

    this.bulletinMode = true;

    const subscription = doc$.subscribe(
      // next
      (doc) => {
        latestDoc = doc;
        console.log("latest doc = ", doc);
      },
      // error — TODO
      async (e) => {
        const toast = await this.toast.create({
          message: this.translate.instant("editor.bulletin-creation-error"),
          color: "warning",
          duration: 10000,
        });
        await toast.present();

        // load as in `complete`
        subscription.unsubscribe();
        this.loadingController.dismiss();
        latestDoc.slug = this.newSlug;
        latestDoc.label = this.newLabel;
        loading.dismiss();
        this.beginEditing(latestDoc);
      },
      // complete
      async () => {
        console.log("doc is complete");
        // hide loading and set slug/label
        subscription.unsubscribe();
        this.loadingController.dismiss();
        latestDoc.slug = this.newSlug;
        latestDoc.label = this.newLabel;
        loading.dismiss();
        latestDoc.slug = this.bulletinSlug || latestDoc.slug;
        latestDoc.label = this.bulletinLabel || latestDoc.label;

        // fix pronouns
        if (
          latestDoc.metadata?.pronouns &&
          latestDoc.metadata?.pronouns?.length > 0
        ) {
          // ask for pronouns if haven't yet
          if (!this.pronouns) {
            this.pronouns = this.askForPronouns(latestDoc);
          }

          // replace with pronouns
          const pronouns = await this.pronouns;
          const d =
            Object.keys(pronouns)?.length > 0
              ? new LiturgicalDocument(
                  JSON.parse(
                    JSON.stringify(latestDoc).replace(
                      new RegExp(
                        `(${Object.keys(pronouns)
                          .map((word) => `\\*${word}\\*`)
                          .join("|")})`,
                        "g"
                      ),
                      (match) => pronouns[match.replace(/\*/g, "")]
                    )
                  )
                )
              : latestDoc;
          d.metadata.pronouns = undefined;
          this.beginEditing(d);
        } else {
          // begin editing
          this.beginEditing(latestDoc);
        }
      }
    );

    return doc$;
  }

  async askForPronouns(
    doc: LiturgicalDocument
  ): Promise<Record<string, string>> {
    const p = doc?.metadata?.pronouns || [];
    if (p.length > 0) {
      const alert = await this.alert.create({
        header: this.translate.instant("pronouns.title"),
        inputs: p.map((text) => ({
          name: text,
          placeholder: text,
          value: text,
        })),
        buttons: [
          {
            text: this.translate.instant("ok"),
          },
        ],
      });
      try {
        await alert.present();
        const { data } = await alert.onDidDismiss();
        const { values } = data;
        return values;
      } catch (e) {
        console.warn(e);
        return {};
      }
    } else {
      return {};
    }
  }

  async beginEditing(doc: LiturgicalDocument) {
    this.latestDoc = doc;

    const loading = await this.loadingController.create({
      backdropDismiss: true,
    });

    await loading.present();

    const docDate = doc.day?.date ? dateFromYMDString(doc?.day?.date) : null,
      formattedDocDate = docDate
        ? `${docDate.getFullYear()}-${
            docDate.getMonth() + 1
          }-${docDate.getDate()}`
        : null,
      prettyDocDate = docDate
        ? `${
            docDate.getMonth() + 1
          }/${docDate.getDate()}/${docDate.getFullYear()}`
        : null,
      label =
        doc.label ??
        (prettyDocDate ? `${doc?.label} (${prettyDocDate})` : doc?.slug) ??
        "Bulletin",
      slug =
        doc.slug ??
        (formattedDocDate ? `${doc?.slug}-${formattedDocDate}` : doc?.slug) ??
        "bulletin";

    // if the document already exists in the database, just open it in the editor
    if (doc.id) {
      await loading.dismiss();
      this.bulletinDocId$.next(doc.id.toString());
      this.editorState$ = this.bulletinDocId$.pipe(
        switchMap((docId) => this.editorService.editorState(docId))
      );
      this.editorStatus$ = this.editorService.status;
    }
    // otherwise, create a new document
    else {
      combineLatest([this.userProfile$, this.userOrgs$])
        .pipe(
          filter(([userProfile, orgs]) => Boolean(userProfile && orgs)),
          takeWhile(
            ([userProfile, orgs]) => Boolean(userProfile && orgs?.length > 0),
            true
          ),
          switchMap(async ([userProfile, orgs]) =>
            this.documents.newDocument(
              new LiturgicalDocument({
                // don't unwrap choices when creating a bulletin from Bulletins page, because we're not making them beforehand
                //... unwrapOptions(doc),
                ...doc,
                label,
                slug,
                sharing: new Sharing({
                  owner: userProfile.uid,
                  organization: (orgs || [])[0]?.slug,
                  collaborators: [],
                  status: "draft",
                  privacy: "organization",
                }),
              })
            )
          )
        )
        .subscribe((docId) => {
          loading.dismiss();
          this.editBulletin(docId);
        });
    }
  }

  async editBulletin(docId: string) {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    await sleep(50);
    this.router.navigate(["bulletin", "b", docId]);
  }

  changeDoc(doc: LiturgicalDocument, event: CustomEvent) {
    const op = this.editorService.opFromChange(event.detail);
    const newValue = new LiturgicalDocument(
      json1.type.apply(
        JSON.parse(JSON.stringify(doc)),
        op
      ) as Partial<LiturgicalDocument>
    );

    this.modifiedDoc$.next(newValue);
  }

  async convertToDocx(
    doc: LiturgicalDocument,
    settings: DisplaySettings,
    hasRetried: boolean = false
  ) {
    // show loading
    const loading = await this.loadingController.create({
      backdropDismiss: true,
    });
    await loading.present();

    const filename = `${doc.label}${
      doc?.day?.date ? ` - ${doc.day.date}` : ""
    }.docx`;
    let blob;

    // post data to create blob
    try {
      const resp = await fetch(
        `https://us-central1-venite-2.cloudfunctions.net/docx`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngsw-bypass": "true",
          },
          body: JSON.stringify({ doc, settings }),
        }
      );
      blob = await resp.blob();
    } catch (e) {
      console.warn(e);

      const alert = await this.alert.create({
        header: this.translate.instant("docx.error-header"),
        message: this.translate.instant("docx.error-message"),
        buttons: [
          {
            text: this.translate.instant("Ok"),
          },
        ],
      });

      await alert.present();
    }

    // download the blob
    await this.downloadService.download(
      blob,
      filename,
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // hide loading
    await loading.dismiss();
  }

  async actionSheet(data: ActionSheetData) {
    const canDownloadWord = !!URL.createObjectURL;

    // Action Sheet
    let buttons: any[] = [
      {
        text: this.translate.instant("Cancel"),
        icon: "close",
        role: "cancel",
      },
    ];

    // TODO — when should Speech option be displayed?
    if (!this.bulletinMode) {
      const voices = await this.speechService.getVoices();
      //this.voiceChoices && !this.speechPlaying && !this.hasPending) {
      buttons.push({
        text: this.translate.instant("read-aloud"),
        icon: "headset",
        handler: async () => {
          let loading;
          console.log(
            "startSpeech platform",
            !this.platform.is("capacitor") && this.platform.is("ios"),
            this.platform.is("capacitor"),
            this.platform.is("ios")
          );
          if (!this.platform.is("capacitor") && this.platform.is("ios")) {
            console.log("Starting some iOS speech.");
            const u = new SpeechSynthesisUtterance("Loading speech synthesis.");
            speechSynthesis.speak(u);
            loading = await this.loadingController.create({
              backdropDismiss: true,
            });
            await loading.present();
          }
          this.startSpeech(
            voices,
            data.doc,
            data.settings,
            loading || undefined
          );
        },
      });
    }

    // Word
    if (canDownloadWord) {
      buttons.push({
        text: this.translate.instant("Open in Word"),
        icon: "document",
        handler: () =>
          this.convertToDocx(
            data.editorState?.localManager?.document ?? data.doc,
            data.settings
          ),
      });
    }

    // Share Readings
    buttons.push({
      text: this.translate.instant("share-readings.Share Readings"),
      icon: "book",
      handler: () =>
        this.shareReadings(
          data.editorState?.localManager?.document ?? data.doc
        ),
    });

    // Edit Bulletin if it is one
    if (data.doc?.id && data.doc?.day && !this.bulletinMode) {
      buttons.push({
        text: "Edit Bulletin",
        icon: "create",
        handler: () => {
          this.actionSheetController.dismiss();
          this.editBulletin(data.doc.id.toString());
        },
      });
    }
    // Create bulletin if it's not one
    if (!this.bulletinMode && !(data.doc?.id && data.doc?.day)) {
      buttons.push({
        text: "Create Bulletin",
        icon: "create",
        handler: async () => {
          if (this.auth.currentUser()?.uid) {
            this.actionSheetController.dismiss();
            this.beginEditing(
              new LiturgicalDocument({
                ...data.doc,
                slug: `${data.doc.slug}-${data.doc.day.date}`,
              })
            );
          } else {
            const login = await this.modal.create({
              component: LoginComponent,
            });
            await login.present();
            const modalData = await login.onDidDismiss();
            if (modalData.data) {
              this.actionSheetController.dismiss();
              this.beginEditing(data.doc);
            }
          }
        },
      });

      buttons.push({
        text: "Share Quick Link",
        icon: "link",
        handler: async () => {
          if (this.auth.currentUser()?.uid) {
            this.quickLink(data.doc);
          } else {
            const login = await this.modal.create({
              component: LoginComponent,
            });
            await login.present();
            const modalData = await login.onDidDismiss();
            if (modalData.data) {
              this.quickLink(data.doc);
            }
          }
        },
      });
    }

    if (this.bulletinMode) {
      buttons.push({
        text: "Remove Unused Options",
        icon: "trash",
        handler: () => {
          this.editorService.processChange(
            data.editorState?.localManager,
            new Change({
              path: "/",
              op: [
                {
                  type: "set",
                  oldValue: data.doc,
                  value: unwrapOptions(data.editorState.localManager.document),
                },
              ],
            })
          );
        },
      });
    }
    if (!this.bulletinMode) {
      buttons.push({
        text: "Show Settings",
        icon: "cog",
        handler: () => {
          this.actionSheetController.dismiss();
          this.openSettings(data.doc, data.settings);
        },
      });
    }
    buttons = buttons.concat([
      {
        text: "Download JSON",
        icon: "download",
        handler: () => {
          const doc = data.editorState?.localManager?.document ?? data.doc;
          this.downloadService.download(
            new Blob([JSON.stringify(doc)], { type: "application/json" }),
            `${doc?.slug}.ldf.json`,
            "application/json"
          );
        },
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
      header: "Actions",
      buttons,
    });
    await actionSheet.present();
  }

  // TTS
  startSpeech(
    voices: SpeechSynthesisVoice[],
    doc: LiturgicalDocument,
    settings: DisplaySettings,
    loading: any
  ) {
    this.mediaSessionService.setContentEl(this.contentEl);
    this.mediaSessionService.startSpeechAt(
      voices,
      doc,
      settings,
      0,
      0,
      true,
      loading || undefined,
      this.doc$,
      this.settings$
    );
  }

  valueToText(doc: LiturgicalDocument): string {
    let base: string;
    if (doc.value && Array.isArray(doc.value)) {
      if (doc.value[0].hasOwnProperty("text")) {
        base = (doc.value[0] as any).text;
      } else {
        base = doc.value[0] as string;
      }
    }
    return JSON.stringify(base)
      .replace(/[\[\]\{\}\,\"]/g, "")
      .replace(/\&nbsp\;/g, " ");
  }

  // Canticle swap
  sendCanticleOptions(ev: any, data: CanticleData): void {
    const target = querySelectorDeep("ldf-editable-filter-documents");
    if (target) {
      target.setVersions(data.liturgyVersions);
      target.setOptions(
        data.canticleOptions
          .sort((a, b) => (a?.metadata?.number > b?.metadata?.number ? 1 : -1))
          .sort((a, b) => {
            try {
              return parseInt(a?.metadata?.number) >
                parseInt(b?.metadata?.number)
                ? 1
                : -1;
            } catch (e) {
              return a?.metadata?.number > b?.metadata?.number ? 1 : -1;
            }
          })
      );
    }
  }

  // Prayers and Thanksgivings
  sendPAndTs(ev: any, data: LiturgicalDocument[] | undefined): void {
    if (data) {
      ev.target.setOptions(data);
    } else {
      this.swapData$
        .pipe(
          map(([, pAndTs]) => pAndTs),
          take(3)
        )
        .subscribe((data) => {
          this.loadingController.dismiss();
          ev.target.setOptions(data);
        });
    }
  }

  // Selection
  selectionChange(ev: CustomEvent<SelectionData>) {
    this.selection = ev.detail;
  }

  shareTextFormat(
    doc: LiturgicalDocument,
    selection: SelectionData
  ): { title: string; url: string; cite: string; hashtag: string } {
    const baseUrl = this.location.path(),
      anchor = selection.fragment ? `#${selection.fragment}` : "",
      url = `https://www.venite.app${baseUrl}${anchor}`,
      date = dateFromYMDString(doc?.day?.date),
      citation = selectableCitationToString(selection.citation),
      cite = citation ? `${citation ? "- " : ""}${citation}` : "",
      hashtag = `#${doc.label.replace(/\s/g, "")}`,
      title = `${doc.label} - ${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`;
    return { title, url, cite, hashtag };
  }

  async share(doc: LiturgicalDocument, selection: SelectionData) {
    const { title, url, cite, hashtag } = this.shareTextFormat(doc, selection);

    Share.share({
      title,
      text: `“${selection.text}” ${cite} ${hashtag}`,
      url,
      dialogTitle: this.translate.instant("selection.shareTitle"),
    });
  }

  async copy(doc: LiturgicalDocument, selection: SelectionData) {
    const { url, cite, hashtag } = this.shareTextFormat(doc, selection);

    Clipboard.write({
      string: `“${selection.text}” ${cite} ${hashtag} ${url}`,
    })
      .then(() => {
        this.clipboardIcon = "checkmark";

        setTimeout(() => (this.clipboardIcon = "clipboard"), 1000);
      })
      .catch(() => (this.clipboardIcon = "close"));
  }

  async shareReadings(doc: LiturgicalDocument) {
    const readings = (this.flattenDoc(doc) || []).filter(
      (subdoc) => subdoc.type === "bible-reading" && subdoc.style === "long"
    );
    const alert = await this.alert.create({
      header: this.translate.instant("Share Readings"),
      inputs: readings.map((reading, readingIndex) => ({
        name: "readings",
        type: "checkbox",
        value: readingIndex,
        label: reading.citation,
      })),
      buttons: [
        {
          text: this.translate.instant("Cancel"),
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: this.translate.instant("Ok"),
        },
      ],
    });

    await alert.present();

    const { data } = await alert.onDidDismiss();
    const { values } = data;
    if (values) {
      function decode(str) {
        return str.replace(/&#(\d+);/g, function (match, dec) {
          return String.fromCharCode(dec);
        });
      }

      const readingsToShare = values.map((index) => readings[index]);

      console.log(readingsToShare);

      const title = `${this.translate.instant(
        "share-readings.Readings for "
      )} ${doc.label} (${doc.day?.date})`;

      const text =
        readingsToShare
          .map(
            (reading) =>
              `${reading.citation}\n\n${reading.value
                .map((piece) =>
                  piece.type === "heading" ? "\n\n" : decode(piece.text)
                )
                .join("")}`
          )
          .join("\n\n\n\n") + "\n\n";

      if (this.canShare) {
        Share.share({
          title,
          text,
          url: `${environment.baseUrl}${window.location.pathname}`.replace(
            "//",
            "/"
          ),
          dialogTitle: this.translate.instant("share-readings.Share Readings"),
        });
      } else {
        Clipboard.write({
          string: text,
          url: window.location.toString(),
        })
          .then(async () => {
            const toast = await this.toast.create({
              message: this.translate.instant(
                "share-readings.clipboard-success"
              ),
              color: "success",
              duration: 2000,
            });
            await toast.present();
          })
          .catch(async () => {
            const toast = await this.toast.create({
              message: this.translate.instant("share-readings.clipboard-error"),
              color: "danger",
              duration: 4000,
            });
            await toast.present();
          });
      }
    }
  }

  async optionSendStoredSelection(ev: CustomEvent) {
    const optionDoc: LiturgicalDocument | undefined = ev.detail?.el?.doc;
    if (optionDoc?.slug) {
      const stored = await this.storage.get(
        `option-selected-${optionDoc.slug}`
      );
      if (stored) {
        const selection = Number(stored);

        // select in UI
        ev.detail.el.select(selection, true);
      }
    }
  }

  async optionSaveSelection(ev: CustomEvent) {
    const { slug, index } = ev.detail;
    await this.storage.set(`option-selected-${slug}`, index.toString());
  }

  // Create bulletin quick link
  async quickLink(doc: LiturgicalDocument) {
    const owner = this.auth.currentUser()?.uid;

    const loading = await this.loadingController.create({
      backdropDismiss: true,
    });
    await loading.present();

    const docId = await this.documents.newDocument(
      new LiturgicalDocument({
        ...unwrapOptions(doc),
        sharing: new Sharing({
          owner,
          collaborators: [],
          status: "published",
          privacy: "public",
        }),
      })
    );

    const url = `${environment.baseUrl}pray/b/${docId}`;

    const alert = await this.alert.create({
      header: "Bulletin Published",
      message: `Your bulletin is now available at<br><br><pre>${url}</pre>`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Copy Link",
          handler: async () => {
            try {
              await Clipboard.write({ url });
            } catch (e) {
              console.warn(e);
              try {
                clipboardPolyfill.writeText(url);
              } catch (e) {
                console.warn(e);
              }

              const alert = await this.alert.create({
                header: "Error Copying URL",
                message: `Your browser prevented automatically copying the URL to the clipboard. You can select it below and copy and paste manually.<br><br><pre>${url}</pre>`,
                buttons: [
                  {
                    text: "OK",
                  },
                ],
              });
              await alert.present();
            }
          },
        },
        {
          text: "Go",
          handler: () => this.router.navigate(["pray", "b", docId]),
        },
      ],
    });

    await alert.present();

    await loading.dismiss();
  }
}
