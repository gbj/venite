import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { LiturgicalDocument, Liturgy } from '@venite/ldf';

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

  getLiturgyOptions(language : string, version : string) : Observable<Liturgy[]> {
    return this.afs.collection<Liturgy>('Document', ref => 
      ref.where('type', '==', 'liturgy')
         .where('language', '==', language)
         .where('version', '==', version)
    ).valueChanges();
  }

  findDocumentById(docId : string) : Observable<LiturgicalDocument> {
    return this.afs.doc<LiturgicalDocument>(`Document/${docId}`).valueChanges();
  }

  findDocumentsBySlug(slug : string, language : string = 'en', version : string = 'bcp1979') : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref =>
      ref.where('slug', '==', slug)
         .where('language', '==', language)
         .where('version', '==', version)
    ).valueChanges();
  }

  findDocuments() : Observable<IdAndDoc[]> {
    return this.afs.collection<LiturgicalDocument>('Document').snapshotChanges().pipe(
      // transform from AngularFire `DocumentChangeAction` to `doc`
      map(changeactions => changeactions.map(action => action?.payload?.doc)),
      // extra ID and document data and leave the rest behind
      map(docs => docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }

  saveDocument(docId : string, doc : LiturgicalDocument) : Observable<any> {
    return from(this.afs.doc(`Document/${docId}`).set({ ... doc, slug : doc.slug || this.slugify(doc)}));
  }

  slugify(doc : LiturgicalDocument) : string {
    return doc.label?.replace(/\s/g, '-').toLowerCase();
  }
}
