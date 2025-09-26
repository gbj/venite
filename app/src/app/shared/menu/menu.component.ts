import { Component } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { PlatformService } from "@venite/ng-platform";

@Component({
  selector: "venite-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
  remindersEnabled: boolean = false;

  constructor(private platform: PlatformService) {}

  async ngOnInit() {
    this.remindersEnabled = Capacitor.isNativePlatform();
  }
}
