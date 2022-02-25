import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

import { CanticleTableEntry } from "@venite/ldf";
import { CanticleTableServiceInterface } from "@venite/ng-service-api";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CanticleTableService implements CanticleTableServiceInterface {
  private _cached: Promise<Record<string, CanticleTableEntry[]>>;

  constructor(
    private readonly afs: AngularFirestore,
    private http: HttpClient
  ) {}

  findEntry(
    table: string,
    nth: number,
    fallbackTable: string = undefined
  ): Observable<CanticleTableEntry[]> {
    const key = `${table}-${nth}`;
    if (!this._cached) {
      this._cached = this.http
        .get<Record<string, CanticleTableEntry[]>>(
          "/offline/canticle_table.json"
        )
        .toPromise();
    }
    return from(this._cached).pipe(
      map((entries) =>
        fallbackTable
          ? (entries[`${table ?? "bcp1979"}-${nth}`] || []).concat(
              entries[`${fallbackTable}-${nth}`] || []
            )
          : entries[`${table ?? "bcp1979"}-${nth}`] || []
      ),
      tap((entries) => console.log("canticle table entries A", entries))
    );

    // Firestore version of this transitioned to local copy
    /*return this.afs.collection<CanticleTableEntry>('CanticleTable', ref =>
      fallbackTable 
      ? ref.where('table', 'in', [table ?? 'bcp1979', fallbackTable])
           .where('nth', '==', nth)
      : ref.where('table', '==', table ?? 'bcp1979')
           .where('nth', '==', nth)
    ).valueChanges();*/
  }
}
