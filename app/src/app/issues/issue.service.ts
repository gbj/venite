import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import firebase from "firebase/app";

export enum Status {
  Open = "Open",
  Closed = "Closed",
  Pending = "Pending",
}

export type Issue = {
  date_created: firebase.firestore.Timestamp;
  date_modified: firebase.firestore.Timestamp;
  name: string;
  email: string;
  location: string;
  description: string;
  status: Status;
  priority: number | null;
};

export type IdAndIssue = {
  id: string;
  data: Issue;
};

@Injectable({
  providedIn: "root",
})
export class IssueService {
  constructor(private afs: AngularFirestore) {}

  create(report: Partial<Issue>) {
    const docId = this.afs.createId();
    return this.afs
      .collection<Issue>("Issue")
      .doc(docId)
      .set({ ...report, date_created: firebase.firestore.Timestamp.now() });
  }

  update(docId: string, report: Partial<Issue>) {
    return this.afs
      .collection<Issue>("Issue")
      .doc(docId)
      .set({ ...report, date_modified: firebase.firestore.Timestamp.now() });
  }

  close(docId: string) {
    return this.afs.collection<Issue>("Issue").doc(docId).update({
      status: Status.Closed,
    });
  }

  delete(docId: string) {
    return this.afs.collection<Issue>("Issue").doc(docId).delete();
  }

  setOpen(docId: string) {
    return this.afs.collection<Issue>("Issue").doc(docId).update({
      status: Status.Open,
    });
  }

  setPending(docId: string) {
    return this.afs.collection<Issue>("Issue").doc(docId).update({
      status: Status.Pending,
    });
  }

  setPriority(docId: string, priority: number) {
    return this.afs.collection<Issue>("Issue").doc(docId).update({
      priority,
    });
  }

  open(): Observable<IdAndIssue[]> {
    return this.afs
      .collection<Issue>("Issue", (ref) =>
        ref.where("status", "==", Status.Open)
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

  pending(): Observable<IdAndIssue[]> {
    return this.afs
      .collection<Issue>("Issue", (ref) =>
        ref.where("status", "==", Status.Pending)
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

  closed(): Observable<IdAndIssue[]> {
    return this.afs
      .collection<Issue>("Issue", (ref) =>
        ref.where("status", "==", Status.Closed)
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

  numberOpen(): Observable<number> {
    return this.open().pipe(map((docs) => docs?.length));
  }
}
