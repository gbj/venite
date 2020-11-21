import { BibleReading } from "@venite/ldf";

export async function fetchReading(
  citation : string,
  version : string = 'NRSV',
  api : string = 'https://us-central1-venite-2.cloudfunctions.net'
) : Promise<BibleReading> {
  const findURL = new URL(`${api}/bible`);
  findURL.searchParams.append('citation', citation);

  if(!['NRSV', 'NRSVAE', 'ESV', 'CEB', 'KJV'].includes(version)) {
    findURL.searchParams.append('version', 'NRSV');
  } else {
    findURL.searchParams.append('version', version);
  }

  const response = await fetch(findURL.toString()),
    body = await response.text();
  try {
    return JSON.parse(body);
  } catch {
    throw new Error(body);
  }

}