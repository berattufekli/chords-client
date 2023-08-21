// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBlGSRZ_mDuS-tsQNicRn1Znj7D6h9X_GQ",
  authDomain: "chords-1fa02.firebaseapp.com",
  projectId: "chords-1fa02",
  storageBucket: "chords-1fa02.appspot.com",
  messagingSenderId: "1082388642522",
  appId: "1:1082388642522:web:a551df149362de6f2b03e3",
  measurementId: "G-7C27QGNQZ5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication nesnesi
const db = getFirestore(app); // Firebase Firestore nesnesi

export { auth, db, firebaseConfig }; 