import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import {
  Organization,
  OrganizationService,
} from "../organization/organization.module";

@Component({
  selector: "venite-bulletin-slug-modal",
  templateUrl: "./bulletin-slug-modal.component.html",
  styleUrls: ["./bulletin-slug-modal.component.scss"],
})
export class BulletinSlugModalComponent implements OnInit {
  @Input() slug: string;
  @Input() label: string;
  @Input() templateMode: boolean;
  @Input() modal: any;

  org$: Observable<string>;
  baseUrl: string;

  constructor(
    private auth: AuthService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    this.org$ = this.auth.user.pipe(
      switchMap((user) =>
        user
          ? this.organizationService.organizationsWithUser(user.uid)
          : ([] as Organization[])
      ),
      map((orgs) => (Array.isArray(orgs) ? orgs[0] : orgs)),
      map((org) => org?.slug ?? "____")
    );
  }

  dismiss() {
    this.modal?.dismiss(null);
  }

  async confirm() {
    this.modal?.dismiss({ slug: this.slug, label: this.label });
  }
}
