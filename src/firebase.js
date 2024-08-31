// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0OnKznpWhNeltd5sPD-LwRjYHeJB6C0U",
  authDomain: "coursebook-daacc.firebaseapp.com",
  projectId: "coursebook-daacc",
  storageBucket: "coursebook-daacc.appspot.com",
  messagingSenderId: "597161491978",
  appId: "1:597161491978:web:d56e26a68d91e0865d69f3",
  measurementId: "G-Q8E33S1PTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export { db, collection, getDocs, addDoc, auth };
