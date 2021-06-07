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
});
