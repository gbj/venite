import { Component, Inject, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, combineLatest, of } from 'rxjs';
import { DisplaySettings, Psalm } from '@venite/ldf';
import { DocumentService } from '../services/document.service';
import { tap, startWith, map, switchMap } from 'rxjs/operators';
import { DisplaySettingsComponent } from '@venite/ng-pray';
import { ModalController } from '@ionic/angular';
import { PREFERENCES_SERVICE } from '@venite/ng-service-api';
import { PreferencesService } from '../preferences/preferences.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-psalter',
  templateUrl: './psalter.page.html',
  styleUrls: ['./psalter.page.scss'],
  animations: [
    trigger('swiping', [
      state('none', style({
        'transform': 'translateX(0)'
      })),
      state('left', style({
        'transform': 'translateX(-100%)'
      })),
      state('right', style({
        'transform': 'translateX(100%)'
      })),
      transition('* => none', [
        animate('100ms')
      ]),
      transition('none => left', [
        animate('100ms')
      ]),
      transition('none => right', [
        animate('100ms')
      ]),
      transition('left => right', [
        animate('0s')
      ]),
      transition('right => left', [
        animate('0s')
      ])
    ]),
  ]
})
export class PsalterPage implements OnInit {
  psalmNumber : number = 1;
  psalmNumberOptions : string[] = Array.apply(null, Array(150)).map((_, i) => (i+1).toString());

  number : FormControl = new FormControl(1);
  language : FormControl = new FormControl('en');
  version : FormControl = new FormControl('bcp1979');
  languageOptions$ : Observable<{ value: string; label: string; }[]>;
  versionOptions$ : Observable<{ value: string; label: string; }[]>;

  psalm$ : Observable<Psalm>;

  isSwiping : 'left' | 'right' | 'none' = 'none';

  settings$ : Observable<DisplaySettings>;

  constructor(
    private documentService : DocumentService,
    @Inject(PREFERENCES_SERVICE) private preferencesService : PreferencesService,
    private modal : ModalController
  ) { }

  ngOnInit() {
    //this.setPsalm(false);

    this.languageOptions$ = of([{value: 'en', label: 'English' }]);
    this.versionOptions$ = of([{value: 'bcp1979', label: '1979 BCP'}, {value: 'coverdale', label: 'Coverdale'}, {value: 'ip', label: 'Inclusive Psalter'}]);

    this.psalm$ = combineLatest([
      this.number.valueChanges.pipe(startWith(this.number.value)),
      this.language.valueChanges.pipe(startWith(this.language.value))
    ]).pipe(
      switchMap(([number, language]) => this.documentService.findDocumentsBySlug(
        `psalm_${number}`,
        language
      )),
      map(docs => {
        const doc = docs.find(doc => doc?.version === this.version.value) as Psalm;
        return new Psalm({
          ...doc,
          metadata: {
            ...doc?.metadata || {},
            omit_gloria: true,
            omit_antiphon: true
          }
        });
      })
    );

    // Grab display settings from preferences
    this.settings$ = combineLatest([
      // even though some of these preferences are irrelevant, the DisplaySettings
      // constructor requires them to be present in order
      this.grabPreference('dropcaps'),
      this.grabPreference('response'),
      this.grabPreference('repeatAntiphon'),
      this.grabPreference('fontscale'),
      this.grabPreference('font'),
      this.grabPreference('voiceChoice'),
      this.grabPreference('voiceRate'),
      this.grabPreference('voiceBackground'),
      this.grabPreference('voiceBackgroundVolume'),
      this.grabPreference('psalmVerses'),
      this.grabPreference('bibleVerses'),
      this.grabPreference('meditationBell'),
      this.grabPreference('darkmode')
    ]).pipe(
      map(settings => new DisplaySettings( ... settings))
    );
  }

  setPsalm(animate : boolean = true) {
    /*this.psalm$ = this.documentService.findDocumentsBySlug(
      `psalm_${this.psalmNumber.toString()}`,
      this.language.value
    ).pipe(
      map(docs => new Psalm(docs.find(doc => doc.language === this.language.value && doc.version === this.version.value) as Psalm))
    );*/

    // animate
    if(animate) {
      setTimeout(() => this.isSwiping = 'none', 100);
    }
  }

  setLanguage(lang : string) {
    this.language.setValue(lang);
    this.setPsalm(false);
  }

  setVersion(version : string) {
    this.version.setValue(version);
    this.setPsalm(false);
  }

  modifyPsalmNumber(increment : number) {
    this.number.setValue(this.number.value + increment);
    this.isSwiping = increment < 0 ? 'right' : 'left';
    setTimeout(() => this.isSwiping = increment < 0 ? 'left' : 'right', 0);
    this.setPsalm(true);
  }

  /* Display Settings */
  async openSettings(settings : DisplaySettings) {
    const modal = await this.modal.create({
      component: DisplaySettingsComponent,
    });

    modal.componentProps = {
      settings,
      modal
    };

    await modal.present();
  }

  grabPreference(key : string) : Observable<any> {
    return this.preferencesService.get(key).pipe(startWith(undefined)).pipe(
      map(keyvalue => keyvalue?.value),
    );
  }

  processSettings(settings : DisplaySettings) : string[] {
    return [
      `ldf-wrapper`,
      `psalm`,
      `ion-padding`,
      `dropcaps-${settings?.dropcaps}`,
      `response-${settings?.response}`,
      `repeat-antiphon-${settings?.repeatAntiphon}`,
      `fontscale-${settings?.fontscale?.toString() || 'l'}`,
      `font-${settings?.font}`,
      `psalmverses-${settings?.psalmVerses}`,
      `bibleverses-${settings?.bibleVerses}`
    ];
  }
}
