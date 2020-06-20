import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'; 
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './ldf-editor/editor.service';
import { LiturgicalDocument } from '@venite/ldf';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'venite-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {
  // The document being edited
  docId$ : Observable<string>;

  // All documents to which the user has access to edit
  search$ : BehaviorSubject<string> = new BehaviorSubject('');
  myDocs$ : Observable<IdAndDoc[]>;
  orgDocs$ : Observable<IdAndDoc[]>;
  sharedDocs$ : Observable<IdAndDoc[]>;

  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    public editorService : EditorService,
    private router : Router,
  ) { }

  ngOnInit() {
    // If no docId is given, we use this list of all documents
    // All docs
    const myUnfilteredDocs$ = this.auth.user.pipe(
      tap(user => console.log('searching for docs where owner = ', user.uid)),
      switchMap(user => this.documents.myDocuments(user.uid))
    );
    this.myDocs$ = combineLatest(this.search$, myUnfilteredDocs$).pipe(
      map(([search, docs]) => docs.filter(doc => 
        doc.data.label?.toLowerCase().includes(search.toLowerCase()) || 
        doc.data.slug?.toLowerCase().includes(search.toLowerCase()) ||
        doc.data.type?.toLowerCase().includes(search.toLowerCase()) ||
        doc.data.category.includes(search.toLowerCase())
      ))
    )
    //this.orgDocs$ = this.documents.myOrganizationDocuments();

    // If a docId is given, we'll pass it down to the `LdfEditorComponent`
    this.docId$ = this.route.params.pipe(
      // grab the docId from params
      filter(params => params.hasOwnProperty('docId')),
      map(params => params.docId),
    );
  }

  joinDocument(docId : string) {
    this.router.navigate(['editor', docId]);
  }

  trackIdAndDocBy(index : number, item : IdAndDoc) {
    return item.id || index;
  }
}
