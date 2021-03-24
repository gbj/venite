  import { FunctionalComponent, h } from '@stencil/core';

  interface ExceptOnlyStringsProp {
    path: string;
    field: string;
    localeStrings: { [x: string]: string };
    currentCondition: { except?: string[]; only?: string[]; }
    onToggleSubcondition : (subcondition: string, active: boolean, template: any) => void,
  } 

  export const ExceptOnlyStrings : FunctionalComponent<ExceptOnlyStringsProp> = ({ path, field, localeStrings, currentCondition, onToggleSubcondition }) => 
  currentCondition && <article>
    <ion-item>
      <ion-label>{localeStrings[field]}</ion-label>
      <ion-toggle
        checked={currentCondition[field] !== undefined}
        onIonChange={(ev) => onToggleSubcondition(field, ev.detail.checked, {
          except: [], only: []
        })}
      ></ion-toggle>
    </ion-item>
    {currentCondition[field] !== undefined && <div class="type">
      <h4>{localeStrings.except}</h4>
      <ldf-editable-string-list
        path={`${path}/${field}`}
        property='except'
        value={currentCondition[field].except}
      ></ldf-editable-string-list>
      <h4>{localeStrings.only}</h4>
      <ldf-editable-string-list
        path={`${path}/${field}`}
        property='only'
        value={currentCondition[field].only}
      ></ldf-editable-string-list>
    </div>}
  </article>