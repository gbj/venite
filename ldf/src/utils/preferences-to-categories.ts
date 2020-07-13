import { Preference } from '../liturgy/preference';

export function preferencesToCategories(preferences: { [x: string]: Preference }): string[] {
  return Object.values(preferences)
    .map((pref) => pref.category || 'Preferences')
    .reduce((uniques: string[], item: string) => (uniques.includes(item) ? uniques : [...uniques, item]), []);
}
