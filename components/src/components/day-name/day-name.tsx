import { Component, Prop, Watch, State, Host, JSX, Element, h } from '@stencil/core';
import { LiturgicalDay, dateFromYMDString } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './day-name.i18n.en.json';
const LOCALE = {
  'en': EN,
};


@Component({
  tag: 'ldf-day-name',
  shadow: true
})
export class DayNameComponent {
  @Element() el: HTMLElement;

  // States
  @State() obj : LiturgicalDay;
  @State() localeStrings: { [x: string]: string; };

  /** The day to be rendered as text. */
  @Prop() day: LiturgicalDay | string;
  @Watch('day')
  dayChange(newDay : LiturgicalDay | string) {
    let provisionalObj : LiturgicalDay;

    try {
      if(typeof newDay == 'string') {
        provisionalObj = new LiturgicalDay(JSON.parse(newDay));
      } else {
        provisionalObj = new LiturgicalDay(newDay);
      }
    } catch(e) {
      console.warn('(ldf-day-name)', e);
      provisionalObj = new LiturgicalDay();
    }

    this.obj = provisionalObj || new LiturgicalDay();
  }

  // Lifecycle events
  componentWillLoad() {
    this.loadLocaleStrings();
    this.dayChange(this.day);
  }

  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = LOCALE[getComponentClosestLanguage(this.el)];
    } catch(e) {
      console.warn(e);
    }
  }

  // Render day as string
  dayToNodes(day : LiturgicalDay, localeStrings : {[x: string]: string}) : JSX.Element {
    // Holy Day => name of day
    if(day?.holy_day_observed?.name && day?.holy_day_observed?.type?.rank >= 3) {
      return day?.holy_day_observed?.name;
    } else {
      const date = dateFromYMDString(day?.date),
            locale : string = (this.el?.closest('[lang]') as HTMLElement)?.lang || 'en';
    
      // Sunday => name of week
      if(date.getDay() == 0) {
        const the = localeStrings.the || ' the ';
        return [
          day?.week?.omit_the ? '' : ` ${the[1].toUpperCase()}${the.slice(2, localeStrings.the.length)} `,          ,
          day?.week?.name
        ];
      }
      // weekday => [weekday] after (the) [Sunday]
      else {
        return [
          date.toLocaleDateString(locale, { weekday: 'long' }),
          localeStrings.after || ' after the ',
          day?.week?.omit_the ? '' : localeStrings.the,
          day?.week?.name
        ];
      }
    }
  }

  render() {
    return (
      <Host>
        {this.localeStrings && this.dayToNodes(this.obj, this.localeStrings)}
      </Host>
    )
  }
}