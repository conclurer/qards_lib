import * as functions from 'firebase-functions';
import {
  DocumentSnapshot,
  QuerySnapshot,
  WriteResult
} from '@google-cloud/firestore';
import { EventContext } from 'firebase-functions';
import * as admin from 'firebase-admin';

export function addDistanceScore() {
  // Get current created card
  return functions.firestore
    .document('cards/{cardId}')
    .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
      // Get all cards from database
      return getCards()
        .then((snapshots: QuerySnapshot) => {
          // Creating array of distances to newly created card
          return calculatingDistances(snapshot.data(), snapshots).sort(
            (a, b) => {
              if (a.distance > b.distance) return 1;
              else return -1;
            }
          )[0];
        })
        .then(distance => {
          const additionalScore = Math.round(distance.distance / 10);

          return snapshot.ref.set(
            {
              score: snapshot.data().score + additionalScore
            },
            { merge: true }
          );
        });
    });
}

function getCards(): Promise<QuerySnapshot> {
  return admin
    .firestore()
    .collection('cards')
    .get();
}

function calculatingDistances(
  newCard: any,
  snapshots: QuerySnapshot
): Array<{ distance: number; cardId: string }> {
  const distances: Array<{ distance: number; cardId: string }> = [];
  snapshots.forEach((snapshot: DocumentSnapshot) => {
    const card = snapshot.data();
    const distance = calcDistance(
      newCard.location[0],
      newCard.location[1],
      card.location[0],
      card.location[1]
    );
    distances.push({ distance, cardId: snapshot.id });
  });

  return distances;
}

function calcDistance(lat1, lon1, lat2, lon2, unit = 'K'): number {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}
