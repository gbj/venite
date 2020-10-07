import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

interface DarkmodeRootConfig {
  providers: Provider[];
}

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
  public static forRoot(args : DarkmodeRootConfig) : ModuleWithProviders<DarkmodeModule> {
    return {
      ngModule: DarkmodeModule,
      providers: [
        ... args.providers
      ]
    };
  }
}
