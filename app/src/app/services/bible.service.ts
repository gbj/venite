import { Injectable, InjectionToken } from "@angular/core";
import { Observable, of } from "rxjs";
import { BibleReading } from "@venite/ldf";
import { BibleServiceInterface } from "@venite/ng-service-api";
import { HttpClient } from "@angular/common/http";
import { catchError, map, shareReplay, startWith, tap } from "rxjs/operators";

const LOADING = new BibleReading({
  type: "bible-reading",
  style: "long",
  value: [{ text: "Loading..." }],
});

@Injectable({
  providedIn: "root",
})
export class BibleService implements BibleServiceInterface {
  constructor(private http: HttpClient) {}

  getText(
    citation: string,
    version: string = "NRSV"
  ): Observable<BibleReading> {
    let didSwitchVersion = false;

    // check for ESV apocrypha
    const r = new BibleReading({
        type: "bible-reading",
        style: "long",
        citation,
        version,
      }),
      abbrev = r.abbrevFromCitation(),
      code = r.bookCodeFromAbbrev(abbrev),
      isApocrypha = [
        "Tobit",
        "Judith",
        "Baruch",
        "1 Maccabees",
        "2 Maccabees",
        "Wisdom",
        "Sirach",
        "1 Esdras",
        "2 Esdras",
        "Bel",
        "Azariah",
      ].includes(code);

    if (version === "ESV" && isApocrypha) {
      didSwitchVersion = true;
      version = "NRSV";
    }

    return this.http
      .get<BibleReading>(
        `https://us-central1-venite-2.cloudfunctions.net/bible`,
        { params: { citation, version } }
      )
      .pipe(
        map((doc) =>
          !didSwitchVersion
            ? doc
            : new BibleReading({ ...doc, citation: `${citation} (${version})` })
        ),
        startWith(LOADING),
        catchError((e) => {
          console.warn(
            `(BibleService) error loading ${citation} (${version})`,
            e
          );
          //return of(undefined);
          return version === "NRSV" || citation.startsWith("psalm_")
            ? of(undefined)
            : this.getText(citation, "NRSV");
        }),
        shareReplay()
      );
  }
}
