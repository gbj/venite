import { User, Cursor, LiturgicalDocument } from '@venite/ldf';
import * as Automerge from 'automerge';

export class DocumentManager {
    docId : string;
    doc : string; // Automerge.Doc<LiturgicalDocument> serialized by Automerge.save()
    users?: {
        [uid: string]: User;
    } 
    cursors?: {
        [uid: string]: Cursor;
    };
    changes?: Automerge.Change[];
}

export class DocumentManagerChange {
    docId : string;
    uid : string;
    changes : Automerge.Change[];
}