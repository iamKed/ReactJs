import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (firebase.isLoggedIn) {
      console.log("Inside register useeffect", firebase);
      // navigate to home
      navigate("/");
    }
  }, [firebase.isLoggedIn, firebase.user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.register(email, password, name, age, city);
  };

  return (
    <div className="container mt-5">
      {firebase.error && <Alert variant={"dark"} id="messageRegister">{firebase.error}</Alert>}
      <Link to="/">
        <button
          className="btn "
          style={{ borderColor: "black", borderWidth: 1 }}
        >
          Go back
        </button>
      </Link>
      <p className="h1 ">Registration Page</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Enter Name "
            style={{
              background: "transparent",
              borderColor: "black",
              borderRadius: 20,
            }}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="Enter city"
            style={{
              background: "transparent",
              borderColor: "black",
              borderRadius: 20,
            }}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            placeholder="Enter age"
            style={{
              background: "transparent",
              borderColor: "black",
              borderRadius: 20,
            }}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            style={{
              background: "transparent",
              borderColor: "black",
              borderRadius: 20,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            style={{
              background: "transparent",
              borderColor: "black",
              borderRadius: 20,
            }}
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
