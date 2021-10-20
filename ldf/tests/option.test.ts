import { Option, Psalm, Text, BibleReading } from '../src';

describe('Option.uniqueVersions()', () => {
  it('should return 1 if all liturgies are same version', () => {
    const obj = new Option({
      value: [
        new Psalm({ version: 'bcp1979', slug: 'psalm_80' }),
        new Psalm({ type: 'psalm', version: 'bcp1979', slug: 'psalm_81' }),
        new Psalm({ type: 'psalm', version: 'bcp1979', slug: 'psalm_82' }),
      ],
    });

    expect(obj.uniqueVersions()).toEqual(1);
  });

  it('should return 2 if different versions available', () => {
    const obj = new Option({
      value: [
        new Psalm({ version: 'bcp1979', slug: 'psalm_80' }),
        new Psalm({ type: 'psalm', version: 'bcp1979', slug: 'psalm_81' }),
        new Psalm({ type: 'psalm', version: 'eow', slug: 'psalm_82' }),
      ],
    });

    expect(obj.uniqueVersions()).toEqual(2);
  });

  it('should return 2 if different versions available of same document', () => {
    const obj = new Option({
      value: [
        new Psalm({ type: 'psalm', version: 'bcp1979', slug: 'psalm_81' }),
        new Psalm({ type: 'psalm', version: 'eow', slug: 'psalm_81' }),
      ],
    });

    expect(obj.uniqueVersions()).toEqual(2);
  });
});

describe('Option.uniqueLabels()', () => {
  it('should return 1 if all docs have same label', () => {
    const obj = new Option({
      value: [
        new Psalm({ type: 'psalm', label: 'Psalm 81', version: 'bcp1979', slug: 'psalm_81' }),
        new Psalm({ type: 'psalm', label: 'Psalm 81', version: 'eow', slug: 'psalm_81' }),
      ],
    });

    expect(obj.uniqueLabels()).toEqual(1);
  });

  it('should return 2 if a label is absent', () => {
    const obj = new Option({
      value: [
        new Psalm({ version: 'bcp1979', slug: 'psalm_80' }),
        new Psalm({ type: 'psalm', label: 'Psalm 80', version: 'bcp1979', slug: 'psalm_80' }),
      ],
    });

    expect(obj.uniqueLabels()).toEqual(2);
  });

  it('should return 2 if different labels present', () => {
    const obj = new Option({
      value: [
        new Psalm({ type: 'psalm', label: 'Psalm 81', version: 'bcp1979', slug: 'psalm_81' }),
        new Psalm({ type: 'psalm', label: 'Psalm 82', version: 'bcp1979', slug: 'psalm_82' }),
      ],
    });

    expect(obj.uniqueLabels()).toEqual(2);
  });
});

describe('Option.getVersionLabel()', () => {
  it('should return labels for pieces of Psalm 119', () => {
    const obj = new Option({
      value: [
        new Psalm({ version: 'bcp1979', label: 'Psalm 118', slug: 'psalm_118' }),
        new Psalm({ version: 'bcp1979', label: 'Psalm 119: Aleph', slug: 'psalm_119_aleph' }),
        new Psalm({ version: 'bcp1979', label: 'Psalm 119: Bet', slug: 'psalm_119_bet' }),
        new Psalm({ version: 'bcp1979', label: 'Psalm 119: Gimel', slug: 'psalm_119_gimel' }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('Psalm 118');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('Psalm 119: Aleph');
  });

  it('should give local names for canticles', () => {
    const obj = new Option({
      value: [
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle A',
          metadata: { number: 'A', localname: 'A Song of Wisdom' },
          version: 'eow',
          slug: 'canticle_a',
        }),
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle B',
          metadata: { number: 'A', localname: 'Something Else I Forget' },
          version: 'eow',
          slug: 'canticle_b',
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('A Song of Wisdom');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('Something Else I Forget');
  });

  it('should give local names with versions for canticles with multiple versions', () => {
    const obj = new Option({
      value: [
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle A',
          metadata: { number: 'A', localname: 'A Song of Wisdom' },
          version: 'eow',
          slug: 'canticle_a',
        }),
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle 16',
          metadata: { number: '16', localname: 'The Song of Zechariah' },
          version: 'bcp1979',
          slug: 'canticle_16',
        }),
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle 16',
          metadata: { number: '16', localname: 'The Song of Zechariah' },
          version: 'eow',
          slug: 'canticle_16',
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('A Song of Wisdom (EOW)');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('The Song of Zechariah (Rite II)');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('The Song of Zechariah (EOW)');
  });

  it('should give local names with versions for invitatories with multiple versions', () => {
    const obj = new Option({
      value: [
        new Psalm({
          type: 'psalm',
          style: 'invitatory',
          label: 'Venite',
          metadata: { localname: 'Venite' },
          version: 'eow',
          slug: 'venite',
        }),
        new Psalm({
          type: 'psalm',
          style: 'invitatory',
          label: 'Venite',
          metadata: { localname: 'Venite' },
          version: 'bcp1979',
          slug: 'venite',
        }),
        new Psalm({
          type: 'psalm',
          style: 'invitatory',
          label: 'Jubilate',
          metadata: { localname: 'Jubilate' },
          version: 'eow',
          slug: 'jubilate',
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('Venite (EOW)');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('Venite (Rite II)');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('Jubilate (EOW)');
  });

  it('should give local names with versions for canticles with multiple versions', () => {
    const obj = new Option({
      value: [
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle 16: The Song of Mary',
          metadata: { localname: 'The Song of Mary', number: '16' },
          version: 'bcp1979',
          slug: 'venite',
        }),
        new Psalm({
          type: 'psalm',
          style: 'canticle',
          label: 'Canticle 16: The Song of Mary',
          metadata: { localname: 'The Song of Mary', number: '16' },
          version: 'eow',
          slug: 'venite',
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('Rite II');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('EOW');
  });

  it('should give labels if different labels', () => {
    const obj = new Option({
      value: [
        new Text({ type: 'text', label: 'Kyrie', version: 'bcp1979', slug: 'kyrie' }),
        new Text({ type: 'text', label: 'Gloria', version: 'bcp1979', slug: 'gloria' }),
        new Text({ type: 'text', label: 'Trisagion', version: 'bcp1979', slug: 'trisagion' }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('Kyrie');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('Gloria');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('Trisagion');
  });

  it('should give labels if different labels', () => {
    const obj = new Option({
      value: [
        new Text({ type: 'text', label: 'Kyrie', version: 'bcp1979', slug: 'kyrie' }),
        new Text({ type: 'text', label: 'Gloria', version: 'bcp1979', slug: 'gloria' }),
        new Text({ type: 'text', label: 'Trisagion', version: 'bcp1979', slug: 'trisagion' }),
        new Text({ type: 'text', label: 'Trisagion', version: 'eow', slug: 'trisagion' }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('Kyrie (Rite II)');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('Gloria (Rite II)');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('Trisagion (Rite II)');
    expect(obj.getVersionLabel(obj.value[3])).toEqual('Trisagion (EOW)');
  });

  it('should give truncated versions of texts if no labels...', () => {
    const obj = new Option({
      value: [
        new Text({
          type: 'text',
          label: '',
          version: 'bcp1979',
          slug: 'keep_watch',
          value: ['Keep watch, dear Lord, with those who work, or watch, or weep this night, and give...'],
        }),
        new Text({
          type: 'text',
          label: '',
          version: 'bcp1979',
          slug: 'gloria',
          value: ['Yours is the day, O Lord, yours also the night; you established the moon and the sun.'],
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('“Keep watch, dear Lord, with those who work, or wa...');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('“Yours is the day, O Lord, yours also the night; y...');
  });

  it('should list Bible versions if different', () => {
    const obj = new Option({
      value: [
        new BibleReading({ type: 'bible-reading', version: 'NRSV', citation: 'John 1:1' }),
        new BibleReading({ type: 'bible-reading', version: 'ESV', citation: 'John 1:1' }),
        new BibleReading({ type: 'bible-reading', version: 'ESV', citation: 'John 1:2' }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('John 1:1 (NRSV)');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('John 1:1 (ESV)');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('John 1:2 (ESV)');
  });

  it('should not list Bible versions if identical', () => {
    const obj = new Option({
      value: [
        new BibleReading({ type: 'bible-reading', version: 'NRSV', citation: 'John 1:1' }),
        new BibleReading({ type: 'bible-reading', version: 'NRSV', citation: 'John 1:1' }),
        new BibleReading({ type: 'bible-reading', version: 'NRSV', citation: 'John 1:2' }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('John 1:1');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('John 1:1');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('John 1:2');
  });

  it('should list a truncated text for short readings if all of the citations are different', () => {
    const obj = new Option({
      value: [
        new BibleReading({
          type: 'bible-reading',
          style: 'short',
          version: 'NRSV',
          citation: 'John 1:1',
          value: [{ text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' }],
        }),
        new BibleReading({
          type: 'bible-reading',
          style: 'short',
          version: 'NRSV',
          citation: 'John 1:2',
          value: [{ text: 'He was in the beginning with God.' }],
        }),
        new BibleReading({
          type: 'bible-reading',
          style: 'short',
          version: 'NRSV',
          citation: 'John 1:3',
          value: [
            {
              text:
                'All things came into being through him, and without him not one thing came into being. What has come into being ',
            },
          ],
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('John 1:1 (“In the beginning was the Word, and the ...');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('John 1:2 (“He was in the beginning with God.”)');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('John 1:3 (“All things came into being through him,...');
  });

  it('should list a truncated text for short readings if all of the citations are different', () => {
    const obj = new Option({
      value: [
        new BibleReading({
          type: 'bible-reading',
          style: 'short',
          version: 'NRSV',
          citation: 'John 1:1',
          value: [{ text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' }],
        }),
        new BibleReading({
          type: 'bible-reading',
          style: 'short',
          version: 'ESV',
          citation: 'John 1:2',
          value: [{ text: 'He was in the beginning with God.' }],
        }),
        new BibleReading({
          type: 'bible-reading',
          style: 'short',
          version: 'NRSV',
          citation: 'John 1:3',
          value: [
            {
              text:
                'All things came into being through him, and without him not one thing came into being. What has come into being ',
            },
          ],
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('John 1:1 (NRSV) (“In the beginning was the Word, a...');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('John 1:2 (ESV) (“He was in the beginning with God....');
    expect(obj.getVersionLabel(obj.value[2])).toEqual('John 1:3 (NRSV) (“All things came into being throu...');
  });

  it('should use full version names if given multiple versions of same canticle', () => {
    const obj = new Option({
      type: 'option',
      metadata: { selected: 0, editor_selected: 0 },
      value: [
        new Psalm({
          label: 'Canticle 16: The Song of Zechariah',
          citation: 'Luke 1: 68-79',
          slug: 'canticle-16',
          type: 'psalm',
          hidden: false,
          style: 'canticle',
          version_label: null,
          language: 'en',
          metadata: {
            number: '16',
            latinname: 'Benedictus Dominus Deus',
            localname: 'The Song of Zechariah',
            changeable: true,
          },
          value: [
            {
              type: 'psalm-section',
              value: [
                {
                  halfverse: 'he has come to his people and set them free.',
                  verse: 'Blessed be the Lord, the God of Israel; *',
                  type: 'psalm-verse',
                },
                {
                  verse: 'He has raised up for us a mighty savior, *',
                  type: 'psalm-verse',
                  halfverse: 'born of the house of his servant David.',
                },
                {
                  halfverse: 'from the hands of all who hate us.',
                  verse: 'Through his holy prophets he promised of old,\nthat he would save us from our enemies, *',
                  type: 'psalm-verse',
                },
                {
                  verse: 'He promised to show mercy to our fathers *',
                  halfverse: 'and to remember his holy covenant.',
                  type: 'psalm-verse',
                },
                {
                  verse: 'This was the oath he swore to our father Abraham, *',
                  type: 'psalm-verse',
                  halfverse: 'to set us free from the hands of our enemies,',
                },
                {
                  type: 'psalm-verse',
                  halfverse: 'holy and righteous in his sight\nall the days of our life.',
                  verse: 'Free to worship him without fear, *',
                },
                {
                  type: 'psalm-verse',
                  halfverse: 'for you will go before the Lord to prepare his way,',
                  verse: 'You, my child, shall be called the prophet of the Most High, *',
                },
                {
                  type: 'psalm-verse',
                  halfverse: 'by the forgiveness of their sins.',
                  verse: 'To give his people knowledge of salvation *',
                },
                {
                  halfverse: 'the dawn from on high shall break upon us,',
                  type: 'psalm-verse',
                  verse: 'In the tender compassion of our God *',
                },
                {
                  halfverse: 'and to guide our feet into the way of peace.',
                  verse: 'To shine on those who dwell in darkness and the shadow of death, *',
                  type: 'psalm-verse',
                },
              ],
            },
          ],
          version: 'bcp1979',
          category: ['Canticle'],
        }),
        new Psalm({
          value: [
            {
              value: [
                {
                  halfverse: 'you have come to your people and set them free.',
                  verse: 'Blessed be the Lord, the God of Israel; *',
                  type: 'psalm-verse',
                },
                {
                  halfverse: 'born of the house of your servant David.',
                  verse: 'You have raised up for us a mighty savior, *',
                  type: 'psalm-verse',
                },
                {
                  verse: 'Through your holy prophets you promised of old,\nthat you would save us from our enemies, *',
                  type: 'psalm-verse',
                  halfverse: 'from the hands of all who hate us.',
                },
                {
                  halfverse: 'and to remember your holy covenant.',
                  verse: 'To show mercy to our forebears *',
                  type: 'psalm-verse',
                },
                {
                  type: 'psalm-verse',
                  halfverse: 'to set us free from the hands of our enemies,',
                  verse: 'This was the oath you swore to our father Abraham, *',
                },
                {
                  verse: 'Free to worship you without fear, *',
                  halfverse: 'holy and righteous before you,\nall the days of our life.',
                  type: 'psalm-verse',
                },
                {
                  halfverse: 'for you will go before the Lord to prepare the way,',
                  verse: 'And you, child, shall be called the prophet of the Most High, *',
                  type: 'psalm-verse',
                },
                {
                  halfverse: 'by the forgiveness of their sins.',
                  type: 'psalm-verse',
                  verse: 'To give God’s people knowledge of salvation *',
                },
                {
                  type: 'psalm-verse',
                  halfverse: 'the dawn from on high shall break upon us,',
                  verse: 'In the tender compassion of our God *',
                },
                {
                  halfverse: 'and to guide our feet into the way of peace.',
                  verse: 'To shine on those who dwell in darkness\nand the shadow of death, *',
                  type: 'psalm-verse',
                },
              ],
              type: 'psalm-section',
            },
          ],
          metadata: {
            latinname: 'Benedictus Dominus Deus',
            localname: 'The Song of Zechariah',
            number: '16',
            changeable: true,
          },
          language: 'en',
          sharing: {
            organization: 'venite',
            collaborators: [],
            privacy: 'public',
            status: 'published',
            owner: 'ikvC2kTwM0MhmiqfMOi2fFZynJr2',
          },
          type: 'psalm',
          slug: 'canticle-16',
          version: 'eow',
          style: 'canticle',
          hidden: false,
          citation: 'Luke 1: 68-79',
          category: ['Canticle', 'Canticle'],
          version_label: null,
          label: 'Canticle 16: The Song of Zechariah',
        }),
      ],
    });

    expect(obj.getVersionLabel(obj.value[0])).toEqual('Rite II');
    expect(obj.getVersionLabel(obj.value[1])).toEqual('EOW');
  });
});
