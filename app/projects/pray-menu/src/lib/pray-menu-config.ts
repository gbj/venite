export interface PrayMenuConfig {
  defaultLanguage: string;
  defaultVersion: string;
  defaultKalendar: string;
  versionOptions: { value: string; label: string }[];
  prayersAndThanksgivings?: {
    preset: boolean;
    component: any;
  };
  hasBulletinMode: boolean;
  serverReturnsDate: boolean;
  showsOnlyAdvancedSettings?: boolean;
}
