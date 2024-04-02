// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC6QRZqTYcJKmlfZk2R9HFnqmq0gIPz30",
  authDomain: "blogbyredsols.firebaseapp.com",
  projectId: "blogbyredsols",
  storageBucket: "blogbyredsols.appspot.com",
  messagingSenderId: "1063523743097",
  appId: "1:1063523743097:web:0a48d37d85886a0009aba8",
  measurementId: "G-KZ56NVRBEB",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
