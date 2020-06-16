import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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