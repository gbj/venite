import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { WEB_FONTS } from "./web-fonts";

@Component({
  selector: "venite-font-picker",
  templateUrl: "./font-picker.component.html",
  styleUrls: ["./font-picker.component.scss"],
})
export class FontPickerComponent implements OnInit {
  @Input() modal: any;

  fonts: string[];
  fonts$: Observable<string[]>;

  search = new FormControl("");

  constructor() {
    this.fonts = WEB_FONTS;
  }

  ngOnInit() {
    this.fonts$ = this.search.valueChanges.pipe(
      map((search) =>
        this.fonts.filter(
          (font) => !search || font.toLowerCase().includes(search.toLowerCase())
        )
      ),
      startWith(this.fonts)
    );
  }

  dismiss(font_name?: string | undefined | null) {
    this.modal.dismiss(font_name);
  }
}
