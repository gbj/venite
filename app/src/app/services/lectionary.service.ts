import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LectionaryEntry, LiturgicalDay, dateFromYMDString } from '@venite/ldf';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectionaryService {

  constructor(
    private readonly afs : AngularFirestore
    ) { }

  getReadings(lectionaryName : string, readingType : string, day : LiturgicalDay) : Observable<LectionaryEntry[]> {
    // handle RCL readings separately via LectServe API
    if(lectionaryName == 'rclsunday' || lectionaryName == 'rcl') {
      return this.rcl(dateFromYMDString(day.date));
    }
    // search for other readings in our DB
    else {
      const { when, whentype, includeDay } = this.when(lectionaryName, day);
      console.log('search for readings on ', day.propers || day.slug, 'when lectionary = ', lectionaryName, 'type = ', readingType, 'when = ', when, 'whentype = ', whentype);

      return this.afs.collection<LectionaryEntry>('LectionaryEntry', ref => {
        const allDaysRef = ref.where('lectionary', '==', lectionaryName)
          .where('type', '==', readingType)
          .where('when', '==', when)
          .where('whentype', '==', whentype);
        return includeDay ? allDaysRef.where('day', '==', day.propers || day.slug) : allDaysRef;
      }).valueChanges();
    }
  }

  when(lectionaryName : string, day : LiturgicalDay) : { when : string; whentype : string; includeDay: boolean; } {
    switch(lectionaryName) {
      case 'bcp1979_30day_psalter':
        return ({ whentype: 'date', when: dateFromYMDString(day.date).getDate().toString(), includeDay: false });
      case 'bcp1979_daily_office':
      case 'bcp1979_daily_psalms':
      default:
        return ({ whentype: 'year', when: day.years['bcp1979_daily_office'].toString(), includeDay: true });
    }
  }

  rcl(date : Date) : Observable<LectionaryEntry[]> {
    // TODO hook up to LectServe API
    return of([]);
  }

}
