import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthModule } from './auth/auth.module';
import { LoginGuard } from './login.guard';

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
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then( m => m.EditorPageModule),
    canActivate: [LoginGuard]
  },
  /*{
    path: 'pray',
    loadChildren: () => import('@venite/ng-pray').then( m => m.PrayPageModule)
  },*/
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
