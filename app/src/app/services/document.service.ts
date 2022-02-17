import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, from, of, combineLatest, merge, concat } from "rxjs";
import {
  catchError,
  filter,
  map,
  startWith,
  switchMap,
  first,
  tap,
} from "rxjs/operators";

import {
  docsToOption,
  LiturgicalColor,
  LiturgicalDocument,
  Liturgy,
  versionToString,
  Text,
} from "@venite/ldf";
import { DTO } from "./dto";
import { Organization } from "../organization/organization";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthService } from "../auth/auth.service";
import { OrganizationService } from "../organization/organization.service";

import BY_SLUG from "../../offline/by_slug.json";
import COLORS from "../../offline/colors.json";
import VERSIONS from "../../offline/versions.json";
import { HttpClient } from "@angular/common/http";
import { isOnline } from "../editor/ldf-editor/is-online";

// Include document ID and data
export interface IdAndDoc {
  id: string;
  data: LiturgicalDocument;
}

const LOADING = new Text({
  type: "text",
  style: "text",
  value: ["Loading..."],
});

const ERROR = new Text({
  type: "text",
  style: "text",
  display_format: "unison",
  value: [
    "*An error has occurred while trying to load part of this liturgy. It has been logged automatically. Sorry for the inconvenience!*",
  ],
});

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  _cache: Record<string, Promise<LiturgicalDocument[]>> = {};

  constructor(
    private readonly afs: AngularFirestore,
    private auth: AuthService,
    private organizationService: OrganizationService,
    private http: HttpClient
  ) {}

  handleError(error: any) {
    this.logError(error);
    return of([ERROR]);
  }

  // TODO
  logError(error: any) {
    console.warn("Caught Error", error);
  }

  /** Returns an array of all the public documents that match each of the provided properties of `query` */
  find(query: Partial<LiturgicalDocument>): Observable<LiturgicalDocument[]> {
    return this.afs
      .collection<LiturgicalDocument>("Document", (ref) => {
        let builtQuery = ref
          .where("sharing.status", "==", "published")
          .where("sharing.privacy", "==", "public");
        Object.entries(query).forEach(([prop, value]) => {
          //console.log('where ', prop, '==', value);
          builtQuery = builtQuery.where(prop, "==", value);
        });
        return builtQuery;
      })
      .valueChanges();
  }

  getVersions(
    language: string,
    type: string
  ): Observable<{ [key: string]: string }> {
    return of(VERSIONS[`${language}-${type}`]?.versions);
    // removed to enable offline mode and cut down on reads
    /*return this.afs.doc<{versions: {[key: string]: string}}>(`Versions/${language}-${type}`)
      .valueChanges()
      .pipe(
        map(doc => doc.versions)
      );*/
  }

  getLiturgyOptions(language: string, version: string): Observable<Liturgy[]> {
    const veniteLiturgies$ = this.afs
      .collection<Liturgy>("Document", (ref) =>
        ref
          .where("type", "==", "liturgy")
          .where("language", "==", language)
          .where("version", "==", version)
          .where("sharing.organization", "==", "venite")
          .where("sharing.status", "==", "published")
          .where("sharing.privacy", "==", "public")
      )
      .valueChanges();

    const myLiturgies$ = this.auth.user.pipe(
      filter((user) => Boolean(user?.uid)),
      switchMap((user) => this.myDocuments(user?.uid)),
      map(
        (idsAndDocs) =>
          idsAndDocs
            .map((idAndDoc) => new Liturgy(idAndDoc.data))
            .filter(
              (doc) =>
                doc.type === "liturgy" &&
                !Boolean(doc.day) &&
                doc.version === version
            ) as Liturgy[]
      ),
      startWith([] as Liturgy[])
    );

    const myOrganizationLiturgies$ = this.auth.user.pipe(
      filter((user) => Boolean(user?.uid)),
      switchMap((user) =>
        combineLatest([
          this.organizationService.organizationsWithEditor(user?.uid),
          this.organizationService.organizationsWithOwner(user?.uid),
        ])
      ),
      map(([editorOrgs, ownerOrgs]) => editorOrgs.concat(ownerOrgs)),
      switchMap((orgs) => this.myOrganizationDocuments(orgs)),
      map(
        (idsAndDocs) =>
          idsAndDocs
            .map((idAndDoc) => new Liturgy(idAndDoc.data))
            .filter(
              (doc) => doc.type === "liturgy" && !Boolean(doc.day)
            ) as Liturgy[]
      ),
      startWith([] as Liturgy[])
    );

    const onlineLiturgies$ = combineLatest([
      this.auth.user,
      myLiturgies$,
      myOrganizationLiturgies$,
      veniteLiturgies$,
    ]).pipe(
      map(([user, mine, organization, venite]) =>
        user
          ? mine
              .concat(
                organization.filter((doc) =>
                  doc?.sharing?.owner ? doc.sharing.owner !== user?.uid : true
                )
              )
              .concat(
                // filter out anything I own
                venite.filter((doc) =>
                  doc?.sharing?.owner ? doc.sharing.owner !== user?.uid : true
                )
              )
          : mine.concat(venite)
      ),
      map((docs) => docs.map((doc) => new Liturgy({ ...doc, id: undefined }))),
      filter((docs) => docs?.length > 0)
    );

    // load from JSON for quicker load + offline access (but won't include your/org liturgies)
    const loadLiturgy = (language: string, version: string, slug: string) =>
      this.http.get<Liturgy>(
        `/offline/liturgy/${language}-${version}-${slug}.ldf.json`
      );
    const offlineLiturgies$ = combineLatest(
      language == "es"
        ? [
            loadLiturgy("es", "LOC", "morning-prayer"),
            loadLiturgy("es", "LOC", "evening-prayer"),
          ]
        : [
            loadLiturgy("en", "Rite-II", "morning-prayer"),
            loadLiturgy("en", "Rite-II", "noonday-prayer"),
            loadLiturgy("en", "Rite-II", "evening-prayer"),
            loadLiturgy("en", "Rite-II", "compline"),
            loadLiturgy("en", "Rite-I", "morning-prayer"),
            loadLiturgy("en", "Rite-I", "evening-prayer"),
            loadLiturgy("en", "EOW", "morning-prayer"),
            loadLiturgy("en", "EOW", "evening-prayer"),
            loadLiturgy("en", "Daily-Devotions", "morning-prayer"),
            loadLiturgy("en", "Daily-Devotions", "noonday-prayer"),
            loadLiturgy("en", "Daily-Devotions", "evening-prayer"),
            loadLiturgy("en", "Daily-Devotions", "compline"),
            loadLiturgy("en", "Rite-II", "eucharist"),
            loadLiturgy("en", "Rite-I", "eucharist"),
            loadLiturgy("en", "EOW", "eucharist"),
          ]
    );

    return concat(offlineLiturgies$, onlineLiturgies$).pipe(
      tap((docs) => console.log("docs = ", docs))
    );
  }

  getAllLiturgyOptions(): Observable<Liturgy[]> {
    return this.afs
      .collection<Liturgy>("Document", (ref) =>
        ref
          .where("type", "==", "liturgy")
          .where("sharing.organization", "==", "venite")
          .where("sharing.status", "==", "published")
          .where("sharing.privacy", "==", "public")
      )
      .valueChanges();
  }

  findOrganizationLiturgy(
    orgId: string,
    slug: string | undefined = undefined
  ): Observable<LiturgicalDocument[]> {
    return this.afs
      .collection<Liturgy>("Document", (ref) => {
        const query = ref
          .where("sharing.organization", "==", orgId)
          .where("sharing.status", "==", "published")
          .where("sharing.privacy", "==", "public");
        if (slug) {
          return query.where("slug", "==", slug);
        } else {
          return query;
        }
      })
      .valueChanges();
  }

  findDocumentById(docId: string): Observable<LiturgicalDocument> {
    return this.afs.doc<LiturgicalDocument>(`Document/${docId}`).valueChanges();
  }

  // made more efficient by not searching DB for every Gloria Patri
  findGloria(
    language: string,
    versions: string[]
  ): Observable<LiturgicalDocument[]> {
    if (language === "en") {
      if (versions.includes("rite_i") || versions.includes("coverdale")) {
        return of([
          new LiturgicalDocument({
            version_label: "",
            type: "refrain",
            language: "en",
            hidden: false,
            slug: "gloria-patri",
            category: [null],
            label: null,
            version: "rite_i",
            style: "gloria",
            citation: null,
            value: [
              "Glory&nbsp;be&nbsp;to&nbsp;the&nbsp;Father,&nbsp;and&nbsp;to&nbsp;the&nbsp;Son, and&nbsp;to&nbsp;the&nbsp;Holy&nbsp;Ghost:&nbsp;*",
              "As&nbsp;it&nbsp;was&nbsp;in&nbsp;the&nbsp;beginning,&nbsp;is&nbsp;now,&nbsp;and&nbsp;ever&nbsp;shall&nbsp;be, world&nbsp;without&nbsp;end.&nbsp;Amen.",
            ],
          }),
        ]);
      } else {
        return of([
          new LiturgicalDocument({
            version: "bcp1979",
            category: [null],
            label: null,
            version_label: "Rite II",
            type: "refrain",
            slug: "gloria-patri",
            value: [
              "Glory&nbsp;to&nbsp;the&nbsp;Father,&nbsp;and&nbsp;to&nbsp;the&nbsp;Son, and&nbsp;to&nbsp;the&nbsp;Holy&nbsp;Spirit:&nbsp;*",
              "as&nbsp;it&nbsp;was&nbsp;in&nbsp;the&nbsp;beginning,&nbsp;is&nbsp;now, and&nbsp;will&nbsp;be&nbsp;for&nbsp;ever.&nbsp;Amen.",
            ],
            citation: null,
            language: "en",
            style: "gloria",
            hidden: false,
          }),
        ]);
      }
    } else {
      this.findDocumentsBySlug("gloria-patri", language, versions);
    }
  }

  findDocumentsBySlug(
    slug: string,
    language: string = "en",
    rawVersions: string[] = undefined,
    disableOffline: boolean = false,
    bulletinMode: boolean = false
  ): Observable<LiturgicalDocument[]> {
    const processDocs = (
      docs$: Observable<LiturgicalDocument[]>,
      versions: string[]
    ) => {
      // add Gloria to psalms, canticles, invitatories, if they don't have
      const gloriaQuery$: Observable<LiturgicalDocument[]> =
        slug !== "gloria-patri"
          ? this.findGloria(language, versions) //this.findDocumentsBySlug("gloria-patri", language, versions)
          : of([]);
      return combineLatest([docs$, gloriaQuery$]).pipe(
        map(([docs, gloria]) =>
          docs.map((doc) =>
            doc.type !== "psalm"
              ? doc
              : new LiturgicalDocument({
                  ...doc,
                  metadata: {
                    ...doc.metadata,
                    gloria: doc?.version
                      ? docsToOption(
                          gloria.filter(
                            (option) =>
                              !option.version || option.version === doc.version
                          )
                        )
                      : docsToOption(gloria),
                  },
                })
          )
        ),
        // order by version
        map((docs) =>
          docs.sort((a, b) => {
            const aIndex = (versions || []).indexOf(versionToString(a.version));
            const bIndex = (versions || []).indexOf(versionToString(b.version));
            return aIndex < bIndex ? -1 : 1;
          })
        ),
        switchMap((docs) =>
          docs.length === 0 && !versions.includes("bcp1979")
            ? this.findDocumentsBySlug(
                slug,
                language,
                versions.concat("bcp1979")
              )
            : of(docs)
        ),
        startWith([LOADING]),
        catchError((error) => this.handleError(error))
      );
    };

    // deduplicate versions -- max of 10 (for Firebase query)
    const uniqueVersions = Array.from(
        new Set(rawVersions?.length == 0 ? ["bcp1979"] : rawVersions)
      ),
      versions =
        uniqueVersions?.length <= 10
          ? uniqueVersions
          : uniqueVersions.slice(0, 10);

    // first, try JSON database
    if (!disableOffline) {
      console.log("findDocumentsBySlug offline", slug, language, versions);
      if (
        [
          "morning-prayer",
          "noonday-prayer",
          "evening-prayer",
          "compline",
          "eucharist",
        ].includes(slug)
      ) {
        const key = `/offline/liturgy/${language}-${
          versions[0] || "Rite-II"
        }-${slug}.ldf.json`;
        if (!this._cache[key]) {
          this._cache[key] = this.http
            .get<LiturgicalDocument>(key)
            .pipe(
              map((doc) => [doc]),
              catchError(() =>
                this.findDocumentsBySlug(slug, language, rawVersions, true)
              )
            )
            .toPromise();
        }
        return from(this._cache[key]);
      } else {
        const attempt = versions
          .map((version) => BY_SLUG[`${language}-${version}-${slug}`])
          .flat()
          .filter((doc) => Boolean(doc));

        if (attempt?.length > 0) {
          // also send Firebase version, if online and in bulletin mode
          const firebaseVersions$ = isOnline().pipe(
            filter((online) => online && bulletinMode),
            switchMap(() =>
              this.findDocumentsBySlug(slug, language, rawVersions, true)
            )
          );
          return language == "en"
            ? concat(processDocs(of(attempt), versions), firebaseVersions$)
            : of(attempt);
        } else {
          return this.findDocumentsBySlug(slug, language, rawVersions, true);
        }
      }
    } else {
      if (uniqueVersions?.length > 10) {
        console.warn(
          "(DocumentService) (findDocumentsBySlug) Firebase can only handle up to 10 unique versions to search. You searched for ",
          rawVersions
        );
      }

      const veniteLiturgies$ = this.afs
        .collection<LiturgicalDocument>("Document", (ref) => {
          let query = ref
            .where("slug", "==", slug)
            .where("language", "==", language)
            .where("sharing.organization", "==", "venite")
            .where("sharing.status", "==", "published")
            .where("sharing.privacy", "==", "public");

          if (versions?.length > 0) {
            query = query.where(
              "version",
              "in",
              versions.filter((v) => Boolean(v))
            );
          }
          return query;
        })
        .valueChanges();

      const myDocs$ = this.auth.user
        .pipe(
          filter((user) => Boolean(user)),
          switchMap((user) => {
            if (user?.uid) {
              return this.afs
                .collection<LiturgicalDocument>("Document", (ref) => {
                  let query = ref
                    .where("slug", "==", slug)
                    .where("language", "==", language)
                    .where("sharing.owner", "==", user?.uid || "");
                  if (versions?.length > 0) {
                    query = query.where(
                      "version",
                      "in",
                      versions.filter((v) => Boolean(v))
                    );
                  }
                  return query;
                })
                .valueChanges();
            } else {
              return of([]);
            }
          })
        )
        .pipe(startWith([]));

      const myOrganizationLiturgies$ = this.auth.user.pipe(
        filter((user) => Boolean(user?.uid)),
        switchMap((user) =>
          combineLatest([
            this.organizationService.organizationsWithEditor(user?.uid),
            this.organizationService.organizationsWithOwner(user?.uid),
          ])
        ),
        map(([editorOrgs, ownerOrgs]) => editorOrgs.concat(ownerOrgs)),
        map((orgs) => orgs.filter((org) => org.slug !== "venite")),
        switchMap((orgs) => {
          if (orgs?.length > 0) {
            return this.afs
              .collection<LiturgicalDocument>("Document", (ref) =>
                ref
                  .where(
                    "sharing.organization",
                    "in",
                    orgs.map((org) => org.slug)
                  )
                  .where("slug", "==", slug)
                  .where("language", "==", language)
              )
              .valueChanges()
              .pipe(
                map((docs) =>
                  versions?.length > 0
                    ? docs.filter((doc) =>
                        versions.includes(versionToString(doc.version))
                      )
                    : docs
                )
              );
          } else {
            return of([]);
          }
        }),
        filter((orgDocs) => orgDocs?.length > 0),
        startWith([])
      );

      const docs$ = combineLatest([
        this.auth.user,
        veniteLiturgies$,
        myDocs$,
        myOrganizationLiturgies$,
      ])
        .pipe(
          map(([user, venite, mine, org]) =>
            user
              ? mine.concat(org).concat(
                  // filter out anything I own
                  venite.filter((doc) =>
                    doc?.sharing?.owner ? doc.sharing.owner !== user?.uid : true
                  )
                )
              : mine.concat(venite)
          )
        )
        .pipe(filter((docs) => docs.length > 0));

      return processDocs(docs$, versions);
    }
  }

  findDocumentsByCategory(
    category: string[],
    language: string = "en",
    versions: string[] = undefined,
    disableOffline: boolean = false,
    bulletinMode: boolean = false
  ): Observable<LiturgicalDocument[]> {
    console.log("findDocumentsByCategory", versions, language);
    if (!disableOffline) {
      const attempt$ = combineLatest(
        Array.from(
          new Set(
            (versions || [])
              .map((v) => v.toLowerCase())
              .filter((version) =>
                [
                  "bcp1979",
                  "rite_i",
                  "eow",
                  "rite-ii",
                  "rite-i",
                  "loc",
                ].includes(version)
              )
          )
        ).map((version) =>
          this.http.get<LiturgicalDocument[]>(
            `/offline/category/${language}-${version}.json`
          )
        )
      ).pipe(
        catchError((e) => {
          console.warn(e);
          return of([]);
        }),
        map((docs) =>
          docs
            .flat()
            .filter((doc) =>
              (doc?.category || []).some((r) => category.indexOf(r) >= 0)
            )
        )
      );
      // also send Firebase version, if online
      const firebaseVersions$ = isOnline().pipe(
        switchMap((online) =>
          online
            ? this.findDocumentsByCategory(category, language, versions, true)
            : of([])
        )
      );
      return merge(attempt$, firebaseVersions$).pipe(
        filter((docs) => docs?.length > 0)
      );
    } else {
      return this.afs
        .collection<LiturgicalDocument>("Document", (ref) =>
          ref
            .where("category", "array-contains-any", category)
            .where("language", "==", language)
            .where("sharing.organization", "==", "venite")
            .where("sharing.status", "==", "published")
            .where("sharing.privacy", "==", "public")
        )
        .valueChanges()
        .pipe(
          // filtered separately because Firestore doesn't allow mixing `array-contains-any` and `in` queries
          map((docs) => {
            if (versions?.length > 0) {
              return docs.filter((doc) =>
                versions.includes(versionToString(doc.version))
              );
            } else {
              return docs;
            }
          }),
          map((docs) => docs.sort((a, b) => (a.label > b.label ? 1 : -1))),
          startWith([LOADING])
          //catchError((error) => this.handleError(error))
        );
    }
  }

  findDocuments(): Observable<IdAndDoc[]> {
    return this.afs
      .collection<LiturgicalDocument>("Document")
      .snapshotChanges()
      .pipe(
        // transform from AngularFire `DocumentChangeAction` to `doc`
        map((changeactions) =>
          changeactions.map((action) => action?.payload?.doc)
        ),
        // extra ID and document data and leave the rest behind
        map((docs) => docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }

  /** All documents 'owned' by a user with `uid` */
  myLiturgies(
    uid: string,
    dateLimit?: Date | undefined
  ): Observable<IdAndDoc[]> {
    return this.afs
      .collection<LiturgicalDocument>("Document", (ref) => {
        let q;
        if (uid !== "ikvC2kTwM0MhmiqfMOi2fFZynJr2") {
          q = ref
            .where("sharing.owner", "==", uid)
            .where("type", "==", "liturgy");
        } else {
          q = ref.where("sharing.owner", "==", uid);
        }
        if (dateLimit) {
          return q.where("date_modified", ">=", dateLimit);
        } else {
          return q;
        }
      })
      .snapshotChanges()
      .pipe(
        // transform from AngularFire `DocumentChangeAction` to `doc`
        map((changeactions) =>
          changeactions.map((action) => action?.payload?.doc)
        ),
        // extra ID and document data and leave the rest behind
        map((docs) =>
          docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }

  myDocuments(uid: string): Observable<IdAndDoc[]> {
    return this.afs
      .collection<LiturgicalDocument>("Document", (ref) =>
        ref.where("sharing.owner", "==", uid)
      )
      .snapshotChanges()
      .pipe(
        // transform from AngularFire `DocumentChangeAction` to `doc`
        map((changeactions) =>
          changeactions.map((action) => action?.payload?.doc)
        ),
        // extra ID and document data and leave the rest behind
        map((docs) => docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }

  myOrganizationDocuments(
    orgs: Organization[],
    dateLimit?: Date | undefined
  ): Observable<IdAndDoc[]> {
    if (orgs?.length > 0) {
      const byPrivacy = (privacy: string) => {
        return this.afs
          .collection<LiturgicalDocument>("Document", (ref) => {
            const q = ref
              .where(
                "sharing.organization",
                "in",
                orgs.map((org) => org.slug)
              )
              .where("sharing.privacy", "==", privacy);
            if (dateLimit) {
              console.log("dateLimit = ", dateLimit);
              return q.where("date_modified", ">=", dateLimit);
            } else {
              return q;
            }
          })
          .snapshotChanges()
          .pipe(
            // transform from AngularFire `DocumentChangeAction` to `doc`
            map((changeactions) =>
              changeactions.map((action) => action?.payload?.doc)
            ),
            // extra ID and document data and leave the rest behind
            map((docs) => docs.map((doc) => ({ id: doc.id, data: doc.data() })))
          );
      };

      const orgPrivacy = byPrivacy("organization"),
        publicPrivacy = byPrivacy("public");
      return combineLatest([orgPrivacy, publicPrivacy]).pipe(
        map(([org, pub]) => org.concat(pub))
      );
    } else {
      return of([]);
    }
  }

  myOrganizationDocumentsWithSlug(
    org: string,
    slug: string
  ): Observable<IdAndDoc[]> {
    return this.afs
      .collection<LiturgicalDocument>("Document", (ref) =>
        ref.where("sharing.organization", "==", org).where("slug", "==", slug)
      )
      .snapshotChanges()
      .pipe(
        // transform from AngularFire `DocumentChangeAction` to `doc`
        map((changeactions) =>
          changeactions.map((action) => action?.payload?.doc)
        ),
        // extra ID and document data and leave the rest behind
        map((docs) => docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }

  myOrgDocExists(org: string, uid: string, slug: string): Observable<boolean> {
    const veniteDocs$ = this.afs
      .collection<LiturgicalDocument>("Document", (ref) =>
        ref
          .where("sharing.organization", "==", "venite")
          .where("sharing.status", "==", "published")
          .where("sharing.privacy", "==", "public")
          .where("slug", "==", slug)
      )
      .valueChanges();

    const myDocs$ = this.afs
      .collection<LiturgicalDocument>("Document", (ref) =>
        ref.where("sharing.owner", "==", uid).where("slug", "==", slug)
      )
      .valueChanges();

    return combineLatest([veniteDocs$, myDocs$]).pipe(
      map(([veniteDocs, myDocs]) => veniteDocs.concat(myDocs).length > 0)
    );
  }

  search(
    uid: string,
    search: string,
    orgs: Organization[]
  ): Observable<IdAndDoc[]> {
    return combineLatest([
      this.myDocuments(uid).pipe(startWith([])),
      of([]), //this.myOrganizationDocuments(orgs).pipe(startWith([]))
    ]).pipe(
      map(([docs, orgDocs]) =>
        docs
          .concat(orgDocs)
          .filter((doc) => JSON.stringify({ ...doc }).includes(search))
      )
    );
  }

  async newDocument(doc: LiturgicalDocument): Promise<string> {
    const docId = this.afs.createId();
    await this.afs
      .collection("Document")
      .doc(docId)
      .set({
        ...JSON.parse(JSON.stringify(doc)),
        id: docId,
        date_created: firebase.firestore.Timestamp.now(),
        date_modified: firebase.firestore.Timestamp.now(),
      });
    return docId;
  }

  saveDocument(
    docId: string,
    doc: Partial<DTO<LiturgicalDocument>>
  ): Observable<any> {
    /*return from(
      this.afs.doc(`Document/${docId}`).set({
        ...JSON.parse(
          JSON.stringify({ ...doc, slug: doc.slug || this.slugify(doc) })
        ),
        date_modified: firebase.firestore.Timestamp.now(),
      })
    );*/
    this.auth
      .currentUser()
      .getIdToken()
      .then((token) => {
        fetch(
          `https://us-central1-venite-2.cloudfunctions.net/saveDocument?id=${docId}`,
          //`http://localhost:5002/venite-2/us-central1/saveDocument?id=${docId}`,
          {
            method: "POST",
            body: JSON.stringify({
              ...doc,
              slug: doc.slug || this.slugify(doc),
            }),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });
    return of(null);
    /*return from(
      this.afs.doc(`Document/${docId}`).set({
        ...JSON.parse(
          JSON.stringify({ ...doc, slug: doc.slug || this.slugify(doc) })
        ),
        date_modified: firebase.firestore.Timestamp.now(),
      })
    );*/
  }

  deleteDocument(docId: string) {
    //return this.afs.collection("Document").doc(docId).delete();
    this.afs
      .collection("Document")
      .doc(docId)
      .valueChanges()
      .pipe(first())
      .subscribe((doc: Record<string, any>) => {
        this.afs
          .collection("RecycleBin")
          .doc(docId)
          .set({
            ...doc,
            id: docId,
            date_modified: firebase.firestore.Timestamp.now(),
          });
        return this.afs.collection("Document").doc(docId).delete();
      });
  }

  slugify(doc: Partial<DTO<LiturgicalDocument>>): string {
    return doc.label?.replace(/\s/g, "-").toLowerCase();
  }

  getColor(color: string | LiturgicalColor | null): Observable<string> {
    if (color) {
      if (typeof color !== "string") {
        return of(color.hex);
      } else {
        const colorValue = COLORS[color.toLowerCase()];
        return of(colorValue?.hex || color);
        // COLORS switched to offline mode
        /*return this.afs.collection<LiturgicalColor>('Color', ref =>
          ref.where('name', '==', color.toLowerCase())
        ).valueChanges().pipe(
          map(colors => colors.length > 0 ? colors[0].hex : color)
        );*/
      }
    } else {
      return of("var(--ldf-background-color)");
    }
  }

  getColors(): Observable<LiturgicalColor[]> {
    return this.afs.collection<LiturgicalColor>("Color").valueChanges();
  }
}
