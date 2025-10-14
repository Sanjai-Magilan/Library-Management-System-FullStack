import React from "react";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [MailId, setMailId] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/Lib/user/signin`, {
        MailId,
        Password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/SearchBar");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Login failed");
    }
  };

  const goTo = () => {
    navigate("/SearchBar");
  };
  const reg = () => {
    navigate("/Register");
  };
  return (
    <div className="login-container">
      <div className="header">
        <h1 className="text-head">Welcome Back</h1>
        <h1 className="text">Email ID</h1>
        <input
          type="email"
          className="mail"
          value={MailId}
          onChange={(e) => setMailId(e.target.value)}
        />
        <h1 className="text">Password</h1>
        <input
          type="password"
          className="mail"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button-style" onClick={loginUser}>
        Login
      </button>
      <button className="text-button" onClick={reg}>
        Create an account
      </button>
      <button className="text-button" onClick={goTo}>
        Continue as Guest
      </button>
    </div>
  );
}

export default Login;
