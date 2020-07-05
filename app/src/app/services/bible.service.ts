import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BibleReading } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  constructor() { }

  // TODO
  getText(citation : string, version : string) : Observable<BibleReading> {
    return of(new BibleReading());
  }
}
