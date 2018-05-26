import * as functions from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { EventContext } from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';

export const defaultCardPoints = () => {
    return functions
        .firestore
        .document('cards/{cardId}')
        .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
            const card = snapshot.data();

            return snapshot.ref.set({
                score: 10
            }, { merge: true });
        });
} 
