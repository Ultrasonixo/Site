// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByq_fSZMDF1j8ZKtXXgVYZI5n4cYnOmUI",
  authDomain: "nextsystem-d3cc4.firebaseapp.com",
  projectId: "nextsystem-d3cc4",
  storageBucket: "nextsystem-d3cc4.firebasestorage.app",
  messagingSenderId: "795363833759",
  appId: "1:795363833759:web:2aa0d57306e6edfe8a2faa",
  measurementId: "G-R4FBKFQCSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);