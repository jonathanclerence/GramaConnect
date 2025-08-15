// lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Make sure these are prefixed with NEXT_PUBLIC_ so they can be used client-side
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Initialize once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Export things so you can import them elsewhere
export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
