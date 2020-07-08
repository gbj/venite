import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LiturgicalDocument } from '@venite/ldf';

@Component({
  selector: 'venite-lectionary-select',
  templateUrl: './lectionary-select.component.html',
  styleUrls: ['./lectionary-select.component.scss'],
})
export class LectionarySelectComponent implements OnInit, OnChanges {
  @Input() lectionaries : {[key: string]: string};
  @Input() readings : {[key: string]: string};
  @Input() versions : {[key: string]: string};
  @Input() intros : LiturgicalDocument[];
  @Output() readingSelected : EventEmitter<{
    lectionary: string;
    reading: string;
    version: string | { preference: string; }
    intro: LiturgicalDocument | null;
  }> = new EventEmitter();

  selectedLectionary : string;
  selectedReading : string;
  selectedVersion : string;
  selectedIntroduction : LiturgicalDocument;

  lectionaryEntries : ([string, string])[];
  readingEntries : ([string, string])[];
  versionEntries : ([string, string])[];

  useBibleVersionPref : boolean = true;

  constructor() { }

  ngOnInit() {
    this.lectionaryEntries = Object.entries(this.lectionaries || {});
    this.readingEntries = Object.entries(this.readings || {});
    this.versionEntries = Object.entries(this.versions || {});
  }

  ngOnChanges(changes : SimpleChanges) {
    if(changes.lectionaries?.currentValue) {
      this.lectionaryEntries = Object.entries(changes.lectionaries.currentValue);
    }
    if(changes.readings?.currentValue) {
      this.readingEntries = Object.entries(changes.readings.currentValue);
    }
    if(changes.versions?.currentValue) {
      this.versionEntries = Object.entries(changes.versions.currentValue);
    }
  }

  update() {
    this.readingSelected.emit({
      lectionary: this.selectedLectionary,
      reading: this.selectedReading,
      version: this.useBibleVersionPref ? { preference: "bibleVersion" } : this.selectedVersion,
      intro: this.selectedIntroduction
    });
  }
}
