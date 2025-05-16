// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(import.meta.env.VITE_API_KEY)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "meme-auth-e5c02.firebaseapp.com",
  projectId: "meme-auth-e5c02",
  storageBucket: "meme-auth-e5c02.firebasestorage.app",
  messagingSenderId: "493040292708",
  appId: "1:493040292708:web:aef7dc7952c2df3fbee071",
  measurementId: "G-N99PLEF2PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);