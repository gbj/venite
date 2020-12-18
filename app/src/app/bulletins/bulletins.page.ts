import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LiturgicalDocument } from '@venite/ldf';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UserProfile } from '../auth/user/user-profile';
import { BLANK_TEMPLATES } from '../editor/blank-templates';
import { EditorService } from '../editor/ldf-editor/editor.service';
import { OrganizationService } from '../organization/organization.module';
import { DocumentService, IdAndDoc } from '../services/document.service';
import { DownloadService } from '../services/download.service';
import { slugify } from '../slugify';
import { CreateBulletinModalComponent } from './create-bulletin-modal/create-bulletin-modal.component';

const docSearch = (includeBulletins : boolean, includeTemplates : boolean, includeFragments : boolean) => ([search, docs] : [string, IdAndDoc[]]) => docs.filter(doc =>
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
)
.sort((a, b) => {
  const aDate = a.data.date_modified?.toDate(),
    bDate = b.data.date_modified?.toDate();
  return aDate > bDate ? -1 : 1;
});

@Component({
  selector: 'venite-bulletins',
  templateUrl: './bulletins.page.html',
  styleUrls: ['./bulletins.page.scss'],
})
export class BulletinsPage implements OnInit {
  mode : 'bulletins' | 'templates' = 'bulletins';

  userProfile$ : Observable<UserProfile>;

  // All documents to which the user has edit access
  search$ : BehaviorSubject<string> = new BehaviorSubject('');
  myDocs$ : Observable<IdAndDoc[]>;
  orgDocs$ : Observable<IdAndDoc[]>;
  sharedDocs$ : Observable<IdAndDoc[]>;
  searchResults$ : Observable<IdAndDoc[]> = of([]);

  // Templates
  templates$: Observable<{ label: string; factory: (string) => LiturgicalDocument}[]>;
  templatesToggled : boolean = false;

  // Document import
  @ViewChild('importInput') importInput;

  constructor(
    public auth : AuthService,
    private documents : DocumentService,
    public editorService : EditorService,
    private router : Router,
    private alert : AlertController,
    private translate : TranslateService,
    private organizationService : OrganizationService,
    private downloadService : DownloadService,
    private modal : ModalController
  ) { }

  ngOnInit() {
    this.mode = Boolean(location?.pathname?.startsWith('/bulletins')) ? 'bulletins' : 'templates';

        // If no docId is given, we use this list of all documents
    // All docs
    const myUnfilteredDocs$ = this.auth.user.pipe(
      filter(user => user !== null),
      switchMap(user => this.documents.myLiturgies(user?.uid))
    );
  
    this.myDocs$ = combineLatest([this.search$,  myUnfilteredDocs$]).pipe(
      map(([search, docs]) => docSearch(this.mode === 'bulletins', this.mode === 'templates', this.mode === 'templates')([search, docs]))
    );

    const orgs$ = this.auth.user.pipe(
      filter(user => user !== null),
      switchMap(user => this.organizationService.organizationsWithUser(user?.uid))
    );

    this.orgDocs$ = combineLatest([this.search$, this.auth.user, orgs$.pipe(
      switchMap(orgs => orgs?.length > 0 ? this.documents.myOrganizationDocuments(orgs) : of([]))
    )]).pipe(
      map(([search, user, docs]) => docSearch(this.mode === 'bulletins', this.mode === 'templates', this.mode === 'templates')([search, docs])
        .filter(doc => doc?.data?.sharing?.owner !== user?.uid)
      )
    );

    this.searchResults$ = combineLatest([this.auth.user, this.search$, orgs$]).pipe(
      switchMap(([user, search, orgs]) => Boolean(search) ? this.documents.search(user?.uid, search, orgs) : [])
    );

    this.userProfile$ = this.auth.user.pipe(
      switchMap(user => this.auth.getUserProfile(user?.uid))
    );

    this.templates$ = combineLatest(
      of(BLANK_TEMPLATES),
      this.documents.getAllLiturgyOptions().pipe(
        map(liturgies => liturgies.filter(liturgy => !Boolean(liturgy?.metadata?.supplement)))
      ),
      orgs$
    ).pipe(
      switchMap(async ([templates, liturgies, orgs]) => liturgies
        .map(liturgy => ({
          label: liturgy.label,
          factory: (label : any) => new LiturgicalDocument({
            ... liturgy,
            slug: slugify(label),
            label
          })
        }))
        .concat(templates)
      ),
      //tap(tpls => //console.log('templates = ', tpls))
    )
  }

  async clearBulletins(docs : LiturgicalDocument[]) {
    const alert = await this.alert.create({
      header: "Are you sure you want to delete everything?",
      message: "This will delete every one of the bulletins listed on this page. It's only intended for testing.",
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => docs.forEach(doc => {
            if(doc.id) {
              this.documents.deleteDocument(doc.id?.toString());
            }
          })
        }
      ]
    });
    await alert.present();
  }

  joinDocument(docId : string) {
    this.router.navigate([this.mode === 'bulletins' ? 'bulletin' : 'template', docId]);
  }

  trackIdAndDocBy(index : number, item : IdAndDoc) {
    return item.id || index;
  }

  async createBulletin() {
    const modal = await this.modal.create({
      component: CreateBulletinModalComponent
    });
    modal.componentProps = {
      modal
    };
    await modal.present();
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

  async handleImport(event : Event, userProfile : UserProfile) {
    const files = (<HTMLInputElement>event.target).files;
    Array.from(files).forEach(file => {
      if(file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = async e => {
          const doc : LiturgicalDocument = JSON.parse(e.target.result.toString());
          doc.sharing.owner = userProfile.uid;
          doc.sharing.organization = (userProfile.orgs || [])[0];
          const docId = await this.documents.newDocument(doc);
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
