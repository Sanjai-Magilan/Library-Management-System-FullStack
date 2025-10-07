import React from "react";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const goTo = () => {
    navigate("/SearchBar");
  };
  return (
    <div className="login-container">
      <div className="header">
        <h1 className="text-head">Welcome Back</h1>
        <h1 className="text">Email ID</h1>
        <input
          type="email"
          className="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1 className="text">Password</h1>
        <input
          type="password"
          className="mail"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button-style">Login</button>
      <button className="text-button" onClick={goTo}>
        Continue as Guest
      </button>
    </div>
  );
}

export default Login;
