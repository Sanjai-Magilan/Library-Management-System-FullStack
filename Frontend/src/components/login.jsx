import React from "react";
//import { useState } from "react";
import "./login.css";
//import user_icon from "../assets/person.png";
//import email_icon from "../assets/email.png";
function Login() {
  return (
    <div className="login-container">
      <div className="header">
        <h1 className="text-head">Welcome Back</h1>
        <h1 className="text">Email ID</h1>
        <input type="text" className="mail" />
        <h1 className="text">Password</h1>
        <input type="password" className="mail" />
      </div>
      <button className="button-style">Login</button>
      <button className="text-button">Continue as Guest</button>
    </div>
  );
}

export default Login;
