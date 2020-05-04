import { BibleReadingVerse } from '@venite/ldf';

export class BibleReadingServiceController {
  async find(
    citation : string,
    version : string = 'NRSV',
    api : string = 'https://www.venite.app/api'
  ) : Promise<BibleReadingVerse[]> {
    const findURL = new URL(`${api}/bible`);
    findURL.searchParams.append('citation', citation);
    findURL.searchParams.append('version', version);

    const response = await fetch(findURL.toString());
    const json = await response.json();

    return json.verses.flat();
  }
}

export const BibleReadingService = new BibleReadingServiceController();
