import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBIWP9i6Cdkoa-3wC9mAUtpz7pJ8qlsqao',
  authDomain: 'video-b9eb2.firebaseapp.com',
  projectId: 'video-b9eb2',
  storageBucket: 'video-b9eb2.appspot.com',
  messagingSenderId: '986152142824',
  appId: '1:986152142824:web:f781310e1ee73b575f065d',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
