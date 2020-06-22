import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { LocalDocumentManager, ServerDocumentManager, DocumentManagerChange } from './document-manager';
import { LiturgicalDocument, Change } from '@venite/ldf';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';
import { EditorService } from './editor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalController } from '@ionic/angular';
//import { LdfEditableAddBlockMenu } from '@venite/angular/src/directives/proxies';
import { AddBlockComponent } from '../add-block/add-block.component';

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

    // update the document once every 5ms
    this.docSaved$ = this.localManager$.pipe(
      debounceTime(3000),
      tap(localManager => console.log(localManager.document)),
      switchMap(localManager => this.documents.saveDocument(localManager.docId, JSON.parse(JSON.stringify(localManager.document)))),
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

  // Called whenever the user wants to add a new LiturgicalDocument block at JSON pointer `base`/`index`
  async addBlock(manager : LocalDocumentManager, ev : CustomEvent) {
    const { base, index } = ev.detail,
          modal = await this.modal.create({
            component: AddBlockComponent,
            swipeToClose: true
          });
    modal.componentProps = { modal };

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      this.add(manager, base, index, data);
      console.log('added', data);
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
}
