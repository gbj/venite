import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'venite-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  error: string;

  constructor(
    public auth : AuthService,
    private router : Router
  ) { }

  ngOnInit() {}

  async submitEmailAndPassword() {
    try {
      await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['..']);
    } catch(e) {
      console.warn(e);
      this.error = e.message;
    }
  }
}
