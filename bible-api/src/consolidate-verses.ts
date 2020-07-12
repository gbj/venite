import { BibleReadingVerse, BibleReading, Heading } from "@venite/ldf";

export function consolidateVerses(verses : BibleReadingVerse[][]) : (BibleReadingVerse | Heading)[] {
  let existingVerses : { [ref: string]: BibleReadingVerse } = {},
      consolidated : (BibleReadingVerse | Heading)[] = new Array();
  
  verses.forEach((section, sectionIndex) => {
    // handle each verse within section
    section.forEach(verse => {
      const ref = `${verse.book}-${verse.chapter}-${verse.verse}`;
      // if the verse has not been encountered before, add it to `consolidated` and to `existingVerses`
      if(!existingVerses[ref]) {
        existingVerses[ref] = new BibleReadingVerse(verse);
      } else {
        const previousVersionOfVerse = existingVerses[ref],
              previousText = previousVersionOfVerse.text,
              newVersionOfVerse = new BibleReadingVerse({
          ... previousVersionOfVerse,
          text: previousText + verse.text
        });
        existingVerses[ref] = newVersionOfVerse;
      }
    });
    // push onto consolidated array
    consolidated = consolidated.concat(Object.values(existingVerses));
    existingVerses = {};
    // if there's another section to follow, add a `Heading` section break
    if(sectionIndex + 1 < verses.length) {
      consolidated.push(new Heading({ type: 'heading', value: ['']}));
    }
  });

  /*const verseTree = verses.reduce((accumulator, currentVerse) => {
    const ref = `${currentVerse.book}-${currentVerse.chapter}-${currentVerse.verse}`;
    if(accumulator[ref] === undefined) {
      return ({ ... accumulator, [ref]: currentVerse })
    } else {
      const previousVersionOfVerse = accumulator[ref],
            newText = previousVersionOfVerse.text + currentVerse.text;
      return ({ ... accumulator, [ref]: { ... previousVersionOfVerse, text: newText } });
    }
  }, {} as { [x: string]: BibleReadingVerse});*/

  return consolidated;

  //return Object.values(verseTree);
}