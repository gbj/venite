import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, Inject } from '@angular/core';

import { Observable, BehaviorSubject, Subject, Subscription, combineLatest, of, interval } from 'rxjs';
import { tap, map, take, filter, mergeMap, startWith, switchMap } from 'rxjs/operators';

import { Liturgy, ProperLiturgy, LiturgicalDocument } from '@venite/ldf';
import { DocumentServiceInterface, DOCUMENT_SERVICE } from '@venite/ng-service-api';
import { PrayMenuConfig } from '../pray-menu-config';

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

  /** Emits `Liturgy[]` when menu is loaded */
  @Output() liturgyOptionsChange : EventEmitter<LiturgicalDocument[]> = new EventEmitter();

  // Liturgies depending on language and version
  language$ : Subject<string> = new Subject();
  version$ : Subject<string> = new Subject();
  languageVersionLiturgies$ : Observable<LiturgicalDocument[]>;

  // Menu pulled from LiturgyMenuService
  liturgyOptions : Observable<LiturgicalDocument[]>;

  // Current state of the actual menu
  selectState : Observable<{ value: string; options: LiturgicalDocument[] }>;

  constructor(
    @Inject('config') private config : PrayMenuConfig,
    @Inject(DOCUMENT_SERVICE) private documents : DocumentServiceInterface
  ) {
    this.properLiturgySubject.next(this.properLiturgy);
    this.language$.next(this.language);
    this.version$.next(this.version);
  }

  ngOnInit() {
    this.languageVersionLiturgies$ = combineLatest(
      this.language$.pipe(startWith(this.language || this.config.defaultLanguage)),
      this.version$.pipe(startWith(this.version || this.config.defaultVersion))
    ).pipe(
      switchMap(([language, version]) => this.documents.getLiturgyOptions(language, version)),
      map(liturgies => liturgies.filter(liturgy => !Boolean(liturgy?.metadata?.supplement)))
    );

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
      this.properLiturgyLiturgy.pipe(startWith(undefined)),  // startWith allows us to combine even if no proper liturgy
      this.languageVersionLiturgies$.pipe(startWith([]))
    ).pipe(
      map(([properLiturgy, liturgyOptions]) => properLiturgy ? new Array(properLiturgy).concat(liturgyOptions) : liturgyOptions),
      tap(options => this.liturgyOptionsChange.emit(options)),
      tap(() => this.liturgySubject.next(this.liturgy || this.liturgyOfTheHour(new Date())))
    );

    // set state of the menu
    this.selectState = combineLatest(this.liturgySubject, this.liturgyOptions, this.properLiturgyLiturgy.pipe(startWith(undefined)))
      .pipe(
        map(([baseLiturgy, options, properLiturgy]) => ({
          value: properLiturgy?.slug || baseLiturgy,
          options: options
        })),
        // emit a starting value
        tap(({ value, options }) => {
          const liturgy = options.find(opt => opt.slug == value);
          if(liturgy) {
            this.liturgyChange.emit(liturgy);
          }
        })
      );
  }

  ngOnChanges(changes : SimpleChanges) {
    if(changes.properLiturgy?.currentValue !== changes.properLiturgy?.previousValue) {
      this.properLiturgySubject.next(changes.properLiturgy.currentValue);
    }

    if(changes.language?.currentValue !== changes.language?.previousValue) {
      this.language$.next(changes.language.currentValue);
    }

    if(changes.version?.currentValue !== changes.version?.previousValue) {
      this.version$.next(changes.version.currentValue);
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
    const hour : number = now.getHours();
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
