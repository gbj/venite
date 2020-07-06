import { Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BibleReading } from '@venite/ldf';
import { BibleServiceInterface } from 'service-api';

@Injectable({
  providedIn: 'root'
})
export class BibleService implements BibleServiceInterface {

  constructor() { }

  // TODO
  getText(citation : string, version : string) : Observable<BibleReading> {
    return of(new BibleReading());
  }
}
