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

  name: string;
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
      if(result.user) {
        await result.user.updateProfile({ displayName: this.name, photoURL: '/assets/avatar.svg' });
        this.complete.emit();
      }
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
