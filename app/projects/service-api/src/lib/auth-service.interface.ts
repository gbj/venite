import { Observable } from 'rxjs';
import { User } from '@venite/ldf';

export interface AuthServiceInterface {
  user : Observable<User | null>;
}