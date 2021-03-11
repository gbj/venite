import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { IonInput } from "@ionic/angular";
import { Change, LiturgicalColor } from "@venite/ldf";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DocumentService } from "src/app/services/document.service";
import { LocalDocumentManager } from "../ldf-editor/document-manager";
import { EditorService } from "../ldf-editor/editor.service";
import { querySelectorDeep } from "query-selector-shadow-dom";
import { PlatformService } from "@venite/ng-platform";

@Component({
  selector: "venite-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.scss"],
})
export class ColorPickerComponent implements OnInit {
  @Input() modal: any;
  @Input() color: string;
  @Input() localManager: LocalDocumentManager;

  colorPickerClass: string = "visually-hidden";

  @ViewChild("colorPicker") colorPicker: ElementRef;

  colors$: Observable<LiturgicalColor[]>;

  constructor(
    private documents: DocumentService,
    private editorService: EditorService,
    private platform: PlatformService
  ) {}

  ngOnInit() {
    this.colors$ = this.documents
      .getColors()
      .pipe(
        map((colors) =>
          colors.map((color) => ({
            ...color,
            name: color.name[0].toUpperCase() + color.name.slice(1),
          }))
        )
      );
    if (this.platform.is("ios")) {
      this.colorPickerClass = "";
    }
  }

  dismiss() {
    this.modal.dismiss();
  }

  openColorPicker() {
    this.colorPicker.nativeElement.click();
  }

  selectColor(hex: string | undefined) {
    const change = hex
      ? new Change({
          path: "/metadata",
          op: [
            {
              type: "set",
              index: "color",
              oldValue: this.localManager?.document?.metadata?.color,
              value: hex,
            },
          ],
        })
      : new Change({
          path: "/metadata",
          op: [
            {
              type: "deleteAt",
              index: "color",
              oldValue: this.localManager?.document?.metadata?.color,
            },
          ],
        });
    const editor = querySelectorDeep("ldf-editor");
    const event = new CustomEvent("editorDocShouldChange", { detail: change });
    editor.dispatchEvent(event);

    this.dismiss();
  }
}
