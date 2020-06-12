import { Injectable } from '@angular/core';
import { LiturgicalDocument, LiturgicalColor, LiturgicalDay, ClientPreferences, Liturgy, Option } from '@venite/ldf';

import { Observable, of, combineLatest } from 'rxjs';
import { DocumentService } from '../services/document.service';
import { map, switchMap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrayService {

  constructor(
    private documents : DocumentService
  ) { }

  // TODO: build real compiler
  /** Returns the complete and filtered form for a doc within a particular liturgical context
   * If it should not be included given its day and condition, filter it out
   * If it is incomplete, find its complete form in the database */
  compile(docBase : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    const doc = docBase instanceof LiturgicalDocument ? docBase : new LiturgicalDocument(docBase);

    // should the doc be included?
    if(doc.include(day, prefs)) {

      // recurse if doc is a `Liturgy` (and therefore contains other, nested docs), 
      if(doc.type == 'liturgy') {
        // TODO -- check this
        return combineLatest(
          // convert each child document in `Liturgy.value` into its own compiled Observable<LiturgicalDocument>
          // and combine them into a single Observable that fires when any of them changes
          // startWith(undefined) so it doesn't need to wait for all of them to load
          ... (docBase as Liturgy).value?.map(child => this.compile(child, day, prefs).pipe(startWith(undefined)))
        ).pipe(
          map(compiledChildren => new LiturgicalDocument({
            ... docBase,
            value: compiledChildren
          }))
        );
      }

      // if doc has a `lookup` and not a `value`, compile it
      if(doc.hasOwnProperty('lookup') && (!doc.value || doc.value.length == 0)) {
        return of(doc).pipe(
          switchMap(doc => this.lookup(doc, day, prefs, []))
        );
      }
      // otherwise, check whether the doc should be included
      // if so, return it as an `Observable`
      else {
        return of(doc);
      }
    
    }
  }

  /** Return the complete form of a doc from the database, depending on what is specified in `lookup` property */
  lookup(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, alternateVersions : string[] = undefined) : Observable<LiturgicalDocument> {
    switch(doc.lookup.type) {
      case 'lectionary':
        break;
      case 'canticle-table':
        break;
      case 'category':
        break;

      /* for lookup's of the `slug` type, return an Observable of either
       * a) the only document matching the document's language/version, or
       * b) an LDF `Option` consisting of all matches */
      case 'slug':
      default:
        return this.lookupBySlug(
          doc.slug,
          doc.language,
          alternateVersions?.length > 0 ? [ doc.version, ... alternateVersions ] : [ doc.version ]
        );
    }
  }

  lookupBySlug(slug : string, language : string, versions : string[]) : Observable<LiturgicalDocument> {
    return this.documents.findDocumentsBySlug(slug, language, versions).pipe(
      map(docs => docs.sort((a, b) => versions.indexOf(a.version) - versions.indexOf(b.version))),
      map(docs => docs.length > 1 ?
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
  }
}
