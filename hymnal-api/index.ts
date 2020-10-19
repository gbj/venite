import { requestHTML, HTMLElement } from '@venite/http';

export type Hymn = {
  number: string;
  title: string;
  tune: string | null; 
  textUrl: string | null;
  imageUrl: string | null;
}

function range(size : number, startAt : number = 0) : number[] {
  return [...Array(size).keys()].map(i => i + startAt);
}

export async function buildHymnaryIndices(hymnal : string, pages : number) : Promise<Hymn[]> {
  return buildIndex(
    range(pages).map(pageNumber => `https://hymnary.org/hymnal/${hymnal}?page=${pageNumber}`)
  );
}

export async function buildIndex(urls : string[]) : Promise<Hymn[]> {
  const requests = await Promise.all(urls.map(async url => {
    const resp = await requestHTML(url);
    return indexFromPage(url, resp);
  }));
  return requests.flat();
}

/** Takes a page of hymn index listings and returns metadata */
export function indexFromPage(url : string, page : HTMLElement) : Hymn[] {
  const baseUrl = new URL(url);

  return Array.from(page.querySelectorAll('.content table .result-row'))
    .slice(3) // remove metadata from a different table that appears in query result
    .map(row => {
      const number = row.childNodes[0].innerText || '',
        title = row.childNodes[1].innerText || '',
        tune = row.childNodes[2].innerText !== `[${title}]` ? row.childNodes[2].innerText : null,
        textTd = row.childNodes[5],
        textUrl = textTd instanceof HTMLElement ? textTd.querySelector('a')?.getAttribute('href') || null : null,
        //.querySelector('a')?.getAttribute('href') || null,
        imageTd = row.childNodes[7],
        imageUrl = imageTd instanceof HTMLElement ? imageTd.querySelector('a')?.getAttribute('href') || null : null;
      return {
        number,
        title,
        tune,
        textUrl: textUrl ? `${baseUrl.origin}${textUrl}` : null,
        imageUrl: imageUrl ? `${baseUrl.origin}${imageUrl} : null`
      };
    })
}

/** Takes a text/detail page from Hymnary and gives an array of string paragraphgs of hymn text
 * e.g., https://hymnary.org/hymn/EH1982/707?media=text */
export async function loadText(url : string) : Promise<string[]> {
  const resp = await requestHTML(url);
  return Array.from(resp.querySelectorAll('#text p')).map(p => p.innerText);
}

/** Takes a text/detail page from Hymnary and gives an array of image URLs of the music
 * e.g., https://hymnary.org/hymn/EH1982/707?media=text */
export async function loadScore(url : string) : Promise<string[]> {
  const baseUrl = new URL(url),
        resp = await requestHTML(url);
  return Array.from(resp.querySelectorAll('#score img'))
    .map(img => (img.getAttribute('src') || '').replace('low', 'high'))
    .map(path => path ? `${baseUrl.origin}${path}` : '')
    .filter(url => url);
}