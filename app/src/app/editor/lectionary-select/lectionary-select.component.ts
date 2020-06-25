import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'venite-lectionary-select',
  templateUrl: './lectionary-select.component.html',
  styleUrls: ['./lectionary-select.component.scss'],
})
export class LectionarySelectComponent implements OnInit, OnChanges {
  @Input() lectionaries : {[key: string]: string};
  @Input() readings : {[key: string]: string};
  @Output() readingSelected : EventEmitter<{ lectionary: string; reading: string; }> = new EventEmitter();

  selectedLectionary : string;
  selectedReading : string;

  lectionaryEntries : ([string, string])[];
  readingEntries : ([string, string])[];

  constructor() { }

  ngOnInit() {
    this.lectionaryEntries = Object.entries(this.lectionaries || {});
    this.readingEntries = Object.entries(this.readings || {});
  }

  ngOnChanges(changes : SimpleChanges) {
    if(changes.lectionaries?.currentValue) {
      this.lectionaryEntries = Object.entries(changes.lectionaries.currentValue);
    }
    if(changes.readings?.currentValue) {
      this.readingEntries = Object.entries(changes.readings.currentValue);
    }
  }

  update() {
    this.readingSelected.emit({ lectionary: this.selectedLectionary, reading: this.selectedReading });
  }
}
