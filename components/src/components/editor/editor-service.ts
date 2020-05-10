import io from 'socket.io-client';
import { Subject } from 'rxjs';
import { Change, Cursor, User } from '@venite/ldf';
import { LiturgicalDocument } from '@venite/ldf';

class EditorServiceController {
  private socket;

  /** Observable that emits a new cursor position whenever another user's cursor moves */
  public cursorMoved : Subject<Cursor> = new Subject<Cursor>();

  /** Observable that emits a Change whenever another user edits the document */
  public docChanged : Subject<Change[]> = new Subject<Change[]>();

  /** Observable that listens for a change when the server sends the most recent version of document */
  public refreshDoc : Subject<LiturgicalDocument> = new Subject<LiturgicalDocument>();

  /** Array that gives usernames and colors */
  public users : Subject<User[]> = new Subject<User[]>();

  /** Subject that yields room #, document, and list of users when you've joined */
  public joined : Subject<{ doc: LiturgicalDocument; users: User[]; }> = new Subject();

  /** Connects to the server, without logging in or loading a document */
  connect() {
    this.socket.connect();
  }

  /** Disconnects from the server, without logging out */
  disconnect() {
    this.socket.disconnect();
  }

  /** Loads a given document by ID, as a given user */
  join(docId : string, userToken : string) {
    // tell the server that we're joining
    this.socket.emit('join', { docId, userToken });
  }

  /** Leave a document */
  leave(docId : string) {
    this.socket.emit('leave', docId);
  }

  /** Passes cursor and document change events to the server */
  emit(event : string, message : any) {
    this.socket.emit(event, message);
    console.log('emitted', event, message);
  }

  constructor(url : string = 'http://10.0.0.163:3000') {
    this.socket = io(url);

    // When this user connects or disconnects
    this.socket.on('connect', () => console.log('connected to server'));
    this.socket.on('disconnect', () => console.log('disconnected from server'));

    // Events from other users => emit via RxJS Subjects
    this.socket.on('cursorMoved', (data) => this.cursorMoved.next(data));
    this.socket.on('docChanged', (data) => this.docChanged.next(data));
    this.socket.on('users', (data) => this.users.next(data));
    this.socket.on('joined', (data) => this.joined.next(data));
    this.socket.on('refreshDoc', (data) => this.refreshDoc.next(data));
  }
}

export const EditorService = new EditorServiceController();
