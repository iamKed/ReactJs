import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Form, Card, Nav } from "react-bootstrap";
import { useFirebase } from "../firebase";
// import {
//   FieldValue,
//   addDoc,
//   getDocs,
// } from "firebase/firestore/lite";
import {
  getDocs,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
function Main() {
  const [text, setText] = useState("");

  const [todos, setTodos] = useState([]);
  const firebase = useFirebase();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const showUser = () => {
      if (firebase.isLoggedIn) {
        console.log("Logging in");
        setUserEmail(firebase.user.email);
        getData();
      }
    };
    showUser();
  }, [firebase]);

  // Get all TODO's
  const getData = async () => {
    const data = await getDocs(firebase.user.uid);
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
        timeStamp: new Date().getUTCMilliseconds(),
      };
      console.log("Data is ", data);
      await addDoc(collection(firebase.db, firebase.user.uid), data);
      console.log("Done");
      getData();
    } catch (e) {
      console.log(e);
    }
  };
  // React UI Component Return
  return (
    <Container>
      <Nav activeKey="/home" style={{ backgroundColor: "#46A2EC" }}>
        <Nav.Item>
          <Nav.Link href="/">
            <span className="display-6"> Todo Application</span>
          </Nav.Link>
        </Nav.Item>

        {firebase.isLoggedIn ? (
          <>
            <Nav.Item>
              <Nav.Link>{userEmail}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
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
      <Form
        style={{
          margin: "auto",
          marginTop: 50,
          justifyContent: "center",
          border: "2px solid black",
          padding: 30,
          borderRadius: 20,
          width: "50%",
        }}
      >
        <h2 style={{ color: "#4F62FF" }}>Todo Application</h2>
        <hr style={{ marginBottom: 30 }}></hr>
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
        {/* <button
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
          type="button"
          onClick={showUsers}
          className="btn btn-outline-dark"
        >
          Show Data
        </button> */}
      </Form>
      <hr style={{ margin: 50 }}></hr>
      {() => {
        if (firebase.isLoggedIn) {
          console.log("In the function", setTodos(firebase.apiFetch()));
        }
      }}
      <p className="display-5 ">Your todo's</p>

      {todos.map((todo) => {
        return (
          <Card key={todo.id} style={{ margin: 20 }}>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>{todo.Name}</Card.Title>
              <Card.Text>{todo.text}</Card.Text>

              {/* <Button >Go somewhere</Button> */}
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}
export default Main;
