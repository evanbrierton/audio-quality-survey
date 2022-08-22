import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB-42fPtrT_lwEh6XADtbbTlrfSLtCMlcY',
  authDomain: 'audio-quality-survey.firebaseapp.com',
  projectId: 'audio-quality-survey',
  storageBucket: 'audio-quality-survey.appspot.com',
  messagingSenderId: '240310143641',
  appId: '1:240310143641:web:968706ddde3d14e9818608',
  measurementId: 'G-H38XKP5JTP',
};

initializeApp(firebaseConfig);

export const firestore = getFirestore();
