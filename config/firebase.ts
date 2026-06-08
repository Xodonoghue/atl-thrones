// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB74oLNtklprDYGDWpuk3a4roRQgDaZGVk",
  authDomain: "atl-thrones.firebaseapp.com",
  projectId: "atl-thrones",
  storageBucket: "atl-thrones.firebasestorage.app",
  messagingSenderId: "749049221259",
  appId: "1:749049221259:web:09a663d47241d646d3c48e",
  measurementId: "G-QQ8WZHLSD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);