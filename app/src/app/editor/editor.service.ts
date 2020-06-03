import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';
import { Observable, combineLatest, from } from 'rxjs';
import { DocumentManager } from './document-manager';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { randomColor } from './random-color';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _docId : string;
  private _uid : string;

  constructor(private readonly afs: AngularFirestore, private readonly auth : AuthService) { }

  // TODO: fix typing
  join(docId : string) : Observable<any>  {
    console.log('join');
    const docManager = this.afs.doc<DocumentManager>(`DocumentManager/${docId}`),
          docManagerExists$ = docManager.snapshotChanges().pipe(
            map(action => action.payload.exists),
          ),
          docManager$ = docManager.valueChanges(),
          doc = this.afs.doc<LiturgicalDocument>(`Document/${docId}`),
          doc$ = doc.valueChanges();
    return combineLatest(docManagerExists$, doc$, this.auth.user).pipe(
      // only join once
      take(1),
      // set service variables for user and docId
      tap(([exists, doc, user]) => {
        this._docId = docId;
        this._uid = user.uid;
      }),
      tap(val => console.log(val)),
      map(([exists, doc, user]) => [exists, doc, this.userFromUser(user)]),
      // return observable of the DocumentManager
      switchMap(([exists, doc, user]) => {
        // if it exists, update it
        if(exists) {
          return from(docManager.update({
            // TODO: fix typing
            users: {
              [(user as User).uid]: user as User
            }
          })).pipe(
            tap(val => console.log('manager = ', val)),
            switchMap(() => docManager.valueChanges())
          )
        }
        // if it doesn't exist, create
        else {
          return from(docManager.set({
            docId,
            doc: { ... (doc as LiturgicalDocument) },
            users: {
              [(user as User).uid]: user as User
            }
          })).pipe(
            tap(val => console.log('manager = ', val)),
            switchMap(() => docManager.valueChanges())
          )
        }
      })
    )
  }

  async leave() : Promise<void> {
    return this.afs.doc<DocumentManager>(`DocumentManager/${this._docId}`)
      .update({
        [`users.${this._uid}`]: firebase.firestore.FieldValue.delete(), // remove from user list
        [`cursors.${this._uid}`]: firebase.firestore.FieldValue.delete() // delete user's cursor
      })
  }

  userFromUser(user : firebase.User) : User {
    return ({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      color: randomColor()
    })
  }

  updateCursor(docId : string, cursor : Cursor) {
    return this.afs.doc<DocumentManager>(`DocumentManager/${docId}`)
      .update({
        [`cursors.${this._uid}`]: { ... cursor } // error because we're including a textarea
      })
  }

  updateDoc(docId : string, change : Change) {

  }

}
