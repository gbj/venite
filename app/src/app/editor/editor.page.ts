import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs'; 
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './ldf-editor/editor.service';
import { LiturgicalDocument, BibleReadingVerse, BibleReading, Text, Sharing, ResponsivePrayer } from '@venite/ldf';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from '../auth/user/user-profile';
import { OrganizationService } from '../organization/organization.module';

const docSearch = ([search, docs] : [string, IdAndDoc[]]) => docs.filter(doc => 
  doc.data.label?.toLowerCase().includes(search.toLowerCase()) || 
  doc.data.slug?.toLowerCase().includes(search.toLowerCase()) ||
  doc.data.type?.toLowerCase().includes(search.toLowerCase()) ||
  doc.data.category?.includes(search.toLowerCase())
)

@Component({
  selector: 'venite-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {
  userProfile$ : Observable<UserProfile>;

  // The document being edited
  docId$ : Observable<string>;

  // All documents to which the user has access to edit
  search$ : BehaviorSubject<string> = new BehaviorSubject('');
  myDocs$ : Observable<IdAndDoc[]>;
  orgDocs$ : Observable<IdAndDoc[]>;
  sharedDocs$ : Observable<IdAndDoc[]>;
  searchResults$ : Observable<IdAndDoc[]> = of([]);

  // Templates for new documents
  templates$: Observable<{ label: string; factory: (string) => LiturgicalDocument}[]> = of([
    {
      label: "Liturgy",
      factory: (label) => new LiturgicalDocument({
        type: 'liturgy',
        metadata: {
          preferences: {},
          special_preferences: {}
        },
        label,
        value: [new LiturgicalDocument({
          type: 'heading',
          style: 'text',
          metadata: {
            level: 1
          },
          value: [label]
        })]
      })
    },
    {
      label: "Prayer",
      factory: (label) => new Text({
        type: 'text',
        style: 'prayer',
        label,
        value: ['']
      })
    },
    {
      label: "Responsive Prayer",
      factory: (label) => new ResponsivePrayer({
        type: 'responsive',
        style: 'responsive',
        label,
        value: [{
          text: '',
          response: ''
        }]
      })
    },
    {
      label: "Bible Reading",
      factory: (label) => new BibleReading({
        type: 'bible-reading',
        style: 'short',
        value: [
          new BibleReadingVerse({
            book: '', chapter: '', verse: '', text: ''
          })
        ]
      })
    },
  ]);

  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    public editorService : EditorService,
    private router : Router,
    private alert : AlertController,
    private translate : TranslateService,
    private organizationService : OrganizationService
  ) { }

  ngOnInit() {
    // If no docId is given, we use this list of all documents
    // All docs
    const myUnfilteredDocs$ = this.auth.user.pipe(
      switchMap(user => this.documents.myLiturgies(user.uid))
    );
  
    this.myDocs$ = combineLatest([this.search$, myUnfilteredDocs$]).pipe(
      map(docSearch)
    );

    const orgs$ = this.auth.user.pipe(
      switchMap(user => this.organizationService.organizationsWithUser(user.uid))
    );

    this.orgDocs$ = combineLatest([this.search$, orgs$.pipe(
      switchMap(orgs => this.documents.myOrganizationDocuments(orgs))
    )]).pipe(
      map(docSearch)
    );

    this.searchResults$ = combineLatest([this.auth.user, this.search$, orgs$]).pipe(
      switchMap(([user, search, orgs]) => Boolean(search) ? this.documents.search(user.uid, search, orgs) : [])
    );

    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => this.auth.getUserProfile(user.uid))
    );

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

  async copy(userProfile : UserProfile, doc : LiturgicalDocument) {
    const newDocId = await this.documents.newDocument(doc);
    this.joinDocument(newDocId);
  }

  async delete(docId : string, label : string) {
    const alert = await this.alert.create({
      header: this.translate.instant('editor.confirm_deletion_header', { label }),
      message: this.translate.instant('editor.confirm_deletion'), // 'Are you sure you want to delete this document?',
      buttons: [
        {
          text: this.translate.instant('editor.cancel'), //'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: this.translate.instant('editor.delete'), // 'Delete',
          handler: () => this.documents.deleteDocument(docId)
        }
      ]
    });

    await alert.present();

  }
}
