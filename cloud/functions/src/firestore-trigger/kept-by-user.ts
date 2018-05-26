import * as functions from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { EventContext } from 'firebase-functions';

export function keptByUser() {
  return functions.firestore
    .document('cards/{cardId}')
    .onUpdate(
      (change: functions.Change<DocumentSnapshot>, context: EventContext) => {
        // Retrieve the current and previous value
        const card = change.after.data();
        const previousCard = change.before.data();

        if (card.holderId && !previousCard.holderId) {
            return change.after.ref.set(
            {
                score: calcIncrease(card.score)
            },
            { merge: true }
            );
        }
        else
            return change.after.ref.get();
      }
    );
}

function calcIncrease(score: number): number {
    let internalScore = score;
    internalScore =+ (score / 2);
    return internalScore;
}
