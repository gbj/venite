import { FunctionalComponent, h } from '@stencil/core';

interface ExceptOnlyProps {
  field: string;
  localeStrings: { [x: string]: string };
  options: string[];
  currentCondition: { except?: string[]; only?: string[]; }
  onToggleSubcondition : (subcondition: string, active: boolean, template: any) => void,
  onToggleValue: (field : string, subfield: 'except' | 'only', value: string) => void
}

export const ExceptOnly : FunctionalComponent<ExceptOnlyProps> = ({ field, localeStrings, options, currentCondition, onToggleSubcondition, onToggleValue }) =>
<article>
  <ion-item>
    <ion-label>{localeStrings[field]}</ion-label>
    <ion-toggle
      checked={currentCondition !== undefined}
      onIonChange={(ev) => onToggleSubcondition(field, ev.detail.checked, {
        except: [], only: []
      })}
    ></ion-toggle>
  </ion-item>
  {currentCondition !== undefined && <div class="type">
      <h4>{localeStrings.only}</h4>
        {options.map(opt => {
          const isSelected = currentCondition.only?.includes(opt);
          return <ion-chip
              onClick={() => onToggleValue(field, 'only', opt)}
              color={isSelected ? 'primary' : 'light'}
            >{localeStrings[opt] || opt}</ion-chip>
        })}
      <h4>{localeStrings.except}</h4>
      {options.map(opt => {
          const isSelected = currentCondition.except?.includes(opt);
          return <ion-chip
              onClick={() => onToggleValue(field, 'except', opt)}
              color={isSelected ? 'primary' : 'light'}
            >{localeStrings[opt] || opt}</ion-chip>
        })}
    </div>}
</article>  

