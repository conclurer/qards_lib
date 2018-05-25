import firebase from 'firebase';

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyCImdXAWeemOuql0-VJBY-WqNMi_jHbl-M',
  authDomain: 'qards-4d673.firebaseapp.com',
  databaseURL: 'https://qards-4d673.firebaseio.com',
  projectId: 'qards-4d673',
  storageBucket: 'qards-4d673.appspot.com',
  messagingSenderId: '731957978362'
});
export default app;
export * from './authentication';
export * from './storage';
