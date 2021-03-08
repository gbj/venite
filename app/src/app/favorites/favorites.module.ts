import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteDetailComponent } from './favorite-detail/favorite-detail.component';
import { FragmentPipe } from './fragment.pipe';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    AuthModule
  ],
  declarations: [FavoritesPage, FavoriteDetailComponent, FragmentPipe]
})
export class FavoritesPageModule {}
