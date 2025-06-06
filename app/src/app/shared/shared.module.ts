import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";

import { MenuComponent } from "./menu/menu.component";
import { SponsorComponent } from "./sponsor/sponsor.component";
import { AuthMenuButtonComponent } from "./auth-menu-button/auth-menu-button.component";
import { IssueComponent } from "./issue/issue.component";
import { FormsModule } from "@angular/forms";
import { PrayMenuModule } from "../pray-menu/pray-menu.module";

@NgModule({
  declarations: [
    MenuComponent,
    SponsorComponent,
    AuthMenuButtonComponent,
    IssueComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    PrayMenuModule,
    FormsModule,
  ],
  exports: [SponsorComponent, AuthMenuButtonComponent, IssueComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
