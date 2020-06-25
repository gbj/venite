import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

// Community Modules
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { LdfEditorComponent } from './ldf-editor/ldf-editor.component';
import { CreateDocumentButtonComponent } from './create-document-button/create-document-button.component';
import { AddBlockComponent } from './add-block/add-block.component';
import { LectionarySelectComponent } from './lectionary-select/lectionary-select.component';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    EditorPage,
    LdfEditorComponent,
    CreateDocumentButtonComponent,
    AddBlockComponent,
    LectionarySelectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditorPageModule {}
