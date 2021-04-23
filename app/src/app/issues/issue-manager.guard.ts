import { Inject, Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AUTH_SERVICE, AuthServiceInterface } from "@venite/ng-service-api";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OrganizationService } from "../organization/organization.service";

@Injectable({
  providedIn: "root",
})
export class IssueManagerGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface,
    private orgs: OrganizationService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.auth.user, this.orgs.find("venite")]).pipe(
      map(
        ([user, org]) =>
          org.owner === user?.uid || org.editors.includes(user?.uid)
      )
    );
  }
}
