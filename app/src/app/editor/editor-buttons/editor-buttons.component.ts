import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import {
  Change,
  DisplaySettings,
  LiturgicalColor,
  LiturgicalDocument,
  Sharing,
  Liturgy,
} from "@venite/ldf";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { EditorDisplaySettingsComponent } from "../editor-display-settings/editor-display-settings.component";
import { LocalDocumentManager } from "../ldf-editor/document-manager";
import {
  EditorService,
  EditorStatus,
  EditorStatusCode,
} from "../ldf-editor/editor.service";
import { SharingComponent } from "../sharing/sharing.component";

import { Clipboard } from "@capacitor/clipboard";
import * as clipboardPolyfill from "clipboard-polyfill";
import { EditorState } from "../ldf-editor/editor-state";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DocumentService } from "src/app/services/document.service";
import { ColorPickerComponent } from "../color-picker/color-picker.component";
import { FontPickerComponent } from "../font-picker/font-picker.component";

@Component({
  selector: "venite-editor-buttons",
  templateUrl: "./editor-buttons.component.html",
  styleUrls: ["./editor-buttons.component.scss"],
})
export class EditorButtonsComponent implements OnInit {
  @Input() state: EditorState;
  @Input() status: EditorStatus;
  @Input() collapse: boolean = false;
  @Input() includeAuthButton: boolean = false;
  @Input() publishButton: boolean = true;

  colorName$: BehaviorSubject<
    null | string | LiturgicalColor
  > = new BehaviorSubject(null);
  color$: Observable<string>;

  clipboardStatus: "idle" | "success" | "error";

  constructor(
    public auth: AuthService,
    private editorService: EditorService,
    private modal: ModalController,
    private router: Router,
    private alert: AlertController,
    private translate: TranslateService,
    private documents: DocumentService
  ) {}

  ngOnInit() {
    this.color$ = this.colorName$.pipe(
      switchMap((color) => this.documents.getColor(color))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state) {
      const doc: Liturgy = changes.state.currentValue.localManager.document,
        color = doc?.metadata?.color || doc?.day?.color || null;

      this.colorName$.next(color);
    }
  }

  async colorPicker(color: string) {
    const modal = await this.modal.create({
      component: ColorPickerComponent,
    });
    modal.componentProps = {
      modal,
      color,
      localManager: this.state.localManager,
    };
    await modal.present();
  }

  border(color: string) {
    if (color === "var(--ldf-background-color)") {
      return `1px solid red`;
    } else {
      return `1px solid ${color}`;
    }
  }

  async sharingModal(sharing: Sharing) {
    const modal = await this.modal.create({
      component: SharingComponent,
      swipeToClose: true,
    });
    modal.componentProps = {
      modal,
      sharing,
    };
    await modal.present();
  }

  async shareLink(manager: LocalDocumentManager, doc: LiturgicalDocument) {
    this.editorService.processChange(
      manager,
      new Change({
        path: "/sharing",
        op: [
          {
            type: "set",
            index: "status",
            value: "published",
            oldValue: doc?.sharing?.status,
          },
        ],
      })
    );
    this.editorService.processChange(
      manager,
      new Change({
        path: "/sharing",
        op: [
          {
            type: "set",
            index: "privacy",
            value: "public",
            oldValue: doc?.sharing?.privacy,
          },
        ],
      })
    );

    const orgId = doc?.sharing?.organization,
      slug = doc?.slug;
    //console.log('Publishing\n\n', orgId, slug);
    let docUrl =
      orgId && slug
        ? `${orgId}/${encodeURIComponent(slug)}`
        : `b/${manager.docId}`;
    const alert = await this.alert.create({
      header: "Bulletin Published",
      message: `Your bulletin is now available at<br><br><pre>${environment.baseUrl}pray/${docUrl}</pre>`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Copy Link",
          handler: async () => {
            const link = `${environment.baseUrl}pray/${docUrl}`;
            try {
              await Clipboard.write({ url: link });
              this.clipboardStatus = "success";
            } catch (e) {
              console.warn(e);
              try {
                clipboardPolyfill.writeText(link);
                this.clipboardStatus = "success";
              } catch (e) {
                console.warn(e);
              }
              this.clipboardStatus = "error";

              const alert = await this.alert.create({
                header: "Error Copying URL",
                message: `Your browser prevented automatically copying the URL to the clipboard. You can select it below and copy and paste manually.<br><br><pre>${environment.baseUrl}pray/${docUrl}</pre>`,
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
          handler: () =>
            orgId && slug
              ? this.router.navigate(["pray", orgId, slug])
              : this.router.navigate(["pray", "b", manager.docId]),
        },
      ],
    });

    await alert.present();
  }

  async displaySettings(
    manager: LocalDocumentManager,
    doc: LiturgicalDocument
  ) {
    const modal = await this.modal.create({
      component: EditorDisplaySettingsComponent,
    });

    const prefUpdated = new EventEmitter<{ key: string; value: any }>();
    prefUpdated.subscribe((data: { key: string; value: any }) => {
      if (!doc.display_settings) {
        const value = {};
        value[data.key] = data.value;
        this.editorService.processChange(
          manager,
          new Change({
            path: "/display_settings",
            op: [
              {
                type: "set",
                value,
                oldValue: doc.display_settings,
              },
            ],
          })
        );
      } else {
        this.editorService.processChange(
          manager,
          new Change({
            path: "/display_settings",
            op: [
              {
                type: "set",
                index: data.key,
                value: data.value,
                oldValue: (doc?.display_settings || {})[data.key],
              },
            ],
          })
        );
      }
    });

    modal.componentProps = {
      modal,
      isModal: true,
      settings: doc.display_settings || new DisplaySettings(),
      prefUpdated,
    };

    await modal.present();
  }

  async fontModal(manager: LocalDocumentManager) {
    const modal = await this.modal.create({
      component: FontPickerComponent,
    });

    modal.componentProps = {
      modal,
    };

    await modal.present();

    // string | undefined, giving the font name
    const { data } = await modal.onDidDismiss();
    if (data !== undefined) {
      console.log("setting font to ", data);
      this.editorService.processChange(
        manager,
        new Change({
          path: "/metadata/font",
          op: [
            {
              type: "set",
              oldValue: manager.document.metadata?.font,
              value: data == null ? undefined : data,
            },
          ],
        })
      );
    }
  }
}
