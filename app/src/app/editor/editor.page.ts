import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, combineLatest, merge, of } from 'rxjs'; 
import { switchMap, map, tap, take, startWith, throttle, throttleTime, filter, debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './editor.service';
import { LiturgicalDocument, User } from '@venite/ldf';
import { DocumentManagerChange, LocalDocumentManager, ServerDocumentManager } from './document-manager';
import { AlertController } from '@ionic/angular';

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
  search$ : BehaviorSubject<string> = new BehaviorSubject('');
  myDocs$ : Observable<IdAndDoc[]>;
  orgDocs$ : Observable<IdAndDoc[]>;
  sharedDocs$ : Observable<IdAndDoc[]>;
  docSaved$ : Observable<Date>;

  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    public editorService : EditorService,
    private router : Router,
    private alert : AlertController
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

    // If a docId is given, we use all the below
    // Current doc
    this.docId$ = this.route.params.pipe(
      // grab the docId from params
      filter(params => params.hasOwnProperty('docId')),
      map(params => params.docId),
      tap(docId => this._docId = docId)
    );
    // Document manager
    this.serverManager$ = this.docId$.pipe(
      switchMap(docId => this.editorService.join(docId)),
    );
    this.localManager$ = this.serverManager$.pipe(
      switchMap(serverManager => this.editorService.localManager(serverManager.docId)),
    );

    // List of revisions
    this.revisions$ = this.docId$.pipe(
      switchMap(docId => this.editorService.findRevisions(docId)),
    );

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

  // Create and navigate to a new document
  async new() {
    const alert = await this.alert.create({
      header: 'Create Document',  // TODO: i18n translate whole alert
      inputs: [
        {
          name: 'label',
          type: 'text',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Create',
          handler: value => this.createNew(value.label)
        }
      ]
    });

    await alert.present();
  }

  async createNew(label : string) {
    const docId = await this.documents.newDocument(new LiturgicalDocument({
      'type': 'liturgy',
      label,
      'value': [new LiturgicalDocument({
        'type': 'text',
        'value': ['']
      })]
    }));

    this.router.navigate(['editor', docId]);
  }

  trackIdAndDocBy(index : number, item : IdAndDoc) {
    return item.id || index;
  }
}
