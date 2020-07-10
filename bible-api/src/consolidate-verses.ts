import { BibleReadingVerse } from "@venite/ldf";

export function consolidateVerses(verses : BibleReadingVerse[]) : BibleReadingVerse[] {
  const verseTree = verses.reduce((accumulator, currentVerse) => {
    const ref = `${currentVerse.book}-${currentVerse.chapter}-${currentVerse.verse}`;
    if(accumulator[ref] === undefined) {
      return ({ ... accumulator, [ref]: currentVerse })
    } else {
      const previousVersionOfVerse = accumulator[ref],
            newText = previousVersionOfVerse.text + currentVerse.text;
      return ({ ... accumulator, [ref]: { ... previousVersionOfVerse, text: newText } });
    }
  }, {} as { [x: string]: BibleReadingVerse});

  return Object.values(verseTree);
}