import React from "react";
import { useFirebase } from "../../firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function User() {
  const profile = useSelector((state) => state.userDetails.user);
  console.log("profile in user from redux",profile)
  return (
    <>
      <div>{"hi"}</div>
      <p>{profile.displayName}</p>
    </>
  );
}

export default User;
