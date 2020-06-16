import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/** Save the user's info in a UserProfile collection on first login */
export const saveUserProfile = functions.auth.user().onCreate((user) => {
    admin.firestore().collection('Users').doc(user.uid).set({
        uid: user.uid,
        ... ( user.displayName && { displayName : user.displayName }),
        ... ( user.photoURL && { photoURL : user.photoURL }),
        organizations: []
    });
});

/** Save the user's info in a UserProfile collection on first login */
export const deleteUserProfile = functions.auth.user().onDelete((user) => {
    admin.firestore().collection('Users').doc(user.uid).delete();
});