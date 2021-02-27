import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'church',
    loadChildren: () => import('./organization/organization.module').then( m => m.OrganizationPageModule)
  },
  {
    path: 'reminders',
    loadChildren: () => import('@venite/ng-reminders').then( m => m.RemindersPageModule)
  },
  {
    path: 'pray',
    loadChildren: () => import('./pray/pray.module').then( m => m.PrayPageModule)
  },
  {
    path: 'bulletin',
    loadChildren: () => import('./pray/pray.module').then( m => m.PrayPageModule)
  },
  {
    path: 'tutorials',
    loadChildren: () => import('./tutorials/tutorials.module').then( m => m.TutorialsPageModule)
  },
  {
    path: 'bulletins',
    loadChildren: () => import('./bulletins/bulletins.module').then( m => m.BulletinsPageModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./bulletins/bulletins.module').then( m => m.BulletinsPageModule)
  },
  {
    path: 'template',
    loadChildren: () => import('./template/template.module').then( m => m.TemplatePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'psalter',
    loadChildren: () => import('./psalter/psalter.module').then( m => m.PsalterPageModule)
  },
  {
    path: 'daily-readings',
    loadChildren: () => import('./daily-readings/daily-readings.module').then( m => m.DailyReadingsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
