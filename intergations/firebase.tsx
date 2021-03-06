import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAa9YACFwWSWt4tJVeWwBXx-0i0LreL70Q',
  authDomain: 'nemo-mega.firebaseapp.com',
  projectId: 'nemo-mega',
  storageBucket: 'nemo-mega.appspot.com',
  messagingSenderId: '563076820236',
  appId: '1:563076820236:web:23e55aa37073d5ec6bad29',
  measurementId: 'G-T9RDWNYG8M',
};

export const app = initializeApp(firebaseConfig);
// https://firebase.google.com/docs/storage/web/start
export const storage = getStorage(app);
// https://firebase.google.com/docs/firestore/quickstart#web-version-9_1
export const db = getFirestore();
// https://firebase.google.com/docs/auth/web/start
export const auth = getAuth();
