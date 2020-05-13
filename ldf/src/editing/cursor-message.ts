import { Cursor } from './cursor';

export class CursorMessage {
  docId: string;
  username?: string;
  lastRevision: number;
  cursor: Cursor;
}
