import { Injectable, Inject } from '@angular/core';
import { LiturgicalDocument, LiturgicalDay, ClientPreferences, Liturgy, Option, LectionaryEntry, dateFromYMDString, filterCanticleTableEntries, docsToLiturgy, docsToOption } from '@venite/ldf';

import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';
import { DOCUMENT_SERVICE, DocumentServiceInterface, LECTIONARY_SERVICE, LectionaryServiceInterface, CANTICLE_TABLE_SERVICE, CanticleTableServiceInterface, BIBLE_SERVICE, BibleServiceInterface } from 'service-api';

@Injectable({
  providedIn: 'root'
})
export class PrayService {
  public latestChildren$ : Observable<LiturgicalDocument>[];

  constructor(
    @Inject(DOCUMENT_SERVICE) private documents : DocumentServiceInterface,
    @Inject(LECTIONARY_SERVICE) private lectionaryService : LectionaryServiceInterface,
    @Inject(CANTICLE_TABLE_SERVICE) private canticleTableService : CanticleTableServiceInterface,
    @Inject(BIBLE_SERVICE) private bibleService : BibleServiceInterface
  ) { }

  /** Returns the complete and filtered form for a doc within a particular liturgical context
   * If it should not be included given its day and condition, filter it out
   * If it is incomplete, find its complete form in the database */
  compile(docBase : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    const doc = docBase instanceof LiturgicalDocument ? docBase : new LiturgicalDocument(docBase);

    // should the doc be included?
    if(doc.include(new LiturgicalDay(day), prefs)) {

      // recurse if doc is a `Liturgy` or an `Option` (and therefore contains other, nested docs), 
      if((doc.type == 'liturgy' || doc.type == 'option') && doc.value?.length > 0) {
        this.latestChildren$ = ((docBase as Liturgy)
          .value
          .map(child => this.compile(child, day, prefs)));
        return combineLatest(
          // convert each child document in `Liturgy.value` into its own compiled Observable<LiturgicalDocument>
          // and combine them into a single Observable that fires when any of them changes
          // startWith(undefined) so it doesn't need to wait for all of them to load
          ... this.latestChildren$.map(child$ => child$.pipe(startWith(undefined)))
        ).pipe(
          map(compiledChildren => new LiturgicalDocument({
            ... docBase,
            value: compiledChildren
          }))
        );
      }

      // if doc has a `lookup` and not a `value`, compile it
      if(doc.hasOwnProperty('lookup') && (!doc.value || doc.value.length == 0)) {
        return this.lookup(doc, day, prefs, []).pipe(
          // recursively compile to check `doc.include` and `Liturgy.value`/`Option.value`
          map(data => {
            const doc = new LiturgicalDocument(data);
            if(doc.include(new LiturgicalDay(day), prefs)) {
              return doc;
            } else {
              return undefined;
            }
          })
        );
      }
    
      // if doc has a `slug` and not a `value`, add `lookup` type of `slug` and recompile
      else if(doc.hasOwnProperty('slug') && !doc.hasOwnProperty('value')) {
        return this.compile(new LiturgicalDocument({ ...doc, lookup: { type: 'slug' } }), day, prefs);
      }

      // if doc has a `category` and not a `value`, add `lookup` type of `category` and recompile
      else if(doc.hasOwnProperty('category') && !doc.hasOwnProperty('value')) {
        return this.compile(new LiturgicalDocument({ ...doc, lookup: { type: 'category' } }), day, prefs);
      }

      // compile Bible readings if they have no content
      else if(doc.type == 'bible-reading' && !doc.hasOwnProperty('value') || doc.value.length == 0) {
        return this.lookupBibleReading(doc);
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
    const language = doc.language || 'en',
          versions = (alternateVersions?.length > 0 ? [ doc.version , ... alternateVersions ] : [ doc.version ])
                        .filter(version => version !== undefined);
  
    switch(doc.lookup.type) {
      case 'lectionary':
        return doc.type == 'psalm'
          ? this.lookupPsalter(doc, day, prefs)
          : this.lookupLectionaryReadings(doc, day, prefs);
      case 'canticle-table':
      case 'canticle':
        return this.lookupFromCanticleTable(
          day,
          versions,
          prefs,
          typeof doc.lookup.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          Number(doc.lookup.item)
        );
      case 'category':
        return this.lookupByCategory(
          doc.category || new Array(),
          language,
          versions,
          day,
          doc.lookup.filter,
          doc.lookup.rotate
        );

      /* for lookup's of the `slug` type, return an Observable of either
       * a) the only document matching the document's language/version, or
       * b) an LDF `Option` consisting of all matches */
      case 'slug':
      default:
        if(doc.slug) {
          return this.lookupBySlug(
            doc.slug,
            language,
            versions,
            day,
            doc.lookup.filter,
            doc.lookup.rotate
          );
        } else {
          console.warn('the following is not a compilable document\n\n', doc);
          return of(null);
        }
    }
  }

  /* Look up documents (either single, as options, or rotating) by `slug` or `category` */

  /** Gives either a single `LiturgicalDocument` matching that slug, or (if multiple matches) an `Option` of all the possibilities  */
  lookupBySlug(slug : string, language : string, versions : string[], day : LiturgicalDay, filterType : 'seasonal' | 'evening' | 'day', rotate : boolean) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsBySlug(slug, language, versions).pipe(
      map(docs => this.filter(filterType, day, docs)),
      map(docs => this.rotate(rotate, day, docs)),
      map(docs => docsToOption(docs, versions))
    );
  }

  /** Gives either a single `LiturgicalDocument` matching that category, or (if multiple matches) an `Option` of all the possibilities  */
  lookupByCategory(category : string[], language : string, versions : string[], day : LiturgicalDay, filterType : 'seasonal' | 'evening' | 'day', rotate : boolean) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsByCategory(category, language, versions).pipe(
      map(docs => this.filter(filterType, day, docs)),
      map(docs => this.rotate(rotate, day, docs)),
      map(docs => docsToOption(docs, versions)),
    );
  }

  /** Filters documents depending on whether `doc.category` includes the appropriate `LiturgicalDay.season`, 'Evening', or `LiturgicalDay.slug` */
  filter(filterType : 'seasonal' | 'evening' | 'day', day : LiturgicalDay, docs : LiturgicalDocument[]) : LiturgicalDocument[] {
    switch(filterType) {
      case 'seasonal':
        return docs.filter(doc => doc.category?.includes(day.season));
      case 'evening':
        return docs.filter(doc => doc.category?.includes('Evening'));
      case 'day':
        return docs.filter(doc => doc.category?.includes(day.slug) || doc.category?.includes(day.propers));
      default:
        return docs;
    }
  }

  /** If `rotate` is `true`, return one of the docs, rotated through by day; if `false`, return them all */
  rotate(rotate : boolean, day : LiturgicalDay, docs : LiturgicalDocument[]) : LiturgicalDocument | LiturgicalDocument[] {
    if(rotate) {
      const date = dateFromYMDString(day.date),
            diffFromZero = Math.round((date.getTime()-(new Date(0)).getTime())/(1000*60*60*24));
      return docs[diffFromZero % docs.length];
    } else {
      return docs;
    }
  }

  /* Look up readings and chosen lectionary preference */
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
      map(docs => docsToOption(docs))
    );
  }

  /** Look up psalms by by `LiturgicalDay` and chosen lectionary preference */
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
      map(docs => docsToLiturgy(docs)),
      // compile that `Liturgy` object, which will look up each of its `value` children
      // (i.e., each psalm) by its slug
      switchMap(option => this.compile(option, day, prefs)),
      // sort the psalms by number in increasing order
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

  /** Finds the appropriate canticle from a given table for this liturgy */
  lookupFromCanticleTable(day : LiturgicalDay, versions : string[], prefs : ClientPreferences, whichTable : string, nth : number = 1, fallbackTable : string = undefined) : Observable<LiturgicalDocument> {
    return this.canticleTableService.findEntry(whichTable, nth, fallbackTable).pipe(
      // grab entry for the appropriate weekday
      map(entries => filterCanticleTableEntries(entries, day, whichTable, nth, fallbackTable, DEFAULT_CANTICLES)),
      switchMap(entries => entries.map(entry => new LiturgicalDocument(
        {
          slug: entry.slug,
          lookup: {
            type: 'slug'
          }
        }
      ))),
      map(docs => docsToOption(docs, versions)),
      switchMap(doc => this.compile(doc, day, prefs))
    )
  }

  /** Fetches values for Bible readings */
  lookupBibleReading(doc : LiturgicalDocument) : Observable<LiturgicalDocument> {
    return this.bibleService.getText(doc.citation, doc.version).pipe(
      map(versionWithText => new LiturgicalDocument({ ... doc, value: versionWithText.value }))
    );
  }
}

const DEFAULT_CANTICLES = {
  'evening': ['canticle-15', 'canticle-17'],
  'morning': ['canticle-21', 'canticle-17']
};