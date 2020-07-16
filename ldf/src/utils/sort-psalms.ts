import { Psalm, PsalmSection } from '../psalm';

export function sortPsalms(a: Psalm, b: Psalm): number {
  function firstVerse(psalm: Psalm): number {
    const firstSection = psalm.value[0] || new PsalmSection(),
      firstVerse = firstSection.value[0],
      firstNumber = firstVerse?.number;
    return Number(firstNumber) || 0;
  }

  const sortByNum = Number(a?.metadata?.number) - Number(b?.metadata?.number);
  let sortByVerse: number | undefined = undefined;
  // if psalms are same number, sort by
  if (sortByNum === 0) {
    const firstVerseOfA = firstVerse(a),
      firstVerseOfB = firstVerse(b);
    sortByVerse = firstVerseOfA - firstVerseOfB;
  }
  return sortByVerse || sortByNum;
}
