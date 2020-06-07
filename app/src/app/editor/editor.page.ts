import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, combineLatest, merge } from 'rxjs'; 
import { switchMap, map, tap, take, startWith, throttle, throttleTime, filter, debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './editor.service';
import { LiturgicalDocument, User } from '@venite/ldf';
import { DocumentManagerChange, LocalDocumentManager, ServerDocumentManager } from './document-manager';

@Component({
  selector: 'venite-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {
  // The document being edited
  docId$ : Observable<string>;
  private _docId : string; // current value of the docId -- only used to leave
  localManager$ : Observable<LocalDocumentManager>;
  serverManager$ : Observable<ServerDocumentManager>;
  doc$ : Observable<LiturgicalDocument>;

  // Handle external revisions
  revisions$ : Observable<DocumentManagerChange[]>;
  revisionSubscription : Subscription;

  // All documents to which the user has access to edit
  docs$ : Observable<IdAndDoc[]>;
  docSaved$ : Observable<Date>;

  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    public editorService : EditorService,
  ) { }

  ngOnInit() {
    // If no docId is given, we use this list of all documents
    // All docs
    this.docs$ = this.documents.findDocuments();

    // If a docId is given, we use all the below
    // Current doc
    this.docId$ = this.route.params.pipe(
      // grab the docId from params
      filter(params => params.hasOwnProperty('docId')),
      map(params => params.docId),
      tap(docId => this._docId = docId)
    );
    // Document manager
    const managers$ = this.docId$.pipe(
      switchMap(docId => this.editorService.join(docId)),
    );
    this.localManager$ = managers$.pipe(map(({ local }) => local));
    this.serverManager$ = managers$.pipe(
      map(({ server }) => server)
    );

    // List of revisions
    this.revisions$ = this.docId$.pipe(
      switchMap(docId => this.editorService.findRevisions(docId)),
    );

    // Apply changes from revisions
    this.revisionSubscription = combineLatest(this.localManager$, this.revisions$).subscribe(
      ([localManager, revisions]) => this.editorService.handleRemoteChanges(localManager, revisions)
    );

    // update the document once every 5ms
    /*this.docSaved$ = combineLatest(this.docId$, this.doc$).pipe(
      debounceTime(5000),
      switchMap(([docId, doc]) => this.documents.saveDocument(docId, JSON.parse(JSON.stringify(doc)))),
      map(() => new Date())
    )*/
  }

  // OnDestroy -- leave document
  ngOnDestroy() {
    if(this.revisionSubscription) {
      this.revisionSubscription.unsubscribe();
    }
    this.editorService.leave(this._docId);
  }

  // Called whenever the user's cursor moves within this editor
  updateCursor(docId : string, ev : CustomEvent) {
    this.editorService.updateCursor(docId, ev.detail);
  }

  // Called whenever the user changes a document within this editor
  processChange(manager : LocalDocumentManager, ev : CustomEvent) {
    this.editorService.processChange(manager, ev.detail);
  }

}
