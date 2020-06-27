import { Injectable } from '@angular/core';
import { LiturgicalDocument, LiturgicalColor, LiturgicalDay, ClientPreferences, Liturgy, Option, LectionaryEntry, Psalm, BibleReading } from '@venite/ldf';

import { Observable, of, combineLatest } from 'rxjs';
import { DocumentService } from '../services/document.service';
import { map, switchMap, startWith, tap, filter } from 'rxjs/operators';
import { LectionaryService } from '../services/lectionary.service';

@Injectable({
  providedIn: 'root'
})
export class PrayService {
  public latestChildren$ : Observable<LiturgicalDocument>[];

  constructor(
    private documents : DocumentService,
    private lectionaryService : LectionaryService
  ) { }

  /** Returns the complete and filtered form for a doc within a particular liturgical context
   * If it should not be included given its day and condition, filter it out
   * If it is incomplete, find its complete form in the database */
  compile(docBase : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    const doc = docBase instanceof LiturgicalDocument ? docBase : new LiturgicalDocument(docBase);

    // should the doc be included?
    if(doc.include(day, prefs)) {

      // recurse if doc is a `Liturgy` or an `Option` (and therefore contains other, nested docs), 
      if((doc.type == 'liturgy' || doc.type == 'option')&& doc.value?.length > 0) {
        this.latestChildren$ = ((docBase as Liturgy)
          .value
          .map(child => this.compile(child, day, prefs)));
        console.log('latestChildren', this.latestChildren$);
        return combineLatest(
          // convert each child document in `Liturgy.value` into its own compiled Observable<LiturgicalDocument>
          // and combine them into a single Observable that fires when any of them changes
          // startWith(undefined) so it doesn't need to wait for all of them to load
          ... this.latestChildren$
        ).pipe(
          tap(compiledChildren => console.log('compiledChildren = ', compiledChildren)),
          map(compiledChildren => new LiturgicalDocument({
            ... docBase,
            value: compiledChildren
          }))
        );
      }

      // if doc has a `lookup` and not a `value`, compile it
      if(doc.hasOwnProperty('lookup') && (!doc.value || doc.value.length == 0)) {
        return this.lookup(doc, day, prefs, []);
      }
    
      // if doc has a `slug` and not a `value`, add `lookup` type of `slug` and recompile
      else if(doc.hasOwnProperty('slug') && !doc.hasOwnProperty('value')) {
        return this.compile(new LiturgicalDocument({ ...doc, lookup: { type: 'slug' } }), day, prefs);
      }

      // if doc has a `category` and not a `value`, add `lookup` type of `category` and recompile
      else if(doc.hasOwnProperty('category') && !doc.hasOwnProperty('value')) {
        return this.compile(new LiturgicalDocument({ ...doc, lookup: { type: 'category' } }), day, prefs);
      }

      // otherwise, check whether the doc should be included
      // if so, return it as an `Observable`
      else {
        return of(doc);
      }
    }

    // if we don't want to include it, return null
    else {
      return of(null);
    }
  }

  /** Return the complete form of a doc from the database, depending on what is specified in `lookup` property */
  lookup(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, alternateVersions : string[] = undefined) : Observable<LiturgicalDocument> {
    const versions = alternateVersions?.length > 0 ? [ doc.version || 'bcp1979', ... alternateVersions ] : [ doc.version ];
  
    switch(doc.lookup.type) {
      case 'lectionary':
        return doc.type == 'psalm'
          ? this.lookupPsalter(doc, day, prefs)
          : this.lookupLectionaryReadings(doc, day, prefs);
      case 'canticle-table':
        break;
      case 'category':
        return this.lookupByCategory(
          doc.category,
          doc.language,
          versions
        );

      /* for lookup's of the `slug` type, return an Observable of either
       * a) the only document matching the document's language/version, or
       * b) an LDF `Option` consisting of all matches */
      case 'slug':
      default:
        return this.lookupBySlug(
          doc.slug,
          doc.language,
          versions
        );
    }
  }

  /* There are two ways to convert a `LiturgicalDocument[]` to a single `LiturgicalDocument`
   * Either to include them in parallel as multiples choices with an `Option`
   * Or to convert them to a `Liturgy`, which will display them all serially */
  docsToOption(docs : LiturgicalDocument[], versions : string[] = undefined) : LiturgicalDocument {
    const sorted = versions?.length > 0
      ? docs.sort((a, b) => versions.indexOf(a.version) - versions.indexOf(b.version))
      : docs;
    return docs?.length > 1
      // if multiple LiturgicalDocuments given, return an Option made up of them
      ? new Option({
        'type': 'option',
        metadata: { selected: 0 },
        value: docs
      })
      // if only one LiturgicalDocument given, return that document 
      : docs[0];
  }

  docsToLiturgy(docs : LiturgicalDocument[]) : LiturgicalDocument {
    return docs?.length > 1
      // if multiple LiturgicalDocuments given, return a Liturgy made up of them
      ? new Liturgy({
        'type': 'liturgy',
        value: docs
      })
      // if only one LiturgicalDocument given, return that document 
      : docs[0];
  }

  /* Look up documents (either single, as options, or rotating) by `slug` or `category` */

  /** Gives either a single `LiturgicalDocument` matching that slug, or (if multiple matches) an `Option` of all the possibilities  */
  lookupBySlug(slug : string, language : string, versions : string[]) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsBySlug(slug, language, versions).pipe(
      map(docs => this.docsToOption(docs, versions))
    );
  }

  /** Gives either a single `LiturgicalDocument` matching that category, or (if multiple matches) an `Option` of all the possibilities  */
  lookupByCategory(category : string[], language : string, versions : string[]) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsByCategory(category, language, versions).pipe(
      map(docs => this.docsToOption(docs, versions))
    );
  }

  /* Look up readings or psalms by `LiturgicalDay` and chosen lectionary preference */

  lookupLectionaryReadings(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    // Bible Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `bibleVersion`, then c) New Revised Standard Version
    const version : string = doc.version || prefs['bibleVersion'] || 'NRSV';

    return this.findReadings(doc, day, prefs).pipe(
      map(entries => (entries || []).map(entry => (new LiturgicalDocument({
        ... doc,
        citation : entry.citation,
        version,
        language : doc.language || 'en',
        label: entry.citation
      })))),
      map(docs => this.docsToOption(docs))
    );
  }

  lookupPsalter(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    // Psalm Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `psalterVersion`, then c) BCP 1979
    const version : string = doc.version || prefs['psalterVersion'] || 'bcp1979';

    return this.findReadings(doc, day, prefs).pipe(
      map(entries => (entries || []).map(entry => (new LiturgicalDocument({
        ... doc,
        style: 'psalm',
        slug : entry.citation,
        version,
        language : doc.language || 'en',
        lookup: { type: 'slug' }
      })))),
      // pack these into a `Liturgy` object
      map(docs => this.docsToLiturgy(docs)),
      // compile that `Liturgy` object, which will look up each of its `value` children
      // (i.e., each psalm) by its slug
      switchMap(option => this.compile(option, day, prefs)),
      // sort the psalms by number in increasing order
      tap(liturgy => console.log('about to sort on', liturgy)),
      map(liturgy => new LiturgicalDocument({
        ... liturgy,
        value: liturgy.value.sort((a, b) => a.metadata?.number - b.metadata?.number)
      }))
    )
  }

  /** Finds lectionary readings, for either Bible readings or psalter */
  findReadings(doc, day, prefs) : Observable<LectionaryEntry[]> {
    const lectionary : string = typeof doc.lookup.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          reading : string = typeof doc.lookup.item === 'string' || doc.lookup.item === 'number' ? doc.lookup.item.toString() : prefs[doc.lookup.item.preference];

    return this.lectionaryService.getReadings(day, lectionary, reading);
  }
}
