import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs'; 
import { switchMap, map, filter, startWith } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { EditorService } from './ldf-editor/editor.service';
import { LiturgicalDocument } from '@venite/ldf';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from '../auth/user/user-profile';
import { OrganizationService } from '../organization/organization.module';
import { DownloadService } from '../services/download.service';
import { BLANK_TEMPLATES } from './blank-templates';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormGroup, IFormBuilder } from "@rxweb/types";
import { slugify } from '../slugify';

const docSearch =  (includeBulletins : boolean, includeTemplates : boolean, includeFragments : boolean) => ([search, docs] : [string, IdAndDoc[]]) => docs.filter(doc =>
  (
    (includeBulletins || !Boolean(doc.data.day)) &&
    (includeTemplates || Boolean(doc.data.day)) &&
    (includeFragments || !Boolean(doc.data.metadata?.supplement))
  ) &&
  (
    doc.data.label?.toLowerCase().includes(search.toLowerCase()) || 
    doc.data.slug?.toLowerCase().includes(search.toLowerCase()) ||
    doc.data.type?.toLowerCase().includes(search.toLowerCase()) ||
    doc.data.category?.includes(search.toLowerCase())
  )
);

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
  templates$: Observable<{ label: string; factory: (string) => LiturgicalDocument}[]>;
  templatesToggled : boolean = false;
  includeForm : IFormGroup<{ bulletins: boolean; templates: boolean; fragments: boolean; }>;
  form : IFormBuilder;

  constructor(
    public auth : AuthService,
    private route : ActivatedRoute,
    private documents : DocumentService,
    public editorService : EditorService,
    private router : Router,
    private alert : AlertController,
    private translate : TranslateService,
    private organizationService : OrganizationService,
    private downloadService : DownloadService,
    form : FormBuilder
  ) {
    this.form = form;
  }

  @ViewChild('importInput') importInput;

  ngOnInit() {
    this.includeForm = this.form.group<{ bulletins: boolean; templates: boolean; fragments: boolean; }>({
      bulletins: true,
      templates: true,
      fragments: true
    });

    this.templates$ = combineLatest(
      of(BLANK_TEMPLATES),
      this.documents.getAllLiturgyOptions().pipe(
        map(liturgies => liturgies.filter(liturgy => !Boolean(liturgy?.metadata?.supplement)))
      )
    ).pipe(
      map(([templates, liturgies]) => liturgies
        .map(liturgy => ({
          label: liturgy.label,
          factory: (label : any) => new LiturgicalDocument({
            ... liturgy,
            slug: slugify(label),
            label
          })
        }))
        .concat(templates)
      )
    )

    const includeForm$ = this.includeForm.valueChanges.pipe(
      startWith(this.includeForm.value)
    );

    // If no docId is given, we use this list of all documents
    // All docs
    const myUnfilteredDocs$ = this.auth.user.pipe(
      filter(user => user !== null),
      switchMap(user => this.documents.myLiturgies(user?.uid))
    );
  
    this.myDocs$ = combineLatest([this.search$, includeForm$, myUnfilteredDocs$]).pipe(
      map(([search, valueChanges, docs]) => docSearch(valueChanges.bulletins, valueChanges.templates, valueChanges.fragments)([search, docs]))
    );

    const orgs$ = this.auth.user.pipe(
      filter(user => user !== null),
      switchMap(user => this.organizationService.organizationsWithUser(user?.uid))
    );

    this.orgDocs$ = combineLatest([this.search$, includeForm$, orgs$.pipe(
      switchMap(orgs => this.documents.myOrganizationDocuments(orgs))
    )]).pipe(
      map(([search, valueChanges, docs]) => docSearch(valueChanges.bulletins, valueChanges.templates, valueChanges.fragments)([search, docs]))
    );

    this.searchResults$ = combineLatest([this.auth.user, this.search$, orgs$]).pipe(
      switchMap(([user, search, orgs]) => Boolean(search) ? this.documents.search(user?.uid, search, orgs) : [])
    );

    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => this.auth.getUserProfile(user?.uid))
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

  async download(doc : LiturgicalDocument) {
    this.downloadService.download(
      new Blob([JSON.stringify(doc)], { type: 'application/json' }),
      `${doc.slug}.ldf.json`,
      'application/json'
    )
  }

  import() {
    this.importInput.nativeElement.click();
  }

  async handleImport(event : Event) {
    const files = (<HTMLInputElement>event.target).files;
    Array.from(files).forEach(file => {
      if(file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = async e => {
          const doc = JSON.parse(e.target.result.toString()),
            docId = await this.documents.newDocument(doc);
          this.joinDocument(docId);
        };
        reader.readAsText(file);
      }
    })
  }

  toggleTemplates() {
    this.templatesToggled = !this.templatesToggled;
  }
}
