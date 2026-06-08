import "server-only";
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firebase project id is fixed for this app (matches config/firebase.ts).
const PROJECT_ID = "atl-thrones";

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length) return existing[0];

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  return initializeApp({
    credential: cert({
      projectId: PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

export const db = getFirestore(getAdminApp());
