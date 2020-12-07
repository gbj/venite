import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { LocalDocumentManager, ServerDocumentManager, DocumentManagerChange } from './document-manager';
import { LiturgicalDocument, Change, Option, docsToLiturgy, Sharing, docsToOption, DisplaySettings } from '@venite/ldf';
import { switchMap, debounceTime, tap, map, mapTo, startWith, filter, catchError } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';
import { EditorService, EditorStatus, EditorStatusCode } from './editor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
//import { LdfEditableAddBlockMenu } from '@venite/angular/src/directives/proxies';
import { AddBlockComponent } from '../add-block/add-block.component';
import { SharingComponent } from '../sharing/sharing.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EditorDisplaySettingsComponent } from '../editor-display-settings/editor-display-settings.component';
import { TranslateService } from '@ngx-translate/core';
import { EditorState } from './editor-state';

@Component({
  selector: 'venite-ldf-editor',
  templateUrl: './ldf-editor.component.html',
  styleUrls: ['./ldf-editor.component.scss'],
})
export class LdfEditorComponent implements OnInit, OnDestroy {
  @Input() docId : string;
  @Input() state : EditorState;
  @Input() serverManager : ServerDocumentManager;
  @Input() preview : boolean = false;
  @Input() includeToolbar : boolean = false;

  editorStatus : Observable<EditorStatus>;
  editorStatusCode = EditorStatusCode;

  state$ : Observable<EditorState>;

  // For Gloria Patri requests
  glorias : Record<string, LiturgicalDocument> = {};
  gloriaSubscription : Subscription;

  constructor(
    public auth : AuthService,
    private documents : DocumentService,
    private editorService : EditorService,
    private modal : ModalController,
    private alert : AlertController,
    private translate : TranslateService,
    private navCtrl : NavController,
    private loading : LoadingController
  ) { }

  async permissionDenied() : Promise<null> {
    const alert = await this.alert.create({
      header: this.translate.instant('editor.permission-denied-header'),
      message: this.translate.instant('editor.permission-denied'),
      buttons: [
        {
          text: this.translate.instant('editor.go-back'),
          handler: () => this.navCtrl.back()
        }
      ]
    });
    await alert.present();
    return null;
  }

  ngOnInit() {
    this.showLoading();

    document.addEventListener('editorAskForCanticleOptions', (e) => console.log('editorAskForCanticleOptions', e))

    this.editorStatus = this.editorService.status;

    this.state$ = this.editorService.editorState(this.docId).pipe(
      catchError(() => this.permissionDenied()),
      tap(() => this.loading.dismiss())
    );
  }

  async ngOnDestroy() {
    if(this.gloriaSubscription) {
      this.gloriaSubscription.unsubscribe();
    }
    await this.editorService.leave(this.docId);
  }

  async showLoading() {
    const loading = await this.loading.create();
    await loading.present();
  }


  // Called whenever the user's cursor moves within this editor
  updateCursor(docId : string, ev : CustomEvent) {
    console.log('update cursor', docId, ev.detail);
    this.editorService.updateCursor(docId, ev.detail);
  }

  // Called whenever the user changes a document within this editor
  processChange(manager : LocalDocumentManager, ev : CustomEvent) {
    this.editorService.processChange(manager, ev.detail);
  }

  addBlockDirectly(manager : LocalDocumentManager, ev : CustomEvent) {
    const { base, index } = ev.detail;
    this.addBlock((data) => this.add(manager, base, index, data));
  }

  addBlockAsOption(manager : LocalDocumentManager, ev : CustomEvent) {
    const { base, index, obj } = ev.detail;
    // Add an option to an existing `Option`
    if(obj.type == 'option') {
      this.addBlock((data) =>
        this.add(manager, `${base}/value`, index, data)
      );
    }
    // Otherwise, add a new doc and convert the whole thing to an `Option`
    else {
      this.addBlock((data) =>
        this.replace(
          manager, base, index, obj,
          [
            new Option({
              type: 'option',
              metadata: { selected: 0 },
              // TODO -- convert to Liturgy if data really has more than one member
              // do this by moving the docToLiturgy and docToOption stuff into LDF and calling it here and in PrayService
              value: [ obj, docsToLiturgy(data) ]
            })
          ]
        )
      )
    }
  }

  addGloriaPatri(manager: LocalDocumentManager, ev : CustomEvent) {
    const { path, language, version, oldValue } = ev.detail;
    if(this.gloriaSubscription) {
      this.gloriaSubscription.unsubscribe();
    }
    if(this.glorias[`${language}-${version}`]) {
      this.editorService.processChange(manager, new Change({
        path: `${path}/metadata/gloria`,
        op: [{
          type: 'set',
          oldValue,
          value: this.glorias[`${language}-${version}`]
        }]
      }));
    } else {
      this.gloriaSubscription = this.documents.findDocumentsBySlug('gloria-patri', language, [version]).subscribe({
        next: (value) => {
          this.editorService.processChange(manager, new Change({
            path: `${path}/metadata/gloria`,
            op: [{
              type: 'set',
              oldValue,
              value: docsToOption(value)
            }]
          }));
          this.glorias[`${language}-${version}`] = docsToOption(value);
        }
      });
    }
  }
  
  // Called whenever the user wants to add a new LiturgicalDocument block at JSON pointer `base`/`index`
  async addBlock(callback : (data) => void) {
    const modal = await this.modal.create({
            component: AddBlockComponent,
            swipeToClose: true
          });
    modal.componentProps = { modal };

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      callback(data);
    }
  }

  add(manager: LocalDocumentManager, base : string, index: number, template : LiturgicalDocument[]) {
    /*const change = new Change({
      path: base, 
      op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
        .map(value => ({
          type: 'insertAt',
          index: index,
          value
        }))
    });
    console.log(change);
    this.editorService.processChange(manager, change);*/
    template.reverse().forEach(value => {
      this.editorService.processChange(
        manager,
        new Change({
          path: base,
          op: [{
            type: 'insertAt',
            index,
            value
          }]
        })
      )
    })
  }

  replace(manager : LocalDocumentManager, base : string, index : number,  oldValue : LiturgicalDocument, template : LiturgicalDocument[]) {
    const path = `${base}/${index}`;
    console.log('replacing', path, 'with', template[0]);
    // TODO: handle trying to insert an Array (like a hymn) as an Option field, which won't work unless we pack it up as a Liturgy
    const change = new Change({
      path,
      op: [{
        type: 'set',
        oldValue,
        value: template[0]
      }]
    });
    this.editorService.processChange(manager, change);
  }

  // ldf-editable-metadata-metadata-fields might emit an ldfAskForBibleIntros event
  // in response, we should call the setBibleIntros methods of that component
  sendBibleIntros(ev : CustomEvent, intros : LiturgicalDocument[] = []) {
    ev.detail.setBibleReadingIntros(intros);
  }

  // ldf-psalm might emit an ldfAskForCanticleOptions event
  // in response, we should call the setVersions and setOptions methods of that component
  // setVersions(Record<string, string>) and setOptions(LiturgicalDocument[])
  sendCanticleOptions(ev : CustomEvent, versions : Record<string, string>, options : LiturgicalDocument[]) {
    console.log('sendCanticleOptions', versions, options)
    ev.detail.setVersions(versions);
    ev.detail.setOptions(options);
  }
}
