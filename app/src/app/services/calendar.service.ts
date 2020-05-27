import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { HolyDay, Kalendar, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex, addOneDay, dateFromYMD, dateToYMD } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private readonly afs: AngularFirestore) { }

  /** Get a menu of available `Kalendar`s that provide a full seasonal cycle */
  findKalendars() : Observable<Kalendar[]> {
    return this.afs.collection<Kalendar>('Kalendar', ref =>
      ref.where('sanctoral', '==', false)
    ).valueChanges();
  }

  /** Get a menu of available `Kalendar`s that provide saints’ days */
  findSanctorals() : Observable<Kalendar[]> {
    return this.afs.collection<Kalendar>('Kalendar').valueChanges();
  }

  /** Get the appropriate `LiturgicalWeek` for a calculated week index */
  findWeek(kalendar : string, query : LiturgicalWeekIndex) : Observable<LiturgicalWeek[]> {
    return this.afs.collection<LiturgicalWeek>('LiturgicalWeek', ref =>
      ref.where('kalendar', '==', kalendar)
         .where('cycle', '==', query.cycle)
         .where('week', '==', query.week)
    ).valueChanges();
  }

  /** Find feast days on a given date */
  findFeastDays(kalendar : string, mmdd : string) : Observable<HolyDay[]> {
    return this.afs.collection<HolyDay>('HolyDay', ref =>
      ref.where('kalendar', '==', kalendar)
         .where('mmdd', '==', mmdd)
    ).valueChanges();
  }

  /** Find special days for a particular slug
    * @example
    * // Ash Wednesday
    * `wednesday-last-epiphany` */
  findSpecialDays(kalendar : string, slug : string) : Observable<HolyDay[]> {
    return this.afs.collection<HolyDay>('HolyDay', ref =>
      ref.where('kalendar', '==', kalendar)
         .where('slug', '==', slug)
    ).valueChanges();
  }

  /** Find `HolyDay`s connected to either a date or a slug */
  addHolyDays(day : LiturgicalDay, vigil : boolean) : Observable<LiturgicalDay> {
    // generate query from the `LiturgicalDay`
    const [y, m, d] = day.date.split('-'),
          date = dateFromYMD(y, m, d),
          observedDate = vigil ? addOneDay(date) : date,
          observedM = observedDate.getMonth()+1,
          observedD = observedDate.getDate(),
          feasts = this.findFeastDays(day.kalendar, `${observedM}/${observedD}`),
          specials = this.findSpecialDays(day.kalendar, day.slug);
    return combineLatest(feasts, specials)
      .pipe(
        // OR together the feasts and specials
        map(([feasts, specials]) => feasts.concat(specials)),
        // incorporate them into the `LiturgicalDay`
        map(holydays => day.addHolyDays(holydays))
      );
  }
}
