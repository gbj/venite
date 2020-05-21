import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(public auth: AuthService) { }

  ngOnInit() {}

  toggleRegister() {
    this.registering = !this.registering;
  }

  async submitEmailAndPassword() {
    try {
      await this.auth.signInWithEmailAndPassword(this.email, this.password);
    } catch(e) {
      console.warn(e);
      this.error = e.message;
    }
  }
}
