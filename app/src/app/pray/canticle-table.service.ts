import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

export class CanticleTableEntry {
  table : string;
  slug : string;
  weekday : string;
  evening : boolean;
  nth : number;
  season : string;
  week : string;
  day : string;
}

@Injectable({
  providedIn: 'root'
})
export class CanticleTableService {

  constructor(private readonly afs: AngularFirestore) { }

  findEntry(table : string, nth : number, fallbackTable : string = undefined) : Observable<CanticleTableEntry[]> {
    
    return this.afs.collection<CanticleTableEntry>('CanticleTable', ref =>
      fallbackTable 
      ? ref.where('table', 'in', [table, fallbackTable])
           .where('nth', '==', nth)
      : ref.where('table', '==', table)
           .where('nth', '==', nth)
    ).valueChanges();
  }

}
