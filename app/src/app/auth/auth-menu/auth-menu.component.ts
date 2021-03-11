import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import { Organization } from "../../organization/organization";
import { switchMap, tap } from "rxjs/operators";
import { User } from "firebase";
import { MenuController, ModalController } from "@ionic/angular";
import { OrganizationService } from "src/app/organization/organization.service";
import { JoinOrganizationComponent } from "../join-organization/join-organization.component";

@Component({
  selector: "venite-auth-menu",
  templateUrl: "./auth-menu.component.html",
  styleUrls: ["./auth-menu.component.scss"],
})
export class AuthMenuComponent implements OnInit {
  organizations$: Observable<Organization[]>;

  constructor(
    public auth: AuthService,
    private organizationService: OrganizationService,
    private menu: MenuController,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.organizations$ = this.auth.user.pipe(
      switchMap((user) =>
        user ? this.organizationService.organizationsWithUser(user.uid) : []
      )
    );
  }

  updateUserPhoto(user: User, photoURL: string) {
    user.updateProfile({ photoURL });
    this.auth.updateUserProfile(user.uid, { photoURL });
  }

  async logout() {
    this.auth.logout();
    this.menu.close("auth");
  }

  async addChurch() {
    const modal = await this.modal.create({
      component: JoinOrganizationComponent,
    });
    modal.componentProps = {
      modal,
    };
    await modal.present();
  }
}
