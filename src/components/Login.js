import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password, "Logging in");
            
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("Succesfully Logged in");

    } catch (e) {
      console.log(e, "Invalid Credentials");
    }
  };
  const signInWithGoogle = async (e) => {
    try {
      e.preventDefault();
      console.log("Logging in");
      await signInWithPopup(firebaseAuth, googleProvider);
      console.log("Succesfully Logged in");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container mt-5">
      <Link to="/">
        <button className="btn btn-outline-dark"> Go back</button>
      </Link>
      <p className="h1 ">Login Page</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h3 className="mt-5 mb-5">OR</h3>
      <Button onClick={signInWithGoogle}>Login With Google</Button>
    </div>
  );
};

export default Login;
