import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBDA4pcBnyxptN04UDxIBg32yjFmghnrt0',
  authDomain: 'space-892c9.firebaseapp.com',
  projectId: 'space-892c9',
  storageBucket: 'space-892c9.appspot.com',
  messagingSenderId: '266387399571',
  appId: '1:266387399571:web:05841635cebeacbf2efe66',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
