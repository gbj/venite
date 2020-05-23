import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'venite-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Output() dateChange : EventEmitter<Date> = new EventEmitter();

  y: string;
  m: string;
  d: string;

  constructor() { }

  ngOnInit() {
    this.refreshDates();
  }

  update(field : string, event : CustomEvent) {
    this[field] = event.detail.value;
    this.dateChanged();
  }

  // emit the current y/m/d as a `Date`
  // fires every time the fields change
  dateChanged() {
    let date : Date;
    try {
      date = new Date(parseInt(this.y), parseInt(this.m) - 1, parseInt(this.d));
      this.dateChange.emit(date);
    } catch(e) {
      console.warn('(DateComponent)', e);
    }
  }

  // Returns a list of all possible dates in a given year and month
  daysInMonth(year : string, month : string) : number[] {
    const days = new Date(parseInt(year), parseInt(month), 0).getDate(),
          range = new Array();
    for(let ii = 1; ii <= days; ii++) {
      range.push(ii);
    }
    return range;
  }

  // restore the dates to the current day
  refreshDates() {
    console.log('setting dates');
    const now = new Date();
    this.y = now.getFullYear().toString();
    this.m = (now.getMonth()+1).toString();
    this.d = now.getDate().toString();
    this.dateChanged();
  }
}
