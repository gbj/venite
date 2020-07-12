export class BibleReadingVerse {
  book?: string;
  chapter?: string;
  verse?: string;
  text: string;

  constructor(data: Partial<BibleReadingVerse> = {}) {
    Object.assign(this, data);
  }
}
