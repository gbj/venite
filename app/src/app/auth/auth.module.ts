import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Venite content
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

// Community Modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild()
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserComponent
  ]
})
export class AuthModule { }
