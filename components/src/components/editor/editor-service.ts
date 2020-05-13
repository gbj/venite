import io from 'socket.io-client';
import { Subject } from 'rxjs';
import { ChangeMessage, CursorMessage, Change, Cursor, User } from '@venite/ldf';
import { LiturgicalDocument } from '@venite/ldf';

class EditorServiceController {
  // Private Variables
  private socket : io.Socket;

  // Observables
  /** Observable that emits a new cursor position whenever another user's cursor moves */
  public cursorMoved : Subject<CursorMessage> = new Subject<CursorMessage>();

  /** Observable that emits a Change whenever another user edits the document */
  public docChanged : Subject<ChangeMessage> = new Subject<ChangeMessage>();

  /** Array that gives usernames and colors */
  public users : Subject<User[]> = new Subject<User[]>();

  /** Subject that yields room #, document, and list of users when you've joined */
  public joined : Subject<{ doc: LiturgicalDocument; users: User[]; }> = new Subject();

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

  /* 4. Implementation of client side of OT protocol
   *    outline found here: https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447#d628 */
  private docId : string;
  private hasBeenAcknowledged : boolean = false;
  private lastRevision : number = 0;
  private sentChanges : Change[] = new Array();
  private pendingChanges : Change[] = new Array();

  moveCursor(cursor : Cursor) {
    this.socket.emit('cursorMoved', {
      docId: this.docId,
      lastRevision: this.lastRevision,
      cursor
    });
    console.log('(EditorService) moved cursor', cursor);
  }

  processChange(change : Change) {
    console.log('processChange', change);

    // add the change to end of the list of pending changes
    this.pendingChanges.push(change);

    console.log('(processChange) hasBeenAcknowledged (before sending) = ', this.hasBeenAcknowledged);

    // if you've been acknowledged, send the first change in the pending queue
    if(this.hasBeenAcknowledged) {
      this.sendNextChange();
    }
  }

  sendNextChange() {
    this.hasBeenAcknowledged = false; // change we are about to send has not been acknowledged yet
    const nextChange = this.pendingChanges.shift(), // takes item from beginning of array and mutates
          message : ChangeMessage = {
            docId: this.docId,
            lastRevision: this.lastRevision,
            change: nextChange
          };
    this.emit('sentChange', message);
    this.sentChanges.push(nextChange);
    console.log('(sendNextChange) hasBeenAcknowledged (after sending) = ', this.hasBeenAcknowledged);
  }

  ack(acknowledged : boolean) {
    console.log('(ack) ack received', acknowledged);
    this.hasBeenAcknowledged = acknowledged;
    if(acknowledged && this.pendingChanges.length > 0) {
      console.log('(ack) sending next pending change');
      this.sendNextChange();
    }
  }

  // Constructor — connects to server and sets up listeners
  constructor(url : string = 'http://localhost:3000') {
    this.socket = io(url);

    // When this user connects or disconnects
    this.socket.on('connect', () => console.log('connected to server'));
    this.socket.on('disconnect', () => console.log('disconnected from server'));

    // Events from other users => emit via RxJS Subjects
    this.socket.on('cursorMoved', (data) => this.cursorMoved.next(data));
    this.socket.on('docChanged', (data) => this.docChanged.next(data));
    this.socket.on('users', (data) => this.users.next(data));
    this.socket.on('joined', (data) => {
      this.hasBeenAcknowledged = true;
      console.log('hasBeenAcknowledged (after joining) =', this.hasBeenAcknowledged);
      this.joined.next(data)
    });
    this.socket.on('ack', (data) => this.ack(data));
  }
}

export const EditorService = new EditorServiceController();
