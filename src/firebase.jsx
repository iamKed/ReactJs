// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore/lite";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyCXhWtOZ5QrrGtoDQ8PkLpdrzdee7Ls9cQ",
  authDomain: "reactwithfirebase-a3bb7.firebaseapp.com",
  projectId: "reactwithfirebase-a3bb7",
  storageBucket: "reactwithfirebase-a3bb7.appspot.com",
  messagingSenderId: "343772183739",
  appId: "1:343772183739:web:29efdb6dac6b532bc4bd9e",
  measurementId: "G-8N75XCBEMF",
};
export const useFirebase = () => useContext(FirebaseContext);
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      console.log("Hiii");
      onAuthStateChanged(firebaseAuth, (user) => {
        console.log(user);
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    } catch (e) {
      console.log("useEffectError", e);
    }
  }, [user, firebaseAuth]);

  // apiFetch();
  const register =  (email, password) => {
    try {
      // console.log(email, password, "Creating Account");
      console.log("Kedar 1"+ email);
      console.log("Kedar 1"+ password);
      createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log("Kedar 2");
      alert("Account Created Succesfully");
    } catch (e) {
      console.log("Error", e);
    }
  };

  const login = (email, password) => {
    try {
      console.log("Logging in");
      signInWithEmailAndPassword(email, password);
      console.log("Succesfully Logged in");
    } catch (e) {
      console.log(e);
    }
  };

  const loginWithGoogle = (e) => {
    try {
      e.preventDefault();
      console.log("Logging in with Google");
      signInWithPopup(firebaseAuth, googleProvider);
      console.log("Succesfully Logged in");
    } catch (e) {
      console.log(e);
    }
  };
  const isLoggedIn = user ? true : false;
  const logout = async () => {
    await signOut(firebaseAuth);
    console.log("logout in firebase ", user);
  };

  const userCollectionRef = collection(db, "User");
  return (
    <FirebaseContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        isLoggedIn,
        user,
        userCollectionRef,
        logout,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
