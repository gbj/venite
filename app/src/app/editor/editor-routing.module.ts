import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPage } from './editor.page';

const routes: Routes = [
  {
    path: ':docId',
    component: EditorPage
  },
  {
    path: '',
    component: EditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPageRoutingModule {}
