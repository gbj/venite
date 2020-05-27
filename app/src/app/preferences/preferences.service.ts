import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from './localstorage.service';
import { StoredPreference } from './stored-preference';

import { Liturgy } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(
    private readonly afs: AngularFirestore,
    private readonly auth : AuthService,
    private readonly storage : LocalStorageService
  ) { }

  get(key : string) : Observable<StoredPreference[]> {
    return this.auth.user
      .pipe(
        map(user => [user?.uid, key]),
        switchMap(([uid, key]) => this.afs.collection<StoredPreference>('Preference', ref =>
          ref.where('uid', '==', uid)
             .where('key', '==', key)
        ).valueChanges())
      );
  }

  set(key : string, value : string, uid: string = undefined, liturgy : Liturgy = undefined) {
    if(uid) {
      const ref = liturgy ? `${liturgy.slug}-${liturgy.language}-${liturgy.version}-${key}-${uid}` : `${key}-${uid}`;
      const doc = this.afs.doc<StoredPreference>(`Preference/${ref}`);
      doc.set({
        uid,
        key,
        value,
        liturgy: liturgy?.slug,
        language: liturgy?.language,
        version: liturgy?.version
      });
    } else {
      this.storage.set(key, value);
    }
  }

  private localStorageKey(key : string) : string {
    return `preference-${key}`;
  }

  /** Returns all preferences of **any** liturgy saved by the user, but with this one's language and version
    * This allows for smart matching—if I don't have a default Bible translation set for English Rite II Evening Prayer,
    * see if I have one for English Rite II Morning Prayer  */
  getPreferencesForLiturgy(liturgy : Liturgy) {
    if(!liturgy) {
      console.warn('(getPreferencesForLiturgy) liturgy is', liturgy);
      return of([]);
    } else {
      return this.auth.user
        .pipe(
          map(user => [user?.uid, liturgy]),
          switchMap(([uid, liturgy]) => this.afs.collection<StoredPreference>('Preference', ref =>
            ref.where('uid', '==', uid)
               .where('language', '==', (liturgy as Liturgy).language || 'en')
               .where('version', '==', (liturgy as Liturgy).version || 'Rite-II')
          ).valueChanges())
        )
    }
  }
}
