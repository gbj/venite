import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs'; 
import { switchMap, map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './editor.service';
import { LiturgicalDocument, User } from '@venite/ldf';
import { DocumentManager } from './document-manager';
import { randomColor } from './random-color';

@Component({
  selector: 'venite-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {
  // The document being edited
  docId$ : Observable<string>;
  manager$ : Observable<DocumentManager>;
  doc$ : Observable<LiturgicalDocument>;

  // All documents to which the user has access to edit
  docs$ : Observable<IdAndDoc[]>;


  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    private editorService : EditorService,
  ) { }

  ngOnInit() {
    // Current doc
    this.docId$ = this.route.params.pipe(
      // grab the docId from params
      map(params => params.docId)
    );
    this.manager$ = this.docId$.pipe(
      switchMap(docId => this.editorService.join(docId)),
    );
    this.doc$ = this.manager$.pipe(
      map(manager => new LiturgicalDocument(manager.doc)),
    );

    // All docs
    this.docs$ = this.documents.findDocuments();
  }

  // OnDestroy -- leave document
  ngOnDestroy() {
    this.editorService.leave();
  //  this.subscription.unsubscribe();
  }

  // Called whenever the user's cursor moves within this editor
  updateCursor(docId : string, ev : CustomEvent) {
    this.editorService.updateCursor(docId, ev.detail);
  }

  // Called whenever the user changes a document within this editor
  updateDoc(docId : string, doc : LiturgicalDocument, ev : CustomEvent) {
    const newDoc = this.editorService.updateDoc(docId, doc, ev.detail);
 //   this.doc$.next(JSON.parse(JSON.stringify(newDoc)));
  }

}
