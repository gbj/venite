import { Component, OnInit } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";

import { AuthService } from "../../auth/auth.service";
import { LoginComponent } from "../../auth/login/login.component";

import { Subscription } from "rxjs";

@Component({
  selector: "venite-auth-menu-button",
  templateUrl: "./auth-menu-button.component.html",
  styleUrls: ["./auth-menu-button.component.scss"],
})
export class AuthMenuButtonComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private modal: ModalController,
    private loading: LoadingController
  ) {}

  ngOnInit() {}

  async signIn() {
    // show loading because the modal widget can sometimes be slow to load the first time
    const loading = await this.loading.create();
    await loading.present();

    const modal = await this.modal.create({
      component: LoginComponent,
      swipeToClose: true,
      showBackdrop: true,
    });
    await modal.present();

    await loading.dismiss();
  }
}
