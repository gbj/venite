import { NgModule, ModuleWithProviders, Provider, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RemindersPageRoutingModule } from "./reminders-routing.module";

import { RemindersPage } from "./reminders.page";
import { TranslateModule } from "@ngx-translate/core";
import { RemindersConfig } from "./reminders-config";

interface RemindersRootConfig {
  providers: Provider[];
  config: RemindersConfig;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemindersPageRoutingModule,
    TranslateModule,
  ],
  declarations: [RemindersPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemindersPageModule {
  public static forRoot(
    args: RemindersRootConfig
  ): ModuleWithProviders<RemindersPageModule> {
    return {
      ngModule: RemindersPageModule,
      providers: [
        ...args.providers,
        { provide: "reminder-config", useValue: args.config },
      ],
    };
  }
}
