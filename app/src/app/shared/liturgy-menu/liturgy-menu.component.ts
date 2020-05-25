import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { LiturgyMenuService } from './liturgy-menu.service';

import { Observable, Subject, combineLatest, of, interval } from 'rxjs';
import { tap, map, take, mergeMap } from 'rxjs/operators';

import { Liturgy } from '@venite/ldf';

@Component({
  selector: 'venite-liturgy-menu',
  templateUrl: './liturgy-menu.component.html',
  styleUrls: ['./liturgy-menu.component.scss'],
})
export class LiturgyMenuComponent implements OnInit {
  @Input() language : string = 'en';
  @Input() version : string = 'Rite-II';

  /** Slug of default liturgy */
  @Input() liturgy : string;

  /** Emits the `Liturgy` whenever user's selection changes */
  @Output() liturgyChange : EventEmitter<Liturgy> = new EventEmitter();

  // Menu pulled from LiturgyMenuService
  liturgyOptions : Observable<Liturgy[]>;

  constructor(private liturgyMenu : LiturgyMenuService) { }

  ngOnInit() {
    // grab liturgyOptions observable from the service
    this.liturgyOptions = this.liturgyMenu.findOptions(this.language, this.version);

    // This seems insane.
    // Emit the starting liturgy
    combineLatest(
      of(this.liturgy || this.liturgyOfTheHour(new Date())),  // Input as default, or based on time
      this.liturgyOptions, // search through the observable menu from database query
      interval(1) // HACKY—delay by 1ms to come in after Angular change detection...
    )
      .pipe(
        take(1),
        tap(val => console.log('initials', val))
      )
      .subscribe(([slug, options]) => this.update(slug, options));
  }

  /** Emits liturgyChange() by searching on options for a Liturgy with the slug given */
  update(slug : string, options : Liturgy[]) {
    console.log('updating by emitting', options.find(option => option.slug == slug));
    this.liturgy = slug;
    this.liturgyChange.emit(options.find(option => option.slug == slug));
  }

  // Hard-coded default liturgy slug for any given hour
  liturgyOfTheHour(now : Date) : string {
    let hour : number = now.getHours();
    if(hour > 3 && hour < 11) {
      return "morning_prayer"
    } else if(hour >= 11 && hour <= 14) {
      return "noonday_prayer"
    } else if(hour >= 14 && hour <= 20) {
      return "evening_prayer"
    } else {
      return "compline"
    }
  }
}
