import personImg from "../assets/person.png";
import React from "react";
import axios from "axios";
import "./Profile.css";
import Login from "./login.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [borrowbook, setBorrowbook] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.error(`failed to log out ${e}`);
    }
  };

  const ReturnBook = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/Lib/user/return`,
        {
          name: borrowbook,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      User_Profile();
    } catch (e) {
      console.log(e);
    }
  };

  const User_Profile = async () => {
    try {
      if (!token) {
        console.warn("No token found, you have guest access");
      }
      const response = await axios.get(
        `${API_BASE_URL}/Lib/user/getUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data || {});
      setBorrowbook(user.BorrowedBooks);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err);
    }
  };

  return (
    <div className="usercontainer">
      <button
        className="avatar-btn"
        onClick={() => {
          setOpen(!open), User_Profile();
        }}
      >
        <img src={personImg} alt="avatar" className="avatar-img" />
      </button>
      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <p className="user-email">
              User name <span>{user.Username}</span>
            </p>
            <p className="user-email">
              Email Id <span>{user.MailId}</span>
            </p>
            <p className="user-email">
              Borrowed Books <span>{user.BorrowedBooks}</span>
            </p>
            <p className="user-email">
              Borrowed Date<span>{user.borrowedDate}</span>
            </p>
            <p className="user-email">
              Return Date<span>{user.returnDate}</span>
            </p>
          </div>
          <button className="buttonStyle" onClick={ReturnBook}>
            Return Book
          </button>
          <button className="button-style" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
