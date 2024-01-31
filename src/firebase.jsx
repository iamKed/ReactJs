// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import firebaseConfig from "./firebase-config";
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
export const useFirebase = () => useContext(FirebaseContext);
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    try {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
      console.log("User: ", user);
    } catch (e) {
      console.log("useEffectError", e);
    }
  }, [user, firebaseAuth]);

  // API fetch for logged in Person

  const register = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((e) => {})
      .catch((error) => {
        var err = "";
        console.log("Error code in register", error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            err = `Email address ${email} already in use.`;
          case "auth/invalid-email":
            err = `Email address ${email} is invalid.`;
          case "auth/operation-not-allowed":
            err = `Error during sign up.`;
          case "auth/weak-password":
            err = `Password is not strong enough. Add additional characters including special characters and numbers.`;
          default:
            err = error.message;
        }
        return err;
      });
  };

  const login = (email, password) => {
    console.log("Logging in");
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((e) => {})
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            return "Email already used. Go to login page.";
          case "auth/wrong-password":
            return "Wrong email/password combination.";
          // case "auth/ERROR_USER_NOT_FOUND":
          case "auth/user-not-found":
            return "No user found with this email.";
          // case "auth/ERROR_USER_DISABLED":
          case "auth/user-disabled":
            return "User disabled.";
          // case "auth/ERROR_TOO_MANY_REQUESTS":
          case "auth/operation-not-allowed":
            return "Too many requests to log into this account.";
          // case "auth/ERROR_OPERATION_NOT_ALLOWED":
          case "auth/operation-not-allowed":
            return "Server error, please try again later.";
          // case "auth/ERROR_INVALID_EMAIL":
          case "auth/invalid-email":
            return "Email address is invalid.";
          default:
            return "Login failed. Please try again.";
        }
      });
    console.log("Succesfully Logged in");
  };

  const loginWithGoogle = async () => {
    try {
      console.log("Logging in with Google");
      await signInWithPopup(firebaseAuth, googleProvider);
      console.log("Succesfully Logged in");
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

        logout,
        db,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
