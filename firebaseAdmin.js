import * as firebaseAdmin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { cert, getApps } from 'firebase-admin/app';

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from './firebase_secret.json';


if (!getApps().length) {
    firebaseAdmin.initializeApp({
        credential: cert(serviceAccount),
    }, 'adminDB');
}

export const adminDB = getFirestore()