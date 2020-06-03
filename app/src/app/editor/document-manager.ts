import { User, Cursor, LiturgicalDocument } from '@venite/ldf';
import { Change } from 'automerge';

export class DocumentManager {
    docId : string;
    doc : Partial<LiturgicalDocument>;
    users?: {
        [uid: string]: User;
    } 
    cursors?: {
        [uid: string]: Cursor;
    };
    changes?: Change[];
}