import { LiturgicalDocument, BibleReading, Text, ResponsivePrayer, BibleReadingVerse } from "@venite/ldf";

export const BLANK_TEMPLATES = [
  {
    label: "Liturgy",
    factory: (label) => new LiturgicalDocument({
      type: 'liturgy',
      metadata: {
        preferences: {},
        special_preferences: {}
      },
      label,
      value: [new LiturgicalDocument({
        type: 'heading',
        style: 'text',
        metadata: {
          level: 1
        },
        value: [label]
      })]
    })
  },
  {
    label: "Prayer",
    factory: (label) => new Text({
      type: 'text',
      style: 'prayer',
      label,
      value: ['']
    })
  },
  {
    label: "Responsive Prayer",
    factory: (label) => new ResponsivePrayer({
      type: 'responsive',
      style: 'responsive',
      label,
      value: [{
        text: '',
        response: ''
      }]
    })
  },
  {
    label: "Bible Reading",
    factory: (label) => new BibleReading({
      type: 'bible-reading',
      style: 'short',
      value: [
        new BibleReadingVerse({
          book: '', chapter: '', verse: '', text: ''
        })
      ]
    })
  },
];