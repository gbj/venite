import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import firebase from "firebase/app";
import { App } from "@capacitor/app";
import { Device } from "@capacitor/device";

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
  platform?: string;
  os?: string;
  osVersion?: string;
  version?: string;
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

  async create(report: Partial<Issue>) {
    const docId = this.afs.createId();
    let app;
    let device;
    try {
      app = await App.getInfo();
    } catch (e) {
      console.warn(e);
      app = {
        version: "",
      };
    }
    try {
      device = await Device.getInfo();
    } catch (e) {
      console.warn("Capacitor Device plugin error", e);
      device = {};
    }
    return this.afs
      .collection<Issue>("Issue")
      .doc(docId)
      .set({
        ...report,
        date_created: firebase.firestore.Timestamp.now(),
        platform: device.platform || "[Android or Web -- device plugin error]",
        os: device.operatingSystem || "[Android or Web -- device plugin error]",
        osVersion:
          device.osVersion || "[Android or Web -- device plugin error]",
        version: app.version || "[Android or Web -- device plugin error]",
      });
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
