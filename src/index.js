import { React } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/Main";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { FirebaseProvider } from "./firebase";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </FirebaseProvider>
);

reportWebVitals();
