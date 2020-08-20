import { BibleReading, ResponsivePrayer, Text } from '../src';

describe("Bible Class abbreviation and name functions", () => {
  it("should find abbreviations for book names", () => {
    const reading = new BibleReading();

    reading.citation = 'Jn 1:1';
    expect(reading.abbrevFromCitation()).toEqual('Jn');
    reading.citation = '1 Cor. 1:1';
    expect(reading.abbrevFromCitation()).toEqual('1 Cor');
    reading.citation = '2 Kgs 1:1-7';
    expect(reading.abbrevFromCitation()).toEqual('2 Kgs');
    reading.citation = '2 Kgs 1:1-7, 9, 12-14';
    expect(reading.abbrevFromCitation()).toEqual('2 Kgs');
    reading.citation = 'Sir 1:4-2:1';
    expect(reading.abbrevFromCitation()).toEqual('Sir');
  });

  it("should find chapter and verse numbers for book names", () => {
    const reading = new BibleReading();

    reading.citation = 'Jn 1:1';
    expect(reading.chapterFromCitation()).toEqual('1');
    expect(reading.verseFromCitation()).toEqual('1');
    reading.citation = '1 Cor. 11:17';
    expect(reading.chapterFromCitation()).toEqual('11');
    expect(reading.verseFromCitation()).toEqual('17');
    reading.citation = '2 Kgs 14:1a-7';
    expect(reading.chapterFromCitation()).toEqual('14');
    expect(reading.verseFromCitation()).toEqual('1');
    reading.citation = '2 Kgs 1:1-7, 9, 12-14';
    expect(reading.chapterFromCitation()).toEqual('1');
    expect(reading.verseFromCitation()).toEqual('1');
    reading.citation = 'Sir 1:4-2:1';
    expect(reading.chapterFromCitation()).toEqual('1');
    expect(reading.verseFromCitation()).toEqual('4');
  });

  it("should handle broken citations by falling back", () => {
    const reading = new BibleReading();

    reading.citation = 'Fake 1:4-2:1';
    expect(reading.abbrevFromCitation()).toEqual('Fake');
    reading.citation = ' 1:4-2:1';
    expect(reading.abbrevFromCitation()).toEqual('');
  });

  it("should find book codes from citations", () => {
    const reading = new BibleReading();

    reading.citation = 'Jn 1:1';
    expect(reading.bookCodeFromAbbrev(reading.abbrevFromCitation())).toEqual('John');
    reading.citation = 'Matt. 23:27-39';
    expect(reading.bookCodeFromAbbrev(reading.abbrevFromCitation())).toEqual('Matthew');
    reading.citation = '1 Cor. 1:1';
    expect(reading.bookCodeFromAbbrev(reading.abbrevFromCitation())).toEqual('1 Corinthians');
    reading.citation = '2 Kgs 1:1-7';
    expect(reading.bookCodeFromAbbrev(reading.abbrevFromCitation())).toEqual('2 Kings');
    reading.citation = '2 Kgs 1:1-7, 9, 12-14';
    expect(reading.bookCodeFromAbbrev(reading.abbrevFromCitation())).toEqual('2 Kings');
    reading.citation = 'Sir 1:4-2:1';
    expect(reading.bookCodeFromAbbrev(reading.abbrevFromCitation())).toEqual('Sirach');
  });

  it("should find full book names", () => {
    const reading = new BibleReading();

    reading.citation = 'Jn 1:1';
    expect(reading.longNameFromBookCode(reading.bookCodeFromAbbrev(reading.abbrevFromCitation()))).toEqual('The Gospel According to John');
    reading.citation = 'Matt. 23:27-39';
    expect(reading.longNameFromBookCode(reading.bookCodeFromAbbrev(reading.abbrevFromCitation()))).toEqual('The Gospel According to Matthew');
    reading.citation = '1 Cor. 1:1';
    expect(reading.longNameFromBookCode(reading.bookCodeFromAbbrev(reading.abbrevFromCitation()))).toEqual('The First Letter to the Corinthians');
    reading.citation = '2 Kgs 1:1-7';
    expect(reading.longNameFromBookCode(reading.bookCodeFromAbbrev(reading.abbrevFromCitation()))).toEqual('The Second Book of Kings');
    reading.citation = '2 Kgs 1:1-7, 9, 12-14';
    expect(reading.longNameFromBookCode(reading.bookCodeFromAbbrev(reading.abbrevFromCitation()))).toEqual('The Second Book of Kings');
    reading.citation = 'Sir 1:4-2:1';
    expect(reading.longNameFromBookCode(reading.bookCodeFromAbbrev(reading.abbrevFromCitation()))).toEqual('The Wisdom of Ben Sira');
  });

  it("should compile eucharistic intro properly", () => {
    const reading = new BibleReading();

    reading.citation = 'Jn 1:1';
    reading.metadata = {
      intro : new ResponsivePrayer({
        type: 'responsive',
        style: 'responsive',
        value: [
          {
            text: 'The Holy Gospel of Our Lord Jesus Christ, according to ${shortName}.',
            response: 'Glory to you, Lord Christ.'
          }
        ]
      })
    };
    reading.compileIntro();
    expect(reading).toEqual({
      citation: 'Jn 1:1',
      hidden: false,
      metadata: {
        intro: {
          hidden: false,
          type: 'responsive',
          style: 'responsive',
          value: [
            {
              text: 'The Holy Gospel of Our Lord Jesus Christ, according to ${shortName}.',
              response: 'Glory to you, Lord Christ.'
            }
          ]
        },
        compiled_intro: {
          hidden: false,
          style: 'responsive',
          type: 'responsive',
          value: [
            {
              response: 'Glory to you, Lord Christ.',
              text: 'The Holy Gospel of Our Lord Jesus Christ, according to John.'
            }
          ]
        }
      }
    });

    reading.citation = 'Matt 2:4-10';
    reading.compileIntro();
    expect(reading).toEqual({
      citation: 'Matt 2:4-10',
      hidden: false,
      metadata: {
        intro: {
          hidden: false,
          type: 'responsive',
          style: 'responsive',
          value: [
            {
              text: 'The Holy Gospel of Our Lord Jesus Christ, according to ${shortName}.',
              response: 'Glory to you, Lord Christ.'
            }
          ]
        },
        compiled_intro: {
          hidden: false,
          style: 'responsive',
          type: 'responsive',
          value: [
            {
              response: 'Glory to you, Lord Christ.',
              text: 'The Holy Gospel of Our Lord Jesus Christ, according to Matthew.'
            }
          ]
        }
      }
    });
  });

  it("should compile normal office intro properly", () => {
    const reading = new BibleReading();

    reading.citation = 'Wis 1:1-10';
    reading.metadata = {
      intro : new Text({
        type: 'text',
        value: ['A Reading from ${longName}.']
      })
    };
    reading.compileIntro();
    expect(reading).toEqual({
      citation: 'Wis 1:1-10',
      hidden: false,
      metadata: {
        intro: {
          hidden: false,
          type: 'text',
          value: ['A Reading from ${longName}.']
        },
        compiled_intro: {
          hidden: false,
          type: 'text',
          value: ['A Reading from the Wisdom of Solomon.']
        }
      }
    });

    reading.citation = 'Phlm 1-10';
    reading.compileIntro();
    expect(reading).toEqual({
      citation: 'Phlm 1-10',
      hidden: false,
      metadata: {
        intro: {
          hidden: false,
          type: 'text',
          value: ['A Reading from ${longName}.']
        },
        compiled_intro: {
          hidden: false,
          type: 'text',
          value: ['A Reading from the Letter to Philemon.']
        }
      }
    });
  });
});
