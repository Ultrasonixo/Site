// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Importa o Auth
import { getFirestore } from "firebase/firestore"; // Importa o Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMS6X3eheMSYXrN4NZrsg9VWvKrAeNKBo",
  authDomain: "vertexsystemx.firebaseapp.com",
  projectId: "vertexsystemx",
  storageBucket: "vertexsystemx.firebasestorage.app",
  messagingSenderId: "1096405658347",
  appId: "1:1096405658347:web:fc2274c58df13b4b92acae",
  measurementId: "G-4JDW95YQ4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Exporta o Auth
export const db = getFirestore(app); // Exporta o Firestore (db)