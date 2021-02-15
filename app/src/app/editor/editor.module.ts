import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// Community Modules
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { LdfEditorComponent } from './ldf-editor/ldf-editor.component';
import { AddBlockComponent } from './add-block/add-block.component';
import { LectionarySelectComponent } from './lectionary-select/lectionary-select.component';
import { CanticleSelectComponent } from './canticle-select/canticle-select.component';
import { SharingComponent } from './sharing/sharing.component';
import { HymnSelectorComponent } from './hymn-selector/hymn-selector.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { EditorDisplaySettingsComponent } from './editor-display-settings/editor-display-settings.component';
import { EditorButtonsComponent } from './editor-buttons/editor-buttons.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    LdfEditorComponent,
    EditorButtonsComponent
  ],
  declarations: [
    LdfEditorComponent,
    AddBlockComponent,
    LectionarySelectComponent,
    CanticleSelectComponent,
    SharingComponent,
    HymnSelectorComponent,
    UploadImageComponent,
    EditorDisplaySettingsComponent,
    EditorButtonsComponent,
    ColorPickerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditorPageModule {}
