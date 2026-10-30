// -------------------------------------------------------------------------
// Firebase client initialisation.
//
// Reads configuration from NEXT_PUBLIC_FIREBASE_* environment variables
// (set them in .env.local before `npm run dev` / `npm run build`).
// If no config is present, the site still works and renders the built-in
// default content; the admin panel and live Firestore content simply stay
// disabled until you add your config.
// -------------------------------------------------------------------------

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase is considered "ready" only when a project id and api key exist.
export const firebaseReady = Boolean(config.apiKey && config.projectId);

let app = null;
let db = null;
let auth = null;
let storage = null;

if (firebaseReady) {
  app = getApps().length ? getApp() : initializeApp(config);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
}

export { app, db, auth, storage };
