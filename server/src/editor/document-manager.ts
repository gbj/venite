import { Change, LiturgicalDocument, User } from '@venite/ldf';

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

  constructor() {
    this.revision_log = new Array();
    this.pending_changes = new Array();
    this.users = new Array();
  }
}
