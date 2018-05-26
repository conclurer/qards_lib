import * as functions from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { EventContext } from 'firebase-functions';

export function defaultCardPoints() {
    return functions
        .firestore
        .document('cards/{cardId}')
        .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
            console.log('Update Score On Create', snapshot.data().score);
            return snapshot.ref.set({
                score: 10
            }, { merge: true });
        });
} 
