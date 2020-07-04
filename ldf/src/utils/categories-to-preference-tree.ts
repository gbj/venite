import { Preference } from "../liturgy/preference";

export function categoriesToPreferenceTree(categories : string[], preferences : { [x: string]: Preference}) : { [category: string]: Preference[]; } {
  return categories.reduce((obj, category) => (
    {
      ... obj,
      [category]: Object.entries(preferences)
        .filter(([key, pref]) =>
          pref.category == category || (!pref.category && category == 'Preferences')
        )
    }
  ), {})
}