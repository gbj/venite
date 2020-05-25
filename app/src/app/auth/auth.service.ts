import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user : Observable<User | null>;

  constructor(
    private platform : Platform,
    private afAuth : AngularFireAuth
  ) {
    this.user = afAuth.user;
  }

  currentUser() : User {
    return auth().currentUser;
  }

  async login(provider : string) {
    if(this.platform.is('capacitor')) {
      console.warn('Auth not set up in Capacitor yet');
    } else {
      if(provider == 'Google') {
        await auth().signInWithPopup(new auth.GoogleAuthProvider());
      } else if(provider == 'Twitter') {
        await auth().signInWithPopup(new auth.TwitterAuthProvider());
      } else if(provider == 'Apple') {
        //await auth().signInWithPopup(new auth.AppleAuthProvider());
        console.warn('Sign in with Apple needs to be set up in the AuthModule.');
      } else {
        throw `Auth provider "${provider}" not supported.`;
      }
    }
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
}
