import { Preference } from '../liturgy/preference';

export function categoriesToPreferenceTree(
  categories: string[],
  preferences: { [x: string]: Preference },
): { [category: string]: Preference[] } {
  return categories.reduce(
    (obj, category) => ({
      ...obj,
      [category]: Object.entries(preferences)
        .map(([key, pref]) => new Preference({ ...pref, key }))
        .filter((pref) => pref.category == category || (!pref.category && category == 'Preferences'))
        .sort((a, b) => (a.index && b.index ? (a.index < b.index ? -1 : 1) : a.label < b.label ? -1 : 1)),
    }),
    {},
  );
}
