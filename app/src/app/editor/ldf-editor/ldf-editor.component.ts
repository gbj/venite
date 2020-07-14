import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { LocalDocumentManager, ServerDocumentManager, DocumentManagerChange } from './document-manager';
import { LiturgicalDocument, Change, Option, docsToLiturgy, Sharing } from '@venite/ldf';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';
import { EditorService } from './editor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
//import { LdfEditableAddBlockMenu } from '@venite/angular/src/directives/proxies';
import { AddBlockComponent } from '../add-block/add-block.component';
import { SharingComponent } from '../sharing/sharing.component';

@Component({
  selector: 'venite-ldf-editor',
  templateUrl: './ldf-editor.component.html',
  styleUrls: ['./ldf-editor.component.scss'],
})
export class LdfEditorComponent implements OnInit, OnDestroy {
  @Input() docId : string;

  localManager$ : Observable<LocalDocumentManager>;
  serverManager$ : Observable<ServerDocumentManager>;
  doc$ : Observable<LiturgicalDocument>;

  // Handle external revisions
  revisions$ : Observable<DocumentManagerChange[]>;
  revisionSubscription : Subscription;

  docSaved$ : Observable<Date>;

  constructor(
    public auth : AuthService,
    private documents : DocumentService,
    private editorService : EditorService,
    private modal : ModalController
  ) { }

  ngOnInit() {
    // Document manager
    this.serverManager$ = this.editorService.join(this.docId);

    this.localManager$ = this.serverManager$.pipe(
      switchMap(serverManager => this.editorService.localManager(serverManager.docId)),
    );

    // List of revisions
    this.revisions$ = this.editorService.findRevisions(this.docId);

    // Apply changes from revisions
    this.revisionSubscription = combineLatest(this.localManager$, this.serverManager$, this.revisions$).subscribe(
      ([localManager, serverManager, revisions]) => this.editorService.applyChanges(localManager, serverManager, revisions));

    // update the document once every 3s
    this.docSaved$ = this.localManager$.pipe(
      debounceTime(3000),
      switchMap(localManager => this.documents.saveDocument(localManager.docId, {
        ... localManager.document,
        lastRevision: localManager.lastSyncedRevision
      })),
      map(() => new Date())
    )
  }

  async ngOnDestroy() {
    if(this.revisionSubscription) {
      this.revisionSubscription.unsubscribe();
    }
    await this.editorService.leave(this.docId);
  }


  // Called whenever the user's cursor moves within this editor
  updateCursor(docId : string, ev : CustomEvent) {
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
      
    }
    // Otherwise, add a new doc and convert the whole thing to an `Option`
    else {
      this.addBlock((data) =>
        this.replace(
          manager, base, index, obj,
          [
            new Option({
              type: 'option',
              metadata: { selected: 1 },
              // TODO -- convert to Liturgy if data really has more than one member
              // do this by moving the docToLiturgy and docToOption stuff into LDF and calling it here and in PrayService
              value: [ obj, docsToLiturgy(data) ]
            })
          ]
        )
      )
    }
  }

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
    const change = new Change({
      path: base, 
      op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
        .map(value => ({
          type: 'insertAt',
          index: index,
          value
        }))
    });
    console.log(change);
    this.editorService.processChange(manager, change);
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
}
