import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { HolyDay, Kalendar, LiturgicalDay, LiturgicalWeek, LiturgicalWeekIndex } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // Holy Days
  private holydayCollection : AngularFirestoreCollection<HolyDay>;

  // Weeks
  private weekCollection : AngularFirestoreCollection<LiturgicalWeek>;

  constructor(private readonly afs: AngularFirestore) {
    this.holydayCollection = afs.collection<HolyDay>('HolyDay');
    this.weekCollection = afs.collection<LiturgicalWeek>('LiturgicalWeek');
  }

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
  findFeastDays(kalendar : string, date : Date) : Observable<HolyDay[]> {
    const mmdd = `${date.getMonth()+1}/${date.getDate()}`;
    return this.afs.collection<HolyDay>('HolyDay', ref =>
      ref.where('kalendar', '==', kalendar)
         .where('mmdd', '==', mmdd)
    ).valueChanges();
  }
}
