import React, { useRef, useState } from "react"
import { Container } from "react-bootstrap";
import { Form, Button, Card, CardBody } from "react-bootstrap";
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import db from "../firebase";

function Main() {
  const [users, setUsers] = useState([]);
  const userRef = useRef();
  const userRef1 = useRef();
  const userRef2 = useRef();
  const userCollectionRef = collection(db, 'User');
  function showUsers() {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data)
    };
    getUsers();
  }
  const updateData = async (e) => {
    e.preventDefault();
    try {
      let data = {
        Name: userRef.current.value,
        Email: userRef1.current.value,
        Address: userRef2.current.value,
      }
      await addDoc(userCollectionRef, data);
      showUsers()

    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Form style={{
        width: '50%',
        margin:'auto',
        marginTop:50,
        // marginBottom:50,
        // marginLeft:400,
        justifyContent:"center",
        border: "2px solid black",
        padding: "40px",
        borderRadius: 20,
      }} >
        
        <h2 style={{
          marginBottom: 40,
          
        }} className="display-4"> FireBase Application</h2>
        
        <Form.Group controlId="form.Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={userRef} placeholder="Name" />
        </Form.Group>
        <Form.Group controlId="form.Name">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={userRef1} placeholder="email" />
        </Form.Group>
        <Form.Group controlId="form.Name">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" ref={userRef2} placeholder="Address" />
        </Form.Group>

        <button style={{
          marginTop: 20
        }} type="button" className="btn btn-outline-success" onClick={updateData}>Submit</button>
        <button style={{
          marginLeft: 20,
          marginTop: 20
        }} type="button" onClick={showUsers} className="btn btn-outline-dark">Show Data</button>
      </Form>
      <hr style={{margin:50}}></hr>
      {users.map((user) => {
        return (
          <div>
            <Card>
              <CardBody>
                <h5>First Name: {user.Name}</h5>
                <h5>Email: {user.Email}</h5>
                <h5>Address: {user.Address}</h5>
              </CardBody>
            </Card>
          </div>
        );
      })}




    </Container>
  );
}

export default Main;