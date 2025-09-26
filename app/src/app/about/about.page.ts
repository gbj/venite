import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { PlatformService } from "@venite/ng-platform";

@Component({
  selector: "venite-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
})
export class AboutPage implements OnInit {
  tab: string = "about"; // 'about'|'support'|'privacy';
  canDonate: boolean;

  constructor(
    private route: ActivatedRoute,
    private platform: PlatformService
  ) {}

  ngOnInit() {
    this.canDonate = true; //!Capacitor.isNativePlatform();

    this.route.fragment.subscribe((fragment: string) => {
      if (["about", "support", "privacy", "2"].includes(fragment)) {
        this.tab = fragment;
      }
    });
  }
}
