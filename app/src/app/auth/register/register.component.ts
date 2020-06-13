import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'venite-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() complete : EventEmitter<boolean> = new EventEmitter();

  email: string;
  password: string;
  error: string;
  reset: boolean = false;

  constructor(
    public auth : AuthService
  ) { }

  ngOnInit() {}

  async submitEmailAndPassword() {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      console.log(result);
    } catch(e) {
      console.warn(e);
      this.error = e.message;
    }
  }

  async forgotPassword() {
    if(!this.email) {
      this.error = 'Please enter your email address to reset your password.'
    }
    await this.auth.resetPassword(this.email);
    this.reset = true;
    setTimeout(() => {
      this.complete.emit(true);
    }, 5000);
  }
}
