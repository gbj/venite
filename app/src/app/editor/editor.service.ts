import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as Automerge from 'automerge';
import * as pointer from 'json-pointer';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';
import { Observable, combineLatest, from } from 'rxjs';
import { DocumentManager, DocumentManagerChange } from './document-manager';
import { map, tap, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { randomColor } from './random-color';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _docId : string;
  private _uid : string;
  private _automergeDoc : Automerge.Doc<LiturgicalDocument>;

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
      map(([exists, doc, user]) => [exists, doc, this.userFromUser(user)]),
      // return observable of the DocumentManager
      switchMap(([exists, doc, user]) => {
        // if it exists, update it
        if(exists) {
          return from(docManager.update({
            // TODO: fix typing
            [`users.${(user as User).uid}`]: user
          })).pipe(
            tap(val => console.log('manager = ', val)),
            switchMap(() => docManager.valueChanges())
          )
        }
        // if it doesn't exist, create
        else {
          return from(docManager.set({
            docId,
            doc: Automerge.save(this.docToAutomergeDoc(doc as LiturgicalDocument)),
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
        [`cursors.${this._uid}`]: { path: cursor.path, start: cursor.start, end: cursor.end } // error because we're including a textarea
      })
  }

  docToAutomergeDoc(doc : LiturgicalDocument) : Automerge.Doc<LiturgicalDocument> {
    return Automerge.from(doc);
  }

  /** Observable of all changes made to the document by another user, as they come through */
  findChanges(docId : string) : Observable<DocumentManagerChange[]> {
    return this.afs.collection<DocumentManagerChange>('DocumentManagerChange', ref =>
      ref.where('docId', '==', docId)
    ).snapshotChanges().pipe(
      map(actions =>
        actions
          // take only changes that are being added by another user
          .filter(changeaction =>
            changeaction.type == 'added' && changeaction.payload.doc.data().uid !== this._uid
          )
          // and return the document itself
          .map(changeaction => changeaction.payload.doc.data())
      )
    );
  }

  /** Applies an LDF `Change` to an LDF `LiturgicalDocument` and stores the Automerge changes in the database */
  updateDoc(docId : string, doc : LiturgicalDocument, change : Change) : LiturgicalDocument {    
    // translate LDF `Change` into Automerge ops
    const newDoc = this.applyChange(oldDoc, change);

    // serialize changes and share them to other clients
    const changes = Automerge.getChanges(oldDoc, newDoc);

    this.afs.collection<DocumentManagerChange>('DocumentManagerChange').add({
      docId,
      uid: this._uid,
      changes
    });

    return newDoc;
  }

  applyExternalChanges(changes : DocumentManagerChange[]) : Automerge.Doc<LiturgicalDocument> {
    console.log('doc = ', this._automergeDoc);
    console.log('changes = ', changes.map(change => change.changes).flat());
    console.log('new doc = ', Automerge.applyChanges(this._automergeDoc, changes.map(change => change.changes).flat()));
    this._automergeDoc = Automerge.applyChanges(this._automergeDoc, changes.map(change => change.changes).flat());
    
    return this._automergeDoc;
  }

  /** Applies an LDF `Change` to an Automerge `Doc` and returns the new `Doc` */
  applyChange(oldDoc : Automerge.Doc<LiturgicalDocument>, change : Change) : Automerge.Doc<LiturgicalDocument> {
    return Automerge.change(oldDoc, doc => {
      // grab object being modified using JSON pointer
      let obj = pointer.get(doc, change.path);

      // iterate over ops and handle by type
      change.op.forEach(op => {
        switch(op.type) {
          case 'insertAt':
            // if represented as a string, change into Automerge.Text
            if(typeof obj === 'string') {
              pointer.set(doc, change.path, new Automerge.Text(obj))
              obj = pointer.get(doc, change.path);
            }
            // if a Text, spread the string `value` into multiple arguments
            if(typeof op.value === 'string') {
              obj.insertAt(op.index, ... op.value);
            }
            // otherwise, just insert it
            else {
              obj.insertAt(op.index, op.value);
            }
            break;
          case 'deleteAt':
            if(typeof obj === 'string') {
              pointer.set(doc, change.path, new Automerge.Text(obj))
              obj = pointer.get(doc, change.path);
            }
            obj.deleteAt(op.index);
            break;
          case 'set':
            obj[op.index] = op.value;
            break;
          case 'delete':
            delete obj[op.index];
            break;
        }
      });
    });
  }
}
