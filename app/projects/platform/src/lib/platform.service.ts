import { Injectable } from "@angular/core";
import { PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { Platform } from "@ionic/angular";
import { PlatformServiceInterface } from "@venite/ng-service-api";
import { Capacitor } from "@capacitor/core";

@Injectable({
  providedIn: "root",
})
export class PlatformService implements PlatformServiceInterface {
  constructor(
    private platform: Platform,
    @Inject(PLATFORM_ID) private ngPlatform: Object,
  ) {}

  is(p: string): boolean {
    if (isPlatformServer(this.ngPlatform) && p !== "server") {
      return false;
    } else if (p == "server") {
      return isPlatformServer(this.ngPlatform);
    } else {
      return (
        this.platform.is(
          p as
            | "ios"
            | "ipad"
            | "iphone"
            | "android"
            | "phablet"
            | "tablet"
            | "cordova"
            | "capacitor"
            | "electron"
            | "pwa"
            | "mobile"
            | "mobileweb"
            | "desktop"
            | "hybrid",
        ) || Capacitor.getPlatform() === p
      );
    }
  }

  ready(): Promise<string> {
    if (isPlatformServer(this.ngPlatform)) {
      return Promise.resolve("server");
    } else {
      return this.platform.ready();
    }
  }
}
