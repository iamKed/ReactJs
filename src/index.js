import { React } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/Main";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

reportWebVitals();
