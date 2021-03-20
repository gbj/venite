import { Book } from './book';
import { BOOKS } from './books';
import { jaro } from 'jaro-winkler-typescript';

export type BibleReferenceQuery = {
  book: Book | null;
  chapter: number | null;
  verse: number | null;
};

export type BibleReferenceRange = {
  start: BibleReferenceQuery;
  end: BibleReferenceQuery | null;
};

export function parseReference(reference: string): BibleReferenceRange[] {
  const list = [];
  let prev: BibleReferenceRange | null = null;
  for (let part of reference.split(/[,;]/)) {
    const current = parseSingleReference(part, prev);
    list.push(current);
    prev = current;
  }
  return list;
}

function parseSingleReference(reference: string, previous: BibleReferenceRange | null): BibleReferenceRange {
  let range_pieces = reference.split('-');
  const first_half = range_pieces[0];
  const second_half = range_pieces[1];

  const start_partial_structure = previous !== null;

  const BLANK_REF = { book: null, chapter: null, verse: null };

  const start = first_half
    ? queryFromRe(first_half, /([\d\s]*[\w\.]+)\s*(\d+)?:?(\d+)?/, start_partial_structure, null) ?? { ...BLANK_REF }
    : { ...BLANK_REF };

  // fill out the start of the range with the details of the end of the previous range
  // e.g., 1 Tim. 4:1-3, 4-6 will fill out with 1 Tim., chapter 4
  const previous_end = previous?.end || null;

  const augmented_start = fillOut(start, previous_end);

  const end = second_half ? queryFromRe(second_half, /([\d\s]*[\w\.]+)\s*(\d+)?:?(\d+)?/, true, augmented_start) : null;

  return {
    start: augmented_start || start,
    end,
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
  let final_query = query;

  // if template provided, fill out query as needed
  return {
    book: query?.book || template?.book || null,
    chapter: query?.chapter || template?.chapter || null,
    verse: query?.verse || template?.verse || null,
  };
}

// Use Jaro-algorithm string-similarities to determine book name
function book_name_to_book(book_name: string): Book | null {
  const scores = BOOKS.map(([key]) => jaro(key, book_name, { caseSensitive: false })),
    highest = Math.max(...scores),
    indexOfHighest = scores.indexOf(highest),
    [, book] = BOOKS[indexOfHighest];

  return book;
}
