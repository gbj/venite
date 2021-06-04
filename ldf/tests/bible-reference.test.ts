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
  });
});
