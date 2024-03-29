import { User, Cursor, LiturgicalDocument, Change } from "@venite/ldf";

export class DocumentManagerChange {
  actorId: string;
  uid: string;
  lastRevision: number;
  op: any;
  originalChange?: Change | Change[];
}

export class ServerDocumentManager {
  docId: string;
  users?: {
    [uid: string]: User;
  };
  cursors?: {
    [uid: string]: Cursor;
  };
  lastRevision: number = 0;
  revisionLog?: DocumentManagerChange[];
}

export class LocalDocumentManager {
  hasBeenAcknowledged: boolean = true;
  lastSyncedRevision: number = 0;
  sentChanges: DocumentManagerChange[] = new Array();
  pendingChanges: DocumentManagerChange[] = new Array();
  rejectedChanges: DocumentManagerChange[] = new Array();
  document: LiturgicalDocument;

  constructor(public docId: string) {}
}
