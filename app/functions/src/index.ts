import * as functions from 'firebase-functions';
import { getBibleText } from '@venite/bible-api';
import { loadText, loadScore } from '@venite/hymnal-api';
import { ldfToDocx } from '@venite/docx';
import { Packer } from 'docx';
import { Readable } from 'stream';
import { addOneDay, dateFromYMD, HolyDay, LiturgicalDay, liturgicalDay, liturgicalWeek, LiturgicalWeek, LiturgicalWeekIndex, transferredFeast } from '@venite/ldf/dist/cjs';
import * as admin from 'firebase-admin';

// Initialize Firestore
admin.initializeApp();
const db = admin.firestore();

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
});

export const calendar = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*'); // CORS allowed

  // Params
  const today = new Date();
  const y = request.query?.y?.toString() ?? today.getFullYear().toString(),
        m = request.query?.m?.toString() ?? (today.getMonth() + 1).toString(),
        d = request.query?.d?.toString() ?? today.getDate().toString(),
        kalendar = request.query?.kalendar?.toString() ?? 'bcp1979',
        evening = request.query?.evening?.toString() === 'true' ? true : false,
        vigil = request.query?.vigil?.toString() === 'true' ? true : false;

  // Firestore Queries
  async function findWeek(weekKalendar : string, query : LiturgicalWeekIndex) : Promise<LiturgicalWeek[]> {
    const weekQuery = await db.collection('LiturgicalWeek')
      .where('kalendar', '==', weekKalendar)
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

  async function findSpecialDays(slug : string) : Promise<HolyDay[]> {
    const days = await db.collection('HolyDay')
      .where('kalendar', 'in', [kalendar, 'bcp1979'])
      .where('slug', '==', slug)
      .get();
    return (days.docs.map(doc => doc.data()) as HolyDay[]).filter(hd => !hd.eve || evening);
  }

  async function findFeastDays(mmdd : string) : Promise<HolyDay[]> {
    const days = await db.collection('HolyDay')
      .where('kalendar', 'in', [kalendar, 'bcp1979'])
      .where('mmdd', '==', mmdd)
      .get();
    return (days.docs.map(doc => doc.data()) as HolyDay[])
      // morning/evening — January 5
      .map(hd => hd.morning && hd.evening
        ? evening ? hd.evening : hd.morning
        : hd
      )
      // original holy days defaulted to rank 3, so if no rank present opt for 3
      .map(hd => hd?.type?.rank ? hd : {...hd, type: { rank: 3 }})
      .filter(hd => !hd.eve || evening);
  }

  // addHolyDays
  /** Find `HolyDay`s connected to either a date or a slug */
  async function addHolyDays(day : LiturgicalDay) : Promise<LiturgicalDay> {
      // generate query from the `LiturgicalDay`
      const date = dateFromYMD(y, m, d),
            isSunday = date.getDay() === 0,
            observedDate = vigil ? addOneDay(date) : date,
            observedM = observedDate.getMonth()+1,
            observedD = observedDate.getDate(),
            feasts = await findFeastDays(`${observedM}/${observedD}`),
            specials = await findSpecialDays(day.slug);
  
      // Thanksgiving Day
      const isNovember = date.getMonth() === 10, // January is 0, Feb 1, etc., so Sept is 8 
        isThursday = date.getDay() === 4, // Sunday is 0, Monday is 1
        nthWeekOfMonth = Math.ceil(date.getDate() / 7),
        thanksgiving = isNovember && isThursday && nthWeekOfMonth == 4 ? await findSpecialDays('thanksgiving-day') : [],
        allHolyDays = (await db.collection('HolyDay').where('kalendar', '==', kalendar).get())
          .docs
          .map(doc => doc.data() as HolyDay)
          .filter(hd => !hd?.type?.rank || hd?.type?.rank > 2)
          // original holy days defaulted to rank 3, so if no rank present opt for 3
          .map(hd => hd?.type?.rank ? hd : {...hd, type: { rank: 3 }}),
        // add transferred feast days
        transferred = await transferredFeast(
          async (dfd : Date) => {
            const week = await findWeek('bcp1979', liturgicalWeek(dfd));
            return liturgicalDay(dfd, kalendar, false, week[0]);
          },
          (slug: string) => Promise.resolve(allHolyDays.find(dd => dd.slug === slug)),
          (dfd : Date) => Promise.resolve(allHolyDays.find(dd => dd.mmdd === `${dfd.getMonth()+1}/${dfd.getDate()}`)),
          date
        );
  
      let holydays = feasts.concat(transferred ? [transferred] : []).concat(specials).concat(thanksgiving);

      console.log('transferred = ', transferred, '\n\nholydays = ', holydays);

      const highestHolyDayRank = Math.max(... holydays.map(holyday => holyday.type?.rank ?? 3));
      if(highestHolyDayRank >= 4) {
        holydays = holydays.filter(holyday => holyday.octave || !holyday.type?.rank || holyday.type?.rank >= highestHolyDayRank);
      } else if(isSunday) {
        holydays = holydays.filter(holyday => holyday.octave || !holyday.type?.rank || holyday.type?.rank >= 4);
      }

      return day.addHolyDays(holydays);
    }

  // Body
  try {
    const date = dateFromYMD(y, m, d),
      weeks = await findWeek('bcp1979', liturgicalWeek(vigil ? addOneDay(date) : date)),
      day = liturgicalDay(vigil ? addOneDay(date) : date, kalendar, evening, weeks[0]),
      dayWithHolyDays = await addHolyDays(day);
    response.set('Cache-Control', 'public, max-age=6048000'); // allow caching for 604,8000 seconds = 7 days
    response.status(200).send(dayWithHolyDays);
  } catch(e) {
    response.status(400).send(`[Error] ${e.toString()}`);
  }
});