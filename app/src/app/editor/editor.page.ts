import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, combineLatest, merge } from 'rxjs'; 
import { switchMap, map, tap, take, startWith, throttle, throttleTime, filter, debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './editor.service';
import { LiturgicalDocument, User } from '@venite/ldf';
import { DocumentManager, DocumentManagerChange } from './document-manager';
import { randomColor } from './random-color';
import * as Automerge from 'automerge';

@Component({
  selector: 'venite-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {
  // The document being edited
  docId$ : Observable<string>;
  manager$ : Observable<DocumentManager>;
  doc$ : Observable<Automerge.Doc<LiturgicalDocument>>;
  changes$ : Observable<DocumentManagerChange[]>;//LiturgicalDocument>;

  // All documents to which the user has access to edit
  docs$ : Observable<IdAndDoc[]>;
  docSaved$ : Observable<Date>;

  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    private editorService : EditorService,
  ) { }

  ngOnInit() {
    // If no docId is given, we use this list of all documents
    // All docs
    this.docs$ = this.documents.findDocuments();

    // If a docId is given, we used all the below
    // Current doc
    this.docId$ = this.route.params.pipe(
      // grab the docId from params
      filter(params => params.hasOwnProperty('docId')),
      map(params => params.docId)
    );
    // Document manager
    this.manager$ = this.docId$.pipe(
      switchMap(docId => this.editorService.join(docId)),
    );
    // Changes applied by other users to this document
    this.changes$ = this.docId$.pipe(
      switchMap(docId => this.editorService.findChanges(docId)),
    );

    // Latest version of the document
    this.doc$ = combineLatest(this.editorService.latestDoc, this.changes$).pipe(
      tap(value => console.log('combineLatest', value)),
      map(([doc, changes]) => this.editorService.applyExternalChanges(doc, changes))
    );
    // update the document once every 5ms
    this.docSaved$ = combineLatest(this.docId$, this.doc$).pipe(
      debounceTime(3000),
      switchMap(([docId, doc]) => this.documents.saveDocument(docId, JSON.parse(JSON.stringify(doc)))),
      map(() => new Date())
    )
  }

  // OnDestroy -- leave document
  ngOnDestroy() {
    this.editorService.leave();
  }

  // Called whenever the user's cursor moves within this editor
  updateCursor(docId : string, ev : CustomEvent) {
    this.editorService.updateCursor(docId, ev.detail);
  }

  // Called whenever the user changes a document within this editor
  updateDoc(docId : string, doc : LiturgicalDocument, ev : CustomEvent) {
    this.editorService.updateDoc(docId, doc, ev.detail);
  }

}
