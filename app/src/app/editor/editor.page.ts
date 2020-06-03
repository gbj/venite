import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'; 
import { switchMap, map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './editor.service';
import { LiturgicalDocument, User } from '@venite/ldf';
import { DocumentManager } from './document-manager';

@Component({
  selector: 'venite-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit, OnDestroy {
  // The document being edited
  docId$ : Observable<string>;
  doc$ : Observable<LiturgicalDocument>;
  manager$ : Observable<DocumentManager>;

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
    this.doc$ = this.route.params.pipe(
      switchMap(params => this.documents.findDocumentById(params.docId))
    );
    this.docId$ = this.route.params.pipe(
      // grab the docId from params
      map(params => params.docId)
    );
    this.manager$ = this.docId$.pipe(
      switchMap(docId => this.editorService.join(docId)),
    );

    // All docs
    this.docs$ = this.documents.findDocuments();
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
  updateDoc(docId : string, ev : CustomEvent) {
    this.editorService.updateDoc(docId, ev.detail);
  }

}
