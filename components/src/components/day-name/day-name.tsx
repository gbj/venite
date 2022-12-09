import { Component, Prop, Watch, State, Host, JSX, Element, h } from '@stencil/core';
import { LiturgicalDay, dateFromYMDString, Text } from '@venite/ldf';
import { getComponentClosestLanguage } from '../../utils/locale';

import EN from './day-name.i18n.en.json';
import ES from './day-name.i18n.es.json';
import FR from './day-name.i18n.fr.json';

const LOCALE = {
  'en': EN,
  'es': ES,
  'fr': FR
};

@Component({
  tag: 'ldf-day-name',
  styleUrl: 'day-name.scss',
  scoped: true
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
    if (day?.holy_day_observed?.name && day?.holy_day_observed?.type?.rank >= 3) {
      console.log("Holy Day name", day?.holy_day_observed?.name, localeStrings[day?.holy_day_observed?.name] || localeStrings[day?.holy_day_observed?.name.replace("St.", "Saint")], localeStrings)
      const name = localeStrings[day?.holy_day_observed?.name] || localeStrings[day?.holy_day_observed?.name.replace("St.", "Saint")] || day?.holy_day_observed?.name;
      return !day.holy_day_observed.bio 
        ? [<p class="holy-day-name">{name}</p>, day?.holy_day_observed?.subtitle ? <p class="holy-day-subtitle">{day.holy_day_observed.subtitle}</p> : undefined]
        : <details>
            <summary>{name}</summary>
            <ldf-text doc={new Text({type: "text", style: "text", value: day.holy_day_observed.bio})}></ldf-text>
          </details>;
    } else {
      const date = dateFromYMDString(day?.date),
            locale : string = (this.el?.closest('[lang]') as HTMLElement)?.lang || 'en';
    
      // Sunday => name of week
      if(date.getDay() == 0) {
        const the = localeStrings.the || ' the ';
        return [
          day?.week?.omit_the ? '' : ` ${the[1].toUpperCase()}${the.slice(2, localeStrings.the.length)} `,          ,
          localeStrings[day?.week?.name] || day?.week?.name
        ];
      }
      // weekday => [weekday] after (the) [Sunday]
      else {
        return [
          capitalize(date.toLocaleDateString(locale, { weekday: 'long' })),
          localeStrings.after || ' after ',
          day?.week?.omit_the ? '' : localeStrings.the,
          localeStrings[day?.week?.name] || day?.week?.name
        ].join("").replace(/de\s+el/, "del").replace(/de\s+le/, "du");
      }
    }
  }

  render() {
    const image = (typeof this.obj?.color !== 'string' && this.obj?.color?.image) || this.obj.image || this.obj.holy_day_observed?.image,
      imageUrl = (typeof this.obj?.color !== 'string' && this.obj?.color?.imageUrl) || this.obj.imageURL || this.obj['imageUrl'];

    return (
      <Host>
        {this.localeStrings && this.dayToNodes(this.obj, this.localeStrings)}

        {image && imageUrl && <a href={imageUrl} target="_system"><img class="icon" src={image}/></a>}
        {image && !imageUrl && <img class="icon" src={image}/>}
      </Host>
    )
  }
}

function capitalize(word: string): string {
  return word[0].toUpperCase() + word.slice(1);
}