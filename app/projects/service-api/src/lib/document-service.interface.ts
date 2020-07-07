import { Observable } from 'rxjs';
import { LiturgicalDocument, Liturgy } from '@venite/ldf';

export interface DocumentServiceInterface {
  findDocumentsBySlug : (slug : string, language : string, versions : string[] | undefined) => Observable<LiturgicalDocument[]>;

  getLiturgyOptions : (language : string, version : string) => Observable<Liturgy[]>;
}