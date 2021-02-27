import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyReadingsPage } from './daily-readings.page';

const routes: Routes = [
  {
    path: '',
    component: DailyReadingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyReadingsPageRoutingModule {}
