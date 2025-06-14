// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase config (replace with your actual config)
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

// Export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);
