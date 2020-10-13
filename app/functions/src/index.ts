import * as functions from 'firebase-functions';
import { getBibleText } from '@venite/bible-api';
import { loadText, loadScore } from '@venite/hymnal-api';

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
      response.status(400).send(e.toString());
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