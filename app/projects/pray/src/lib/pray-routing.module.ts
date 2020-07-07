import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayPage } from './pray.page';

const routes: Routes = [
  { path: 'bulletin/:bulletinID', component: PrayPage },
 /* { path: ':y/:m/:d', component: PrayPage },
  { path: ':y/:m/:d/:liturgy', component: PrayPage },
  { path: ':language/:version/:y/:m/:d/:liturgy', component: PrayPage },
  { path: ':language/:version/:y/:m/:d/:liturgy/:prefs', component: PrayPage },*/
  { path: ':language/:version/:kalendar/:y/:m/:d/:liturgy', component: PrayPage },
  { path: ':language/:version/:kalendar/:y/:m/:d/:liturgy/:prefs', component: PrayPage },
  { path: ':language/:version/:kalendar/:y/:m/:d/:liturgy/:prefs/:vigil', component: PrayPage },
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
