import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { LiturgicalDocument, Psalm } from "@venite/ldf";
import { PrayService } from "src/app/pray/pray.service";

@Component({
  selector: "venite-psalm-select",
  templateUrl: "./psalm-select.component.html",
  styleUrls: ["./psalm-select.component.scss"],
})
export class PsalmSelectComponent implements OnInit {
  @Input() options: LiturgicalDocument[] | undefined;
  @Output()
  psalmSelected: EventEmitter<LiturgicalDocument> = new EventEmitter();

  error: string | undefined;

  entry = new FormControl("");

  constructor(
    private prayService: PrayService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  submit() {
    this.error = undefined;
    const citation = this.entry.value,
      match = citation.replace(/Ps[\w\.]*\s*/g, "").split(/\s*[,:\s]\s*/),
      psalm = this.options.find((p) => p.slug === `psalm_${match[0]}`);
    if (psalm) {
      psalm.citation = citation;
      this.psalmSelected.emit(psalm);
    } else {
      this.error = this.translate.instant("editor.psalm_not_found");
    }
  }
}
