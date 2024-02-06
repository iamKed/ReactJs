import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase";
import { Alert } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  const showMessage = () => {
    document.getElementById("message").innerHTML = firebase.msg;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.login(email, password);
    showMessage();
  };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    await firebase.loginWithGoogle();
    await addDoc(collection(firebase.db, "Users", firebase.user.uid), {
      name: firebase.user.displayName,
      email: firebase.user.email,
      city: "",
      age: "",
    });
    navigate("/");
  };

  return (
    <>
      <div className="container mt-5">
        <Link to="/">
          <button className="btn btn-outline-dark"> Go back</button>
        </Link>
        <p className="h1 mb-5 mt-2">Login Page</p>
        <Alert variant={"dark"} id="message"></Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "transparent",
                borderColor: "black",
                borderRadius: 20,
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "transparent",
                borderColor: "black",
                borderRadius: 20,
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <h3 className="mt-5 mb-5">OR</h3>
        <Button onClick={signInWithGoogle}>Login With Google</Button>
      </div>
    </>
  );
};

export default Login;
