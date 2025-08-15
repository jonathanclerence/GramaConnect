
import { initializeApp as initAdminApp, cert, getApps as getAdminApps, getApp as getAdminApp } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";

export const firebaseAdminApp =
  getAdminApps().length === 0
    ? initAdminApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      })
    : getAdminApp();

export const adminAuth = getAdminAuth(firebaseAdminApp);
export const adminDb = getAdminFirestore(firebaseAdminApp);