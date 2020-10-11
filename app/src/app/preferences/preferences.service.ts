import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of, from, merge, Subject } from 'rxjs';
import { switchMap, map, tap, filter } from 'rxjs/operators';

import { AuthServiceInterface, AUTH_SERVICE, StoredPreference } from '@venite/ng-service-api';
import { LocalStorageService } from '@venite/ng-localstorage';

import { LiturgicalDocument, versionToString } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private _updated : {
    [key: string]: Subject<StoredPreference>
  } = {};

  constructor(
    private readonly afs: AngularFirestore,
    @Inject(AUTH_SERVICE) private readonly auth : AuthServiceInterface,
    private readonly storage : LocalStorageService
  ) { }

  // Generates a key to be used in local storage
  private localStorageKey(key : string, liturgy : LiturgicalDocument = undefined) : string {
    return liturgy ? `preference-${liturgy.slug}-${liturgy.language}-${liturgy.version}-${key}` : `preference-${key}`;
  }

  // Sets a single preference
  set(key : string, value : string, uid: string = undefined, liturgy : LiturgicalDocument = undefined) {
    const prefDoc : StoredPreference = { key, value }
    if(liturgy) {
      prefDoc.liturgy = liturgy.slug;
      prefDoc.language = liturgy.language || 'en';
      prefDoc.version = versionToString(liturgy.version) || 'Rite-II';
    }

    this.storage.set(this.localStorageKey(key, liturgy), prefDoc);

    if(uid) {
      prefDoc.uid = uid;

      const ref = liturgy ? `${liturgy.slug}-${liturgy.language}-${liturgy.version}-${key}-${uid}` : `${key}-${uid}`;
      const doc = this.afs.doc<StoredPreference>(`Preference/${ref}`);
      doc.set(prefDoc);
    }

    if(!this._updated[key]) {
      this._updated[key] = new Subject();
    }
    this._updated[key].next(prefDoc);
  }

  // Gets a single preference by key
  getStored(key : string) : Observable<StoredPreference> {
    return this.auth.user
      .pipe(
        map(user => [user?.uid, key]),
        switchMap(([uid, key]) => {
          // if logged in, use Firestore
          if(uid) {
            return this.afs.collection<StoredPreference>('Preference', ref =>
              ref.where('uid', '==', uid)
                 .where('key', '==', key)
            ).valueChanges().pipe(
              // take only the first thing returned if multiple for query
              map(values => values[0])
            )
          }
        })
      );
  }

  getUpdated(key : string) : Observable<StoredPreference> {
    if(!this._updated[key]) {
      this._updated[key] = new Subject();
    }
    return this._updated[key];
  }

  get(key : string) : Observable<StoredPreference> {
    return merge(
      from(this.storage.get(this.localStorageKey(key))), // value initially stored in local storage
      this.getUpdated(key), // local value updated recently by user
      this.getStored(key) // observable of Firebase stored preference
    ).pipe(
      filter(value => value !== undefined)
    );
  }

  /** Returns all preferences of **any** liturgy saved by the user, but with this one's language and version
    * This allows for smart matching—if I don't have a default Bible translation set for English Rite II Evening Prayer,
    * see if I have one for English Rite II Morning Prayer  */
  getPreferencesForLiturgy(liturgy : LiturgicalDocument) : Observable<StoredPreference[]> {
    if(!liturgy) {
      console.warn('(getPreferencesForLiturgy) liturgy is', liturgy);
      return of([]);
    } else {
      return this.auth.user
        .pipe(
          map(user => [user?.uid, liturgy]),
          switchMap(([uid, liturgy]) => {
            // if logged in, use Firestore
            if(uid) {
              return this.afs.collection<StoredPreference>('Preference', ref =>
                ref.where('uid', '==', uid)
                   .where('language', '==', (liturgy as LiturgicalDocument).language || 'en')
                   .where('version', '==', (liturgy as LiturgicalDocument).version || 'Rite-II')
              ).valueChanges()
            }
            // if not, use local storage
            else {
              // don't have the ability for a query as with Firestore
              // instead, return all keys that match the local storage key pattern
              const exampleKey = this.localStorageKey('%%%', liturgy as LiturgicalDocument),
                    baseKey = exampleKey.replace('%%%', ''),
                    // storage returns a Promise, but we're not in an async function
                    // because we need to return an observable; so transform it into an observable
                    allKeys = from(this.storage.keys());
              return allKeys.pipe(
                // select only keys for this liturgy
                map(keys => keys.filter(key => key.includes(baseKey))),
                // map in the value for each key
                switchMap(keys => from(Promise.all(keys.map(key => this.storage.get(key))))),
              );
            }
          })
        )
    }
  }
}
