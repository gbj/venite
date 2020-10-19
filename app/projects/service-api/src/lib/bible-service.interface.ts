import { Observable } from 'rxjs';
import { LiturgicalDocument } from '@venite/ldf';

export interface BibleServiceInterface {
  getText : (citation : string, version : string) => Observable<LiturgicalDocument>;
}