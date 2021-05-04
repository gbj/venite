import { Component } from "@angular/core";
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
    this.remindersEnabled = this.platform.is("capacitor");
  }
}
