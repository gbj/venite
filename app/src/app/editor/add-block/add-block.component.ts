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

  additionalMode : 'psalm' | 'lectionary' | 'canticle' | 'hymn' | undefined;
  additionalVersions : Observable<string[]>;
  additionalOptions : Observable<LiturgicalDocument[]>;
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
        // TODO lectionary
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

}
