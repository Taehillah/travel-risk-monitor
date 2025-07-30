import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdY3L6C890gDPS3tANwkHpmorScqLBLTM",
    authDomain: "travelrisk-f7a20.firebaseapp.com",
    databaseURL: "https://travelrisk-f7a20-default-rtdb.firebaseio.com",
    projectId: "travelrisk-f7a20",
    storageBucket: "travelrisk-f7a20.firebasestorage.app",
    messagingSenderId: "190555059017",
    appId: "1:190555059017:web:ce3d4b21257e8c40ad2098",
    measurementId: "G-E0F7WG17WQ"
  };
// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

console.log("Firebase auth initialized:", auth); // Debug line

export { database, auth };