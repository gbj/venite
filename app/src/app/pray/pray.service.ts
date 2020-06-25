import { Injectable } from '@angular/core';
import { LiturgicalDocument, LiturgicalColor, LiturgicalDay, ClientPreferences, Liturgy, Option } from '@venite/ldf';

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

      // recurse if doc is a `Liturgy` (and therefore contains other, nested docs), 
      if(doc.type == 'liturgy' && doc.value?.length > 0) {
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
        return this.lookupByLectionary(doc, day, prefs);
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

  /*docsToDocOrOption(docs$ : Observable<LiturgicalDocument[]>, versions : string[] = undefined) : Observable<LiturgicalDocument> {
    return docs$.pipe(
      map(docs => versions ? docs.sort((a, b) => versions.indexOf(a.version) - versions.indexOf(b.version)) : docs),
      //tap(docs => console.log('docsToDocOrOption', docs)),
      filter(docs => docs?.length > 1 && docs[0].hasOwnProperty('type')),
      map(docs => docs?.length > 1 ?
        // if multiple LiturgicalDocuments returned, return an Option made up of them
        new Option({
          ... docs[0],
          'type': 'option',
          metadata: { selected: 0 },
          value: docs
        }) :
        // if only one LiturgicalDocument returned, return that document 
        docs[0])
    );
  }*/
  docsToOption(docs : LiturgicalDocument[], versions : string[] = undefined) {
    const sorted = versions?.length > 0
      ? docs.sort((a, b) => versions.indexOf(a.version) - versions.indexOf(b.version))
      : docs;
    return docs?.length > 1
      // if multiple LiturgicalDocuments returned, return an Option made up of them
      ? new Option({
        ... docs[0],
        'type': 'option',
        metadata: { selected: 0 },
        value: docs
      })
      // if only one LiturgicalDocument returned, return that document 
      : docs[0];
  }

  lookupBySlug(slug : string, language : string, versions : string[]) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsBySlug(slug, language, versions).pipe(
      map(docs => this.docsToOption(docs, versions))
    );
  }

  lookupByCategory(category : string[], language : string, versions : string[]) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsByCategory(category, language, versions).pipe(
      map(docs => this.docsToOption(docs, versions))
    );
  }

  lookupByLectionary(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    // `lookup.table` is of type string | { preference: string }
    // if it's a { preference: string } Object, look that up in the preferences
    const lectionary : string = typeof doc.lookup.table === 'string' ? doc.lookup.table : prefs[doc.lookup.table.preference],
          // Bible Translation: defaults to a) whatever's passed in, then b) a hardcoded preference called `bibleVersion`, then c) New Revised Standard Version
          version : string = doc.version || prefs['bibleVersion'] || 'NRSV';

    //return this.docsToDocOrOption(
    return this.lectionaryService.getReadings(lectionary, doc.lookup.item.toString(), day).pipe(
        map(entries => (entries || []).map(entry => (new LiturgicalDocument({
          ... doc,
          citation : entry.citation,
          version,
          language : doc.language || 'en',
          label: entry.citation
        })))),
        // TODO -- load Bible reading
        map(docs => docs ?? doc[0]),
        map(docs => this.docsToOption(docs))
      )
    //);
  }
}
