import { Injectable } from "@angular/core";
import { Observable, combineLatest, of } from "rxjs";
import { Organization } from "./organization";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, switchMap, take, startWith, filter } from "rxjs/operators";
import { UserProfile } from "../auth/user/user-profile";
import firebase from "firebase/app";
import { slugify } from "../slugify";

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  constructor(private readonly afs: AngularFirestore) {}

  find(id: string): Observable<Organization> {
    return this.afs.doc<Organization>(`Organization/${id}`).valueChanges();
  }

  // Enables a user to start following a particular organization
  async join(uid: string, orgId: string): Promise<void> {
    try {
      return await this.afs.doc(`Users/${uid}`).update({
        ["orgs"]: firebase.firestore.FieldValue.arrayUnion(orgId),
      });
    } catch (e) {
      console.warn(e);
      return await this.afs.doc(`Users/${uid}`).set({
        ["orgs"]: firebase.firestore.FieldValue.arrayUnion(orgId),
      });
    }
  }

  async leave(uid: string, orgId: string): Promise<void> {
    try {
      return await this.afs.doc(`Users/${uid}`).update({
        ["orgs"]: firebase.firestore.FieldValue.arrayRemove(orgId),
      });
    } catch (e) {
      return await this.afs.doc(`Users/${uid}`).set({
        ["orgs"]: firebase.firestore.FieldValue.arrayRemove(orgId),
      });
    }
  }

  async create(name: string, ownerUID: string): Promise<void> {
    const slug = slugify(name);

    // check uniqueness of slug
    const exists = await this.exists(slug);

    if (exists) {
      const [n, inc] = name.split(/-(\d+)/);
      this.create(`${n}-${(parseInt(inc) || 1) + 1}`, ownerUID);
    }

    return await this.afs.doc<Organization>(`Organization/${slug}`).set({
      slug,
      name,
      owner: ownerUID,
      editors: [],
    });
  }

  async exists(slug: string): Promise<boolean> {
    return this.afs
      .doc<Organization>(`Organization/${slug}`)
      .snapshotChanges()
      .pipe(
        take(1),
        map((d) => d.payload.exists)
      )
      .toPromise();
  }

  addEditor(uid: string, orgId: string): Promise<void> {
    return this.afs.doc(`Organization/${orgId}`).update({
      ["editors"]: firebase.firestore.FieldValue.arrayUnion(uid),
    });
  }

  removeEditor(uid: string, orgId: string): Promise<void> {
    return this.afs.doc(`Organization/${orgId}`).update({
      ["editors"]: firebase.firestore.FieldValue.arrayRemove(uid),
    });
  }

  // Search by string
  organizationsMatching(search: string): Observable<Organization[]> {
    return this.afs
      .collection<Organization>("Organization")
      .snapshotChanges()
      .pipe(
        // transform from AngularFire `DocumentChangeAction` to `doc`
        map((changeactions) =>
          changeactions.map((action) => action?.payload?.doc)
        ),
        // extra ID and document data and leave the rest behind
        map((orgs) => orgs.map((doc) => ({ ...doc.data(), id: doc.id }))),
        // search for organization
        map((orgs) =>
          orgs.filter(
            (org) =>
              org.slug !== "venite" &&
              (search === "" ||
                org?.name?.toLowerCase().includes(search?.toLowerCase()) ||
                org?.slug?.toLowerCase().includes(search?.toLowerCase()))
          )
        )
      );
  }

  // Search by user

  /** All organizations in which a given user plays any role */
  organizationsWithUser(uid: string): Observable<Organization[]> {
    return combineLatest(
      this.organizationsWithOwner(uid).pipe(startWith(null)),
      this.organizationsWithEditor(uid).pipe(startWith(null)),
      this.organizationsWithMember(uid).pipe(startWith(null))
    ).pipe(
      filter(
        ([owner, editor, member]) =>
          Boolean(owner) && Boolean(editor) && Boolean(member)
      ),
      map(([owner, editor, member]) =>
        owner
          .concat(editor)
          .concat(member)
          .reduce(
            (uniques, item) =>
              uniques
                .map((item) => JSON.stringify(item))
                .includes(JSON.stringify(item))
                ? uniques
                : [...uniques, item],
            []
          )
      )
    );
  }

  /** All organizations of which a given user is the owner */
  organizationsWithOwner(uid: string): Observable<Organization[]> {
    return this.afs
      .collection<Organization>("Organization", (ref) =>
        ref.where("owner", "==", uid)
      )
      .valueChanges();
  }

  /** All organizations of which a given user is an editor */
  organizationsWithEditor(uid: string): Observable<Organization[]> {
    return this.afs
      .collection<Organization>("Organization", (ref) =>
        ref.where("editors", "array-contains", uid)
      )
      .valueChanges();
  }

  /** All organizations of which a given user is a member */
  organizationsWithMember(uid: string): Observable<Organization[]> {
    return this.afs
      .doc<UserProfile>(`Users/${uid}`)
      .valueChanges()
      .pipe(
        map((userProfile) => userProfile?.orgs ?? []),
        switchMap((orgs) => this.organizationsByIds(orgs))
      );
  }

  // Given an array of IDs, returns array of Organizations
  organizationsByIds(orgIds: string[]): Observable<Organization[]> {
    if (orgIds?.length == 0) {
      return of([]);
    } else {
      return combineLatest(
        orgIds.map((orgId) =>
          this.afs.doc<Organization>(`Organization/${orgId}`).valueChanges()
        )
      );
    }
  }

  // Given the org ID, find members of that organization
  members(orgId: string): Observable<UserProfile[]> {
    return this.afs
      .collection<UserProfile>("Users", (ref) =>
        ref.where("orgs", "array-contains", orgId)
      )
      .valueChanges();
  }
}
