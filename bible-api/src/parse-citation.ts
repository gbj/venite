export function firstVerseOfCitation(citation : string) : { book: string | undefined; chapter: string | undefined; verse: string | undefined; } | undefined {
  const matches = citation.match(/(\d*\s*[a-zA-Z\.]+)\s*(\d+)?:?(\d+)?/);
  if(matches) {
    return { book: matches[1], chapter: matches[2], verse: matches[3] };
  } else {
    return undefined;
  }
}