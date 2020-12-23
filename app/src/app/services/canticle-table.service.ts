import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { CanticleTableEntry } from '@venite/ldf';
import { CanticleTableServiceInterface } from 'service-api';

@Injectable({
  providedIn: 'root'
})
export class CanticleTableService implements CanticleTableServiceInterface {

  constructor(private readonly afs: AngularFirestore) { }

  findEntry(table : string, nth : number, fallbackTable : string = undefined) : Observable<CanticleTableEntry[]> {
    return this.afs.collection<CanticleTableEntry>('CanticleTable', ref =>
      fallbackTable 
      ? ref.where('table', 'in', [table ?? 'bcp1979', fallbackTable])
           .where('nth', '==', nth)
      : ref.where('table', '==', table ?? 'bcp1979')
           .where('nth', '==', nth)
    ).valueChanges();
  }

}
