import { parseReference, Book } from '../src';

describe('parseReference', () => {
  it('should parse ranges in a variety of Biblical citation', () => {
    expect(parseReference('Col. 1:29-2:2')).toEqual([
      { start: { book: Book.Colossians, chapter: 1, verse: 29 }, end: { book: Book.Colossians, chapter: 2, verse: 2 } },
    ]);
    expect(parseReference('1 Tin 4:1-3, 4-6')).toEqual([
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 1 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 3 },
      },
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 4 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 6 },
      },
    ]);
    expect(parseReference('1 Tin 4:1-3, [4-6], 7-9')).toEqual([
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 1 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 3 },
      },
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 4 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 6 },
        bracketed: true,
      },
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 7 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 9 },
      },
    ]);
    expect(parseReference('1 Tin 4:1-3[4-6]7-9')).toEqual([
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 1 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 3 },
      },
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 4 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 6 },
        bracketed: true,
      },
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 7 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 9 },
      },
    ]);
    expect(parseReference('1 Tin 4:1-3; Col. 3:1')).toEqual([
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 1 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 3 },
      },
      { start: { book: Book.Colossians, chapter: 3, verse: 1 }, end: null },
    ]);
    expect(parseReference('1 Tin 4:1-3')).toEqual([
      {
        start: { book: Book.FirstTimothy, chapter: 4, verse: 1 },
        end: { book: Book.FirstTimothy, chapter: 4, verse: 3 },
      },
    ]);
    expect(parseReference('1 Tin')).toEqual([
      { start: { book: Book.FirstTimothy, chapter: null, verse: null }, end: null },
    ]);
    expect(parseReference('Colossians')).toEqual([
      { start: { book: Book.Colossians, chapter: null, verse: null }, end: null },
    ]);
    expect(parseReference('Colossians 1:1')).toEqual([
      { start: { book: Book.Colossians, chapter: 1, verse: 1 }, end: null },
    ]);
    expect(parseReference('1 Cor. 13:1')).toEqual([
      { start: { book: Book.FirstCorinthians, chapter: 13, verse: 1 }, end: null },
    ]);
    expect(parseReference('1 Thess 2:3')).toEqual([
      { start: { book: Book.FirstThessalonians, chapter: 2, verse: 3 }, end: null },
    ]);
    expect(parseReference('1 Tim 2:3')).toEqual([
      { start: { book: Book.FirstTimothy, chapter: 2, verse: 3 }, end: null },
    ]);
    expect(parseReference('Phlm 12')).toEqual([
      { start: { book: Book.Philemon, chapter: 12, verse: null }, end: null },
    ]);
    expect(parseReference('Heb 1')).toEqual([{ start: { book: Book.Hebrews, chapter: 1, verse: null }, end: null }]);
    expect(parseReference('Phil 1')).toEqual([
      { start: { book: Book.Philippians, chapter: 1, verse: null }, end: null },
    ]);
    expect(parseReference('Philip 1')).toEqual([
      { start: { book: Book.Philippians, chapter: 1, verse: null }, end: null },
    ]);
    expect(parseReference('Rom 1')).toEqual([{ start: { book: Book.Romans, chapter: 1, verse: null }, end: null }]);
    expect(parseReference('2 Samuel 7:4, 8-16')).toEqual([
      { start: { book: Book.SecondSamuel, chapter: 7, verse: 4 }, end: null },
      { start: { book: null, chapter: null, verse: 8 }, end: { book: null, chapter: null, verse: 16 } },
    ]);
    expect(parseReference('Judith 9:1, 11-14')).toEqual([
      { start: { book: Book.Judith, chapter: 9, verse: 1 }, end: null },
      { start: { book: null, chapter: null, verse: 11 }, end: { book: null, chapter: null, verse: 14 } },
    ]);

    expect(parseReference('Wisdom of Solomon 1:16-2:1')).toEqual([
      {
        start: { book: Book.Wisdom, chapter: 1, verse: 16 },
        end: { book: Book.Wisdom, chapter: 2, verse: 1 },
      },
    ]);

    expect(parseReference('Wisdom of Solomon 1:16-2:1,12-22')).toEqual([
      {
        start: { book: Book.Wisdom, chapter: 1, verse: 16 },
        end: { book: Book.Wisdom, chapter: 2, verse: 1 },
      },
      {
        start: { book: Book.Wisdom, chapter: 2, verse: 12 },
        end: { book: Book.Wisdom, chapter: 2, verse: 22 },
      },
    ]);

    expect(parseReference('1 Cor. 13:[1-3]4-13')).toEqual([
      {
        start: { book: Book.FirstCorinthians, chapter: 13, verse: 1 },
        end: { book: Book.FirstCorinthians, chapter: 13, verse: 3 },
        bracketed: true,
      },
      {
        start: { book: null, chapter: null, verse: 4 },
        end: { book: null, chapter: null, verse: 13 },
      },
    ]);

    expect(parseReference('1 Cor. 13:(1-3)4-13')).toEqual([
      {
        start: { book: Book.FirstCorinthians, chapter: 13, verse: 1 },
        end: { book: Book.FirstCorinthians, chapter: 13, verse: 3 },
        bracketed: true,
      },
      {
        start: { book: null, chapter: null, verse: 4 },
        end: { book: null, chapter: null, verse: 13 },
      },
    ]);

    expect(parseReference('Luke 2:1-14,(15-20)')).toEqual([
      {
        start: { book: Book.Luke, chapter: 2, verse: 1 },
        end: { book: Book.Luke, chapter: 2, verse: 14 },
      },
      {
        start: { book: Book.Luke, chapter: 2, verse: 15 },
        end: { book: Book.Luke, chapter: 2, verse: 20 },
        bracketed: true,
      },
    ]);

    expect(parseReference('Genesis 18:1-15; (21:1-7)')).toEqual([
      {
        start: { book: Book.Genesis, chapter: 18, verse: 1 },
        end: { book: Book.Genesis, chapter: 18, verse: 15 },
      },
      {
        start: { book: Book.Genesis, chapter: 21, verse: 1 },
        end: { book: Book.Genesis, chapter: 21, verse: 7 },
        bracketed: true,
      },
    ]);

    expect(parseReference('Matthew 9:35-10:8,(9-23)')).toEqual([
      {
        start: { book: Book.Matthew, chapter: 9, verse: 35 },
        end: { book: Book.Matthew, chapter: 10, verse: 8 },
      },
      {
        start: { book: Book.Matthew, chapter: 10, verse: 9 },
        end: { book: Book.Matthew, chapter: 10, verse: 23 },
        bracketed: true,
      },
    ]);

    expect(parseReference('1 Samuel 8:4-11,(12-15),16-20; (11:14-15)')).toEqual([
      {
        start: { book: Book.FirstSamuel, chapter: 8, verse: 4 },
        end: { book: Book.FirstSamuel, chapter: 8, verse: 11 },
      },
      {
        start: { book: Book.FirstSamuel, chapter: 8, verse: 12 },
        end: { book: Book.FirstSamuel, chapter: 8, verse: 15 },
        bracketed: true,
      },
      {
        start: { book: Book.FirstSamuel, chapter: 8, verse: 16 },
        end: { book: Book.FirstSamuel, chapter: 8, verse: 20 },
      },
      {
        start: { book: Book.FirstSamuel, chapter: 11, verse: 14 },
        end: { book: Book.FirstSamuel, chapter: 11, verse: 15 },
        bracketed: true,
      },
    ]);
  });

  expect(parseReference('1 Samuel 17:(1a,4-11,19-23),32-49')).toEqual([
    {
      start: { book: Book.FirstSamuel, chapter: 17, verse: 1 },
      end: { book: Book.FirstSamuel, chapter: 17, verse: 1 },
      bracketed: true,
    },
    {
      start: { book: null, chapter: null, verse: 4 },
      end: { book: null, chapter: null, verse: 11 },
      bracketed: true,
    },
    {
      start: { book: null, chapter: null, verse: 19 },
      end: { book: null, chapter: null, verse: 23 },
      bracketed: true,
    },
    {
      start: { book: null, chapter: null, verse: 32 },
      end: { book: null, chapter: null, verse: 49 },
    },
  ]);
});
