import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IssuesPageRoutingModule } from "./issues-routing.module";

import { IssuesPage } from "./issues.page";
import { IssueManagerGuard } from "./issue-manager.guard";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssuesPageRoutingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [IssuesPage],
  providers: [IssueManagerGuard],
})
export class IssuesPageModule {}
