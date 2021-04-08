import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";

import { MenuComponent } from "./menu/menu.component";
import { PrayMenuModule } from "@venite/ng-pray-menu";
import { SponsorComponent } from "./sponsor/sponsor.component";
import { AuthMenuButtonComponent } from "./auth-menu-button/auth-menu-button.component";

@NgModule({
  declarations: [MenuComponent, SponsorComponent, AuthMenuButtonComponent],
  imports: [CommonModule, RouterModule, TranslateModule, PrayMenuModule],
  exports: [SponsorComponent, AuthMenuButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
