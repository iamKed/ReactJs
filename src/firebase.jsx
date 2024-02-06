// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase-config";

import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
// Your web app's Firebase configuration
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);
connectAuthEmulator(firebaseAuth,"http://localhost:9099", 9099);
connectFirestoreEmulator(db, "localhost", 8080);
const googleProvider = new GoogleAuthProvider();
export const FirebaseProvider = (props) => {
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
      // console.log("in useeffect",msg)
    } catch (e) {
      console.log(e);
    }
  }, [user, firebaseAuth]);

  // API fetch for logged in Person

  const register = async (email, password,name,age,city) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCredentials) => {
          // userCredentials.user.sendEmailVerification();
           sendEmailVerification(userCredentials.user);
          
          console.log("Document added",email,age,city,name)
          logout();
          alert("Please Verify your Email to Login on the Link sent!");
        }
      );
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setMsg("Email already exists. Try Logging in");
          break;
        case "auth/weak-password":
          setMsg("Weak Password ");
          break;
        default:
          setMsg(error.code);
          break;
      }
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Logging in");
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setMsg("Please check your Email and Password");
          break;
        default:
          setMsg("Please Register yourself");
          console.log("Hii");
          break;
      }
    }
    console.log("Succesfully Logged in");
  };

  const loginWithGoogle = async () => {
    try {
      console.log("Logging in with Google");
      await signInWithPopup(firebaseAuth, googleProvider);
      console.log("Succesfully Logged in",user);
    } catch (e) {
      console.log(e);
    }
  };
  const isLoggedIn = user ? true : false;
  // Logout function
  const logout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        isLoggedIn,
        user,
        msg,
        setMsg,
        logout,
        db,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
