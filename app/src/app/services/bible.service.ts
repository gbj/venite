import { Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BibleReading } from '@venite/ldf';
import { BibleServiceInterface } from 'service-api';
import { HttpClient } from '@angular/common/http';
import { catchError, startWith } from 'rxjs/operators';

const LOADING = new BibleReading({
  type: "bible-reading",
  style: "long",
  value: [
    { text: "Loading..." }
  ]
});

@Injectable({
  providedIn: 'root'
})
export class BibleService implements BibleServiceInterface {

  constructor(
    private http : HttpClient
  ) { }

  getText(citation : string, version : string = 'NRSV') : Observable<BibleReading> {
    return this.http.get<BibleReading>(`https://us-central1-venite-2.cloudfunctions.net/bible`, { params: { citation, version}}).pipe(
      startWith(LOADING),
      catchError(() => version === 'NRSV' ? of(undefined) : this.getText(citation, 'NRSV'))
    )
  }
}
