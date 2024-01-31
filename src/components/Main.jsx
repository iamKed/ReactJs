import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Form, Card, Nav } from "react-bootstrap";
import { useFirebase } from "../firebase";
import { addDoc } from "firebase/firestore/lite";
import axios from "axios";
function Main() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const firebase = useFirebase();
  console.log("Firebase Context out", firebase);
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    console.log("Firebase Context", firebase);
    const showUser = () => {
      if (firebase.isLoggedIn) {setUserEmail(firebase.user.email);}
    };
    showUser();
  }, [firebase]);
  const logout = async () => {
    await firebase.logout();
  };
  const apiFetch = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((json) => {
        setTodos(json.data);
      });
  };
  const updateData = async (e) => {
    try {
      e.preventDefault();
      let data = {
        text: text,
      };
      console.log("Data is ", data);
      await addDoc(firebase.userCollectionRef, data);
      console.log("Done");
      // showUsers();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Nav activeKey="/home" style={{ backgroundColor: "#46A2EC" }}>
        <Nav.Item>
          <Nav.Link href="/">
            <span className="display-6"> Todo Application</span>
          </Nav.Link>
        </Nav.Item>
        {!firebase.isLoggedIn && (
          <>
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </>
        )}
        {firebase.isLoggedIn && (
          <>
            <Nav.Item>
              <Nav.Link>{userEmail}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav.Item>
          </>
        )}
        {logout}
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
        {/* <Form.Group controlId="form.Name">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={userRef1} placeholder="email" />
        </Form.Group>
        <Form.Group controlId="form.Name">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" ref={userRef2} placeholder="Address" />
        </Form.Group> */}

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
          apiFetch();
        }
      }}
      <p className="display-5 ">Your todo's</p>
      {todos.map((todo) => {
        return (
          <Card key={todo.id} style={{ margin: 8 }}>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>{todo.id}</Card.Title>
              <Card.Text>{todo.title}</Card.Text>

              {/* <Button >Go somewhere</Button> */}
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
}
export default Main;
