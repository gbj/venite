import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ModalController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { LoginComponent } from './auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth : AuthService,
    private modal : ModalController
  ) { }

  async loginModal() : Promise<boolean> {
    const modal = await this.modal.create({ component: LoginComponent });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    return data;
  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.auth.user.pipe(
      switchMap(user => user ? of(true) : from(this.loginModal()))
    );
  }
  
}
