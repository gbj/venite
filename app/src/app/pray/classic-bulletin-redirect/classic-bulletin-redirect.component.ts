import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "venite-classic-bulletin-redirect",
  templateUrl: "./classic-bulletin-redirect.component.html",
  styleUrls: ["./classic-bulletin-redirect.component.scss"],
})
export class ClassicBulletinRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // old bulletin links to venite.app/pray/bulletin/___ will redirect to classic.venite.app/pray/bulletin/____
    this.route.params.subscribe((data) => {
      if (data.bulletinId && location) {
        location.replace(
          `https://classic.venite.app/pray/bulletin/${data.bulletinId}`
        );
      }
    });
  }
}
