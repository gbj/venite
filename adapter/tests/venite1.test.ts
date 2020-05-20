import { venite1toLDF } from '../src/venite1';
import { Psalm, Heading } from '@venite/ldf';

describe('venite1toLDF', () => {
  it('transforms ordinary psalms', () => {
    // define the psalm
    const psalm = {
      "id": "1",
      "slug": "psalm_2",
      "language": "en",
      "version": "bcp1979",
      "number": "2",
      "label": "Psalm 2",
      "canticle": false,
      "invitatory": null,
      "localname": "Psalm 2",
      "latinname": "Quare fremuerunt gentes?",
      "citation": null,
      "antiphon": null,
      "value": [
        [
          [
            "1",
            "Why are the nations in an uproar? *",
            "Why do the peoples mutter empty threats?"
          ],
          [
            "2",
            "Why do the kings of the earth rise up in revolt,\nand the princes plot together, *",
            "against the LORD and against his Anointed?"
          ]
        ]
      ],
      "omit_antiphon": false,
      "omit_gloria": null,
      "version_label": null,
      "source": "BCP p. 586"
    };

    // test the function
    const newObj = venite1toLDF(psalm, 'psalm');
    expect(newObj).toEqual(new Psalm({
      type: 'psalm',
      style: 'psalm',
      category: [{name: 'Psalm'}],
      slug: 'psalm_2',
      hidden: false,
      label: 'Psalm 2',
      version_label: null,
      language: 'en',
      version: 'bcp1979',
      citation: null,
      source: { source: 'bcp1979', citation: 'p. 586', "api": "https://www.venite.app/api" },
      metadata: {
        number: '2',
        localname: 'Psalm 2',
        latinname: 'Quare fremuerunt gentes?',
        omit_antiphon: false,
        omit_gloria: false
      },
      value: [[
        { type: 'psalm-verse', number: '1', verse: 'Why are the nations in an uproar? *', halfverse: 'Why do the peoples mutter empty threats?' },
        { type: 'psalm-verse', number: '2', verse: 'Why do the kings of the earth rise up in revolt,\nand the princes plot together, *', halfverse: 'against the LORD and against his Anointed?' },
      ]]
    }));
  });

  it('handles Canticle 12 weirdness', () => {
    const psalm = {
      "id": "230",
      "slug": "canticle-12",
      "language": "en",
      "version": "bcp1979",
      "number": "12",
      "label": "Canticle 12: A Song of Creation",
      "canticle": true,
      "invitatory": null,
      "localname": "A Song of Creation",
      "latinname": "Benedicite, omnia opera Domini",
      "citation": "Song of the Three Young Men, 35-65",
      "antiphon": null,
      "value": [
        {
          "label": "Invocation",
          "verses": [
            [
              "Glorify the Lord, all you works of the Lord, *",
              "praise him and highly exalt him for ever."
            ],
            [
              "In the firmament of his power, glorify the Lord, *",
              "praise him and highly exalt him for ever."
            ]
          ]
        },
        {
          "label": "I\t\tThe Cosmic Order",
          "verses": [
            [
              "Glorify the Lord, you angels and all powers of the Lord, *",
              "O heavens and all waters above the heavens."
            ]
          ]
        }
      ],
      "omit_antiphon": false,
      "omit_gloria": true,
      "version_label": null,
      "source": "BCP p. 88"
    };

    const newObj = venite1toLDF(psalm, 'psalm');
    expect(newObj).toEqual(new Psalm({
      type: 'psalm',
      style: 'canticle',
      category: [{name: 'Canticle'}],
      slug: 'canticle-12',
      hidden: false,
      label: 'Canticle 12: A Song of Creation',
      version_label: null,
      language: 'en',
      version: 'bcp1979',
      citation: "Song of the Three Young Men, 35-65",
      source: { source: 'bcp1979', citation: 'p. 88', "api": "https://www.venite.app/api" },
      metadata: {
        number: '12',
        "localname": "A Song of Creation",
        "latinname": "Benedicite, omnia opera Domini",
        omit_antiphon: false,
        omit_gloria: true
      },
      value: [
        [
          new Heading({ type: 'heading', hidden: false, metadata: { level: 4 }, value: ['Invocation']}),
          { type: 'psalm-verse', verse: 'Glorify the Lord, all you works of the Lord, *', halfverse: 'praise him and highly exalt him for ever.' },
          { type: 'psalm-verse', verse: 'In the firmament of his power, glorify the Lord, *', halfverse: 'praise him and highly exalt him for ever.' },
        ],
        [
          new Heading({ type: 'heading', hidden: false, metadata: { level: 4 }, value: ['I\t\tThe Cosmic Order']}),
          { type: 'psalm-verse', verse: 'Glorify the Lord, you angels and all powers of the Lord, *', halfverse: 'O heavens and all waters above the heavens.' },
        ]
      ]
    }));
  });
});
