import { venite1toLDF } from '../src/venite1';
import { Psalm, Heading, Text, BibleReading } from '@venite/ldf';

describe('venite1toLDF', () => {
  it('handles ordinary psalms with numbers', () => {
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

  it('handles ordinary psalms with no numbers', () => {
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
            "Why are the nations in an uproar? *",
            "Why do the peoples mutter empty threats?"
          ],
          [
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
        { type: 'psalm-verse', verse: 'Why are the nations in an uproar? *', halfverse: 'Why do the peoples mutter empty threats?' },
        { type: 'psalm-verse', verse: 'Why do the kings of the earth rise up in revolt,\nand the princes plot together, *', halfverse: 'against the LORD and against his Anointed?' },
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

  it('handles items from Collect table', () => {
    const collect = {
      "id": "444",
      "slug": "second-advent",
      "language": "en",
      "version": "bcp1979",
      "value": [
        "Merciful God, who sent your messengers the prophets to preach repentance and prepare the way for our salvation: Give us grace to heed their warnings and forsake our sins, that we may greet with joy the coming of Jesus Christ our Redeemer; who lives and reigns with you and the Holy Spirit, one God, now and for ever."
      ]
    };
    expect(venite1toLDF(collect, 'collect')).toEqual(new Text({
      type: 'text',
      style: 'prayer',
      language: 'en',
      version: 'bcp1979',
      metadata: {
        response: 'Amen.',
        omit_response: false
      },
      slug: 'second-advent',
      value: [
        "Merciful God, who sent your messengers the prophets to preach repentance and prepare the way for our salvation: Give us grace to heed their warnings and forsake our sins, that we may greet with joy the coming of Jesus Christ our Redeemer; who lives and reigns with you and the Holy Spirit, one God, now and for ever."
      ]
    }));
  })

  it('handles Bible Readings with verses and value', () => {
    const old = {
      citation: "Ezek. 1:28-3:3",
      label: "A Reading from Ezek. 1:28-3:3 (ESV)",
      language: "en",
      version: "ESV",
      value: ["\t[28] Like the appearance of the bow that is in the cloud on the day of rain, so was the appearance of the brightness all around.","\tSuch was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell on my face, and I heard the voice of one speaking.","\t[1] And he said to me, “Son of man, stand on your feet, and I will speak with you.” [2] And as he spoke to me, the Spirit entered into me and set me on my feet, and I heard him speaking to me. [3] And he said to me, “Son of man, I send you to the people of Israel, to nations of rebels, who have rebelled against me. They and their fathers have transgressed against me to this very day. [4] The descendants also are impudent and stubborn: I send you to them, and you shall say to them, ‘Thus says the Lord GOD.’ [5] And whether they hear or refuse to hear (for they are a rebellious house) they will know that a prophet has been among them. [6] And you, son of man, be not afraid of them, nor be afraid of their words, though briers and thorns are with you and you sit on scorpions. Be not afraid of their words, nor be dismayed at their looks, for they are a rebellious house. [7] And you shall speak my words to them, whether they hear or refuse to hear, for they are a rebellious house.","\t[8] “But you, son of man, hear what I say to you. Be not rebellious like that rebellious house; open your mouth and eat what I give you.” [9] And when I looked, behold, a hand was stretched out to me, and behold, a scroll of a book was in it. [10] And he spread it before me. And it had writing on the front and on the back, and there were written on it words of lamentation and mourning and woe.","\t[1] And he said to me, “Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel.” [2] So I opened my mouth, and he gave me this scroll to eat. [3] And he said to me, “Son of man, feed your belly with this scroll that I give you and fill your stomach with it.” Then I ate it, and it was in my mouth as sweet as honey. "],
      verses: [[{"book":"Ezek","chapter":"1","verse":"28","text":"Like the appearance of the bow that is in the cloud on the day of rain, so was the appearance of the brightness all around.\n\n  Such was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell on my face, and I heard the voice of one speaking.\n\n  "},{"book":"Ezek","chapter":"2","verse":"1","text":"And he said to me, “Son of man, stand on your feet, and I will speak with you.” "},{"book":"Ezek","chapter":"2","verse":"2","text":"And as he spoke to me, the Spirit entered into me and set me on my feet, and I heard him speaking to me. "},{"book":"Ezek","chapter":"2","verse":"3","text":"And he said to me, “Son of man, I send you to the people of Israel, to nations of rebels, who have rebelled against me. They and their fathers have transgressed against me to this very day. "},{"book":"Ezek","chapter":"2","verse":"4","text":"The descendants also are impudent and stubborn: I send you to them, and you shall say to them, ‘Thus says the Lord GOD.’ "},{"book":"Ezek","chapter":"2","verse":"5","text":"And whether they hear or refuse to hear (for they are a rebellious house) they will know that a prophet has been among them. "},{"book":"Ezek","chapter":"2","verse":"6","text":"And you, son of man, be not afraid of them, nor be afraid of their words, though briers and thorns are with you and you sit on scorpions. Be not afraid of their words, nor be dismayed at their looks, for they are a rebellious house. "},{"book":"Ezek","chapter":"2","verse":"7","text":"And you shall speak my words to them, whether they hear or refuse to hear, for they are a rebellious house.\n\n  "},{"book":"Ezek","chapter":"2","verse":"8","text":"“But you, son of man, hear what I say to you. Be not rebellious like that rebellious house; open your mouth and eat what I give you.” "},{"book":"Ezek","chapter":"2","verse":"9","text":"And when I looked, behold, a hand was stretched out to me, and behold, a scroll of a book was in it. "},{"book":"Ezek","chapter":"2","verse":"10","text":"And he spread it before me. And it had writing on the front and on the back, and there were written on it words of lamentation and mourning and woe.\n\n  "},{"book":"Ezek","chapter":"3","verse":"1","text":"And he said to me, “Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel.” "},{"book":"Ezek","chapter":"3","verse":"2","text":"So I opened my mouth, and he gave me this scroll to eat. "},{"book":"Ezek","chapter":"3","verse":"3","text":"And he said to me, “Son of man, feed your belly with this scroll that I give you and fill your stomach with it.” Then I ate it, and it was in my mouth as sweet as honey. "}]]
    }

    expect(venite1toLDF(old, 'reading')).toEqual(new BibleReading({
      type: 'bible-reading',
      style: 'long',
      citation: "Ezek. 1:28-3:3",
      slug: "Ezek. 1:28-3:3 (en-ESV)",
      label: "A Reading from Ezek. 1:28-3:3 (ESV)",
      language: "en",
      version: "ESV",
      value: [{"book":"Ezek","chapter":"1","verse":"28","text":"Like the appearance of the bow that is in the cloud on the day of rain, so was the appearance of the brightness all around.\n\n  Such was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell on my face, and I heard the voice of one speaking.\n\n  "},{"book":"Ezek","chapter":"2","verse":"1","text":"And he said to me, “Son of man, stand on your feet, and I will speak with you.” "},{"book":"Ezek","chapter":"2","verse":"2","text":"And as he spoke to me, the Spirit entered into me and set me on my feet, and I heard him speaking to me. "},{"book":"Ezek","chapter":"2","verse":"3","text":"And he said to me, “Son of man, I send you to the people of Israel, to nations of rebels, who have rebelled against me. They and their fathers have transgressed against me to this very day. "},{"book":"Ezek","chapter":"2","verse":"4","text":"The descendants also are impudent and stubborn: I send you to them, and you shall say to them, ‘Thus says the Lord GOD.’ "},{"book":"Ezek","chapter":"2","verse":"5","text":"And whether they hear or refuse to hear (for they are a rebellious house) they will know that a prophet has been among them. "},{"book":"Ezek","chapter":"2","verse":"6","text":"And you, son of man, be not afraid of them, nor be afraid of their words, though briers and thorns are with you and you sit on scorpions. Be not afraid of their words, nor be dismayed at their looks, for they are a rebellious house. "},{"book":"Ezek","chapter":"2","verse":"7","text":"And you shall speak my words to them, whether they hear or refuse to hear, for they are a rebellious house.\n\n  "},{"book":"Ezek","chapter":"2","verse":"8","text":"“But you, son of man, hear what I say to you. Be not rebellious like that rebellious house; open your mouth and eat what I give you.” "},{"book":"Ezek","chapter":"2","verse":"9","text":"And when I looked, behold, a hand was stretched out to me, and behold, a scroll of a book was in it. "},{"book":"Ezek","chapter":"2","verse":"10","text":"And he spread it before me. And it had writing on the front and on the back, and there were written on it words of lamentation and mourning and woe.\n\n  "},{"book":"Ezek","chapter":"3","verse":"1","text":"And he said to me, “Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel.” "},{"book":"Ezek","chapter":"3","verse":"2","text":"So I opened my mouth, and he gave me this scroll to eat. "},{"book":"Ezek","chapter":"3","verse":"3","text":"And he said to me, “Son of man, feed your belly with this scroll that I give you and fill your stomach with it.” Then I ate it, and it was in my mouth as sweet as honey. "}]
    }));
  });

  it('returns undefined for Bible Readings with no verses', () => {
    const old = {
      citation: "Ezek. 1:28-3:3",
      label: "A Reading from Ezek. 1:28-3:3 (ESV)",
      language: "en",
      version: "ESV",
      value: ["\t[28] Like the appearance of the bow that is in the cloud on the day of rain, so was the appearance of the brightness all around.","\tSuch was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell on my face, and I heard the voice of one speaking.","\t[1] And he said to me, “Son of man, stand on your feet, and I will speak with you.” [2] And as he spoke to me, the Spirit entered into me and set me on my feet, and I heard him speaking to me. [3] And he said to me, “Son of man, I send you to the people of Israel, to nations of rebels, who have rebelled against me. They and their fathers have transgressed against me to this very day. [4] The descendants also are impudent and stubborn: I send you to them, and you shall say to them, ‘Thus says the Lord GOD.’ [5] And whether they hear or refuse to hear (for they are a rebellious house) they will know that a prophet has been among them. [6] And you, son of man, be not afraid of them, nor be afraid of their words, though briers and thorns are with you and you sit on scorpions. Be not afraid of their words, nor be dismayed at their looks, for they are a rebellious house. [7] And you shall speak my words to them, whether they hear or refuse to hear, for they are a rebellious house.","\t[8] “But you, son of man, hear what I say to you. Be not rebellious like that rebellious house; open your mouth and eat what I give you.” [9] And when I looked, behold, a hand was stretched out to me, and behold, a scroll of a book was in it. [10] And he spread it before me. And it had writing on the front and on the back, and there were written on it words of lamentation and mourning and woe.","\t[1] And he said to me, “Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel.” [2] So I opened my mouth, and he gave me this scroll to eat. [3] And he said to me, “Son of man, feed your belly with this scroll that I give you and fill your stomach with it.” Then I ate it, and it was in my mouth as sweet as honey. "],
    }

    expect(venite1toLDF(old, 'reading')).toBeUndefined();
  });

  it('handles Bible Readings with only verse', () => {
    const old = {
      citation: "Ezek. 1:28-3:3",
      label: "A Reading from Ezek. 1:28-3:3 (ESV)",
      language: "en",
      version: "ESV",
      verses: [[{"book":"Ezek","chapter":"1","verse":"28","text":"Like the appearance of the bow that is in the cloud on the day of rain, so was the appearance of the brightness all around.\n\n  Such was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell on my face, and I heard the voice of one speaking.\n\n  "},{"book":"Ezek","chapter":"2","verse":"1","text":"And he said to me, “Son of man, stand on your feet, and I will speak with you.” "},{"book":"Ezek","chapter":"2","verse":"2","text":"And as he spoke to me, the Spirit entered into me and set me on my feet, and I heard him speaking to me. "},{"book":"Ezek","chapter":"2","verse":"3","text":"And he said to me, “Son of man, I send you to the people of Israel, to nations of rebels, who have rebelled against me. They and their fathers have transgressed against me to this very day. "},{"book":"Ezek","chapter":"2","verse":"4","text":"The descendants also are impudent and stubborn: I send you to them, and you shall say to them, ‘Thus says the Lord GOD.’ "},{"book":"Ezek","chapter":"2","verse":"5","text":"And whether they hear or refuse to hear (for they are a rebellious house) they will know that a prophet has been among them. "},{"book":"Ezek","chapter":"2","verse":"6","text":"And you, son of man, be not afraid of them, nor be afraid of their words, though briers and thorns are with you and you sit on scorpions. Be not afraid of their words, nor be dismayed at their looks, for they are a rebellious house. "},{"book":"Ezek","chapter":"2","verse":"7","text":"And you shall speak my words to them, whether they hear or refuse to hear, for they are a rebellious house.\n\n  "},{"book":"Ezek","chapter":"2","verse":"8","text":"“But you, son of man, hear what I say to you. Be not rebellious like that rebellious house; open your mouth and eat what I give you.” "},{"book":"Ezek","chapter":"2","verse":"9","text":"And when I looked, behold, a hand was stretched out to me, and behold, a scroll of a book was in it. "},{"book":"Ezek","chapter":"2","verse":"10","text":"And he spread it before me. And it had writing on the front and on the back, and there were written on it words of lamentation and mourning and woe.\n\n  "},{"book":"Ezek","chapter":"3","verse":"1","text":"And he said to me, “Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel.” "},{"book":"Ezek","chapter":"3","verse":"2","text":"So I opened my mouth, and he gave me this scroll to eat. "},{"book":"Ezek","chapter":"3","verse":"3","text":"And he said to me, “Son of man, feed your belly with this scroll that I give you and fill your stomach with it.” Then I ate it, and it was in my mouth as sweet as honey. "}]]
    }

    expect(venite1toLDF(old, 'reading')).toEqual(new BibleReading({
      type: 'bible-reading',
      style: 'long',
      citation: "Ezek. 1:28-3:3",
      slug: "Ezek. 1:28-3:3 (en-ESV)",
      label: "A Reading from Ezek. 1:28-3:3 (ESV)",
      language: "en",
      version: "ESV",
      value: [{"book":"Ezek","chapter":"1","verse":"28","text":"Like the appearance of the bow that is in the cloud on the day of rain, so was the appearance of the brightness all around.\n\n  Such was the appearance of the likeness of the glory of the LORD. And when I saw it, I fell on my face, and I heard the voice of one speaking.\n\n  "},{"book":"Ezek","chapter":"2","verse":"1","text":"And he said to me, “Son of man, stand on your feet, and I will speak with you.” "},{"book":"Ezek","chapter":"2","verse":"2","text":"And as he spoke to me, the Spirit entered into me and set me on my feet, and I heard him speaking to me. "},{"book":"Ezek","chapter":"2","verse":"3","text":"And he said to me, “Son of man, I send you to the people of Israel, to nations of rebels, who have rebelled against me. They and their fathers have transgressed against me to this very day. "},{"book":"Ezek","chapter":"2","verse":"4","text":"The descendants also are impudent and stubborn: I send you to them, and you shall say to them, ‘Thus says the Lord GOD.’ "},{"book":"Ezek","chapter":"2","verse":"5","text":"And whether they hear or refuse to hear (for they are a rebellious house) they will know that a prophet has been among them. "},{"book":"Ezek","chapter":"2","verse":"6","text":"And you, son of man, be not afraid of them, nor be afraid of their words, though briers and thorns are with you and you sit on scorpions. Be not afraid of their words, nor be dismayed at their looks, for they are a rebellious house. "},{"book":"Ezek","chapter":"2","verse":"7","text":"And you shall speak my words to them, whether they hear or refuse to hear, for they are a rebellious house.\n\n  "},{"book":"Ezek","chapter":"2","verse":"8","text":"“But you, son of man, hear what I say to you. Be not rebellious like that rebellious house; open your mouth and eat what I give you.” "},{"book":"Ezek","chapter":"2","verse":"9","text":"And when I looked, behold, a hand was stretched out to me, and behold, a scroll of a book was in it. "},{"book":"Ezek","chapter":"2","verse":"10","text":"And he spread it before me. And it had writing on the front and on the back, and there were written on it words of lamentation and mourning and woe.\n\n  "},{"book":"Ezek","chapter":"3","verse":"1","text":"And he said to me, “Son of man, eat whatever you find here. Eat this scroll, and go, speak to the house of Israel.” "},{"book":"Ezek","chapter":"3","verse":"2","text":"So I opened my mouth, and he gave me this scroll to eat. "},{"book":"Ezek","chapter":"3","verse":"3","text":"And he said to me, “Son of man, feed your belly with this scroll that I give you and fill your stomach with it.” Then I ate it, and it was in my mouth as sweet as honey. "}]
    }));
  });
});
