// import * as functions from 'firebase-functions';
import { defaultCardPoints } from './firestore-trigger/default-card-points';
import { backToPool } from './firestore-trigger/back-to-pool';
// import { DocumentSnapshot } from '@google-cloud/firestore';
// import { EventContext } from 'firebase-functions';

// Function registration
export const cardPointsOnCreate = defaultCardPoints();
export const cardBackToPool = backToPool();
