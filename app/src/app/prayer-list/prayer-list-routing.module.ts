import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayerListPage } from './prayer-list.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayerListPageRoutingModule {}
