import io from 'socket.io-client';
import { Subject } from 'rxjs';
import { ChangeMessage, CursorMessage, Change, Cursor, User } from '@venite/ldf';
import { LiturgicalDocument } from '@venite/ldf';

import * as json0 from 'ot-json0';

class EditorServiceController {
  // Private Variables
  private socket : io.Socket;

  // Observables
  /** Emits a new cursor position whenever another user's cursor moves */
  public cursorMoved : Subject<CursorMessage> = new Subject<CursorMessage>();

  /** Emits a change whenever the document has been edited on the server and needs an update on the client */
  public docChanged : Subject<ChangeMessage> = new Subject<ChangeMessage>();

  /** Emits updated user list when other users join the document */
  public users : Subject<User[]> = new Subject<User[]>();

  /** Emits document and list of users currently present when you join a room */
  public joined : Subject<{ doc: LiturgicalDocument; users: User[]; }> = new Subject();

  /** Emits errors received from the server */
  public error : Subject<{ status: string; message: string; }> = new Subject();

  // 1. Connect to/Disconnect from Server
  /** Connects to the server, without logging in or loading a document */
  connect() {
    this.socket.connect();
  }

  /** Disconnects from the server, without logging out */
  disconnect() {
    this.socket.disconnect();
  }

  // 2. Join/Leave Documents
  /** Loads a given document by ID, as a given user */
  join(docId : string, userToken : string) {
    // tell the server that we're joining
    this.docId = docId;
    this.socket.emit('join', { docId, userToken });
    console.log('sent join message');
  }

  /** Leave a document */
  leave(docId : string) {
    this.docId = null;
    this.socket.emit('leave', docId);
  }

  // 3. Helper to emit any message
  /** Passes cursor and document change events to the server */
  emit(event : string, message : any) {
    this.socket.emit(event, message);
  }

  // 4. Non-OT messages
  /** Asks the server to send us its understanding of the current document
    * The server holds the ultimate source of truth for any document
    * Useful if the server returns an error after we give it a change
    * The server will respond with a `joined` message, which will give us the document */
  public refreshDoc() {
    this.socket.emit('refreshDoc', this.docId);
  }

  /** Send a message that we've moved our cursor */
  public moveCursor(cursor : Cursor) {
    console.log('moveCursor = ', cursor);
    this.socket.emit('cursorMoved', {
      docId: this.docId,
      lastRevision: this.lastRevision,
      cursor
    });
  }

  /* 5. Implementation of client side of OT protocol
   *    outline found here: https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447#d628 */
  private docId : string;
  private hasBeenAcknowledged : boolean = false;
  private lastRevision : number = 0;
  private sentChanges : Change[] = new Array();
  private pendingChanges : Change[] = new Array();

  /** Notify the server that our editing client has changed the document.
    * Every new `Change` from the `EditorComponent` enters through this function */
  public processChange(change : Change) {
    // add the change to end of the list of pending changes
    this.pendingChanges.push(change);

    // if you've been acknowledged, send the first change in the pending queue
    if(this.hasBeenAcknowledged) {
      this.sendNextChange();
    }
  }

  // send the next change in the pending queue to the server
  private sendNextChange() {
    this.hasBeenAcknowledged = false; // change we are about to send has not been acknowledged yet
    const nextChange = this.pendingChanges.shift(), // takes item from beginning of array and mutates
          message : ChangeMessage = {
            docId: this.docId,
            lastRevision: this.lastRevision,
            change: nextChange
          };
    this.emit('sentChange', message);
    this.sentChanges.push(nextChange);
  }

  // Handles an `ack` message received from server
  // Emits sends a revision number and changes back to the client via a Subject
  private ack(message : ChangeMessage) {
    this.hasBeenAcknowledged = true;
    this.lastRevision = message.lastRevision;

    this.docChanged.next(message);

    // if we have pending changes, send the next one
    if(this.pendingChanges.length > 0) {
      console.log('(ack) sending next pending change', this.pendingChanges[0]);
      this.sendNextChange();
    }
  }

  // Handles a `docChanged` received from the server
  // Emits pending changes and new revision number to the client via a Subject
  private receivedDocChanged(message : ChangeMessage) {
    console.log('(receivedDocChanged)', message);
    this.pendingChanges = this.pendingChanges.map(myChange => json0.type.transform(myChange.fullyPathedOp(), message.change.fullyPathedOp()));
    this.lastRevision = message.lastRevision;
    this.docChanged.next(message);
  }

  // Constructor — connects to server and sets up listeners
  constructor(url : string = 'http://localhost:3000') {
    this.socket = io(url);

    // When this user connects or disconnects, or load a doc
    this.socket.on('connect', () => console.log('connected to server'));
    this.socket.on('disconnect', () => console.log('disconnected from server'));
    this.socket.on('joined', (data) => {
      this.hasBeenAcknowledged = true;
      this.lastRevision = data.lastRevision;
      this.joined.next(data);
    });

    // Events from other users => process or emit via RxJS Subjects
    this.socket.on('cursorMoved', (data : CursorMessage) => {
      console.log('cursorMoved = ', data.username, data.cursor);
      this.cursorMoved.next(data)
    });
    this.socket.on('docChanged', (data : ChangeMessage) => {
      console.log('(socket.on docChanged)', data);
      this.receivedDocChanged(data)
    });
    this.socket.on('users', (data) => this.users.next(data));
    this.socket.on('ack', (data) => this.ack(data));

    // Error handling
    this.socket.on('exception', (data) => this.error.next(data));
  }
}

export const EditorService = new EditorServiceController();
