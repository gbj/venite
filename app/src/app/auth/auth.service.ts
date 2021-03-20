import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Observable } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { UserProfile } from "./user/user-profile";
import { AngularFirestore } from "@angular/fire/firestore";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: Observable<firebase.User | null>;

  constructor(
    private platform: Platform,
    afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = afAuth.user;
  }

  currentUser(): firebase.User {
    return firebase.auth().currentUser;
  }

  async login(provider: string): Promise<firebase.auth.UserCredential | null> {
    let result: firebase.auth.UserCredential;

    if (this.platform.is("capacitor")) {
      console.warn("Auth not set up in Capacitor yet");
    } else {
      if (provider == "Google") {
        result = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());
      } else if (provider == "Twitter") {
        result = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.TwitterAuthProvider());
      } else if (provider == "Apple") {
        const provider = new firebase.auth.OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        try {
          result = await firebase.auth().signInWithPopup(provider);
        } catch (e) {
          console.warn("(AuthService => login) Error: ", e);
        }
      } else {
        throw `Auth provider "${provider}" not supported.`;
      }
    }

    // create profile if necessary
    if (result.additionalUserInfo?.isNewUser) {
      this.createUserProfile(result.user);
    }

    return result;
  }

  async logout() {
    if (this.platform.is("capacitor")) {
      console.warn("Auth not set up in Capacitor yet");
    } else {
      return await firebase.auth().signOut();
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  async updateUserProfile(
    uid: string,
    profile: Partial<UserProfile>
  ): Promise<void> {
    return this.afs.collection("Users").doc(uid).update(profile);
  }

  async createUserProfile(user: firebase.User): Promise<void> {
    this.afs.doc<UserProfile>(`Users/${user.uid}`).set({
      uid: user.uid,
      ...(user.displayName && { displayName: user.displayName }),
      ...(user.photoURL && { photoURL: user.photoURL }),
      orgs: [],
    });
  }

  getUserProfile(uid: string): Observable<UserProfile> {
    return this.afs.doc<UserProfile>(`Users/${uid}`).valueChanges();
  }
}
