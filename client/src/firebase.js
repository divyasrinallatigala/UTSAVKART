// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS1rUO5NpYsGlv-keRAMaTwvG8808Xgss",
  authDomain: "utsavkart-cd117.firebaseapp.com",
  projectId: "utsavkart-cd117",
  storageBucket: "utsavkart-cd117.firebasestorage.app",
  messagingSenderId: "45067802074",
  appId: "1:45067802074:web:a67b27a5cd68a998fedce3",
  measurementId: "G-4T0XVJZ7XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);