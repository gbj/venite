import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialsPage } from './tutorials.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialsPageRoutingModule {}
