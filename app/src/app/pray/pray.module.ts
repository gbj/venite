import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PrayPageRoutingModule } from './pray-routing.module';

import { PrayPage } from './pray.page';
import { AuthModule } from '../auth/auth.module';
import { ScrollVanishDirective } from './scroll-vanish.directive';
import { EditorPageModule } from '../editor/editor.module';
import { DisplaySettingsConfig } from 'dist/pray/lib/display-settings/display-settings-config';
import { LiturgyConfig } from 'dist/pray/lib/liturgy-config';
import { MarkFavoriteComponent } from './mark-favorite/mark-favorite.component';
import { FavoriteTextComponent } from './favorite-text/favorite-text.component';
import { FavoritesPageModule } from '../favorites/favorites.module';

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
  ],
  declarations: [PrayPage, ScrollVanishDirective, MarkFavoriteComponent, FavoriteTextComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrayPageModule {
  public static forRoot(args : PrayRootConfig) : ModuleWithProviders<PrayPageModule> {
    return {
      ngModule: PrayPageModule,
      providers: [
        ... args.providers,
        { provide: 'displaySettingsConfig', useValue: args.displaySettings },
        { provide: 'liturgyConfig', useValue: args.liturgySettings },
        { provide: 'useBackgroundColor', useValue: Boolean(args.useBackgroundColor) }
      ]
    };
  }
}
