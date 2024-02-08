import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useFirebase } from "../firebase";
import { Card, CardBody } from "react-bootstrap";
function Todo(props) {
  const firebase = useFirebase();

  useEffect(() => {
    const showUser = async () => {
      if (firebase.isLoggedIn) {
        // getData();
      }
    };
    showUser();
  }, [firebase, firebase.isLoggedIn]);
  return (
    <>
      <Card className="m-4">
        <Card.Body>
          <blockquote className="blockquote mb-0 ">
            <p>{props.text}</p>
            <div style={{display:"flex ",justifyContent:"space-between"}}>
              <p>{props.date}</p>
              <p>{props.time}</p>
            </div>
            {/* <p>{props.date}{props.time}</p> */}
            {/* <footer className=""></footer>
            <footer className="">{props.time}</footer> */}
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
}

export default Todo;
