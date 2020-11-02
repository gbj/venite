import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as json1 from 'ot-json1';
import { JSONOp } from 'ot-json1/dist/types';

import { Cursor, Change, Operation, LiturgicalDocument, User, LiturgicalColor } from '@venite/ldf';
import { Observable, combineLatest, from, BehaviorSubject } from 'rxjs';
import { ServerDocumentManager, DocumentManagerChange, LocalDocumentManager } from './document-manager';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { randomColor } from './random-color';
import { ToastController } from '@ionic/angular';

export type EditorStatus = {
  code: EditorStatusCode;
  payload?: string;
}

export enum EditorStatusCode {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error'
};

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _actorId : string = uuid();
  private _uid : string;
  private _localManagers : { [docId: string]: BehaviorSubject<LocalDocumentManager> } = {};
  private _onlineListener : () => void;

  public status : BehaviorSubject<EditorStatus> = new BehaviorSubject({code: EditorStatusCode.Idle});

  constructor(
    private readonly afs: AngularFirestore,
    private readonly auth : AuthService,
    private toast : ToastController
  ) { }

  // Join/Leave Functions
  join(docId : string) : Observable<ServerDocumentManager> { //<{server: ServerDocumentManager; local: LocalDocumentManager}>  {
    const serverDocManager = this.afs.doc<ServerDocumentManager>(`DocumentManager/${docId}`),
          serverDocManagerExists$ = serverDocManager.snapshotChanges().pipe(
            map(action => action.payload.exists),
          ),
          doc = this.afs.doc<LiturgicalDocument>(`Document/${docId.trim()}`),
          doc$ = doc.valueChanges();

    return combineLatest([serverDocManagerExists$, doc$, this.auth.user]).pipe(
      // only join once
      take(1),
      // set up localManager and store User ID
      tap(([exists, doc, user]) => {
        this._uid = user.uid;

        const localManager = new LocalDocumentManager(docId);
        localManager.document = doc;
        localManager.lastSyncedRevision = doc.lastRevision || 0;
        this._localManagers[docId] = new BehaviorSubject(localManager);
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
            lastRevision: 0
          })).pipe(
            switchMap(() => serverDocManager.valueChanges())
          )
        }
      }),
      // return the LocalDocumentManager
      /*map(server => ({ server: server, local: this._localManagers[server.docId]})),
      tap(({ server, local }) => {
        // if we lose connection, try to resend last
        this._onlineListener = () => {
          console.log('back online');
          console.log(local.value.hasBeenAcknowledged);
          this.sendNextChange(local.value);
        };
        window?.addEventListener('online', this._onlineListener)
      }),
      map(({ server }) => server)*/
    )
  }

  localManager(docId : string) : BehaviorSubject<LocalDocumentManager> {
    return this._localManagers[docId];
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
  public processChange(manager : LocalDocumentManager, change : Change | Change[]) {
    // translate `Change` into operation
    const op = this.opFromChange(change);

    // add it to our list of pending changes
    manager.pendingChanges = manager.pendingChanges.concat({
      uid: this._uid,
      actorId: this._actorId,
      op,
      lastRevision: manager.lastSyncedRevision + 1
    });

    if(manager.hasBeenAcknowledged) {
      this.sendNextChange(manager);
    }
  }

  /** send the next change in the pending queue to the server */ 
  async sendNextChange(localManager : LocalDocumentManager) {
    this.status.next({ code: EditorStatusCode.Pending })

    const manager = { ... localManager },
          docBeforeChange = new LiturgicalDocument({ ... manager.document }),
          change = manager.pendingChanges[0]; // takes item from beginning of array

    try {
      if(manager.hasBeenAcknowledged) {
        manager.hasBeenAcknowledged = false; // change we are about to send has not been acknowledged yet

        /* security rules are set to
         * 1) prevent `revisionLog` documents from being updated
         * 2) prevent `DocumentManager.lastRevision` from being <= its current value
         * because this is a batched write, the whole thing will fail if either part fails
         * this will signal to us that we need to transform this change instead,
         * which is handled by the catch below */
        const batch = this.afs.firestore.batch(),
              managerRef = this.afs.collection<ServerDocumentManager>('DocumentManager')
                                   .doc(manager.docId),
        /* for the change, if we use an ID based on the revision #, it will bounce back
         * if that revision has already been logged by another client
         * (lastRevision * 1000000).toString(16) generates predictable but non-sequential IDs
         * to avoid database hotspots */
              changeId = `${manager.docId}-rev-${(change.lastRevision * 1000000).toString(16)}`,
              changeRef = managerRef.collection<DocumentManagerChange>('revisionLog')
                                    .doc(changeId);
      
        batch.update(managerRef.ref, { lastRevision: change.lastRevision });
        batch.set(changeRef.ref, JSON.parse(JSON.stringify(change)));

        // optimistically update the doc
        manager.document = new LiturgicalDocument(json1.type.apply(JSON.parse(JSON.stringify(manager.document)), change.op) as Partial<LiturgicalDocument>);

        console.log('old state of document is', manager.document);
        console.log('op is', change.op);
        console.log('new state of document after change is ', manager.document, 'from op', change.op);

        manager.lastSyncedRevision = change.lastRevision;

        manager.sentChanges.push(change); // add it to sent

        this.nextLocalManager(manager);

        await batch.commit();

        // send a Success code for UI, fading after 2 seconds
        this.status.next({ code: EditorStatusCode.Success });
        setTimeout(() => this.status.next({ code: EditorStatusCode.Idle }), 2000);
        
        manager.hasBeenAcknowledged = true;
        manager.pendingChanges.shift();
        this.nextLocalManager(manager);    
      }
    } catch(error) {
      console.warn('Rejected op: ', change)

      console.warn('The write has been rejected. This is typically because another user has submitted a change with the same revision number, so ours needs to be transformed. Still, here’s the error: \n\n', error);

      // revert to document before change
      manager.document = docBeforeChange;

      // remove change from pending and put it in rejected
      manager.pendingChanges.shift();
      manager.rejectedChanges.push(change);
      manager.hasBeenAcknowledged = true;

      // send error codes to UI
      this.status.next({ code: EditorStatusCode.Error, payload: error });
      await this.toast.create({
        message: error,
        position: 'bottom',
        duration: 3000,
        color: 'danger'
      })
    }

  }

  /** Get revision log for a given document */
  findRevisions(docId : string) : Observable<DocumentManagerChange[]> {
    return this.afs.collection<ServerDocumentManager>('DocumentManager')
      .doc(docId)
      .collection<DocumentManagerChange>('revisionLog').valueChanges();
  }

  /** Receive changes from server and apply to client, whenever anything on server changes */ 
  applyChanges(localManager : LocalDocumentManager, serverManager : ServerDocumentManager, changes : DocumentManagerChange[]) {    
    // if the server has revisions we don't, apply them to our doc
    const additionalChanges = changes
      // sorted by revision number
      .sort((a, b) => a?.lastRevision - b?.lastRevision)
      // changes where revision # is greater than last synced local revision
      .filter(change => change.lastRevision > localManager.lastSyncedRevision);
    
    // detect overlapping change numbers between local manager and remote changes
    // any overlapping changes will need to be transformed on the local copy
    const localRevisionNumbers : number[] = localManager.rejectedChanges.concat(localManager.pendingChanges)
      .map(change => change.lastRevision);
    const overlappingChanges = changes
      .filter(change => change.uid !== this._uid && localRevisionNumbers.includes(change.lastRevision));
    if(overlappingChanges) {
      additionalChanges.unshift(... overlappingChanges);
    }

    if(additionalChanges?.length > 0) {      
      additionalChanges
        .forEach((change, changeIndex) => {
          try {
            // don't apply my own changes
            if(localManager.hasBeenAcknowledged && change.actorId !== this._actorId) {
              // apply to local document
              //@ts-ignore
              localManager.document = json1.type.apply(localManager.document, change.op);
              // apply to any pending changes
              const rejected = localManager.rejectedChanges.map(localChange => ({
                ...localChange,
                op: json1.type.transform(localChange.op, change.op, "left"),
                lastRevision: serverManager.lastRevision + changeIndex + 1
              }));
              localManager.pendingChanges = rejected.concat(localManager.pendingChanges.map(localChange => ({
                ...localChange,
                op: json1.type.transform(localChange.op, change.op, "left"),
                lastRevision: serverManager.lastRevision + changeIndex + 1
              })));
              localManager.rejectedChanges = [];
            }

            // update sync number, even for my own changes
            localManager.lastSyncedRevision = change.lastRevision;
          } catch(e) {
            console.warn(e);
          }
        })
   }

    // take this as an acknowledgment, and send any additional changes
    // localManager.hasBeenAcknowledged = true;
    if(localManager.hasBeenAcknowledged && localManager.pendingChanges.length > 0) {
      console.log('sending next change from applyChanges')
      console.log('starting point value for next document change', localManager.document.value)
      setTimeout(() => this.sendNextChange(localManager), 1);
    }
  }

  // Utility Functions
  
  /** Emits the given `LocalDocumentManager` as the next value for that document's local manager */
  nextLocalManager(next : LocalDocumentManager) {
    this._localManagers[next.docId].next(next);
  }

  /** Applies an operation to `LocalDocumentManager.document`
   * Can be used optimistically to apply local changes
   * or to respond to remote changes */
  applyOp(manager : LocalDocumentManager, op : JSONOp) : void {
    try {
      //@ts-ignore
      manager.document = json1.type.apply(manager.document, op);
    } catch(e) {
      console.warn(e);
    }
  }

  /** Converts a generic LDF `Change` into an array of `json1` operations */
  opFromChange(change : Change | Change[]) : JSONOp {
    if(!Array.isArray(change)) {
      return change.fullyPathedOp().map(op => this.buildOp(op)).reduce(json1.type.compose, null);
    } else {
      return change
        .map(subchange => subchange.fullyPathedOp().map(op => this.buildOp(op)))
        .flat()
        .reduce(json1.type.compose, null);
    }
  }

  buildOp(op : Operation) : JSONOp {
    /* json1 won't accept strings as array indices; if any of the items in the JSON pointer path
     * or the additional index given in the `Operation` are numbers encoded as strings, convert to numbers */
    op.p = op.p.map(p => Number(p) >= 0 ? Number(p) : p); 
    const indexedP = op.index !== undefined ? op.p.concat(Number(op.index) >= 0 ? Number(op.index) : op.index) : op.p;

    // generate json1 op depending on the type
    switch(op.type) {
      case 'edit':
        return json1.editOp(indexedP, 'text-unicode', op.value);
      case 'insertAt':
        return json1.insertOp(indexedP, JSON.parse(JSON.stringify(op.value)));
      case 'deleteAt':
        return json1.removeOp(indexedP, op.value ?? true);
      case 'set':
        if(op.oldValue == undefined) {
          return json1.insertOp(indexedP, JSON.parse(JSON.stringify(op.value)))
        }
        else if(op.value == undefined) {
          return json1.removeOp(indexedP, op.value)
        } else {
          const jsonOp = json1.replaceOp(indexedP, JSON.parse(JSON.stringify(op.oldValue)), JSON.parse(JSON.stringify(op.value)));
          return jsonOp;
        }
      case 'delete':
        return json1.replaceOp(indexedP, op.oldValue, '');
    }
  }
}

function uuid() {
  //@ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}