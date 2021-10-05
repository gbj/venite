import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayersAndThanksgivingsPage } from './prayers-and-thanksgivings.page';

const routes: Routes = [
  {
    path: '',
    component: PrayersAndThanksgivingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayersAndThanksgivingsPageRoutingModule {}
