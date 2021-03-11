import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TemplatePageRoutingModule } from "./template-routing.module";

import { TemplatePage } from "./template.page";
import { EditorPageModule } from "../editor/editor.module";
import { TranslateModule } from "@ngx-translate/core";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatePageRoutingModule,
    EditorPageModule,
    TranslateModule,
    AuthModule,
  ],
  declarations: [TemplatePage],
})
export class TemplatePageModule {}
