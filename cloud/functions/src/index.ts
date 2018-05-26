// import * as functions from 'firebase-functions';
import { defaultCardPoints } from './firestore-trigger/default-card-points';
import { backToPool } from './firestore-trigger/back-to-pool';
import { keptByUser } from './firestore-trigger/kept-by-user';
import { addDistanceScore } from './firestore-trigger/add-distance-score';

// Function registration
export const cardPointsOnCreate = defaultCardPoints();
export const cardBackToPool = backToPool();
export const cardKeptByUser = keptByUser();
export const cardAddDistanceScore = addDistanceScore();
