import React, { useEffect } from "react";
import { useFirebase } from "../firebase";
import { useDispatch } from "react-redux";
import User from "../features/user/User";
import { setUserRedux } from "../features/user/userSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function Main() {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const showUser = async () => {
      if (firebase.isLoggedIn) {
        console.log("User in Profile");
        dispatch(setUserRedux(firebase.user));
      } else {
        navigate("/");
      }
    };
    showUser();
  }, [firebase]);
  // React UI Component Return
  return (
    <div>
      <Navbar />
      <User />
    </div>
  );
}
export default Main;
