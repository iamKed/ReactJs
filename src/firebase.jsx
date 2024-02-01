// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase-config";
import fb from "firebase/app";
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
// db.useEmulator("localhost", 8080);
// firebaseAuth.useEmulator("http://localhost:9099/", { disableWarnings: true });
const googleProvider = new GoogleAuthProvider();
export const FirebaseProvider = (props) => {
  const [msg, setMsg] = useState("Please Login to use the Application");
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser(user);
          if (!user.emailVerified) {
            setMsg("Email not Verified. Please Verify your Email.");
          }
        } else {
          setUser(null);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [user, firebaseAuth]);

  // API fetch for logged in Person

  const register = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredentials) => {
        // userCredentials.user.sendEmailVerification();
        sendEmailVerification(userCredentials.user);
        logout();
        alert("Please Verify your Email to Login on the Link sent!");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-exists":
            setMsg("Email already exists. Try Logging in");
            break;
          case "auth/weak-password":
            setMsg("Weak Password ");
            break;
          default:
            setMsg(error.code);
            break;
        }
      });
  };

  const login = (email, password) => {
    console.log("Logging in");
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((e) => {})
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-credentials":
            setMsg("Please check your Email and Password");
            break;
          default:
            setMsg(error.code);
            break;
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
