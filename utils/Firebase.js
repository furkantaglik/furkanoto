import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfcNVpXKrsTaBMb4ZX7Trf0gBU4fNqR20",
  authDomain: "furkanoto-dc778.firebaseapp.com",
  projectId: "furkanoto-dc778",
  storageBucket: "furkanoto-dc778.appspot.com",
  messagingSenderId: "604345084276",
  appId: "1:604345084276:web:ef6133d41ece18e0c46421"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);