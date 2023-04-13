import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsF-gpFfrwMYDXmHJ2aqwQKEZzZpY7LNI",
  authDomain: "bug-tracker-f2c07.firebaseapp.com",
  projectId: "bug-tracker-f2c07",
  storageBucket: "bug-tracker-f2c07.appspot.com",
  messagingSenderId: "928940604402",
  appId: "1:928940604402:web:91e23ef3cddd9c9aee096b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);