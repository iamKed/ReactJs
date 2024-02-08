// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import firebaseConfig from "./firebase-config";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator, updateProfile } from "firebase/auth";

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
import { setUserRedux, seterror } from "./features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
// Your web app's Firebase configuration
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);
connectAuthEmulator(firebaseAuth, "http://localhost:9099", 9099);
connectFirestoreEmulator(db, "localhost", 8080);
const googleProvider = new GoogleAuthProvider();
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.userDetails.error);
  const [user, setUser] = useState(null);

  const profile = useSelector((state) => state.userDetails.user);
  useEffect(() => {
    try {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [user, firebaseAuth]);

  // API fetch for logged in Person

  const register = async (email, password, name, age, city) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCredentials) => {
          updateProfile(userCredentials.user, {
            displayName: name,
          });
          dispatch(setUserRedux(userCredentials.user));
          sendEmailVerification(userCredentials.user);
          logout();
          alert("Please Verify your Email to Login on the Link sent!");
        }
      );
    } catch (error) {
      dispatch(seterror(error.message));
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      dispatch(seterror(error.message));
    }
  };

  const loginWithGoogle = async () => {
    try {
      console.log("Logging in with Google");
      await signInWithPopup(firebaseAuth, googleProvider);
      console.log("Succesfully Logged in", user);
    } catch (error) {
      dispatch(seterror(error.message));
    }
  };
  const isLoggedIn = user ? true : false;
  // Logout function
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (e) {
      console.log("Error in logout", e);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        isLoggedIn,
        user,
        error,
        seterror,
        user,
        logout,
        firebaseAuth,
        db,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
