import { Component, OnInit, Input } from '@angular/core';
import { DisplaySettings } from './display-settings';
import { SpeechService } from 'src/app/services/speech.service';
import { PreferencesService } from 'src/app/preferences/preferences.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  voicesWithNationalities : { voice: SpeechSynthesisVoice; nationality: string }[];

  uid$ : Observable<string | undefined>;

  constructor(
    private speechService : SpeechService,
    private preferencesService : PreferencesService,
    private auth : AuthService
  ) { }

  ngOnInit() {
    if(this.hasVoice) {
      this.voicesWithNationalities = this.voiceChoices
        .map(voice => {
          return { voice, nationality: this.speechService.getNationality(voice) };
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
    this.preferencesService.set(settingName, ev.detail.value, realUID);
  }

}
