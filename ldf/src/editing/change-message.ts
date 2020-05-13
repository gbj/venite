import { Change } from './change';

export class ChangeMessage {
  docId: string;
  username?: string;
  lastRevision: number;
  change: Change;
}
