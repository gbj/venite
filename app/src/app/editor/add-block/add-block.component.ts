import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, Subject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { LiturgicalDocument, sortPsalms, Psalm } from '@venite/ldf';
//import { MenuOption } from '@venite/components/dist/types/components/editable-add-block-menu/menu-options';
import { DocumentService } from 'src/app/services/document.service';

class MenuOption {
  label: string;
  section: string[];
  icon: () => any;
  template?: LiturgicalDocument[];
  hidden?: boolean;
  needsMoreInfo?: 'psalm' | 'canticle' | 'lectionary' | 'hymn' | 'liturgy' | 'invitatory' | 'image';
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
    private documentService : DocumentService
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
      tap(val => console.log('completeSubscription', val))
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
              map(objs => objs.map(obj => new LiturgicalDocument({
                ... obj,
                // strip out value, which can be looked up asynchronously rather than storing it
                value: undefined,
                lookup: { type: "slug" }
              })))
            ))
          )
          return this.complete;
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
          console.log('loading a hymn!');
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
              )
            )),
          );
          return this.complete; // otherwise, it's already complete and we can return the original
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

}
