import { Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BibleReading } from '@venite/ldf';
import { BibleServiceInterface } from 'service-api';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

// Interface for Venite V1
interface V1BibleAPIJSONInterface {
  citation: string;
  label: string;
  language: string;
  version: string;
  verses: { book: string; chapter: string; verse: string; text: string }[][];
}

@Injectable({
  providedIn: 'root'
})
export class BibleService implements BibleServiceInterface {

  constructor(
    private http : HttpClient
  ) { }

  // TODO
  getText(citation : string, version : string = 'NRSV') : Observable<BibleReading> {
    /*return this.http.get<V1BibleAPIJSONInterface>(`https://www.venite.app/api/bible?citation=${citation}&version=${version}`).pipe(
      map(json => new BibleReading({
        ... json,
        value: json.verses.flat()
      }))
    );*/
    return this.http.get<BibleReading>(`https://us-central1-venite-2.cloudfunctions.net/bible`, { params: { citation, version}}).pipe(
      catchError(() => version === 'NRSV' ? of(undefined) : this.getText(citation, 'NRSV'))
    )
  }
}
