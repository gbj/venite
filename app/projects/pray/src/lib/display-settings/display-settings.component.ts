import { Component, OnInit, Input, Inject } from '@angular/core';
import { DisplaySettings } from '@venite/ldf';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthServiceInterface, AUTH_SERVICE, PREFERENCES_SERVICE, PreferencesServiceInterface } from '@venite/ng-service-api';
import { TranslateService } from '@ngx-translate/core';
import { DisplaySettingsConfig } from './display-settings-config';

@Component({
  selector: 'venite-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss'],
})
export class DisplaySettingsComponent implements OnInit {
  @Input() modal : any;
  @Input() settings : DisplaySettings;
  @Input() hasVoice : boolean = true;
  @Input() hasMeditation : boolean = true;
  @Input() backgroundEnabled : boolean = true;
  @Input() voiceChoices : SpeechSynthesisVoice[] = new Array();
  @Input() isModal : boolean = true;
  voicesWithNationalities : { voice: SpeechSynthesisVoice; nationality: string }[];

  uid$ : Observable<string | undefined>;

  configFonts : { value: string; label: string; style: string; }[] = new Array();
  configDrops : { value: string; label: string; class: string; }[] = new Array();

  constructor(
    @Inject('displaySettingsConfig') public config : DisplaySettingsConfig,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesServiceInterface,
    @Inject(AUTH_SERVICE) private auth : AuthServiceInterface,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.configFonts = this.config.fonts.map(({ value, label }) => ({
      value,
      label,
      style: `font-family: "${label}"`
    }));

    this.configDrops = this.config.dropcaps.map(({ value, label }) => ({
      value,
      label,
      class: `dropcaps-${value}`
    }));

    if(this.hasVoice) {
      this.voicesWithNationalities = this.voiceChoices
        .map(voice => {
          return { voice, nationality: this.translate.instant(`speech.${voice.lang}`) };
        })
        .sort((a, b) => b.nationality < a.nationality ? 1 : -1);
    }

    this.uid$ = this.auth.user.pipe(
      startWith(undefined),
      map(user => user?.uid),
      // *ngIf syntax won't work if value is `undefined`, so create a fake ID and handle it in `updateSetting` below
      map(uid => uid == undefined ? 'LOGGED-OUT' : uid)
    );
  }

  dismiss() {
    this.modal.dismiss();
  }

  updateSetting(uid : string, settingName : string, ev : CustomEvent) {
    const realUID = uid == 'LOGGED-OUT'  ? undefined : uid;
    this.preferencesService.set(settingName, ev.detail.hasOwnProperty('checked') ? Boolean(ev.detail.checked) : ev.detail.value, realUID);
  }

}
