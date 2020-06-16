import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { UserProfile } from './user/user-profile';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user : Observable<User | null>;

  constructor(
    private platform : Platform,
    private afAuth : AngularFireAuth,
    private afs : AngularFirestore
  ) {
    this.user = afAuth.user;
  }

  currentUser() : User {
    return auth().currentUser;
  }

  async login(provider : string) : Promise<auth.UserCredential | null> {
    let result : auth.UserCredential;

    if(this.platform.is('capacitor')) {
      console.warn('Auth not set up in Capacitor yet');
    } else {
      if(provider == 'Google') {
        result = await auth().signInWithPopup(new auth.GoogleAuthProvider());
      } else if(provider == 'Twitter') {
        result = await auth().signInWithPopup(new auth.TwitterAuthProvider());
      } else if(provider == 'Apple') {
        //await auth().signInWithPopup(new auth.AppleAuthProvider());
        console.warn('Sign in with Apple needs to be set up in the AuthModule.');
        return null;
      } else {
        throw `Auth provider "${provider}" not supported.`;
      }
    }

    // create profile if necessary
    if(result.additionalUserInfo?.isNewUser) {
      this.createUserProfile(result.user);
    }

    return result;
  }

  async logout() {
    if(this.platform.is('capacitor')) {
      console.warn('Auth not set up in Capacitor yet');
    } else {
      return await auth().signOut();
    }
  }

  async signInWithEmailAndPassword(email : string, password : string) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  async createUserWithEmailAndPassword(email : string, password : string) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email : string) {
    return auth().sendPasswordResetEmail(email);
  }

  async updateUserProfile(uid : string, profile : Partial<UserProfile>) : Promise<void> {
    return this.afs.collection('Users').doc(uid).update(profile);
  }

  async createUserProfile(user : User) : Promise<void> {
    this.afs.doc<UserProfile>(`Users/${user.uid}`).set({
      uid: user.uid,
      ... user.displayName && { displayName: user.displayName },
      ... user.photoURL && { photoURL: user.photoURL },
      orgs: []
    });
  }
}
