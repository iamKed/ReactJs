import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
// import {app } from "../firebase";
import {app} from "../firebase";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
const firebaseAuth=getAuth(app);
// const db= getFirestore(app);
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email,password,"Signing in");
    await createUserWithEmailAndPassword(firebaseAuth,email,password);
    console.log("Succesfully Signed in");
  };
  return (
    <div className="container mt-5">
      <Link to="/">
        <button className="btn btn-outline-dark">Go back</button>
      </Link>
      <p className="h1 ">Registration Page</p>
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
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default Register;
