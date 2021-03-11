import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

// Community Modules
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";

// Venite content
import { AuthMenuButtonComponent } from "./auth-menu-button/auth-menu-button.component";
import { AuthMenuComponent } from "./auth-menu/auth-menu.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { EditAvatarComponent } from "./edit-avatar/edit-avatar.component";
import { JoinOrganizationComponent } from "./join-organization/join-organization.component";
import { CreateOrganizationComponent } from "./create-organization/create-organization.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    FormsModule,
  ],
  declarations: [
    AuthMenuButtonComponent,
    AuthMenuComponent,
    EditAvatarComponent,
    JoinOrganizationComponent,
    CreateOrganizationComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  exports: [
    AuthMenuButtonComponent,
    AuthMenuComponent,
    EditAvatarComponent,
    JoinOrganizationComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
