import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import config from './config'
const firebaseConfig = {
  apiKey:config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGE_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);