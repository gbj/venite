export class DisplaySettings {
  constructor(
    public dropcaps: 'decorated' | 'plain' | 'none' = 'plain',
    public response: 'bold' | 'italics' = 'bold',
    public repeatAntiphon: 'bracket' | 'repeat' | 'none' = 'bracket',
    public fontscale: 's' | 'm' | 'l' | 'xl' | 'xxl' = 'm',
    public font: 'garamond' | 'gill-sans' = 'garamond',
    public voiceChoice: string = '',
    public voiceRate: number = 0.85,
    public voiceBackground: 'silence' | 'seashore' | 'garden' | 'night' | 'silence-short' = 'silence',
    public voiceBackgroundVolume: number = 0.5,
    public psalmVerses: boolean = false,
    public bibleVerses: boolean = false,
    public meditationBell: 'silence' | 'singing-bowl' = 'singing-bowl',
    public darkmode: 'auto' | 'dark' | 'light' | 'ecru' = 'auto',
    public bolded: 'both' | 'unison' | 'response' | 'none' = 'both',
    public psalmPause: number = 1000,
    public hideRubrics: boolean = false,
  ) {}
}
