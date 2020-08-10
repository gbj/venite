import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: []
})
export class DarkmodeModule {
  public static forRoot({ providers }) : ModuleWithProviders<DarkmodeModule> {
    return { ngModule: DarkmodeModule, providers: providers || new Array() };
  }
}
