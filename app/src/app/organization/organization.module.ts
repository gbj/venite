import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { OrganizationPageRoutingModule } from "./organization-routing.module";

import { OrganizationPage } from "./organization.page";
import { TranslateModule } from "@ngx-translate/core";
import { MemberChipComponent } from "./member-chip/member-chip.component";
import { AuthModule } from "../auth/auth.module";
import { DragDropModule } from "../drag-drop/drag-drop.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationPageRoutingModule,
    TranslateModule.forChild(),
    DragDropModule,
    SharedModule,
  ],
  declarations: [OrganizationPage, MemberChipComponent],
  exports: [MemberChipComponent],
})
export class OrganizationPageModule {}

export { OrganizationService } from "./organization.service";
export { Organization } from "./organization";
