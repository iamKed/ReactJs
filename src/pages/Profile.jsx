import React, { useEffect } from "react";
import { useFirebase } from "../firebase";
import { useDispatch } from "react-redux";
import User from "../features/user/User";
import { setUserRedux } from "../features/user/userSlice";
function Main() {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  useEffect(() => {
    const showUser = async () => {
      if (firebase.isLoggedIn) {
        console.log("User in Profile");
        dispatch(setUserRedux(firebase.user));
      }
    };
    showUser();
  }, [firebase]);
  // React UI Component Return
  return (
    <div>
      <User />
    </div>
  );
}
export default Main;
