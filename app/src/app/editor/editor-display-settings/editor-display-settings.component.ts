import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DisplaySettings } from "@venite/ldf";

@Component({
  selector: "venite-editor-display-settings",
  templateUrl: "./editor-display-settings.component.html",
  styleUrls: ["./editor-display-settings.component.scss"],
})
export class EditorDisplaySettingsComponent implements OnInit {
  @Input() modal: any;
  @Input() settings: DisplaySettings;
  @Input() isModal: boolean = true;

  @Output() prefUpdated = new EventEmitter<{ key: string; value: any }>();

  configFonts: { value: string; label: string; style: string }[] = new Array();
  configDrops: { value: string; label: string; class: string }[] = new Array();

  constructor(
    @Inject("displaySettingsConfig") public config: any,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.configFonts = this.config.fonts.map(({ value, label }) => ({
      value,
      label,
      style: `font-family: "${label}"`,
    }));

    this.configDrops = this.config.dropcaps.map(({ value, label }) => ({
      value,
      label,
      class: `dropcaps-${value}`,
    }));
  }

  dismiss() {
    this.modal.dismiss();
  }

  updateSetting(settingName: string, ev: CustomEvent) {
    this.prefUpdated.emit({
      key: settingName,
      value: ev.detail.hasOwnProperty("checked")
        ? Boolean(ev.detail.checked)
        : ev.detail.value,
    });
  }
}
