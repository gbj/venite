import { Component, Element, Prop, Event, EventEmitter, h, Host, State, Watch } from '@stencil/core';
import { Change, Condition, SEASONS } from '@venite/ldf';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'ldf-editable-condition-piece',
  styleUrl: 'editable-condition-piece.scss',
  shadow: true
})
export class EditableConditionComponent {
  @Element() el: HTMLElement;

  @State() localeStrings: { [x: string]: string; };

  @State() workingCondition : Condition;

  // Properties

  /** A JSON Pointer that points to the object being edited */
  @Prop({ reflect: true }) path: string;

  /** Starting value for editing */
  @Prop() condition: Condition;
  @Watch('condition')
  conditionChange() {
    this.workingCondition = this.condition;
  }

  // Events
  @Event({ bubbles: true }) ldfDocShouldChange : EventEmitter<Change>;

  componentWillLoad() {
    this.loadLocaleStrings();
    this.workingCondition = this.condition;
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

  // TODO -- emit changes
  toggleExceptOnly(field : string, subfield : string, value : string) {
    console.log('toggling', value, 'in', field, subfield);
    if(!this.workingCondition[field]) {
      // TODO -- emit change
      this.workingCondition[field] = {
        except: new Array(),
        only: new Array()
      }
    }
    const list = this.workingCondition[field][subfield],
          index = list.indexOf(value);
    if(index == -1) {
      list.push(value);
    } else {
      const index = list.indexOf(value);
      list.splice(index, 1);
    }

    this.workingCondition = new Condition({ ... this.workingCondition });

    console.log(this.workingCondition);
  }

  // Sets or clears one of the `Condition.___` fields (`season`, `day`, etc.)
  toggleSubcondition(subcondition : string, active : boolean, template : any) {
    if(active && this.condition[subcondition] == undefined) {
      this.condition = new Condition({
        ... this.condition,
        [subcondition]: template
      });
      // TODO emit change
    } else {
      this.condition[subcondition] = undefined;
      this.condition = new Condition(this.condition);
    }
  }

  render() {
    const localeStrings = this.localeStrings || {};

    return (
      <Host>
        <article>
          <ion-item>
            <ion-label>{localeStrings.season}</ion-label>
            <ion-toggle
              checked={this.condition.season !== undefined}
              onIonChange={(ev) => this.toggleSubcondition('season', ev.detail.checked, {
                except: [], only: []
              })}
            ></ion-toggle>
          </ion-item>
          {this.condition.season !== undefined && <div class="type">
              <h4>{localeStrings.only}</h4>
                {SEASONS.map(season => {
                  const isSelected = this.workingCondition?.season?.only?.includes(season);
                  return <ion-chip
                      onClick={() => this.toggleExceptOnly('season', 'only', season)}
                      color={isSelected ? 'primary' : 'light'}
                    >{season}</ion-chip>
                })}
              <h4>{localeStrings.except}</h4>
              {SEASONS.map(season => {
                  const isSelected = this.workingCondition?.season?.except?.includes(season);
                  return <ion-chip
                      onClick={() => this.toggleExceptOnly('season', 'except', season)}
                      color={isSelected ? 'primary' : 'light'}
                    >{season}</ion-chip>
                })}
            </div>}
        </article>        
      </Host>
    );
  }
}
