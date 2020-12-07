import { LiturgicalDocument } from '@venite/ldf';
import { LocalDocumentManager, ServerDocumentManager } from './document-manager';

export type EditorState = {
  localManager: LocalDocumentManager,
  serverManager: ServerDocumentManager,
  docSaved : Date,
  bibleIntros: LiturgicalDocument[],
}