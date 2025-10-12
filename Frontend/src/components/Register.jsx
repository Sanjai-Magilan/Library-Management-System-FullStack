import React from "react";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [MailId, setMailId] = useState("");
  const [Password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      console.log("here")
      const res = await axios.post("http://localhost:5000/Lib/user/signup", {
        MailId,
        Username,
        Password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/SearchBar");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Register failed");
    }
  };

  const goTo = () => {
    navigate("/SearchBar");
  };
  return (
    <div className="login-container">
      <div className="header">
        <h1 className="text-head">Join & Explore</h1>
        <h1 className="text">Email ID</h1>
        <input
          type="email"
          className="mail"
          value={MailId}
          onChange={(e) => setMailId(e.target.value)}
        />
        <h1 className="text">User name</h1>
        <input
          type="text"
          className="mail"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
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
        Register
      </button>
      <button className="text-button" onClick={goTo}>
        Continue as Guest
      </button>
    </div>
  );
}

export default Register;
