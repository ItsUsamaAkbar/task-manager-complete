import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4XieIs00nQW_cJPQpfV5NcAGMl7uUPv8',
  authDomain: 'task-fe636.firebaseapp.com',
  projectId: 'task-fe636',
  storageBucket: 'task-fe636.appspot.com',
  messagingSenderId: '763864773279',
  appId: '1:763864773279:web:061f8e81e6ab776a0a28aa',
};
const fireapp = initializeApp(firebaseConfig);
export const auth = getAuth(fireapp);
export const db = getFirestore(fireapp);
