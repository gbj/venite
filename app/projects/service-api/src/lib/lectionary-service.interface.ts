import { LiturgicalDay, LectionaryEntry } from '@venite/ldf';
import { Observable } from 'rxjs';

export interface LectionaryServiceInterface {
  getReadings : (day : LiturgicalDay, lectionaryName : string, readingType : string) => Observable<LectionaryEntry[]>;
}