import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Venite content
import { AuthMenuButtonComponent } from './auth-menu-button/auth-menu-button.component';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

// Community Modules
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  declarations: [
    AuthMenuButtonComponent,
    AuthMenuComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  exports: [
    AuthMenuButtonComponent,
    AuthMenuComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
