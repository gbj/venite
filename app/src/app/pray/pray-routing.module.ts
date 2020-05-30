import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayPage } from './pray.page';

const routes: Routes = [
  {
    path: '',
    component: PrayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayPageRoutingModule {}
