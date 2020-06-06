import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as Automerge from 'automerge';
import * as pointer from 'json-pointer';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';
import { Observable, Subject, combineLatest, from, BehaviorSubject } from 'rxjs';
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
  private pendingChanges : {[docId: string]: Automerge.Change[]} = {};
  public latestDoc : BehaviorSubject<Automerge.Doc<LiturgicalDocument>> = new BehaviorSubject(undefined);

  constructor(private readonly afs: AngularFirestore, private readonly auth : AuthService) { }

  // TODO: fix typing
  join(docId : string) : Observable<any>  {
    const docManager = this.afs.doc<DocumentManager>(`DocumentManager/${docId.trim()}`),
          docManagerExists$ = docManager.snapshotChanges().pipe(
            map(action => action.payload.exists),
          ),
          doc = this.afs.doc<LiturgicalDocument>(`Document/${docId.trim()}`),
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
        // start with an empty node and await changes
        this.latestDoc.next(Automerge.init());
  
        // if it exists, update it
        if(exists) {
          return from(docManager.update({
            [`users.${(user as User).uid}`]: user
          })).pipe(
            switchMap(() => docManager.valueChanges())
          )
        }
        // if it doesn't exist, create
        else {
          // push changes to get to current document state
          const node = Automerge.change(Automerge.init(), initDoc =>
            Object.assign(initDoc, doc)
          );
          this.pushChanges(docId, Automerge.getAllChanges(node));
          this.latestDoc.next(new LiturgicalDocument(node));

          return from(docManager.set({
            docId,
            users: {
              [(user as User).uid]: user as User
            }
          })).pipe(
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

  /** Observable of all changes made to the document by another user, as they come through */
  findChanges(docId : string) : Observable<DocumentManagerChange[]> {
    return this.afs.collection<DocumentManagerChange>('DocumentManagerChange', ref =>
      ref.where('docId', '==', docId)
    ).valueChanges();
  }

  /** Applies an LDF `Change` to an LDF `LiturgicalDocument` and stores the Automerge changes in the database */
  updateDoc(docId : string, doc : LiturgicalDocument, change : Change) {    
    // translate LDF `Change` into Automerge ops
    const newDoc = this.applyChange(doc, change);

    // serialize changes and share them to other clients
    const changes = Automerge.getChanges(doc, newDoc);

    this.pushChanges(docId, changes);

    this.latestDoc.next(newDoc);
  }

  pushChanges(docId : string, changes : Automerge.Change[]) {
    if(!this.pendingChanges[docId]) {
      this.pendingChanges[docId] = changes;
    } else {
      this.pendingChanges[docId] = this.pendingChanges[docId].concat(changes);
    }
    this.saveChanges(docId);
  }

  async saveChanges(docId : string) {
    await this.afs.collection<DocumentManagerChange>('DocumentManagerChange').add({
      docId,
      uid: this._uid,
      changes: this.pendingChanges[docId]
    });
    this.pendingChanges[docId] = [];
  }

  applyExternalChanges(doc : Automerge.Doc<LiturgicalDocument>, changes : DocumentManagerChange[]) : Automerge.Doc<LiturgicalDocument>  {
    return Automerge.applyChanges(Automerge.init(), changes.map(change => change.changes).flat());
  }

  /** Applies an LDF `Change` to an Automerge `Doc` and returns the new `Doc` */
  applyChange(oldDoc : Automerge.Doc<LiturgicalDocument>, change : Change) : Automerge.Doc<LiturgicalDocument> {
    return Automerge.change(oldDoc, doc => {
      // grab object being modified using JSON pointer
      let obj = doc as any;
      try {
        obj = pointer.get(doc, change.path);
      } catch(e) {
        pointer.set(doc, change.path, null);
        obj = pointer.get(doc, change.path);
        console.warn(e);
      }

      // iterate over ops and handle by type
      change.op.forEach(op => {
        // if reference is null or undefined, make it blank
        if(obj == null) {
          if(typeof op.value === 'string') {
            pointer.set(doc, change.path, new Automerge.Text(''))
          } else {
            pointer.set(doc, change.path, [])
          }
          obj = pointer.get(doc, change.path);
        }

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
            // if it's a string, convert it to Automerge.Text so we can delete
            if(typeof obj === 'string') {
              pointer.set(doc, change.path, new Automerge.Text(obj))
              obj = pointer.get(doc, change.path);
            }
            // otherwise it's an array, and we need to pop the index off the end
            // of the path to access the array itself, and not the object being deleted
            // i.e., /value/1 => /value
            else {
              const pathParts = change.path.split('/'),
                    path = pathParts.slice(0, pathParts.length - 1).join('/');
              obj = pointer.get(doc, path);
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
