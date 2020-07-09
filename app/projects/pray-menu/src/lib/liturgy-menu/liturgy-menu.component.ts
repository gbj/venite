import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, Inject } from '@angular/core';

import { Observable, BehaviorSubject, Subject, Subscription, combineLatest, of, interval } from 'rxjs';
import { tap, map, take, filter, mergeMap, startWith } from 'rxjs/operators';

import { Liturgy, ProperLiturgy, LiturgicalDocument } from '@venite/ldf';
import { DocumentServiceInterface, DOCUMENT_SERVICE } from '@venite/ng-service-api';

@Component({
  selector: 'venite-liturgy-menu',
  templateUrl: './liturgy-menu.component.html',
  styleUrls: ['./liturgy-menu.component.scss'],
})
export class LiturgyMenuComponent implements OnInit {
  @Input() language : string = 'en';
  @Input() version : string = 'Rite-II';

  /** Slug of default liturgy */
  @Input() liturgy : string;
  liturgySubject : BehaviorSubject<string> = new BehaviorSubject(undefined);

  /** Information about a proper liturgy for the day to include, if any */
  @Input() properLiturgy : ProperLiturgy;
  properLiturgySubject : BehaviorSubject<ProperLiturgy> = new BehaviorSubject(undefined);
  // The actual liturgy pointed to in the properLiturgy input
  properLiturgyLiturgy : Observable<LiturgicalDocument>;

  /** Emits the `Liturgy` whenever user's selection changes */
  @Output() liturgyChange : EventEmitter<LiturgicalDocument> = new EventEmitter();

  // Menu pulled from LiturgyMenuService
  liturgyOptions : Observable<LiturgicalDocument[]>;

  // Current state of the actual menu
  selectState : Observable<{ value: string; options: LiturgicalDocument[] }>;

  constructor(@Inject(DOCUMENT_SERVICE) private documents : DocumentServiceInterface) { }

  ngOnInit() {
    this.liturgySubject.next(this.liturgy || this.liturgyOfTheHour(new Date()));

    this.properLiturgySubject.next(this.properLiturgy);

    // find actual `Liturgy` documents, given the `ProperLiturgy` we're passed
    this.properLiturgyLiturgy = this.properLiturgySubject.pipe(
      filter(proper => proper?.hasOwnProperty('liturgy')),
      mergeMap(proper => this.documents.findDocumentsBySlug(proper?.liturgy, this.language, undefined)),
      // transform from array of all documents with slug to first document found with correct language and version
      // or just the right language
      map(documents => {
        const matchesLanguageAndVersion = documents.find(doc => doc.language == this.language && doc.version == this.version);
        if(!matchesLanguageAndVersion) {
          const matchesLanguage = documents.find(doc => doc.language == this.language),
                firstOption = documents[0];
          return matchesLanguage || firstOption;
        } else {
          return matchesLanguageAndVersion;
        }
      })
    );

    // combine properLiturgy input liturgyOptions observable from the service
    this.liturgyOptions = combineLatest(
      this.properLiturgyLiturgy.pipe(startWith(null)),  // startWith allows us to combine even if no proper liturgy
      this.documents.getLiturgyOptions(this.language, this.version)
    ).pipe(
      map(([properLiturgy, liturgyOptions]) => properLiturgy ? new Array(properLiturgy).concat(liturgyOptions) : liturgyOptions),
    );

    // set state of the menu
    this.selectState = combineLatest(this.liturgySubject, this.liturgyOptions, this.properLiturgyLiturgy.pipe(startWith(null)))
      .pipe(
        map(([baseLiturgy, options, properLiturgy]) => ({
          value: properLiturgy?.slug || baseLiturgy,
          options: options
        })),
        // emit a starting value
        tap(({ value, options }) => this.liturgyChange.emit(options.find(opt => opt.slug == value)))
      );
  }

  ngOnChanges(changes : SimpleChanges) {
    if(changes.properLiturgy?.currentValue !== changes.properLiturgy?.previousValue) {
      this.properLiturgySubject.next(changes.properLiturgy.currentValue);
    }

    this.liturgySubject.next(changes.liturgy?.currentValue);
  }

  /** Emits liturgyChange() by searching on options for a Liturgy with the slug given */
  update(slug : string, options : Liturgy[]) {
    this.liturgy = slug;
    this.liturgyChange.emit(options.find(option => option.slug == slug));
  }

  // Hard-coded default liturgy slug for any given hour
  liturgyOfTheHour(now : Date) : string {
    let hour : number = now.getHours();
    if(hour > 3 && hour < 11) {
      return "morning-prayer"
    } else if(hour >= 11 && hour <= 14) {
      return "noonday-prayer"
    } else if(hour >= 14 && hour <= 20) {
      return "evening-prayer"
    } else {
      return "compline"
    }
  }
}
