import { Component, Input, OnInit } from "@angular/core";
import { LiturgicalDocument } from "@venite/ldf";
import { SelectedTextEvent } from "src/app/pray/selected-text-event";

@Component({
  selector: "venite-pt-popup",
  templateUrl: "./pt-popup.component.html",
  styleUrls: ["./pt-popup.component.scss"],
})
export class PtPopupComponent implements OnInit {
  @Input() doc: LiturgicalDocument;
  @Input() summary: string;
  selectedTextEvent: SelectedTextEvent;

  constructor() {}

  ngOnInit() {
    this.selectedTextEvent = {
      text: this.summary,
      fragment: "",
      citation: "",
      els: [],
    };
  }
}
