import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule,
  Provider,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { IonicModule } from "@ionic/angular";

import { PrayPageRoutingModule } from "./pray-routing.module";

import { PrayPage } from "./pray.page";
import { AuthModule } from "../auth/auth.module";
import { EditorPageModule } from "../editor/editor.module";
import { MarkFavoriteComponent } from "./mark-favorite/mark-favorite.component";
import { FavoriteTextComponent } from "./favorite-text/favorite-text.component";
import { SharedModule } from "../shared/shared.module";
import { AudioService } from "./audio.service";
import { Media } from "@ionic-native/media/ngx";
import { DisplaySettingsComponent } from "./display-settings/display-settings.component";

export class DisplaySettingsConfig {
  audio: boolean;
  audio_background: boolean;
  meditation: boolean;
  antiphons: boolean;
  fonts: { value: string; label: string }[] = [
    { value: "garamond", label: "EB Garamond" },
    { value: "gill-sans", label: "Gill Sans" },
    { value: "open-dyslexic", label: "Open Dyslexic" },
  ];
  dropcaps: { value: string; label: string }[];
  ask_about_unison_texts?: undefined | boolean;
  psalm_pause: boolean;
  font_accessibility: boolean;
}

export type LiturgyConfig = {
  sundayCollectsFirst: boolean;
  emberDayCollectPrecedesSunday: boolean;
  allSaintsSuppressesCollectOfTheDayUnlessSunday: boolean;
  allSaintsOctaveSuppressesCollectOfTheDayUnlessSunday: boolean;
};

interface PrayRootConfig {
  providers: Provider[];
  displaySettings: DisplaySettingsConfig;
  liturgySettings: LiturgyConfig;
  useBackgroundColor?: boolean | undefined;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AuthModule,
    PrayPageRoutingModule,
    EditorPageModule,
    SharedModule,
  ],
  exports: [MarkFavoriteComponent],
  declarations: [
    PrayPage,
    MarkFavoriteComponent,
    FavoriteTextComponent,
    DisplaySettingsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AudioService, Media],
})
export class PrayPageModule {
  public static forRoot(
    args: PrayRootConfig
  ): ModuleWithProviders<PrayPageModule> {
    return {
      ngModule: PrayPageModule,
      providers: [
        ...args.providers,
        { provide: "displaySettingsConfig", useValue: args.displaySettings },
        { provide: "liturgyConfig", useValue: args.liturgySettings },
        {
          provide: "useBackgroundColor",
          useValue: Boolean(args.useBackgroundColor),
        },
      ],
    };
  }
}
