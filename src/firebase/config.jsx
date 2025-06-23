// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCxGwz3PxUbUFID76Y0hRxoWoSeAF8YR0w",
  authDomain: "eur-africa.firebaseapp.com",
  projectId: "eur-africa",
  storageBucket: "eur-africa.firebasestorage.app",
  messagingSenderId: "693963893811",
  appId: "1:693963893811:web:eeaef8b45b5c009806c746"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider(app)

export {auth, db, storage, provider}