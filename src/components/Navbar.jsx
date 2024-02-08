import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useFirebase } from "../firebase";
import axios from "axios";
function Navbar() {
  const firebase = useFirebase();

  //   useEffect(() => {
  //     const showUser = async () => {
  //       if (firebase.isLoggedIn) {
  //         console.log("Isloggedininmain", firebase.isLoggedIn);
  //       }
  //       // firebase.setMsg("Please Login to use the Application");
  //     };
  //     showUser();
  //   }, [firebase, firebase.isLoggedIn]);

  // Fetch Functions API's
  const getFunctionAPI = async () => {
    const res =
      (await axios.post(
        "http://127.0.0.1:5001/kedtodoapplication/us-central1/apiType"
      ),
      ["Veer and Kedar"]);
    console.log(res[0]);
    document.getElementById("new").innerHTML = res[0];
  };
  // Logout Function
  const logout = async () => {
    await firebase.logout();  
  };

  // React UI Component Return
  return (
    <div>
      <Nav activeKey="/home" style={{ backgroundColor: "#5EBEC4" }}>
        <Nav.Item>
          <Nav.Link href="/">
            <span className="display-6" style={{ backgroungColor: "#F92C85" }}>
              {" "}
              Todo Application
            </span>
          </Nav.Link>
        </Nav.Item>

        {firebase.isLoggedIn ? (
          <>
            <Nav.Item>
              <Nav.Link>{firebase.user.displayName}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={getFunctionAPI}>API</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </div>
  );
}
export default Navbar;
