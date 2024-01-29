import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Button, Card, Nav } from "react-bootstrap";
import { app } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
const db = getFirestore(app);
function Main() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const userCollectionRef = collection(db, "User");
  // function showUsers() {
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data);
  };
  getUsers();
  //   getUsers();
  // }
  const updateData = async (e) => {
    e.preventDefault();
    try {
      let data = {
        text: text,
      };
      console.log(data);
      await addDoc(userCollectionRef, data);
      // showUsers();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="mt-5">
      <Nav activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/" className="h2 ">
            Todo Application
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav.Item>
      </Nav>
      {/* ................... */}

      <Form
        style={{
          width: "50%",
          margin: "auto",
          marginTop: 50,
          // marginBottom:50,
          // marginLeft:400,
          justifyContent: "center",
          border: "2px solid black",
          padding: "40px",
          borderRadius: 20,
        }}
      >
        <Form.Group controlId="form.Name">
          <Form.Label>Insert todo</Form.Label>
          <Form.Control
            type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Add a todo"
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
      <p className="display-5 ">Your todo's</p>
      {users.map((user) => {
        return (
          <div>
            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Title>{user.Name}</Card.Title>
                <Card.Text>{user.text}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </Container>
  );
}

export default Main;
