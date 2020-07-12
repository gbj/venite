import * as functions from 'firebase-functions';
import { getBibleText } from '@venite/bible-api';
//import * as admin from 'firebase-admin';

// These were having issues firing, so handling from client side instead

/** Save the user's info in a UserProfile collection on first login */
/*export const saveUserProfile = functions.auth.user().onCreate(async (user) => {
    await admin.firestore().collection('Users').doc(user.uid).set({
        uid: user.uid,
        ... ( user.displayName && { displayName : user.displayName }),
        ... ( user.photoURL && { photoURL : user.photoURL })
    });
});*/

/** Save the user's info in a UserProfile collection on first login */
/*export const deleteUserProfile = functions.auth.user().onDelete(async (user) => {
    await admin.firestore().collection('Users').doc(user.uid).delete();
});*/

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