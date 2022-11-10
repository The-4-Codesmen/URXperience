import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Forget from "./screens/Forget";
import Activate from "./screens/Activate";
import ResetPassword from "./screens/ResetPassword";
import Private from "./screens/Private";
import Dashboard from "./screens/Dashboard";
import TakeOuts from "./screens/TakeOuts";
import "react-toastify/dist/ReactToastify.css";
import Community from "./screens/Community";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" exact element={<Private />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/chat" exact element={<Community />} />
      <Route path="/users/password/forget" exact element={<Forget />} />
      <Route path="/users/activate/:token" exact element={<Activate />} />
      <Route
        path="/users/password/reset/:token"
        exact
        element={<ResetPassword />}
      />
      <Route path="/takeouts" exact element={<TakeOuts />} />
    </Routes>
  </Router>
);
