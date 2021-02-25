import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsalterPage } from './psalter.page';

const routes: Routes = [
  {
    path: '',
    component: PsalterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsalterPageRoutingModule {}
