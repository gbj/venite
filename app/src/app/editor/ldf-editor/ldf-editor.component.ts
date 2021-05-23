import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
} from "@angular/core";
import { Observable, Subscription, combineLatest, of } from "rxjs";
import {
  LocalDocumentManager,
  ServerDocumentManager,
  DocumentManagerChange,
} from "./document-manager";
import {
  LiturgicalDocument,
  Change,
  Option,
  docsToLiturgy,
  Sharing,
  docsToOption,
  DisplaySettings,
} from "@venite/ldf";
import {
  switchMap,
  debounceTime,
  tap,
  map,
  mapTo,
  startWith,
  filter,
  catchError,
  first,
} from "rxjs/operators";
import { DocumentService } from "src/app/services/document.service";
import {
  EditorService,
  EditorStatus,
  EditorStatusCode,
} from "./editor.service";
import { AuthService } from "src/app/auth/auth.service";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { AddBlockComponent } from "../add-block/add-block.component";
import { TranslateService } from "@ngx-translate/core";
import { EditorState } from "./editor-state";
import { querySelectorDeep } from "query-selector-shadow-dom";
import { isOnline } from "./is-online";
import { PrayService } from "../../pray/pray.service";
import { isCompletelyCompiled } from "src/app/pray/is-completely-compiled";

@Component({
  selector: "venite-ldf-editor",
  templateUrl: "./ldf-editor.component.html",
  styleUrls: ["./ldf-editor.component.scss"],
})
export class LdfEditorComponent implements OnInit, OnDestroy {
  @Input() docId: string;
  @Input() state: EditorState;
  @Input() serverManager: ServerDocumentManager;
  @Input() preview: boolean = false;
  @Input() includeToolbar: boolean = false;

  editorStatus: Observable<EditorStatus>;
  editorStatusCode = EditorStatusCode;

  state$: Observable<EditorState>;
  settingsClasses$: Observable<string>;

  // For Gloria Patri requests
  glorias: Record<string, LiturgicalDocument> = {};
  gloriaSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private documents: DocumentService,
    private editorService: EditorService,
    private modal: ModalController,
    private alert: AlertController,
    private translate: TranslateService,
    private navCtrl: NavController,
    private loading: LoadingController,
    private toast: ToastController,
    private prayService: PrayService
  ) {}

  async permissionDenied(): Promise<null> {
    const alert = await this.alert.create({
      header: this.translate.instant("editor.permission-denied-header"),
      message: this.translate.instant("editor.permission-denied"),
      buttons: [
        {
          text: this.translate.instant("editor.go-back"),
          handler: () => this.navCtrl.back(),
        },
      ],
    });
    await alert.present();
    return null;
  }

  ngOnInit() {
    this.editorStatus = this.editorService.status;

    this.state$ = this.editorService
      .editorState(this.docId)
      .pipe(catchError(() => this.permissionDenied()));

    this.settingsClasses$ = this.state$.pipe(
      map((state) => state?.localManager?.document?.display_settings),
      filter((settings) => Boolean(settings)),
      map((settings) =>
        [
          "ldf-wrapper",
          settings.dropcaps ? `dropcaps-${settings.dropcaps}` : "",
          settings.response ? `response-${settings.response}` : "",
          settings.repeatAntiphon
            ? `repeat-antiphon-${settings.repeatAntiphon}`
            : "",
          settings.fontscale
            ? `fontscale-${settings.fontscale.toString()}`
            : "",
          settings.font ? `font-${settings.font}` : "",
          `psalmverses-${settings.psalmVerses}`,
          `bibleverses-${settings.bibleVerses}`,
          settings.bolded ? `bolded-${settings.bolded}` : "",
        ].join(" ")
      ),
      startWith("ldf-wrapper")
    );

    this.setupOnlineListener();
  }

  async setupOnlineListener() {
    let toast;
    isOnline().subscribe(async (isOnline) => {
      if (isOnline && toast) {
        await toast.dismiss();
      } else if (!isOnline) {
        toast = await this.toast.create({
          message: this.translate.instant("editor.offline"),
        });
        await toast.present();
      }
    });
  }

  async ngOnDestroy() {
    if (this.gloriaSubscription) {
      this.gloriaSubscription.unsubscribe();
    }
    await this.editorService.leave(this.docId);
  }

  // Called whenever the user's cursor moves within this editor
  updateCursor(docId: string, ev: CustomEvent) {
    //console.log('update cursor', docId, ev.detail);
    this.editorService.updateCursor(docId, ev.detail);
  }

  // Called whenever the user changes a document within this editor
  processChange(manager: LocalDocumentManager, ev: CustomEvent) {
    this.editorService.processChange(manager, ev.detail);
  }

  async addBlockDirectly(manager: LocalDocumentManager, ev: CustomEvent) {
    const { base, index } = ev.detail;

    // if in bulletin mode, and not template mode, compile the addition first
    this.addBlock((data: LiturgicalDocument[]) => {
      const compiled$ = manager.document.day
        ? this.prayService.compile(
            docsToLiturgy(data),
            manager.document.day,
            {},
            manager.document.metadata?.liturgyversions,
            {}
          )
        : of(docsToLiturgy(data));
      compiled$
        .pipe(
          filter((doc) => !manager.document.day || isCompletelyCompiled(doc)),
          first()
        )
        .subscribe((data) => {
          if (data) {
            this.add(manager, base, index, [data]);
            const path = `${base}/${index}`,
              el = querySelectorDeep(`[path="${path}"]`);
            // make the block editable now, or wait a tick then try
            if (el) {
              this.makeBlockEditable(base, index);
            } else {
              setTimeout(() => this.makeBlockEditable(base, index), 10);
            }
          }
        });
    });
  }

  makeBlockEditable(base: string, index: number) {
    const path = `${base}/${index}`,
      el = querySelectorDeep(`[path="${path}"]`);
    el.setAttribute("editable", "true");
    el.setAttribute("preview", "false");
  }

  addBlockAsOption(manager: LocalDocumentManager, ev: CustomEvent) {
    const { base, index, obj } = ev.detail;
    // Add an option to an existing `Option`
    if (obj.type == "option") {
      this.addBlock((data) => this.add(manager, `${base}/value`, index, data));
    }
    // Otherwise, add a new doc and convert the whole thing to an `Option`
    else {
      this.addBlock((data) =>
        this.replace(manager, base, index, obj, [
          new Option({
            type: "option",
            condition: obj?.condition,
            metadata: { selected: 0 },
            // TODO -- convert to Liturgy if data really has more than one member
            // do this by moving the docToLiturgy and docToOption stuff into LDF and calling it here and in PrayService
            value: [obj, docsToLiturgy(data)],
          }),
        ])
      );
    }
  }

  addGloriaPatri(manager: LocalDocumentManager, ev: CustomEvent) {
    const { path, language, version, oldValue } = ev.detail;
    if (this.gloriaSubscription) {
      this.gloriaSubscription.unsubscribe();
    }
    if (this.glorias[`${language}-${version}`]) {
      this.editorService.processChange(
        manager,
        new Change({
          path: `${path}/metadata/gloria`,
          op: [
            {
              type: "set",
              oldValue,
              value: this.glorias[`${language}-${version}`],
            },
          ],
        })
      );
    } else {
      this.gloriaSubscription = this.documents
        .findDocumentsBySlug("gloria-patri", language, [version])
        .subscribe({
          next: (value) => {
            this.editorService.processChange(
              manager,
              new Change({
                path: `${path}/metadata/gloria`,
                op: [
                  {
                    type: "set",
                    oldValue,
                    value: docsToOption(value),
                  },
                ],
              })
            );
            this.glorias[`${language}-${version}`] = docsToOption(value);
          },
        });
    }
  }

  // Called whenever the user wants to add a new LiturgicalDocument block at JSON pointer `base`/`index`
  async addBlock(callback: (data) => void) {
    const modal = await this.modal.create({
      component: AddBlockComponent,
      swipeToClose: true,
    });
    modal.componentProps = { modal };

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      callback(data);
    }
  }

  add(
    manager: LocalDocumentManager,
    base: string,
    index: number,
    template: LiturgicalDocument[]
  ) {
    /*const change = new Change({
      path: base, 
      op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
        .map(value => ({
          type: 'insertAt',
          index: index,
          value
        }))
    });
    //console.log(change);
    this.editorService.processChange(manager, change);*/
    template.reverse().forEach((value) => {
      this.editorService.processChange(
        manager,
        new Change({
          path: base,
          op: [
            {
              type: "insertAt",
              index,
              value,
            },
          ],
        })
      );
    });
  }

  replace(
    manager: LocalDocumentManager,
    base: string,
    index: number,
    oldValue: LiturgicalDocument,
    template: LiturgicalDocument[]
  ) {
    const path = `${base}/${index}`;
    //console.log('replacing', path, 'with', template[0]);
    // TODO: handle trying to insert an Array (like a hymn) as an Option field, which won't work unless we pack it up as a Liturgy
    const change = new Change({
      path,
      op: [
        {
          type: "set",
          oldValue,
          value: template[0],
        },
      ],
    });
    this.editorService.processChange(manager, change);
  }

  // ldf-editable-metadata-metadata-fields might emit an ldfAskForBibleIntros event
  // in response, we should call the setBibleIntros methods of that component
  sendBibleIntros(ev: CustomEvent, intros: LiturgicalDocument[] = []) {
    const target =
      ev.detail ||
      document.querySelector("ldf-editable-metadata-metadata-fields");
    target.setBibleReadingIntros(intros);
    if (
      !(intros?.length > 0) ||
      (intros?.length == 1 && intros[0].value[0] == "Loading...")
    ) {
      // todo fix language/version here
      this.documents
        .findDocumentsByCategory(["Bible Reading Introduction"], "en")
        .subscribe((data) => ev.detail.setBibleReadingIntros(data));
    }
  }

  // ldf-psalm might emit an ldfAskForCanticleOptions event
  // in response, we should call the setVersions and setOptions methods of that component
  // setVersions(Record<string, string>) and setOptions(LiturgicalDocument[])
  sendCanticleOptions(
    ev: CustomEvent,
    versions: Record<string, string>,
    options: LiturgicalDocument[]
  ) {
    ev.detail.setVersions(versions);
    ev.detail.setOptions(options);
  }

  // ldf-prayers-and-thanksgivings might emit an ldfAskForPrayersAndThanksgivings event
  // in response, we should call the setOptions method of that component
  async sendPrayersAndThanksgivings(
    ev: CustomEvent,
    versions: Record<string, string>,
    options: LiturgicalDocument[]
  ) {
    //const options = await this.documents.findDocumentsByCategory(["Prayers and Thanksgivings"], "en", ["bcp1979"]).toPromise();
    console.log("sendP&T", options);
    ev.detail.setOptions(options);
    //ev.detail.setVersions(versions);
  }

  // one of the arrow keys in a sub-doc has been clicked, so it should move up or down in the parent doc's `value`
  moveSubDoc(
    manager: LocalDocumentManager,
    ev: CustomEvent<{ base: string; oldIndex: number; diff: number }>
  ) {
    this.editorService.processChange(
      manager,
      new Change({
        path: ev.detail.base,
        op: [
          {
            type: "move",
            oldValue: ev.detail.oldIndex,
            value: ev.detail.oldIndex + ev.detail.diff,
          },
        ],
      })
    );

    setTimeout(
      () =>
        this.makeBlockEditable(
          ev.detail.base,
          ev.detail.oldIndex + ev.detail.diff
        ),
      10
    );
  }
}
