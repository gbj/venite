import { Component, OnInit, Input } from "@angular/core";
import { Sharing, User } from "@venite/ldf";
import { Observable, combineLatest } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { UserProfile } from "src/app/auth/user/user-profile";
import { map, switchMap, startWith, filter, tap } from "rxjs/operators";
import {
  OrganizationService,
  Organization,
} from "src/app/organization/organization.module";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "venite-sharing",
  templateUrl: "./sharing.component.html",
  styleUrls: ["./sharing.component.scss"],
})
export class SharingComponent implements OnInit {
  @Input() sharing: Sharing;
  @Input() modal: any;

  owner$: Observable<UserProfile>;
  orgOptions$: Observable<{ value: string | number; label: string }[]>;
  statusOptions: { value: string | number; label: string }[];
  privacyOptions: { value: string | number; label: string }[];

  constructor(
    private auth: AuthService,
    private organizationService: OrganizationService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.owner$ = this.auth.getUserProfile(this.sharing.owner);
    this.orgOptions$ = this.owner$.pipe(
      switchMap((owner) =>
        this.organizationService.organizationsWithUser(owner.uid)
      ),
      map((orgs) => orgs.map((org) => ({ label: org.name, value: org.slug }))),
      startWith([])
    );
    this.statusOptions = [
      { value: "draft", label: this.translate.instant("editor.draft") },
      { value: "published", label: this.translate.instant("editor.published") },
    ];
    this.privacyOptions = [
      { value: "public", label: this.translate.instant("editor.public") },
      {
        value: "organization",
        label: this.translate.instant("editor.organization-access"),
      },
      { value: "private", label: this.translate.instant("editor.private") },
    ];
  }

  dismiss() {
    this.modal.dismiss();
  }
}
