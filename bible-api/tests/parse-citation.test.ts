import { firstVerseOfCitation } from '../src/parse-citation';

describe('firstVerseOfCitation', () => {
  it('should parse a variety of verse formats', () => {
    expect(firstVerseOfCitation("John 3:16-21")).toEqual(
      { book: 'John', chapter : "3", verse: "16" }
    )
    expect(firstVerseOfCitation("1 Cor. 1:14-21, 23-27")).toEqual(
      { book: '1 Cor.', chapter : "1", verse: "14" }
    )
    expect(firstVerseOfCitation("4 Ezra")).toEqual(
      { book: '4 Ezra', chapter : undefined, verse: undefined }
    )
    expect(firstVerseOfCitation("4 Ezra 2")).toEqual(
      { book: '4 Ezra', chapter : "2", verse: undefined }
    )
  });
})