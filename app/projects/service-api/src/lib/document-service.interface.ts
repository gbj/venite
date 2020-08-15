import { Observable } from 'rxjs';
import { LiturgicalDocument, Liturgy } from '@venite/ldf';

export interface DocumentServiceInterface {
  findDocumentsBySlug : (slug : string, language : string, versions : string[] | undefined) => Observable<LiturgicalDocument[]>;

  findDocumentsByCategory : (category : string[], language : string, versions : string[]) => Observable<LiturgicalDocument[]>;

  getLiturgyOptions : (language : string, version : string) => Observable<Liturgy[]>;

  getVersions : (language : string, type : string) => Observable<{[key: string]: string}>;
}