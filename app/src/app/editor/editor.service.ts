import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as json1 from 'ot-json1';

import { Cursor, Change, LiturgicalDocument, User } from '@venite/ldf';
import { Observable, combineLatest, from, BehaviorSubject } from 'rxjs';
import { ServerDocumentManager, DocumentManagerChange, LocalDocumentManager } from './document-manager';
import { map, tap, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { randomColor } from './random-color';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _uid : string;
  private _localManagers : { [docId: string]: LocalDocumentManager } = {};

  constructor(private readonly afs: AngularFirestore, private readonly auth : AuthService) { }

  // Join/Leave Functions
  join(docId : string) : Observable<{server: ServerDocumentManager; local: LocalDocumentManager}>  {
    const serverDocManager = this.afs.doc<ServerDocumentManager>(`DocumentManager/${docId}`),
          serverDocManagerExists$ = serverDocManager.snapshotChanges().pipe(
            map(action => action.payload.exists),
          ),
          doc = this.afs.doc<LiturgicalDocument>(`Document/${docId.trim()}`),
          doc$ = doc.valueChanges();
    return combineLatest(serverDocManagerExists$, doc$, this.auth.user).pipe(
      // only join once
      take(1),
      // set up localManager and store User ID
      tap(([exists, doc, user]) => {
        this._uid = user.uid;

        const localManager = new LocalDocumentManager(docId);
        localManager.document = doc;
        this._localManagers[docId] = localManager;
      }),
      map(([exists, doc, user]) => [exists, doc, this.userFromUser(user)]),
      // set up the ServerDocumentManager and return it as an observable
      switchMap(([exists, doc, user]) => {    
        // if it exists, update it to add the user
        if(exists) {
          return from(serverDocManager.update({
            [`users.${(user as User).uid}`]: user
          })).pipe(
            switchMap(() => serverDocManager.valueChanges())
          )
        }
        // if it doesn't exist, create
        else {
          return from(serverDocManager.set({
            docId,
            users: {
              [(user as User).uid]: user as User
            },
            pendingChanges: [],
            revisionLog: []
          })).pipe(
            switchMap(() => serverDocManager.valueChanges())
          )
        }
      }),
      // return the LocalDocumentManager
      map(server => ({ server: server, local: this._localManagers[server.docId]})),
      tap(({ server, local }) => local.hasBeenAcknowledged = true)
    )
  }

  async leave(docId : string) : Promise<void> {
    // clear local document manager
    delete this._localManagers[docId];
  
    // remove user and cursor from server document manager
    return this.afs.doc<ServerDocumentManager>(`DocumentManager/${docId}`)
      .update({
        [`users.${this._uid}`]: firebase.firestore.FieldValue.delete(), // remove from user list
        [`cursors.${this._uid}`]: firebase.firestore.FieldValue.delete() // delete user's cursor
      })
  }

  /** Converts Firebase Auth user into LDF User */
  userFromUser(user : firebase.User) : User {
    return ({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      color: randomColor()
    })
  }

  // Cursor function
  updateCursor(docId : string, cursor : Cursor) {
    return this.afs.doc<ServerDocumentManager>(`DocumentManager/${docId}`)
      .update({
        [`cursors.${this._uid}`]: { path: cursor.path, start: cursor.start, end: cursor.end } // error because we're including a textarea
      })
  }

  /* OT implementation */

  // Send changes from client to server

  /** Notify the server that our editing client has changed the document.
  * Every new `Change` from the `EditorComponent` enters through this function */
  public processChange(manager : LocalDocumentManager, change : Change) {
    // translate `Change` into operation
    const op = this.opFromChange(change).reduce(json1.type.compose, null);

    // optimistically apply on the local copy
    this.applyOp(manager, op);

    // add it to our list of pending changes
    manager.pendingChanges.push({ uid: this._uid, op, lastRevision: manager.lastSyncedRevision });

    // if you've been acknowledged, send the first change in the pending queue
    if(manager.hasBeenAcknowledged) {
      this.sendNextChange(manager);
    }
  }

  /** send the next change in the pending queue to the server */ 
  private sendNextChange(manager : LocalDocumentManager) {
    manager.hasBeenAcknowledged = false; // change we are about to send has not been acknowledged yet
    const change = manager.pendingChanges.shift(); // takes item from beginning of array and mutates

    // update the ServerDocumentManager's pendingChanges
    this.afs.doc<ServerDocumentManager>(`DocumentManager/${manager.docId}`)
      .update({
        //@ts-ignore
        revisionLog: firebase.firestore.FieldValue.arrayUnion(change)
      });
    console.log('sent update to pending changes');

    // move it to our list of sent changes
    manager.sentChanges.push(change);
  }


  /** Receive changes from server and apply to client, whenever anything on server changes */ 
  handleRemoteChanges(serverManager : ServerDocumentManager) {
    const localManager = this._localManagers[serverManager.docId];
    console.log('localManager = ', localManager);

    // if the server has revisions we don't, apply them to our doc
    if(localManager.lastSyncedRevision < serverManager.revisionLog.length) {
      const additionalChanges = serverManager.revisionLog.slice(localManager.lastSyncedRevision, serverManager.revisionLog.length);
      console.log('additionalChanges = ', additionalChanges);
      additionalChanges.forEach(change => {
        console.log('apply change?', change.lastRevision, localManager.lastSyncedRevision)
        if(change.lastRevision >= localManager.lastSyncedRevision) {
          console.log('yes, apply it');
          this.applyOp(localManager, change.op);
        }
      })
      localManager.lastSyncedRevision = serverManager.revisionLog.length;
    }
  }

  // Utility Functions

  /** Applies an operation to `LocalDocumentManager.document`
   * Can be used optimistically to apply local changes
   * or to respond to remote changes */
  applyOp(manager : LocalDocumentManager, op : json1.JSONOp) : void {
    if(manager.document) {
      console.log('applying op', op, 'to doc ', manager.document);
      manager.document = json1.type.apply(manager.document, op);
      console.log('doc now reads', manager.document)
    }
  }

  /** Converts a generic LDF `Change` into an array of `json1` operations */
  opFromChange(change : Change) : json1.JSONOp[] {
    return new Change(change).fullyPathedOp().map(op => {
      // json1 won't accept '1' as an array index -- convert to a number
      op.p = op.p.map(p => Number(p) ? Number(p) : p)

      // generate json1 op depending on the type
      switch(op.type) {
        case 'edit':
          return json1.editOp(op.p, 'text-unicode', op.value);
        case 'insertAt':
          console.log('insertAt', change.path, op.index, op.p, 'value = ', op.value);
          return json1.insertOp(op.index ? op.p.concat(op.index) : op.p, op.value);
        case 'deleteAt':
          console.log('op.p = ', op.p)
          return json1.removeOp(op.p, op.value ?? true);
        case 'set':
          return json1.replaceOp(op.p, true, op.value);
        case 'delete':
          return json1.replaceOp(op.p, true, undefined);
      }
    });
  }







  /** Observable of all changes made to the document by another user, as they come through */
  /*findChanges(docId : string) : Observable<DocumentManagerChange[]> {
    return this.afs.collection<DocumentManagerChange>('DocumentManagerChange', ref =>
      ref.where('docId', '==', docId)
    ).snapshotChanges().pipe(
      map(actions =>
        actions
          // take only changes that are being added by another user
          .filter(changeaction =>
            changeaction.type == 'added' && changeaction.payload.doc.data().uid !== this._uid
          )
          // and return the change itself
          .map(changeaction => changeaction.payload.doc.data())
      )
    );
  }*/

  /** Applies an LDF `Change` to an LDF `LiturgicalDocument` and stores the Automerge changes in the database */
  /*updateDoc(docId : string, doc : LiturgicalDocument, change : Change) {    
    // translate LDF `Change` into Automerge ops
    const op : json1.JSONOp = this.generateChanges(change),
          newDoc : LiturgicalDocument = json1.type.apply(doc, op);

    this.pushChange(docId, op);

    this.latestDoc.next(newDoc);
  }

  generateChanges(change : Change) : json1.JSONOp {
    const ops = this.changeToJson1Op(change);
    return ops.reduce(json1.type.compose, null);
  }

  pushChange(docId : string, op : json1.JSONOp) {
    const change : DocumentManagerChange = { uid: this._uid, docId, op };
    if(!this.pendingChanges[docId]) {
      this.pendingChanges[docId] = new Array(change);
    } else {
      this.pendingChanges[docId].push(change);
    }
    this.saveChanges(docId);
  }

  async saveChanges(docId : string) {
    const batch = this.afs.firestore.batch();
    this.pendingChanges[docId].forEach(change => {
      console.log('adding to batch', change);
      const id = this.afs.createId(),
            changeRef = this.afs.collection<DocumentManagerChange>('DocumentManagerChange').doc(id);
      console.log('adding to batch the change', change, 'at ref', changeRef.ref)
      batch.set(changeRef.ref, change);
    });
    await batch.commit();
    this.pendingChanges[docId] = [];
  }

  applyExternalChanges(doc : LiturgicalDocument, changes : DocumentManagerChange[]) : LiturgicalDocument  {
    console.log('applyExternalChanges', doc, changes)
    if(doc) {
      return json1.type.apply(doc, changes.map(change => change.op).reduce(json1.type.compose, null));
    } else {
      return doc;
    }
  }

  changeToJson1Op(change : Change) : json1.JSONOp[] {
    return new Change(change).fullyPathedOp().map(op => {
      // json1 won't accept '1' as an array index -- convert to a number
      op.p = op.p.map(p => Number(p) ? Number(p) : p)

      // generate json1 op depending on the type
      switch(op.type) {
        case 'edit':
          return json1.editOp(op.p, 'text-unicode', op.value);
        case 'insertAt':
          console.log('insertAt', change.path, op.index, op.p, 'value = ', op.value);
          return json1.insertOp(op.index ? op.p.concat(op.index) : op.p, op.value);
        case 'deleteAt':
          console.log('op.p = ', op.p)
          return json1.removeOp(op.p, op.value ?? true);
        case 'set':
          return json1.replaceOp(op.p, true, op.value);
        case 'delete':
          return json1.replaceOp(op.p, true, undefined);
      }
    });
  }*/
}
