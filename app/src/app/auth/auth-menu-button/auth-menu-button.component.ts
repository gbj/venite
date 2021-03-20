import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { AuthService } from "../auth.service";
import { LoginComponent } from "../login/login.component";

import { Subscription } from "rxjs";

@Component({
  selector: "venite-auth-menu-button",
  templateUrl: "./auth-menu-button.component.html",
  styleUrls: ["./auth-menu-button.component.scss"],
})
export class AuthMenuButtonComponent implements OnInit {
  constructor(public auth: AuthService, private modal: ModalController) {}

  ngOnInit() {
    this.auth.user.subscribe((data) =>
      console.log("(AuthMenuButton) user = ", data)
    );
  }

  async signIn() {
    const modal = await this.modal.create({
      component: LoginComponent,
      swipeToClose: true,
      showBackdrop: true,
    });
    return await modal.present();
  }
}
