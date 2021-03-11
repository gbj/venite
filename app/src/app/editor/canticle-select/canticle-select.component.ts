import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { LiturgicalDocument, Psalm } from "@venite/ldf";

@Component({
  selector: "venite-canticle-select",
  templateUrl: "./canticle-select.component.html",
  styleUrls: ["./canticle-select.component.scss"],
})
export class CanticleSelectComponent implements OnInit {
  @Input() tables: { [key: string]: string };
  @Input() versions: { [key: string]: string };
  @Input() canticles: LiturgicalDocument[];
  @Output()
  canticleSelected: EventEmitter<LiturgicalDocument> = new EventEmitter();

  canticleTableFormGroup = new FormGroup({
    useCanticleTablePreference: new FormControl(true),
    whichTable: new FormControl(""),
    nth: new FormControl(1),
  });

  get useCanticleTablePreference(): boolean {
    return this.canticleTableFormGroup.get("useCanticleTablePreference").value;
  }

  addFromTable() {
    const item: number = this.canticleTableFormGroup.get("nth").value,
      whichTable: string = this.canticleTableFormGroup.get("whichTable").value,
      canticle = new LiturgicalDocument({
        lookup: {
          type: "canticle",
          table: this.useCanticleTablePreference
            ? { preference: "canticleTable" }
            : whichTable,
          item,
        },
      });
    this.emitCanticle(canticle);
  }

  emitCanticle(doc: LiturgicalDocument) {
    this.canticleSelected.emit(doc);
  }

  constructor() {}

  ngOnInit() {}
}
