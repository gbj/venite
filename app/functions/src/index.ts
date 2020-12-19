import * as functions from 'firebase-functions';
import { getBibleText } from '@venite/bible-api';
import { loadText, loadScore } from '@venite/hymnal-api';
import { ldfToDocx } from '@venite/docx';
import { Packer } from 'docx';
import { Readable } from 'stream';
import { addOneDay, dateFromYMD, liturgicalDay, liturgicalWeek, LiturgicalWeek, LiturgicalWeekIndex } from '@venite/ldf/dist/cjs';
import * as admin from 'firebase-admin';

export const bible = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*'); // CORS allowed

  const citation = request.query?.citation?.toString(),
        version = request.query?.version?.toString();
  if(citation && version) {
    try {
      const reading = await getBibleText(citation, version);
      if(reading?.value?.length > 0) {
        response.set('Cache-Control', 'public, max-age=2592000'); // allow caching for 2,592,000 seconds = 30 days
        response.status(200).send(reading);
      } else {
        response.status(404).send(`${citation} (${version}) not found.`)
      }
    } catch(e) {
      response.status(400).send(`[Error] ${e.toString()}`);
    }
  } else {
    response.status(400).send("'Citation' and 'Version' parameters are required.")
  }
});

export const hymnText = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*'); // CORS allowed

  const url = request.query?.url?.toString();

  if(url) {
    try {
      const text = await loadText(url);
      if(text?.length > 0) {
        response.set('Cache-Control', 'public, max-age=2592000'); // allow caching for 2,592,000 seconds = 30 days
        response.status(200).send(text);
      } else {
        response.status(404).send(`Text at '${URL}' not found.`)
      }
    } catch(e) {
      response.status(400).send(e.toString());
    }
  } else {
    response.status(400).send("'URL' parameter is required.")
  }
});

export const hymnImages = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*'); // CORS allowed

  const url = request.query?.url?.toString();

  if(url) {
    try {
      const urls = await loadScore(url);
      if(urls?.length > 0) {
        response.set('Cache-Control', 'public, max-age=2592000'); // allow caching for 2,592,000 seconds = 30 days
        response.status(200).send(urls);
      } else {
        response.status(404).send(`Page scans at '${URL}' not found.`)
      }
    } catch(e) {
      response.status(400).send(e.toString());
    }
  } else {
    response.status(400).send("'URL' parameter is required.")
  }
});

export const docx = functions.https.onRequest(async(request, response) => {
  response.set('Access-Control-Allow-Origin', '*'); // CORS allowed
  response.set('Accept', 'application/json');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  console.log(request.body);

  const dto = request.body,
    doc = dto.doc,
    settings = dto.settings;

  // build the data
  const file = await ldfToDocx(doc, settings),
    buffer = await Packer.toBuffer(file);

  // stream the data
  const stream : Readable = new Readable();
  stream.push(buffer);
  stream.push(null);
  response.set({
    'Content-Length': buffer.length
  });
  stream.pipe(response);
})

export const calendar = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*'); // CORS allowed

  // Initialize Firestore
  admin.initializeApp();
  const db = admin.firestore();

  // Params
  const today = new Date();
  const y = request.query?.y?.toString() ?? today.getFullYear().toString(),
        m = request.query?.m?.toString() ?? (today.getMonth() + 1).toString(),
        d = request.query?.d?.toString() ?? today.getDate().toString(),
        kalendar = request.query?.kalendar?.toString() ?? 'bcp1979',
        evening = request.query?.evening?.toString() === 'false' ? false : true,
        vigil = request.query?.vigil?.toString() === 'false' ? false : true;

  // findWeek
  async function findWeek(kalendar : string, query : LiturgicalWeekIndex) : Promise<LiturgicalWeek[]> {
    const weekQuery = await db.collection('LiturgicalWeek')
      .where('kalendar', '==', kalendar)
      .where('cycle', '==', query.cycle)
      .where('week', '==', query.week)
      .get();
    const weeks = weekQuery.docs
      .map(doc => doc.data() as LiturgicalWeek)
      .map(week => query.proper ?
        new LiturgicalWeek({
          ... week,
          proper: query.proper,
          propers: `proper-${query.proper}`
        }) :
        week);
    return weeks;
  }

  // Body
  try {
    const date = dateFromYMD(y, m, d),
      weeks = await findWeek('bcp1979', liturgicalWeek(vigil ? addOneDay(date) : date)),
      day = liturgicalDay(vigil ? addOneDay(date) : date, kalendar, evening, weeks[0]);
      //response.set('Cache-Control', 'public, max-age=2592000'); // allow caching for 2,592,000 seconds = 30 days
    response.status(200).send(day);
  } catch(e) {
    response.status(400).send(`[Error] ${e.toString()}`);
  }
});