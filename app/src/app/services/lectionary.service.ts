import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LectionaryEntry, LiturgicalDay, dateFromYMDString } from '@venite/ldf';
import { ReplaySubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LectionaryService {
  private _cached_rcl : Record<string, ReplaySubject<LectionaryEntry[]>> = {};

  constructor(
    private readonly afs : AngularFirestore,
    private http : HttpClient
  ) { }

  getReadings(day : LiturgicalDay, lectionaryName : string = undefined, readingType : string = undefined, alternateYear : boolean) : Observable<LectionaryEntry[]> {
    // handle RCL readings separately via LectServe API
    if(lectionaryName == 'rclsunday' || lectionaryName == 'rcl' || lectionaryName == 'rclsundayTrack1') {
      return this.rcl(dateFromYMDString(day.date), lectionaryName, day.propers, day.years['rclsunday'], day.slug).pipe(
        map(
          readings => uniqueBy(readings.filter(reading => !readingType || reading.type === readingType), e => e.citation)
        ),
      );
    }
    // search for other readings in our DB
    else {
      const { when, whentype, includeDay } = this.when(lectionaryName, day, alternateYear);

      return this.afs.collection<LectionaryEntry>('LectionaryEntry', ref => {
        let query : firebase.firestore.Query = ref.where('when', '==', when)
                                                  .where('whentype', '==', whentype);

        if(lectionaryName !== undefined) {
          query = query.where('lectionary', '==', lectionaryName);
        }
        
        if(readingType !== undefined) {
          // for UI reasons, 'first_reading' with alternateYear = true needs to have a different `value` for the select
          // so its value is set to 'first_reading_alt'
          // but it still needs to search for 'first_reading'
          query = query.where('type', '==', readingType?.endsWith('_alt') ? readingType.replace('_alt', '') : readingType);
        }

        if(includeDay !== false) {
          query = query.where('day', '==', day.propers || day.slug)
        }

        return query;
      }).valueChanges();
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
          return ({ whentype: 'year', when: ((year % 2) + 1).toString(), includeDay: true });
        } else {
          return ({ whentype: 'year', when: day.years['bcp1979_daily_office'].toString(), includeDay: true });
        }
    }
  }

  rcl(date : Date, lectionary : string, propers : string, year : string, day : string) : Observable<LectionaryEntry[]> {
    // TODO integrate RCL API into a Cloud Function
    const y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      slug = `${y}-${m}-${d}-${lectionary}-${propers}-${year}-${day}`;
    if(this._cached_rcl[slug]) {
      return this._cached_rcl[slug];
    } else {
      this._cached_rcl[slug] = new ReplaySubject();
      this.http.get<LectionaryEntry[]>(`https://www.venite.app/api/lectionary/reading/?y=${y}&m=${m}&d=${d}&lectionary=${lectionary}&propers=${propers}&year=${year}&day=${day}`).subscribe(
        data => this._cached_rcl[slug].next(data)
      );
      return this._cached_rcl[slug];
    }
  }

}

function uniqueBy<T>(a : T[], key : (item : T) => string) : T[] {
  var seen = {};
  return a.filter(function(item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  })
}