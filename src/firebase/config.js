import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAj1DHqwtpolYxIsynvfkatsbVp7hdkDfM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eternalia-511c9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eternalia-511c9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eternalia-511c9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "48772909986",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:48772909986:web:d3f73a98622079706dc0fb",
};

// Check if valid Firebase configuration is provided
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
