import { Psalm } from '../src';

const PSALM_80 = {
  api: '',
  slug: 'psalm_80',
  label: 'Psalm 80',
  language: 'en',
  version: 'bcp1979',
  type: 'psalm' as 'psalm',
  style: 'psalm' as 'psalm',
  citation: 'Psalm 80',
  value: [
    [
      {
        type: 'psalm-verse' as 'psalm-verse',
        number: '1',
        verse: 'Hear, O Shepherd of Israel, leading Joseph like a flock; * ',
        halfverse: 'shine forth, you that are enthroned upon the cherubim.'
      },
      {
        type: 'psalm-verse' as 'psalm-verse',
        number: '2',
        verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
        halfverse: 'stir up your strength and come to help us.'
      },
      {
        type: 'psalm-verse' as 'psalm-verse',
        number: '3',
        verse: 'Restore us, O God of hosts; *',
        halfverse: 'show the light of your countenance, and we shall be saved.'
      }
    ]
  ]
};

describe("Psalm.versesInCitation()", () => {
  it("should parse a single verse", () => {
    const psalm = new Psalm(PSALM_80);
    const verses =  psalm.versesInCitation('Psalm 80:2');

    expect(verses).toEqual(['2']);
  });

  it("should parse a simple verse range", () => {
    const psalm = new Psalm(PSALM_80);
    const verses =  psalm.versesInCitation('Psalm 80:2-4');

    expect(verses).toEqual(['2', '3', '4']);
  });

  it("should parse a single comma'ed verse", () => {
    const psalm = new Psalm(PSALM_80);
    const verses =  psalm.versesInCitation('Psalm 80:2-4, 6');

    expect(verses).toEqual(['2', '3', '4', '6']);
  });

  it("should parse comma'ed ranges", () => {
    const psalm = new Psalm(PSALM_80);
    const verses =  psalm.versesInCitation('Psalm 80:2-4,6-11');

    expect(verses).toEqual(['2', '3', '4', '6', '7', '8', '9', '10', '11']);
  });

  it("should parse verse numbers with letters included", () => {
    const psalm = new Psalm(PSALM_80);
    const verses =  psalm.versesInCitation('Psalm 80:2-4a');

    expect(verses).toEqual(['2', '3', '4']);
  });
});

describe("Psalm.filteredVerses()", () => {
  it("should give all verses if no explicit citation given", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.citation = 'Psalm 80'
    const verses = psalm.filteredVerses();

    expect(verses).toEqual([
      [
        {
          type: 'psalm-verse',
          number: '1',
          verse: 'Hear, O Shepherd of Israel, leading Joseph like a flock; * ',
          halfverse: 'shine forth, you that are enthroned upon the cherubim.'
        },
        {
          type: 'psalm-verse',
          number: '2',
          verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
          halfverse: 'stir up your strength and come to help us.'
        },
        {
          type: 'psalm-verse',
          number: '3',
          verse: 'Restore us, O God of hosts; *',
          halfverse: 'show the light of your countenance, and we shall be saved.'
        }
      ]
    ]);
  });

  it("should handle a variety of book name formats", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.citation = 'Ps. 80'
    const verses = psalm.filteredVerses();

    expect(verses).toEqual([
      [
        {
          type: 'psalm-verse',
          number: '1',
          verse: 'Hear, O Shepherd of Israel, leading Joseph like a flock; * ',
          halfverse: 'shine forth, you that are enthroned upon the cherubim.'
        },
        {
          type: 'psalm-verse',
          number: '2',
          verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
          halfverse: 'stir up your strength and come to help us.'
        },
        {
          type: 'psalm-verse',
          number: '3',
          verse: 'Restore us, O God of hosts; *',
          halfverse: 'show the light of your countenance, and we shall be saved.'
        }
      ]
    ]);
  });

  it("should handle a variety of book name formats", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.citation = 'Psa 80'
    const verses = psalm.filteredVerses();

    expect(verses).toEqual([
      [
        {
          type: 'psalm-verse',
          number: '1',
          verse: 'Hear, O Shepherd of Israel, leading Joseph like a flock; * ',
          halfverse: 'shine forth, you that are enthroned upon the cherubim.'
        },
        {
          type: 'psalm-verse',
          number: '2',
          verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
          halfverse: 'stir up your strength and come to help us.'
        },
        {
          type: 'psalm-verse',
          number: '3',
          verse: 'Restore us, O God of hosts; *',
          halfverse: 'show the light of your countenance, and we shall be saved.'
        }
      ]
    ]);
  });

  it("should give one verse if one verse cited", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.citation = 'Psalm 80:2'
    const verses = psalm.filteredVerses();

    expect(verses).toEqual([
      [
        {
          type: 'psalm-verse',
          number: '2',
          verse: 'In the presence of Ephraim, Benjamin, and Manasseh, *',
          halfverse: 'stir up your strength and come to help us.'
        }
      ]
    ]);
  });

  it("should not include antiphon if there's no antiphon", () => {
    const psalm = new Psalm(PSALM_80);
    expect(psalm.includeAntiphon()).toEqual(false);
  });

  it("should include antiphon if there's an antiphon", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.metadata = {
      antiphon: 'Test antiphon'
    };
    expect(psalm.includeAntiphon()).toEqual(true);
  });

  it("should not include antiphon if omit_antiphon == true", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.metadata = {
      antiphon: 'Test antiphon',
      omit_antiphon: true
    };
    expect(psalm.includeAntiphon()).toEqual(false);
  });

  it("should include antiphons on canticles", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.style = 'canticle';
    psalm.metadata = {
      antiphon: 'Test antiphon'
    };
    expect(psalm.includeAntiphon()).toEqual(true);
  });

  it("should include repeat antiphons after first set of invitatory", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.style = 'invitatory';
    psalm.metadata = {
      antiphon: 'Test antiphon'
    };
    expect(psalm.repeatAntiphon(0, 0)).toEqual(true);
  });

  it("should not include repeat antiphons after final set of invitatory if no gloria", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.style = 'invitatory';
    psalm.metadata = {
      antiphon: 'Test antiphon',
      omit_gloria: true
    };
    expect(psalm.repeatAntiphon(0, 0)).toEqual(false);
  });

  it("should not include repeat antiphons if no antiphons in general", () => {
    const psalm = new Psalm(PSALM_80);
    psalm.style = 'invitatory';
    psalm.metadata = {
      antiphon: 'Test antiphon',
      omit_antiphon: true
    };
    expect(psalm.repeatAntiphon(0, 0)).toEqual(false);
  });
});
