import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';

import { LiturgicalDocument, Liturgy, LiturgicalDay } from '@venite/ldf';

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

  findDocumentsBySlug(slug : string) : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref =>
      ref.where('slug', '==', slug)
    ).valueChanges();
  }

  findDocuments(slug: string, language : string = 'en', version : string = 'bcp1979') : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref => 
      ref.where('slug', '==', slug)
         .where('language', '==', language)
         .where('version', '==', version)
    ).valueChanges();
  }
}
