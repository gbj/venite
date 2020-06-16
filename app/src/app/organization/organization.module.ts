import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationPageRoutingModule } from './organization-routing.module';

import { OrganizationPage } from './organization.page';
import { TranslateModule } from '@ngx-translate/core';
import { MemberChipComponent } from './member-chip/member-chip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    OrganizationPage,
    MemberChipComponent
  ]
})
export class OrganizationPageModule {}

export { OrganizationService } from './organization.service';
export { Organization } from './organization';
