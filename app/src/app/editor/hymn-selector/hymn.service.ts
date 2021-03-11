import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Hymn } from "./hymn";

const hymnNumberFromHymn = (hymn: Hymn) => {
  const constainsS = hymn.number.includes("S"),
    number = Number(hymn.number.replace("S", "")),
    adjustedNumber = hymn.source.includes("LEV")
      ? number + 2000
      : number + 1000;
  return constainsS ? adjustedNumber - 1000 : adjustedNumber;
};

@Injectable({
  providedIn: "root",
})
export class HymnService {
  constructor(private readonly afs: AngularFirestore) {}

  search(search: string): Observable<Hymn[]> {
    return this.afs
      .collection<Hymn>("Hymns")
      .valueChanges()
      .pipe(
        map((hymns: Hymn[]) =>
          hymns
            .filter(
              (hymn) =>
                hymn?.number?.toLowerCase()?.includes(search.toLowerCase()) ||
                hymn?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
                hymn?.tune?.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a: Hymn, b: Hymn) =>
              hymnNumberFromHymn(a) < hymnNumberFromHymn(b) ? -1 : 1
            )
        )
      );
  }
}
