import * as functions from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { EventContext } from 'firebase-functions';

export function backToPool() {
  return functions.firestore
    .document('cards/{cardId}')
    .onUpdate(
      (change: functions.Change<DocumentSnapshot>, context: EventContext) => {
        // Retrieve the current and previous value
        const card = change.after.data();
        const previousCard = change.before.data();

        if (!card.holderId && previousCard.holderId) {
            return change.after.ref.set(
            {
                score: calcDecrease(card.score)
            },
            { merge: true }
            );
        }
        else
            return change.after.ref.get();
      }
    );
}

function calcDecrease(score: number): number {
    let internalScore = score;
    let decreasable = Math.round(score / 100);
    decreasable = decreasable < 1 ? 1 : decreasable;
    internalScore =+ decreasable;
    return internalScore;
}
