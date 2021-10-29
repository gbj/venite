import { Book } from './book';
import { BOOKS } from './books';
import { findBestMatch } from 'string-similarity';

export type BibleReferenceQuery = {
  book: Book | null;
  chapter: number | null;
  verse: number | null;
};

export type BibleReferenceRange = {
  start: BibleReferenceQuery;
  end: BibleReferenceQuery | null;
  bracketed?: boolean | undefined;
};

export function parseReference(reference: string): BibleReferenceRange[] {
  let list = [];
  let prev: BibleReferenceRange | null = null;
  let bracketOpened: boolean = false;
  for (let part of reference.split(/([,;\[\]\(\)])/)) {
    const trimmed = part.trim();
    if (['', ',', ';', '[', ']', '(', ')'].includes(trimmed)) {
      if (trimmed == '[' || trimmed == '(') {
        bracketOpened = true;
      } else if (trimmed == ']' || trimmed == ')') {
        bracketOpened = false;
      }
    } else {
      const current = parseSingleReference(part, prev, bracketOpened);
      list.push(current);
      prev = current;
    }
  }

  // handle citations like 1 Cor. 13:[1-3]4-13
  if (list[0]?.start?.verse == null && list[1]?.bracketed) {
    list = [
      {
        start: {
          book: list[1].start.book ?? list[0].start.book ?? null,
          chapter: list[1].start.chapter ?? list[0].start.chapter ?? null,
          verse: list[1].start.verse ?? list[0].start.verse ?? null,
        },
        end: {
          book: list[1]?.end?.book ?? list[0]?.end?.book ?? list[1]?.start?.book ?? list[0]?.start?.book ?? null,
          chapter:
            list[1]?.end?.chapter ??
            list[0]?.end?.chapter ??
            list[1]?.start?.chapter ??
            list[0]?.start?.chapter ??
            null,
          verse: list[1]?.end?.verse ?? list[0]?.end?.verse ?? list[1]?.start?.verse ?? list[0]?.start?.verse ?? null,
        } as BibleReferenceQuery,
        bracketed: true,
      },
      ...list.slice(2),
    ];
  }

  return list;
}

function parseSingleReference(
  reference: string,
  previous: BibleReferenceRange | null,
  bracketed: boolean,
): BibleReferenceRange {
  let range_pieces = reference.split('-');
  const first_half = range_pieces[0];
  const second_half = range_pieces[1];

  const start_partial_structure = previous !== null;

  const BLANK_REF = { book: null, chapter: null, verse: null };

  const start = first_half
    ? queryFromRe(first_half, /([\d\s]*[\w\.]+[a-zA-Z\s]*)\s*(\d+)?:?(\d+)?/, start_partial_structure, null) ?? {
        ...BLANK_REF,
      }
    : { ...BLANK_REF };

  // fill out the start of the range with the details of the end of the previous range
  // e.g., 1 Tim. 4:1-3, 4-6 will fill out with 1 Tim., chapter 4
  const previous_end = previous?.end || null;

  const augmented_start = fillOut(start, previous_end);

  const end = second_half ? queryFromRe(second_half, /([\d\s]*[\w\.]+)\s*(\d+)?:?(\d+)?/, true, augmented_start) : null;

  return {
    start: augmented_start || start,
    end,
    bracketed: bracketed ? true : undefined,
  };
}

function queryFromRe(
  reference: string,
  re: RegExp,
  partial_structure: boolean,
  template: BibleReferenceQuery | null,
): BibleReferenceQuery | null {
  let query: BibleReferenceQuery | null = null;
  const parts = reference.trim().match(re);

  if (partial_structure) {
    if (parts) {
      // book, chapter, and verse matched
      if (parts[1] && parseInt(parts[2]) && parseInt(parts[3])) {
        query = { book: book_name_to_book(parts[1]), chapter: parseInt(parts[2]), verse: parseInt(parts[3]) };
      }
      // chapter and verse matched
      else if (parseInt(parts[1]) && !parts[2] && parseInt(parts[3])) {
        query = { book: null, chapter: parseInt(parts[1]), verse: parseInt(parts[3]) };
      } else if (parseInt(parts[1]) && parseInt(parts[2]) && !parts[3]) {
        query = { book: null, chapter: parseInt(parts[1]), verse: parseInt(parts[2]) };
      }
      // verse only
      else if (parseInt(parts[1]) && !parts[2] && !parts[3]) {
        query = { book: null, chapter: null, verse: parseInt(parts[1]) };
      }
    } else {
      query = null;
    }
  } else {
    const matches = reference.trim().match(re) || [];
    query = {
      book: book_name_to_book(matches[1]),
      chapter: parseInt(matches[2]),
      verse: parseInt(matches[3]),
    };
  }

  return fillOut(query, template);
}

function fillOut(query: BibleReferenceQuery | null, template: BibleReferenceQuery | null): BibleReferenceQuery | null {
  // if template provided, fill out query as needed
  return {
    book: query?.book || template?.book || null,
    chapter: query?.chapter || template?.chapter || null,
    verse: query?.verse || template?.verse || null,
  };
}

export function book_name_to_book(book_name: string): Book | null {
  const { bestMatch } = findBestMatch(
    book_name,
    BOOKS.map(([abbrev]) => abbrev),
  );
  const book = BOOKS.find(([abbrev]) => abbrev === bestMatch.target);
  return book ? book[1] : null;
}
