import { User, Cursor, LiturgicalDocument } from '@venite/ldf';
import * as Automerge from 'automerge';

export class DocumentManager {
    docId : string;
    doc : Partial<LiturgicalDocument>;
    users?: {
        [uid: string]: User;
    } 
    cursors?: {
        [uid: string]: Cursor;
    };
    changes?: Automerge.Change[];
}