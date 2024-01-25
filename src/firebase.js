// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXhWtOZ5QrrGtoDQ8PkLpdrzdee7Ls9cQ",
  authDomain: "reactwithfirebase-a3bb7.firebaseapp.com",
  databaseURL: "https://reactwithfirebase-a3bb7-default-rtdb.firebaseio.com",
  projectId: "reactwithfirebase-a3bb7",
  storageBucket: "reactwithfirebase-a3bb7.appspot.com",
  messagingSenderId: "343772183739",
  appId: "1:343772183739:web:29efdb6dac6b532bc4bd9e",
  measurementId: "G-8N75XCBEMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
export default db;
