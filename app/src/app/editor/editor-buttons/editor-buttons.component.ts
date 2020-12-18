import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Change, DisplaySettings, LiturgicalDocument, Sharing } from '@venite/ldf';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { EditorDisplaySettingsComponent } from '../editor-display-settings/editor-display-settings.component';
import { LocalDocumentManager } from '../ldf-editor/document-manager';
import { EditorService, EditorStatus } from '../ldf-editor/editor.service';
import { SharingComponent } from '../sharing/sharing.component';

import { Plugins } from '@capacitor/core';
const { Clipboard } = Plugins;
import * as clipboardPolyfill from 'clipboard-polyfill';
import { EditorState } from '../ldf-editor/editor-state';

@Component({
  selector: 'venite-editor-buttons',
  templateUrl: './editor-buttons.component.html',
  styleUrls: ['./editor-buttons.component.scss'],
})
export class EditorButtonsComponent implements OnInit {
  @Input() state : EditorState;
  @Input() status : EditorStatus;
  @Input() collapse : boolean = false;
  @Input() includeAuthButton : boolean = false;
  @Input() publishButton : boolean = true;

  clipboardStatus : 'idle' | 'success' | 'error';

  constructor(
    public auth : AuthService,
    private editorService : EditorService,
    private modal : ModalController,
    private router : Router,
    private alert : AlertController,
  ) { }

  ngOnInit() {}

  async sharingModal(sharing : Sharing) {
    const modal = await this.modal.create({
      component: SharingComponent,
      swipeToClose: true
    });
    modal.componentProps = {
      modal,
      sharing
    };
    await modal.present();
  }

  async shareLink(manager : LocalDocumentManager, doc : LiturgicalDocument) {
    this.editorService.processChange(manager, new Change({
      path: '/sharing',
      op: [{
        type: 'set',
        index: 'status',
        value: 'published',
        oldValue: doc?.sharing?.status
      }]
    }));
    this.editorService.processChange(manager, new Change({
      path: '/sharing',
      op: [{
        type: 'set',
        index: 'privacy',
        value: 'public',
        oldValue: doc?.sharing?.privacy
      }]
    }));

    const orgId = doc?.sharing?.organization,
      slug = doc?.slug;
    //console.log('Publishing\n\n', orgId, slug);
    let docUrl = orgId && slug ? `${orgId}/${slug}` : `b/${manager.docId}`;
    const alert = await this.alert.create({
      header: 'Bulletin Published',
      message: `Your bulletin is now available at\n\n${environment.baseUrl}pray/${docUrl}\n\n`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Copy Link',
          handler: () => {
            const link = `${environment.baseUrl}pray/${docUrl}`;
            Clipboard.write({ url: link }).then(() => this.clipboardStatus = 'success')
              .catch(() => {
                clipboardPolyfill.writeText(link)
                  .then(() => this.clipboardStatus = 'success')
                  .catch(() => this.clipboardStatus = 'error');
              });
          }
        },
        {
          text: 'Go',
          handler: () => orgId && slug
            ? this.router.navigate(['pray', orgId, slug])
            : this.router.navigate(['pray', 'b', manager.docId])
        }
      ]
    });

    await alert.present();
  }

  async displaySettings(manager : LocalDocumentManager, doc : LiturgicalDocument) {
    const modal = await this.modal.create({
      component: EditorDisplaySettingsComponent
    });

    const prefUpdated = new EventEmitter<{ key: string; value: any; }>();
    prefUpdated.subscribe((data : { key: string; value: any; }) => {
      if(!doc.display_settings) {
        const value = new DisplaySettings();
        value[data.key] = data.value;
        this.editorService.processChange(manager, new Change({
          path: '/display_settings',
          op: [{
            type: 'set',
            value,
            oldValue: doc.display_settings
          }]
        }));
      } else {
        this.editorService.processChange(manager, new Change({
          path: '/display_settings',
          op: [{
            type: 'set',
            index: data.key,
            value: data.value,
            oldValue: (doc?.display_settings || {})[data.key]
          }]
        }));
      }
    });

    modal.componentProps = {
      modal,
      isModal: true,
      settings: doc.display_settings || new DisplaySettings(),
      prefUpdated
    };

    await modal.present();
  }

}
