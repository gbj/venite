import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BulletinsPageRoutingModule } from './bulletins-routing.module';

import { BulletinsPage } from './bulletins.page';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { CreateDocumentButtonComponent } from './create-document-button/create-document-button.component';
import { PrayMenuModule } from '@venite/ng-pray-menu';
import { CreateBulletinModalComponent } from './create-bulletin-modal/create-bulletin-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BulletinsPageRoutingModule,
    TranslateModule,
    AuthModule,
    PrayMenuModule
  ],
  declarations: [BulletinsPage, CreateDocumentButtonComponent, CreateBulletinModalComponent]
})
export class BulletinsPageModule {}