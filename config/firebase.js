import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import "dotenv";

const apiKey = process.env.API_KEY;
const authDomain = process.env.AUTH_DOMAIN;
const projectId = process.env.PROJECT_ID;
const storageBucket = process.env.STORAGE_BUCKET;
const messagingSenderId = process.env.MESSAGING_SENDER_ID;
const appId = process.env.APP_ID;
const measurementId = process.env.MEASUREMENT_ID;

initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

async function verifyUserToken(userToken) {
  return await getAuth().verifyIdToken(userToken);
}

export { verifyUserToken };




