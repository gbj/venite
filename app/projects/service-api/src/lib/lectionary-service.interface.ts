import { LiturgicalDay, LectionaryEntry } from '@venite/ldf';
import { Observable } from 'rxjs';

export interface LectionaryServiceInterface {
  getReadings : (day : LiturgicalDay, lectionaryName : string, readingType : string, alternateYear : boolean) => Observable<LectionaryEntry[]>;
}