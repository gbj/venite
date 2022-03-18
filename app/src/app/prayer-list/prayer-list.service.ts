import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
import { Observable, of } from "rxjs";
import { AuthService } from "../auth/auth.service";

type PrayerListDto = {
  id: string;
  user: string;
  text: string;
};

@Injectable({
  providedIn: "root",
})
export class PrayerListService {
  constructor(
    private auth: AuthService,
    private readonly afs: AngularFirestore
  ) {}

  async create(text: string): Promise<string> {
    const id = this.afs.createId();
    await this.afs.collection("PrayerList").doc(id).set({
      id,
      user: this.auth.currentUser()?.uid,
      text,
      date_created: firebase.firestore.Timestamp.now(),
      date_modified: firebase.firestore.Timestamp.now(),
    });
    return id;
  }

  read(uid: string | undefined): Observable<PrayerListDto[]> {
    if (uid) {
      return this.afs
        .collection<PrayerListDto>("PrayerList", (ref) =>
          ref.where("user", "==", uid)
        )
        .valueChanges();
    } else {
      return of([]);
    }
  }

  async update(id: string, text: string): Promise<void> {
    return this.afs.collection("PrayerList").doc(id).update({
      text,
      date_modified: firebase.firestore.Timestamp.now(),
    });
  }
}
