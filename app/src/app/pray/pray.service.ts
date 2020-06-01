import { Injectable } from '@angular/core';
import { LiturgicalDocument, LiturgicalColor, LiturgicalDay, ClientPreferences } from '@venite/ldf';

import { Observable, of } from 'rxjs';
import { DocumentService } from '../services/document.service';
import { map } from 'rxjs/operators';

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
  compile(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences) : Observable<LiturgicalDocument> {
    // should the doc be included?
    if(doc.include(day, prefs)) {

      // recurse if doc is a `Liturgy` (and therefore contains other, nested docs), 
      if(doc.type == 'liturgy') {
        // TODO
      }

      // if doc has a `lookup` and not a `value`, compile it
      if(doc.hasOwnProperty('lookup') && (!doc.value || doc.value.length == 0)) {
        return of(doc).pipe(
          switchMap(doc => this.lookup(doc, day, prefs))
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
  lookup(doc : LiturgicalDocument, day : LiturgicalDay, prefs : ClientPreferences, versions : string[]) : Observable<LiturgicalDocument> {
    switch(doc.lookup.type) {
      case 'lectionary':
        break;
      case 'canticle-table':
        break;
      case 'category':
        break;
      case 'slug':
      default:
        return this.documents.findDocumentsBySlug(doc.slug).pipe(
          // sort by preferred liturgy version
          map(docs => docs.find(tryDoc => tryDoc.language == doc.language && (tryDoc.version == doc.version || versions.includes(tryDoc.version))))
        );
    }
  }
}
