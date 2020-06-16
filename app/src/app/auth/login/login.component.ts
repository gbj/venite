import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'venite-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: string;
  mode : 'login' | 'register' | 'organization' = 'login';
  reset: boolean = false;

  constructor(
    public auth: AuthService,
    private modal : ModalController
  ) { }

  ngOnInit() {}

  registerView() {
    this.mode = 'register';
  }

  organizationView(doSwitch : boolean) {
    this.mode = 'organization';
  }

  dismiss(loggedIn : boolean = false) {
    this.modal.dismiss(loggedIn);
  }

  async submitEmailAndPassword() {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      if(credential?.user) {
        this.dismiss(true);
      }
    } catch(e) {
      console.warn(e);
      this.error = e.message;
    }
  }

  async login(service : string) {
    const credential = await this.auth.login(service);
    // if it's their first time signing in, sending them to the 'Join Organization' view
    if(credential?.user && credential?.additionalUserInfo?.isNewUser) {
      this.mode = 'organization';
    }
    // otherwise just kill the modal
    else if(credential?.user) {
      this.dismiss(true);
    }
  }

  async logout() {
    this.auth.logout();
  }

  async forgotPassword() {
    if(!this.email) {
      this.error = 'Please enter your email address to reset your password.'
    }
    await this.auth.resetPassword(this.email);
    this.reset = true;
    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }
}
