import { Injectable } from "@angular/core";
import { LoadingController, Platform } from "@ionic/angular";
import { Observable, of } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { cfaSignIn, cfaSignOut } from "capacitor-firebase-auth/alternative";
import { UserProfile } from "./user/user-profile";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, catchError, first, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: Observable<firebase.User | null>;

  constructor(
    private platform: Platform,
    afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private loading: LoadingController
  ) {
    this.user = afAuth.user;
  }

  currentUser(): firebase.User {
    return firebase.auth().currentUser;
  }

  async login(provider: string): Promise<firebase.auth.UserCredential | null> {
    let result: firebase.auth.UserCredential;

    if (this.platform.is("capacitor")) {
      let target;
      switch (provider) {
        case "Google":
          target = "google.com";
          break;
        case "Twitter":
          target = "twitter.com";
          break;
        case "Apple":
          target = "apple.com";
          break;
      }
      if (target) {
        const loading = await this.loading.create();
        await loading.present();
        const user = await cfaSignIn(target).toPromise();
        loading.dismiss();
        return user.userCredential;
      }
    } else {
      const loading = await this.loading.create();
      await loading.present();

      try {
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
      } catch (e) {
        if (provider == "Google") {
          firebase
            .auth()
            .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        } else if (provider == "Twitter") {
          firebase
            .auth()
            .signInWithRedirect(new firebase.auth.TwitterAuthProvider());
        } else if (provider == "Apple") {
          const provider = new firebase.auth.OAuthProvider("apple.com");
          provider.addScope("email");
          provider.addScope("name");
          try {
            await firebase.auth().signInWithRedirect(provider);
          } catch (e) {
            console.warn("(AuthService => login) Error: ", e);
          }
        } else {
          throw `Auth provider "${provider}" not supported.`;
        }
      }

      loading.dismiss();
    }

    // create profile if necessary
    this.profileExists(result.user)
      .pipe(
        first(),
        filter((exists) => !exists)
      )
      .subscribe(() => {
        this.createUserProfile(result.user);
      });

    return result;
  }

  async logout() {
    if (this.platform.is("capacitor")) {
      cfaSignOut().subscribe();
    } else {
      return await firebase.auth().signOut();
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const loading = await this.loading.create();
    await loading.present();
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    await loading.dismiss();
    return res;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const loading = await this.loading.create();
    await loading.present();
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await loading.dismiss();
    return res;
  }

  async resetPassword(email: string) {
    const loading = await this.loading.create();
    await loading.present();
    const res = await firebase.auth().sendPasswordResetEmail(email);
    await loading.dismiss();
    return res;
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

  profileExists(user: firebase.User): Observable<boolean> {
    return this.getUserProfile(user?.uid).pipe(
      map((profile) => Boolean(profile)),
      catchError(() => of(false))
    );
  }

  getUserProfile(uid: string): Observable<UserProfile> {
    return this.afs.doc<UserProfile>(`Users/${uid}`).valueChanges();
  }
}
