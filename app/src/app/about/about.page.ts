import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "venite-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
})
export class AboutPage implements OnInit {
  tab: string = "about"; // 'about'|'support'|'privacy';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      if (["about", "support", "privacy"].includes(fragment)) {
        this.tab = fragment;
      }
    });
  }
}
