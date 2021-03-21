import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LectionaryEntry, LiturgicalDay, dateFromYMDString } from "@venite/ldf";
import { ReplaySubject, Observable, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class LectionaryService {
  private _cache: Record<string, Promise<LectionaryEntry[]>> = {};
  private _cached_rcl: Record<string, ReplaySubject<LectionaryEntry[]>> = {};

  constructor(
    private readonly afs: AngularFirestore,
    private http: HttpClient
  ) {}

  getReadings(
    day: LiturgicalDay,
    lectionaryName: string = undefined,
    readingType: string = undefined,
    alternateYear: boolean
  ): Observable<LectionaryEntry[]> {
    // lectionaries that include readings for black-letter days
    const BLACK_LETTER_LECTIONARIES = ["lff2018"];

    // handle RCL readings separately via LectServe API
    if (
      lectionaryName == "rclsunday" ||
      lectionaryName == "rcl" ||
      lectionaryName == "rclsundayTrack1"
    ) {
      return this.rcl(
        dateFromYMDString(day.date),
        lectionaryName,
        day.propers,
        day.years["rclsunday"],
        day.slug
      ).pipe(
        map((readings) =>
          uniqueBy(
            readings.filter(
              (reading) => !readingType || reading.type === readingType
            ),
            (e) => e.citation
          )
        )
      );
    }
    // if lectionary is a "black-letter lectionary"
    else if (BLACK_LETTER_LECTIONARIES.includes(lectionaryName)) {
      const days = (day.holy_days || [])
        .map((holyDay) => holyDay.slug)
        .filter((slug) => slug !== undefined);

      return this.afs
        .collection<LectionaryEntry>("LectionaryEntry", (ref) => {
          let query: firebase.firestore.Query = ref
            .where("lectionary", "==", lectionaryName)
            .where(
              "day",
              "in",
              Array.from(new Set(days.concat(day.propers ?? day.slug)))
            );

          if (readingType !== undefined) {
            // for UI reasons, 'first_reading' with alternateYear = true needs to have a different `value` for the select
            // so its value is set to 'first_reading_alt'
            // but it still needs to search for 'first_reading'
            query = query.where(
              "type",
              "==",
              readingType?.endsWith("_alt")
                ? readingType.replace("_alt", "")
                : readingType
            );
          }

          return query;
        })
        .valueChanges();
    }
    // search for other readings in our DB
    else {
      return this.possiblyOfflineQuery(
        day,
        lectionaryName,
        readingType,
        alternateYear
      ).pipe(
        tap((entries) =>
          console.log("getReadings possiblyOfflineQuery entries = ", entries)
        )
      );
    }
  }

  possiblyOfflineQuery(
    day: LiturgicalDay,
    lectionaryName: string = undefined,
    readingType: string = undefined,
    alternateYear: boolean,
    disableOffline: boolean = false
  ): Observable<LectionaryEntry[]> {
    const { when, whentype, includeDay } = this.when(
      lectionaryName,
      day,
      alternateYear
    );

    // if possible, look for it in the JSON lectionary files
    if (
      !disableOffline &&
      [
        "bcp1979_30day_psalter",
        "bcp1979_daily_office",
        "bcp1979_daily_psalms",
      ].includes(lectionaryName)
    ) {
      const key = `${day.date}-${lectionaryName}-${readingType}-${alternateYear}`;
      if (!this._cache[key]) {
        this._cache[key] = this.http
          .get<LectionaryEntry[]>(`/offline/lectionary/${lectionaryName}.json`)
          .pipe(
            map((entries) => {
              if (
                includeDay &&
                day.holy_day_observed &&
                day.slug &&
                day.holy_day_observed?.type?.rank > 2 &&
                ![
                  "first_reading_alt",
                  "first_reading",
                  "second_reading",
                  "gospel",
                ].includes(readingType)
              ) {
                console.log(
                  "(possiblyOfflineQuery) returning ",
                  entries.filter(
                    (entry) =>
                      entry.day == day.slug &&
                      (!readingType || entry.type == readingType)
                  )
                );
                return entries.filter(
                  (entry) =>
                    entry.day == day.slug &&
                    (!readingType || entry.type == readingType)
                );
              } else {
                let halfFiltered = entries.filter(
                  (entry) =>
                    entry.when.toString() == when.toString() &&
                    entry.whentype == whentype
                );
                if (lectionaryName !== undefined) {
                  halfFiltered = halfFiltered.filter(
                    (entry) => entry.lectionary == lectionaryName
                  );
                }

                if (readingType !== undefined) {
                  // for UI reasons, 'first_reading' with alternateYear = true needs to have a different `value` for the select
                  // so its value is set to 'first_reading_alt'
                  // but it still needs to search for 'first_reading'
                  halfFiltered = halfFiltered.filter(
                    (entry) =>
                      entry.type ==
                      (readingType?.endsWith("_alt")
                        ? readingType.replace("_alt", "")
                        : readingType)
                  );
                }

                if (includeDay !== false) {
                  halfFiltered = halfFiltered.filter(
                    (entry) => entry.day == (day.propers || day.slug)
                  );
                }

                return halfFiltered;
              }
            })
          )
          .toPromise();
      }
      return from(this._cache[key]);
    }
    // otherwise go to the server-side DB
    else {
      return this.afs
        .collection<LectionaryEntry>("LectionaryEntry", (ref) => {
          if (
            includeDay &&
            day.holy_day_observed &&
            day.slug &&
            day.holy_day_observed?.type?.rank > 2 &&
            ![
              "first_reading_alt",
              "first_reading",
              "second_reading",
              "gospel",
            ].includes(readingType)
          ) {
            let query = ref.where("day", "==", day.slug);
            if (readingType !== undefined) {
              query = query.where("type", "==", readingType);
            }
            return query;
          } else {
            let query: firebase.firestore.Query = ref
              .where("when", "==", when)
              .where("whentype", "==", whentype);

            if (lectionaryName !== undefined) {
              query = query.where("lectionary", "==", lectionaryName);
            }

            if (readingType !== undefined) {
              // for UI reasons, 'first_reading' with alternateYear = true needs to have a different `value` for the select
              // so its value is set to 'first_reading_alt'
              // but it still needs to search for 'first_reading'
              query = query.where(
                "type",
                "==",
                readingType?.endsWith("_alt")
                  ? readingType.replace("_alt", "")
                  : readingType
              );
            }

            if (includeDay !== false) {
              query = query.where("day", "==", day.propers || day.slug);
            }

            return query;
          }
        })
        .valueChanges();
    }
  }

  when(
    lectionaryName: string,
    day: LiturgicalDay,
    alternateYear: boolean
  ): { when: string; whentype: string; includeDay: boolean } {
    switch (lectionaryName) {
      case "bcp1979_30day_psalter":
        return {
          whentype: "date",
          when: dateFromYMDString(day.date).getDate().toString(),
          includeDay: false,
        };
      case "bcp1979_daily_office":
      case "bcp1979_daily_psalms":
      default:
        if (alternateYear) {
          const year = Number(day.years["bcp1979_daily_office"]);
          return {
            whentype: "year",
            when: ((year % 2) + 1).toString(),
            includeDay: true,
          };
        } else {
          return {
            whentype: "year",
            when: day.years["bcp1979_daily_office"].toString(),
            includeDay: true,
          };
        }
    }
  }

  rcl(
    date: Date,
    lectionary: string,
    propers: string,
    year: string,
    day: string
  ): Observable<LectionaryEntry[]> {
    // TODO integrate RCL API into a Cloud Function
    const y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      slug = `${y}-${m}-${d}-${lectionary}-${propers}-${year}-${day}`;
    if (this._cached_rcl[slug]) {
      return this._cached_rcl[slug];
    } else {
      this._cached_rcl[slug] = new ReplaySubject();
      this.http
        .get<LectionaryEntry[]>(
          `https://www.venite.app/api/lectionary/reading/?y=${y}&m=${m}&d=${d}&lectionary=${lectionary}&propers=${propers}&year=${year}&day=${day}`
        )
        .subscribe((data) => this._cached_rcl[slug].next(data));
      return this._cached_rcl[slug];
    }
  }
}

function uniqueBy<T>(a: T[], key: (item: T) => string): T[] {
  var seen = {};
  return a.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}
