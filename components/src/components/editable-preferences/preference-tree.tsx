import { FunctionalComponent, h } from '@stencil/core';
import { Preference } from '@venite/ldf';

interface PreferenceTreeProps {
  path: string;
  tree: {[category: string] : Preference[]};
  label: string;
  desc?: string;
  localeStrings: { [x: string]: string; };
  newCallback: (ev : MouseEvent) => void;
}

export const PreferenceTree : FunctionalComponent<PreferenceTreeProps> = ({ path, tree, label, desc, localeStrings, newCallback }) =>
  new Array(
    <ion-card>
      <ion-card-header>
        <ion-card-title>{label}</ion-card-title>
        {desc && <ion-card-subtitle>{desc}</ion-card-subtitle>}
      </ion-card-header>
      {/* Each category */}
      {Object.keys(tree).map(category =>
        <section>
          <ion-list>
            <ion-list-header>{category}</ion-list-header>
            {/* Each Preference */}
            {tree[category].map(pref => [
              <ion-toolbar>
              <ion-title slot="start">{pref.label} (<code>{pref.key}</code>)</ion-title>
              <ion-buttons slot="end">
                {/* Delete Button */}
                <ldf-editable-delete
                  base={path}
                  index={pref.key}
                  type="object"
                  obj={pref}
                >
                </ldf-editable-delete>
              </ion-buttons>
            </ion-toolbar>,
            <ion-item>
              <ldf-editable-preference
                path={path + '/' + pref.key}
                preference={pref}
              ></ldf-editable-preference>
            </ion-item>
            ])}
          </ion-list>
        </section>)}
        {/* After "Preferences" or "Special Preferences," an add button */}
        <ion-item lines="none">
          <ion-button onClick={(ev) => newCallback(ev)}>
            <ion-icon slot="start" name="add"></ion-icon>
            {localeStrings.addPreference || 'Add Preference'}
          </ion-button>
        </ion-item>
    </ion-card>
  );