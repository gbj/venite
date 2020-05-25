import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from './localstorage.service';
import { StoredPreference } from './stored-preference';

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
        tap(user => console.log('user is', user.uid)),
        map(user => [user?.uid, key]),
        tap(([uid, key]) => console.log('uid is', uid, 'key is ', key)),
        switchMap(([uid, key]) => this.afs.collection<StoredPreference>('Preference', ref =>
          ref.where('uid', '==', uid)
             .where('key', '==', key)
        ).valueChanges()),
        tap(pref => console.log('pref is', pref))
      );
  }

  set(key : string, value : string, uid: string = undefined, language : string = undefined, version : string = undefined, liturgy : string = undefined) {
    if(uid) {
      const doc = this.afs.doc<StoredPreference>(`Preference/${uid}-${key}`);
      doc.set({
        uid,
        key,
        value
      });
    } else {
      this.storage.set(key, value);
    }
  }

  private localStorageKey(key : string) : string {
    return `preference-${key}`;
  }
}
