import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Form, Card, Nav } from "react-bootstrap";
import { useFirebase } from "../firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
import axios from "axios";
function Main() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const showUser = async () => {
      if (firebase.isLoggedIn) {
        console.log("Isloggedininmain", firebase.isLoggedIn);
        getData();
      }
      // firebase.setMsg("Please Login to use the Application");
    };
    showUser();
  }, [firebase, firebase.isLoggedIn]);
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
  // Get all TODO's
  const getData = async () => {
    console.log("From get Data", firebase.db, firebase.user.uid);
    const data = await getDocs(collection(firebase.db, firebase.user.uid));
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // Logout Function
  const logout = async () => {
    await firebase.logout();
    setTodos([]);
  };
  // Add a Todo
  const updateData = async (e) => {
    try {
      e.preventDefault();
      let data = {
        text: text,
        createdAt: firebase.user.metadata.creationTime,
      };
      await addDoc(collection(firebase.db, firebase.user.uid), data);
      console.log("Done");
      getData();
    } catch (e) {
      console.log(e);
    }
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
              <Nav.Link>{firebase.user.email}</Nav.Link>
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
      <Form>
        {firebase.isLoggedIn ? (
          <>
            <div
              style={{
                margin: 30,
                marginTop: 50,
                justifyContent: "center",
                border: "2px solid black",
                padding: 30,
                borderRadius: 20,
              }}
            >
              <h2 style={{ color: "#F92C85" }}>Todo Application</h2>
              <hr style={{ marginBottom: 30 }}></hr>
              <p id="new"></p>
              <Form.Group controlId="form.Name">
                <Form.Label>Insert todo</Form.Label>
                <Form.Control
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a todo"
                  style={{
                    background: "transparent",
                    borderColor: "black",
                    borderRadius: 20,
                  }}
                />
              </Form.Group>
              <button
                style={{
                  marginTop: 20,
                }}
                type="button"
                className="btn btn-outline-success"
                onClick={updateData}
              >
                Add Todo
              </button>
            </div>
          </>
        ) : (
          firebase.error && <Alert variant={"dark"}>{firebase.error}</Alert>
        )}
      </Form>
    </div>
  );
}
export default Main;
