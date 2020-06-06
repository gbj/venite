import { User, Cursor, LiturgicalDocument, Change } from '@venite/ldf';
import * as Automerge from 'automerge';
import * as json1 from 'ot-json1';

export class DocumentManagerChange {
    uid : string;
    lastRevision : number;
    op : json1.JSONOp;
}

export class ServerDocumentManager {
    docId : string;
    users?: {
        [uid: string]: User;
    } 
    cursors?: {
        [uid: string]: Cursor;
    };
    pendingChanges: DocumentManagerChange[];
    revisionLog: DocumentManagerChange[];
}

export class LocalDocumentManager {
    hasBeenAcknowledged: boolean = false;
    lastSyncedRevision: number = 0;
    sentChanges: DocumentManagerChange[] = new Array();
    pendingChanges: DocumentManagerChange[] = new Array();
    document : LiturgicalDocument;

    constructor(public docId : string) { }
}