import { Observable } from 'rxjs';
import { CanticleTableEntry } from '@venite/ldf';

export interface CanticleTableServiceInterface {
  findEntry : (table : string, nth : number, fallbackTable : string) => Observable<CanticleTableEntry[]>;
}