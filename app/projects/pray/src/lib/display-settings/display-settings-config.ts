export class DisplaySettingsConfig {
  audio: boolean;
  audio_background: boolean;
  meditation: boolean;
  antiphons: boolean;
  fonts: { value: string; label: string }[] = [
    { value: "garamond", label: "EB Garamond" },
    { value: "gill-sans", label: "Gill Sans" },
  ];
  font_accessibility?: boolean | undefined;
  dropcaps: { value: string; label: string }[];
  ask_about_unison_texts?: undefined | boolean;
  psalm_pause: boolean;
}
