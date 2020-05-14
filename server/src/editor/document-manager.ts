import { Change, ChangeMessage, LiturgicalDocument, User } from '@venite/ldf';
import { Subject } from 'rxjs';
import { Socket } from 'socket.io';

import * as json0 from 'ot-json0';

/** Class for each document the server has a session revising.
  * Following the server-side process outlined at
  * https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447#d628 */
export class DocumentManager {
  public changes : Subject<{ client: Socket; message: ChangeMessage; }> = new Subject();

  docId: string;
  revision_log: Change[];
  pending_changes: { client: Socket; change: Change; clientLastRevision: number; }[];
  document: LiturgicalDocument;
  users: User[];

  addUser(user : User) {
    this.users.push(user);
  }

  removeUser(clientId : string) {
    this.users = this.users.filter(user => user.client !== clientId);
  }

  clientToUser(clientId : string) {
    return this.users.find(user => user.client == clientId);
  }

  // return number of latest revision
  getLastRevision() : number {
    return this.revision_log.length;
  }

  /** Adds a change into the queue */
  addChangeToQueue(client: Socket, change : Change, clientLastRevision : number ) {
    this.pending_changes.push({ client, change, clientLastRevision });
    this.applyNextChange();
  }

  /** Returns a transformed change that can be sent out to other clients */
  applyNextChange() {
    const nextChange = this.pending_changes.shift(),
          { client, change, clientLastRevision } = nextChange,
          realLastRevision = this.getLastRevision();

    console.log('processing change from ', change.user, 'queue is now ', this.pending_changes);

    console.log(change.user, clientLastRevision, realLastRevision);

    let op = change.fullyPathedOp();

    if(clientLastRevision < realLastRevision) {
      const transformsToApply = this.revision_log.slice(clientLastRevision, realLastRevision).map(change => change.fullyPathedOp());

      transformsToApply.forEach(transformOp => op = json0.type.transform(op, transformOp, 'right'));

      console.log('op = ', op);

      this.document = json0.type.apply(this.document, op);
      this.revision_log.push(new Change({ ... change, op }));
    } else {
      const op = change.fullyPathedOp();
      this.document = json0.type.apply(this.document, op);
      this.revision_log.push(change);
    }

    // return the latest revision and transformed change to be sent out to clients
    op = op.map(o => (o.hasOwnProperty('si') || o.hasOwnProperty('sd') ? { ... o, p: o.p.slice(o.p.length - 1)} : o));     // hacky way of getting to the textarea -- fix this
    this.changes.next({
      client,
      message: {
        docId: this.docId,
        lastRevision: this.getLastRevision(),
        username: change.user,
        change: new Change({ ... change, op })
      }
    });

    if(this.pending_changes.length > 0) {
      this.applyNextChange();
    }
  }

  constructor() {
    this.revision_log = new Array();
    this.pending_changes = new Array();
    this.users = new Array();
  }
}
