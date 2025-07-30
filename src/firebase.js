import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Hardcoded configuration (temporarily)
const firebaseConfig = {
  apiKey: "AIzaSyABCD...", // Replace with your actual API key
  authDomain: "travelrisk-f7a20.firebaseapp.com",
  databaseURL: "https://travelrisk-f7a20-default-rtdb.firebaseio.com", // Must match exactly
  projectId: "travelrisk-f7a20",
  storageBucket: "travelrisk-f7a20.appspot.com",
  messagingSenderId: "1234567890", // Replace with yours
  appId: "1:1234567890:web:abcd1234..." // Replace with yours
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Debugging line - check your console
console.log("Firebase initialized with:", firebaseConfig.databaseURL);

export { database, auth };