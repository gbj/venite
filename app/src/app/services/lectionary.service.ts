import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LectionaryEntry, LiturgicalDay, dateFromYMDString } from "@venite/ldf";
import { ReplaySubject, Observable, from, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
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
    alternateYear: boolean = false
  ): Observable<LectionaryEntry[]> {
    // lectionaries that include readings for black-letter days
    const BLACK_LETTER_LECTIONARIES = ["lff2018"];

    // if lectionary is a "black-letter lectionary"
    if (BLACK_LETTER_LECTIONARIES.includes(lectionaryName)) {
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
        "rclsunday",
        "rclsundayTrack1",
      ].includes(lectionaryName)
    ) {
      const key = `${
        day.propers || day.slug
      }-${lectionaryName}-${readingType}-${alternateYear}`;
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
                  "morning_psalms",
                  "second_reading",
                  "gospel",
                  "palms_gospel",
                ].includes(readingType)
              ) {
                return entries.filter(
                  (entry) =>
                    entry.day == (day.propers || day.slug) &&
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
                  const beforeFiltering = [...halfFiltered];

                  // by day or (if RCL and not a holy day) by Sunday
                  halfFiltered = halfFiltered.filter(
                    (entry) =>
                      entry.day == (day.propers || day.slug) ||
                      ((lectionaryName === "rclsunday" ||
                        lectionaryName === "rclsundayTrack1") &&
                        !day.holy_day_observed &&
                        entry.day === day.week?.slug)
                  );

                  // if none found for day or (RCL) Sunday, try RCL Proper ___ Sunday
                  if (halfFiltered?.length == 0) {
                    halfFiltered = beforeFiltering.filter(
                      (entry) =>
                        entry.day == (day.propers || day.slug) ||
                        ((lectionaryName === "rclsunday" ||
                          lectionaryName === "rclsundayTrack1") &&
                          !day.holy_day_observed &&
                          (entry.day === day.week?.slug ||
                            entry.day === day.week?.propers))
                    );
                  }

                  // if still nothing, perhaps it's an RCL Holy Day that's listed under the Sunday (like Palm Sunday)
                  if (halfFiltered?.length == 0) {
                    halfFiltered = beforeFiltering.filter(
                      (entry) =>
                        entry.day == (day.propers || day.slug) ||
                        ((lectionaryName === "rclsunday" ||
                          lectionaryName === "rclsundayTrack1") &&
                          entry.day === day.week?.slug)
                    );
                  }
                }

                return halfFiltered;
              }
            }),
            switchMap((entries) => {
              // fall back to RCL Track "2" (contains all the weeks that are not Proper ____)
              if (
                (entries?.length == 0 ||
                  (readingType == undefined && !day.week.proper)) &&
                lectionaryName == "rclsundayTrack1"
              ) {
                return this.possiblyOfflineQuery(
                  day,
                  "rclsunday",
                  readingType,
                  alternateYear,
                  disableOffline
                );
              } else {
                return of(entries);
              }
            }),
            tap((e) => console.log("getReadings for day", day, "\n\n", e))
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
        .valueChanges()
        .pipe(
          tap((e) =>
            console.log("getReadings (online) for day", day, "\n\n", e)
          )
        );
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
      case "rclsunday":
      case "rclsundayTrack1":
        return {
          whentype: "year",
          when: day.years["rclsunday"].toString(),
          includeDay: true,
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
}
