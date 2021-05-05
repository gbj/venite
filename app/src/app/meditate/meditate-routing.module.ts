import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeditatePage } from './meditate.page';

const routes: Routes = [
  {
    path: '',
    component: MeditatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeditatePageRoutingModule {}
