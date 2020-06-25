import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject, of } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { LiturgicalDocument } from '@venite/ldf';
import { MenuOption } from '@venite/components/dist/types/components/editable-add-block-menu/menu-options';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'venite-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss'],
})
export class AddBlockComponent implements OnInit, OnDestroy {
  @Input() language : string = 'en';
  @Input() modal : any;

  addition : MenuOption;
  additionalMode : 'psalm' | 'lectionary' | 'canticle' | 'hymn' | undefined;
  // used in ldf-editable-filter-documents
  additionalVersions : Observable<{[key: string]: string}>;
  additionalOptions : Observable<LiturgicalDocument[]>;
  // used for lectionary select
  additionalReadingNames : Observable<{[key: string]: string}>;

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

  completeOption(addition : MenuOption) : Observable<LiturgicalDocument[]> {
    // store the `MenuOption` we're passed in case we need to access it in a callback from one of the forms below
    this.addition = addition;

    // types like Psalm, Canticle, and Lectionary Readings need another component to be completed
    switch(addition.needsMoreInfo) {
      case 'psalm':
        this.additionalMode = 'psalm';
        this.additionalVersions = this.documentService.getVersions(this.language, 'psalm')
        this.additionalOptions = this.documentService.find({ type: 'psalm', style: 'psalm' }).pipe(
          map(psalms => psalms.map(psalm => new LiturgicalDocument({ ... psalm, value: undefined })))
        );
        return this.complete;
      case 'lectionary':
        this.additionalMode = 'lectionary';
        this.additionalVersions = this.documentService.getVersions(this.language, 'lectionary');
        this.additionalReadingNames = this.documentService.getVersions(this.language, 'readings');
        return this.complete;
      case 'canticle':
        this.additionalMode = 'canticle';
        this.additionalVersions = this.documentService.getVersions(this.language, 'liturgy');
        this.additionalOptions = this.documentService.find({ type: 'psalm', style: 'canticle' }).pipe(
          map(objs => objs.map(obj => new LiturgicalDocument({ ... obj, value: undefined })))
        );
        return this.complete;
      case 'hymn':
        //TODO
        return this.complete;
      // otherwise, it's already complete and we can return the original
      default:
        return of(addition.template);
    }
  }

  readingSelected(selection: { lectionary : string; reading : string; }) {
    const { lectionary, reading } = selection;
    this.complete.next(
      (this.addition.template || [])
        .map(doc => new LiturgicalDocument({
          ... doc, 
          lookup: {
            type: 'lectionary',
            table: lectionary,
            item: reading
          }
        }))
    );
  }

}
