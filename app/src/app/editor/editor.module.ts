import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

// Community Modules
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditorPage]
})
export class EditorPageModule {}
