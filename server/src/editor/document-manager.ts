import { Change, LiturgicalDocument, User } from '@venite/ldf';

import * as json0 from 'ot-json0';

/** Class for each document the server has a session revising.
  * Following the server-side process outlined at
  * https://medium.com/coinmonks/operational-transformations-as-an-algorithm-for-automatic-conflict-resolution-3bf8920ea447#d628 */
export class DocumentManager {
  revision_log: Change[];
  pending_changes: Change[];
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

  /** Returns a transformed change that can be sent out to other clients */
  applyChangeToDoc(change : Change, clientLastRevision : number) : { revision: number; transformedChange: Change; } {
    const realLastRevision = this.getLastRevision();
    console.log('client sent revision', clientLastRevision, 'real last revision', realLastRevision);
    let op = change.fullyPathedOp();

    if(clientLastRevision < realLastRevision) {
      console.log('they do not match. transform the change.')

      console.log('op = ', op);

      console.log('revision_log = ', this.revision_log);

      const transformsToApply = this.revision_log.slice(clientLastRevision, realLastRevision).map(change => change.fullyPathedOp());

      console.log('transformsToApply = ', transformsToApply);

      transformsToApply.forEach(transformOp => op = json0.type.transform(op, transformOp, 'right'));

      console.log('op = ', op);

      this.document = json0.type.apply(this.document, op);
      this.revision_log.push(new Change({ ... change, op }));
    } else {
      console.log('they match. apply the change and push.');
      const op = change.fullyPathedOp();
      this.document = json0.type.apply(this.document, op);
      this.revision_log.push(change);
    }

    // return the latest revision and transformed change to be sent out to clients
    if(change.path) {
      op = op.map(o => ({ ... o, p: o.p.slice(o.p.length - 1)}));     // hacky way of getting to the textarea -- fix this
    }
    return { revision: this.getLastRevision(), transformedChange: new Change({ ... change, op }) };

  }

  constructor() {
    this.revision_log = new Array();
    this.pending_changes = new Array();
    this.users = new Array();
  }
}
