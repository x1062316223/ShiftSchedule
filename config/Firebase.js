import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBw5nxNrUPWjbFsFdLl0-MxsqHgZ06uZ7M',
  authDomain: 'okmcross.firebaseapp.com',
  databaseURL: 'https://okmcross.firebaseio.com',
  projectId: 'okmcross',
  storageBucket: 'okmcross.appspot.com',
  messagingSenderId: '1019401245134',
  appId: '1:1019401245134:web:03e43165c9ed6f02',
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default Firebase;
