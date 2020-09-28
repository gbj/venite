import { Component, Prop, Watch, State, Host, JSX, Element, h } from '@stencil/core';
import { LiturgicalDay, dateFromYMDString } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

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
    console.log('newDay = ', newDay);
    let provisionalObj : LiturgicalDay;

    try {
      if(typeof newDay == 'string') {
        provisionalObj = new LiturgicalDay(JSON.parse(newDay));
        console.log('A. provisionalObj = ', provisionalObj);
      } else {
        provisionalObj = new LiturgicalDay(newDay);
        console.log('B. provisionalObj = ', provisionalObj);
      }
    } catch(e) {
      console.log(e);
      provisionalObj = new LiturgicalDay();
      console.log('C. provisionalObj = ', provisionalObj);
    }

    this.obj = provisionalObj || new LiturgicalDay();
    console.log('this.obj = ', this.obj);
  }

  // Lifecycle events
  componentWillLoad() {
    this.loadLocaleStrings();
    this.dayChange(this.day);
  }

  /** Asynchronously return localization strings */
  async getLocaleStrings() : Promise<{ [x: string]: string; }> {
    if(!this.localeStrings) {
      await this.loadLocaleStrings();
      return this.localeStrings;
    } else {
      return this.localeStrings;
    }
  }

  /** Asynchronously load localization strings */
  async loadLocaleStrings() : Promise<void> {
    try {
      this.localeStrings = await getLocaleComponentStrings(this.el);
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