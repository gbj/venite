import { Component, Inject, INJECTOR, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AUTH_SERVICE } from "@venite/ng-service-api";
import { Subscription } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { PrayerListService } from "./prayer-list.service";

@Component({
  selector: "venite-prayer-list",
  templateUrl: "./prayer-list.page.html",
  styleUrls: ["./prayer-list.page.scss"],
})
export class PrayerListPage implements OnInit, OnDestroy {
  prayerList: FormControl;
  subscription: Subscription;
  prayerListDocId: string | undefined;

  constructor(
    private service: PrayerListService,
    @Inject(AUTH_SERVICE) private auth: AuthService
  ) {}

  ngOnInit() {
    this.prayerList = new FormControl("");

    this.auth.user.subscribe((user) => {
      if (user?.uid) {
        this.service
          .read(user.uid)
          .pipe(first())
          .subscribe((data) => {
            if (data.length > 0) {
              this.prayerListDocId = data[0].id;
              this.prayerList.setValue(data[0].text);
            }
          });
      }
    });

    this.subscription = this.prayerList.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async (value) => {
        if (this.prayerListDocId) {
          this.service.update(this.prayerListDocId, value);
        } else {
          const id = await this.service.create(value);
          this.prayerListDocId = id;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
