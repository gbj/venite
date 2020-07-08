import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LiturgicalDocument, Liturgy } from '@venite/ldf';
import { DTO } from './dto';

// Include document ID and data
export interface IdAndDoc {
  id: string;
  data: LiturgicalDocument
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private readonly afs: AngularFirestore) { }

  /** Returns an array of all the public documents that match each of the provided properties of `query` */
  // TODO -- returns empty array?
  find(query : Partial<LiturgicalDocument>) : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref => {
      let builtQuery = ref.where('sharing.status', '==', 'published').where('sharing.privacy', '==', 'public');
      Object.entries(query).forEach(([prop, value]) => {
        console.log('where ', prop, '==', value);
        builtQuery = builtQuery.where(prop, '==' , value);
      });
      return builtQuery;
    }).valueChanges();
  }

  getVersions(language : string, type : string) : Observable<{[key: string]: string}> {
    return this.afs.doc<{versions: {[key: string]: string}}>(`Versions/${language}-${type}`)
      .valueChanges()
      .pipe(
        map(doc => doc.versions)
      );
  }

  getLiturgyOptions(language : string, version : string) : Observable<Liturgy[]> {
    return this.afs.collection<Liturgy>('Document', ref => 
      ref.where('type', '==', 'liturgy')
         .where('language', '==', language)
         .where('version', '==', version)
         .where('sharing.organization', '==', 'venite')
         .where('sharing.status', '==', 'published')
         .where('sharing.privacy', '==', 'public')
    ).valueChanges();
  }

  findDocumentById(docId : string) : Observable<LiturgicalDocument> {
    return this.afs.doc<LiturgicalDocument>(`Document/${docId}`).valueChanges();
  }

  findDocumentsBySlug(slug : string, language : string = 'en', versions : string[] = undefined) : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref => {
      let query = ref.where('slug', '==', slug)
                     .where('language', '==', language)
                     .where('sharing.organization', '==', 'venite')
                     .where('sharing.status', '==', 'published')
                     .where('sharing.privacy', '==', 'public');
      if(versions?.length > 0) {
        query = query.where('version', 'in', versions);
      }
      return query;
    }).valueChanges();
  }

  findDocumentsByCategory(category : string[], language : string = 'en', versions : string[] = ['bcp1979']) : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref =>
      ref.where('category', 'array-contains-any', category)
         .where('language', '==', language)
         .where('sharing.organization', '==', 'venite')
         .where('sharing.status', '==', 'published')
         .where('sharing.privacy', '==', 'public')
    ).valueChanges().pipe(
      // filtered separately because Firestore doesn't allow mixing `array-contains-any` and `in` queries
      map(docs => docs.filter(doc => versions.length == 0 || !doc.version || versions.includes(doc.version)))
    );
  }

  findDocuments() : Observable<IdAndDoc[]> {
    return this.afs.collection<LiturgicalDocument>('Document').snapshotChanges().pipe(
      // transform from AngularFire `DocumentChangeAction` to `doc`
      map(changeactions => changeactions.map(action => action?.payload?.doc)),
      // extra ID and document data and leave the rest behind
      map(docs => docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }

  /** All documents 'owned' by a user with `uid` */
  myDocuments(uid : string) : Observable<IdAndDoc[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref =>
      ref.where('sharing.owner', '==', uid)
    ).snapshotChanges().pipe(
      // transform from AngularFire `DocumentChangeAction` to `doc`
      map(changeactions => changeactions.map(action => action?.payload?.doc)),
      // extra ID and document data and leave the rest behind
      map(docs => docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }

  async newDocument(doc : LiturgicalDocument) : Promise<string> {
    const docId = this.afs.createId();
    await this.afs.collection('Document').doc(docId).set(JSON.parse(JSON.stringify(doc)));
    return docId;
  }

  saveDocument(docId : string, doc : Partial<DTO<LiturgicalDocument>>) : Observable<any> {
    return from(this.afs.doc(`Document/${docId}`).set({ ... doc, slug : doc.slug || this.slugify(doc)}));
  }

  slugify(doc : Partial<DTO<LiturgicalDocument>>) : string {
    return doc.label?.replace(/\s/g, '-').toLowerCase();
  }
}
