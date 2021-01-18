import { Component, Input, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Observable, Subscription, Subject, of, from } from 'rxjs';
import { take, map, tap, switchMap, filter } from 'rxjs/operators';
import { LiturgicalDocument, sortPsalms, Psalm, BibleReading } from '@venite/ldf';
import { DocumentService } from 'src/app/services/document.service';
import { AuthServiceInterface, AUTH_SERVICE } from '@venite/ng-service-api';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

class MenuOption {
  label: string;
  section: string[];
  icon: () => any;
  template?: LiturgicalDocument[];
  hidden?: boolean;
  needsMoreInfo?: 'psalm' | 'canticle' | 'lectionary' | 'hymn' | 'liturgy' | 'invitatory' | 'image' | 'category' | 'slug' | 'response' | 'reading';
}

@Component({
  selector: 'venite-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss'],
})
export class AddBlockComponent implements OnInit, OnDestroy {
  @Input() language : string = 'en';
  @Input() modal : any;

  @ViewChild('additional') additionalElement;

  addition : MenuOption;
  additionalMode : 'psalm' | 'lectionary' | 'canticle' | 'hymn' | 'liturgy' | 'invitatory' | 'image' | undefined;
  // used in ldf-editable-filter-documents
  additionalVersions : Observable<{[key: string]: string}>;
  additionalOptions : Observable<LiturgicalDocument[]>;
  // used for lectionary/canticle table select
  additionalTable : Observable<{[key: string]: string}>;
  // used in lectionary select
  additionalBibleTranslations : Observable<{[key: string]: string}>;

  // return value
  public complete : Subject<LiturgicalDocument[]> = new Subject();
  completeSubscription : Subscription;

  constructor(
    private documentService : DocumentService,
    public auth : AuthService,
    private translate : TranslateService,
    private alert : AlertController,
    private loading : LoadingController
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    if(this.completeSubscription) {
      this.completeSubscription.unsubscribe();
    }
  }

  add(ev : CustomEvent) {
    const completed = this.completeOption(ev.detail);
    this.completeSubscription = completed.pipe(
      take(1),
      tap(val => {
        //console.log('completeSubscription', val)
      })
    ).subscribe(addition => this.modal.dismiss(addition));
  }

  dismissEmpty() {
    this.modal.dismiss(null);
  }

  completeOption(addition : MenuOption) : Observable<LiturgicalDocument[]> {
    // store the `MenuOption` we're passed in case we need to access it in a callback from one of the forms below
    this.addition = addition;
    if(addition) {
      if(window) {
        window.scrollTo(0, 0);
      }
      // types like Psalm, Canticle, and Lectionary Readings need another component to be completed
      switch(addition.needsMoreInfo) {
        case 'image':
          this.additionalMode = 'image';
          return this.complete;
        case 'psalm':
          this.additionalMode = 'psalm';
          this.additionalVersions = this.documentService.getVersions(this.language, 'psalm');
          this.additionalOptions = this.additionalVersions.pipe(
            map(versions => Object.keys(versions)),
            switchMap(versions => this.documentService.findDocumentsByCategory(['Psalm'], this.language, versions).pipe(
              map(objs => objs.sort((a, b) => sortPsalms(a as Psalm, b as Psalm))),
            ))
          )
          return this.complete;
        case 'reading':
          return from(this.readingAlert()).pipe(
            filter(response => Boolean(response)),
            map(response => [response])
          );
        case 'invitatory':
          this.additionalMode = 'invitatory';
          this.additionalVersions = this.documentService.getVersions(this.language, 'liturgy');
          this.additionalOptions = this.additionalVersions.pipe(
            map(versions => Object.keys(versions)),
            switchMap(versions => this.documentService.findDocumentsByCategory(['Invitatory'], this.language, versions))
          );
          return this.complete; 
        case 'lectionary':
          this.additionalMode = 'lectionary';
          this.additionalVersions = this.documentService.getVersions(this.language, 'lectionary');
          this.additionalTable = this.documentService.getVersions(this.language, 'readings');
          this.additionalBibleTranslations = this.documentService.getVersions(this.language, 'bible-translation')
          this.additionalOptions = this.documentService.findDocumentsByCategory(['Bible Reading Introduction'], this.language)
          return this.complete;
        case 'canticle':
          this.additionalMode = 'canticle';
          this.additionalVersions = this.documentService.getVersions(this.language, 'liturgy');
          this.additionalOptions = this.additionalVersions.pipe(
            map(versions => Object.keys(versions)),
            switchMap(versions => this.documentService.findDocumentsByCategory(['Canticle'], this.language, versions).pipe(
              map(objs => objs.map(obj => new LiturgicalDocument({
                ... obj,
                value: undefined,
                lookup: { type: "slug" }
              })))
            ))
          );
          this.additionalTable = this.documentService.getVersions(this.language, 'canticle-table');
          return this.complete;
        case 'hymn':
          this.additionalMode = 'hymn';
          return this.complete;
        case 'liturgy':
          this.additionalMode = 'liturgy';
          this.additionalVersions = this.documentService.getVersions(this.language, 'liturgy-versions');
          this.additionalOptions = this.additionalVersions.pipe(
            map(versions => Object.keys(versions)),
            switchMap(versions => this.documentService.find({ type: 'liturgy' }).pipe(
              map(objs => objs
                .filter(obj => !obj.day)
                  .map(obj => new LiturgicalDocument({
                  ... obj,
                  // strip out value, which can be looked up asynchronously rather than storing it
                  value: undefined,
                  lookup: { type: "slug" }
                }))
                .sort((a, b) => a.label > b.label ? 1 : -1)
              )
            )),
          );
          return this.complete; 
        case 'category':
          const tplCatDoc = new LiturgicalDocument(addition.template[0] || {});
          this.additionalMode = 'liturgy';
          this.additionalVersions = tplCatDoc.type === 'liturgy'
            // versions like Rite-II, etc.
            ? this.documentService.getVersions(this.language, 'liturgy-versions')
            // versions like bcp1979, etc.
            : this.documentService.getVersions(this.language, 'liturgy');
          this.additionalOptions = this.additionalVersions.pipe(
            map(versions => Object.keys(versions)),
            switchMap(versions => this.documentService.findDocumentsByCategory(tplCatDoc.category, this.language, versions)),
            map(docs => docs.sort((a, b) => a.label > b.label ? 1 : -1))
          );
          return this.complete;
        case 'slug':
          const tplSlugDoc = new LiturgicalDocument(addition.template[0] || {});
          this.additionalMode = 'liturgy';
          this.additionalVersions = tplSlugDoc.type === 'liturgy'
            // versions like Rite-II, etc.
            ? this.documentService.getVersions(this.language, 'liturgy-versions')
            // versions like bcp1979, etc.
            : this.documentService.getVersions(this.language, 'liturgy');
          this.additionalOptions = this.additionalVersions.pipe(
            map(versions => Object.keys(versions)),
            switchMap(versions => this.documentService.findDocumentsBySlug(tplSlugDoc.slug, this.language, versions)),
            map(docs => docs.sort((a, b) => a.label > b.label ? 1 : -1))
          );
          return this.complete;
        case 'response':
          return from(this.responseAlert()).pipe(
            map(response => response
              ? addition.template.map(d => new LiturgicalDocument({
                ...d,
                metadata: {
                  ...d.metadata,
                  response
                }
              }))
              : undefined
            )
          );
        // otherwise, it's already complete and we can return the original
        default:
          return of(addition.template);
      }
    } else {
      this.dismissEmpty();
    }
  }

  readingSelected(selection: { lectionary : string; reading : string; version: string | { preference: string; }; intro: LiturgicalDocument | null; }) {
    const { lectionary, reading, version, intro } = selection;
    this.complete.next(
      (this.addition.template || [])
        .map(doc => new LiturgicalDocument({
          ... doc, 
          lookup: {
            type: 'lectionary',
            table: lectionary,
            item: reading
          },
          version,
          metadata: {
            ... doc.metadata,
            intro
          }
        }))
    );
  }

  async responseAlert() : Promise<string | undefined> {
    const alert = await this.alert.create({
      header: this.translate.instant('editor.response'),
      inputs: [{
        name: 'response',
        placeholder: this.translate.instant('editor.response')
      }],
      buttons: [{
        text: this.translate.instant('editor.cancel'),
        role: 'cancel'
      }, {
        text: this.translate.instant('editor.add')
      }]
    });
    
    await alert.present();

    const data = await alert.onDidDismiss();
    return data?.data?.values?.response;
  }

  async readingAlert() : Promise<BibleReading | null> {
    const alert = await this.alert.create({
      header: this.translate.instant('editor.reading_adder'),
      inputs: [{
        name: 'citation',
        placeholder: this.translate.instant('editor.citation')
      },
      {
        name: 'version',
        placeholder: this.translate.instant('editor.bible_version'),
        value: 'NRSV'
      }],
      buttons: [{
        text: this.translate.instant('editor.cancel'),
        role: 'cancel'
      }, {
        text: this.translate.instant('editor.add')
      }]
    });
    
    await alert.present();

    const data = await alert.onDidDismiss();
    const { citation, version } = data?.data?.values;

    // citation + version => load and insert
    if(citation && version) {
      const loading = await this.loading.create();

      const reading = await this.fetchReading(citation, version);
  
      loading.dismiss();
  
      return reading;
    }
    // citation but not version => insert a lookup by `bibleVersion` pref
    else if(citation) {
      return new BibleReading({
        type: "bible-reading",
        style: "long",
        citation,
        version: {
          preference: "bibleVersion"
        }
      })
    }
    // neither => dismiss
    else {
      return null;
    }
  }

  async fetchReading(
    citation : string,
    version : string,
    api : string = 'https://us-central1-venite-2.cloudfunctions.net'
  ) : Promise<BibleReading> {
    const findURL = new URL(`${api}/bible`);
    findURL.searchParams.append('citation', citation);
    findURL.searchParams.append('version', version);
  
    const response = await fetch(findURL.toString()),
      body = await response.text();
    try {
      return JSON.parse(body);
    } catch {
      throw new Error(body);
    }
  }
}