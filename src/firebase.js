import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web config keys are public identifiers; access is enforced by firestore.rules.
const app = initializeApp({
  apiKey: "AIzaSyDlr-v-kaMhzBiiXjJhCLE1qqFiVdzVVu0",
  authDomain: "travelsite-4f1ae.firebaseapp.com",
  projectId: "travelsite-4f1ae",
  storageBucket: "travelsite-4f1ae.firebasestorage.app",
  messagingSenderId: "611962886031",
  appId: "1:611962886031:web:ff2fac54f0d21aead19dfa",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
