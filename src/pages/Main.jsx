import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Form, Card, Nav } from "react-bootstrap";
import { useFirebase } from "../firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
import axios from "axios";
import Navbar from "../components/Navbar";
import Todo, { getData } from "../components/Todo";
import Datetime from "react-datetime";
function Main() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const firebase = useFirebase();
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  useEffect(() => {
    const showUser = async () => {
      if (firebase.isLoggedIn) {
        getData();
      }
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
        date:date,
        time:time
      };
      await addDoc(collection(firebase.db, firebase.user.uid), data);
      getData();
    } catch (e) {
      console.log(e);
    }
  };
  // React UI Component Return
  return (
    <div>
      {/* <Nav activeKey="/home" style={{ backgroundColor: "#5EBEC4" }}>
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
      </Nav> */}
      <Navbar />
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
              <div style={{ display: "flex", marginTop: 30 }}>
                <Form.Group controlId="form.Name">
                  <Form.Label>Add Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Add a todo"
                    style={{
                      background: "transparent",
                      borderColor: "black",
                      borderRadius: 20,
                      width: 400,
                      marginRight: 100,
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="form.Name">
                  <Form.Label>Add time</Form.Label>
                  <Form.Control
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Add a todo"
                    style={{
                      background: "transparent",
                      borderColor: "black",
                      borderRadius: 20,
                      width: 400,
                    }}
                  />
                </Form.Group>
              </div>
              <button
                style={{
                  marginTop: 40,
                  marginLeft: 650,
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
          firebase.error && (
            <Alert variant={"danger"} style={{ marginTop: 20, margin: 10 }}>
              {firebase.error}
            </Alert>
          )
        )}
      </Form>
      {todos &&
        todos.map((todo) => {
          return (
            <div>
              <Todo text={todo.text} date={todo.date} time={todo.time} />
            </div>
          );
        })}
    </div>
  );
}
export default Main;
