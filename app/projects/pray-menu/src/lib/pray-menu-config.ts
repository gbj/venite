export interface PrayMenuConfig {
  defaultLanguage: string;
  defaultVersion: string;
  defaultKalendar: string;
  languageOptions: { value: string; label: string }[];
  versionOptions: Record<string, { value: string; label: string }[]>;
  prayersAndThanksgivings?: {
    preset: boolean;
    component: any;
  };
  hasBulletinMode: boolean;
  serverReturnsDate: boolean;
  showsOnlyAdvancedSettings?: boolean;
  segmentButtonForVersions?: boolean;
  blackLetterObservanceLiturgies?: string[];
  blackLetterObservanceDays?: string[];
  blackLetterCollectsOptional?: boolean;
  filterVersions?: boolean;
}
