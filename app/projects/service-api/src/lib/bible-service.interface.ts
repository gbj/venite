import { Observable } from 'rxjs';
import { BibleReading } from '@venite/ldf';

export interface BibleServiceInterface {
  getText : (citation : string, version : string) => Observable<BibleReading>;
}