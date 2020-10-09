import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LectionaryEntry, LiturgicalDay, dateFromYMDString } from '@venite/ldf';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LectionaryService {

  constructor(
    private readonly afs : AngularFirestore
    ) { }

  getReadings(day : LiturgicalDay, lectionaryName : string = undefined, readingType : string = undefined, alternateYear : boolean) : Observable<LectionaryEntry[]> {
    // handle RCL readings separately via LectServe API
    if(lectionaryName == 'rclsunday' || lectionaryName == 'rcl') {
      return this.rcl(dateFromYMDString(day.date));
    }
    // search for other readings in our DB
    else {
      const { when, whentype, includeDay } = this.when(lectionaryName, day, alternateYear);
      console.log('when = ', when, whentype, includeDay);

      return this.afs.collection<LectionaryEntry>('LectionaryEntry', ref => {
        let query : firebase.firestore.Query = ref.where('when', '==', when)
                                                  .where('whentype', '==', whentype);

        if(lectionaryName !== undefined) {
          query = query.where('lectionary', '==', lectionaryName);
        }
        
        if(readingType !== undefined) {
          query = query.where('type', '==', readingType);
        }

        if(includeDay !== false) {
          query = query.where('day', '==', day.propers || day.slug)
        }

        return query;
      }).valueChanges().pipe(
        tap(readings => console.log('(getReadings) lectionaryName = ', lectionaryName, 'readings = ', readings))
      );
    }
  }

  when(lectionaryName : string, day : LiturgicalDay, alternateYear : boolean) : { when : string; whentype : string; includeDay: boolean; } {
    switch(lectionaryName) {
      case 'bcp1979_30day_psalter':
        return ({ whentype: 'date', when: dateFromYMDString(day.date).getDate().toString(), includeDay: false });
      case 'bcp1979_daily_office':
      case 'bcp1979_daily_psalms':
      default:
        if(alternateYear) {
          const year = Number(day.years['bcp1979_daily_office']);
          console.log('[alternateYear]', year, (year % 2) + 1)
          return ({ whentype: 'year', when: ((year % 2) + 1).toString(), includeDay: true });
        } else {
          return ({ whentype: 'year', when: day.years['bcp1979_daily_office'].toString(), includeDay: true });
        }
    }
  }

  rcl(date : Date) : Observable<LectionaryEntry[]> {
    // TODO hook up to LectServe API
    return of([]);
  }

}
