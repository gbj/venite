import { Observable } from 'rxjs';
import { LiturgicalColor, LiturgicalDocument, Liturgy } from '@venite/ldf';

export interface DocumentServiceInterface {
  findDocumentsBySlug : (slug : string, language : string, versions : string[] | undefined, disableOffline? : boolean, bulletinMode? : boolean) => Observable<LiturgicalDocument[]>;

  findDocumentsByCategory : (category : string[], language : string, versions : string[], disableOffline? : boolean, bulletinMode? : boolean) => Observable<LiturgicalDocument[]>;

  getLiturgyOptions : (language : string, version : string) => Observable<Liturgy[]>;

  getVersions : (language : string, type : string) => Observable<{[key: string]: string}>;

  getColor : (color : string | LiturgicalColor) => Observable<string>;
}