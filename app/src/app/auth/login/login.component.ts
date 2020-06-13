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
  registering : boolean = false;

  constructor(
    public auth: AuthService,
    private modal : ModalController
  ) { }

  ngOnInit() {}

  toggleRegister() {
    this.registering = !this.registering;
  }

  dismiss() {
    this.modal.dismiss();
  }

  async submitEmailAndPassword() {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      if(credential) {
        this.dismiss();
      }
    } catch(e) {
      console.warn(e);
      this.error = e.message;
    }
  }

  async login(service : string) {
    const credential = await this.auth.login(service);
    if(credential) {
      this.dismiss();
    }
  }

  async logout() {
    this.auth.logout();
  }
}
