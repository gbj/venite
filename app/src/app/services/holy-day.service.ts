import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { HolyDay, IHolyDayService } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class HolyDayService {
  private collection: AngularFirestoreCollection<HolyDay>;
  items: Observable<HolyDay[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.collection = afs.collection<HolyDay>('HolyDay');
    this.items = this.collection.valueChanges();
  }

  /** `HolyDay` for a feast that either has slug or falls on date
    * @example
    * // returns info for Ash Wednesday
    * getHolyDay('wednesday-last-epiphany', new Date(Date.parse('2020-02-26')))
    *  */
  /*getHolyDays(slug : string, date : Date) : Observable<HolyDay[]> {

  }*/

  /** `HolyDay` for a particular slug
    * @example
    * // returns info for Ash Wednesday
    * specialDay('wednesday-last-epiphany') */
  specialDay(slug : string) : Observable<HolyDay[]> {
    return this.afs.collection<HolyDay>('HolyDay', ref =>
      ref.where('slug', '==', slug)
    ).valueChanges();
  }

  /** `HolyDay` any feast date defined by being on that day
    * @example
    * // returns info for Christmas Eve
    * feastDate(new Date(Date.parse('2020-12-24'))) */
  feastDate(date : Date) : Observable<HolyDay[]> {
    return this.afs.collection<HolyDay>('HolyDay', ref =>
      ref.where('mmdd', '==', `${date.getMonth()+1}/${date.getDate()}`)
    ).valueChanges();
  }
}
