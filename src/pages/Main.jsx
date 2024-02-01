import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { Form, Card, Nav } from "react-bootstrap";
import { useFirebase } from "../firebase";
// import {
//   FieldValue,
//   addDoc,
//   getDocs,
// } from "firebase/firestore/lite";
import { getDocs, addDoc, collection } from "firebase/firestore";
function Main() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const firebase = useFirebase();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const showUser = async () => {
      if (firebase.isLoggedIn) {
        setUserEmail(firebase.user.email);
        getData();
      }
      firebase.setMsg("Please Login to use the Application");
    };
    showUser();
  }, [firebase, setUserEmail]);

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
    <Container>
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
        {firebase.isLoggedIn ? (
          <>
            <h2 style={{ color: "#F92C85" }}>Todo Application</h2>
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
          </>
        ) : (
          <Alert variant={"dark"}>{firebase.msg}</Alert>
          // firebase.setMsg("")
        )}
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
