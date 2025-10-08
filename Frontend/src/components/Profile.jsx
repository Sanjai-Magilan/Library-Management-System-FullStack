import personImg from "../assets/user-u.png";
import React from "react";
import axios from "axios";

import { useState } from "react";
function UserProfile() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();

  const UserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost:5000/Lib/user/getUser", {
        header: {
          Authorization: `Bearer ${token}`,
        }
          .then((res) => setUser(res.data || {}))
          .catch((err) => console.error("Error fetching data:", err)),
      });
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className="usercontainer">
      <button className="avatar-btn" onClick={() => setOpen(!open)}>
        <img src={personImg} alt="avatar" className="avatar-img" />
      </button>
      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <p className="user-name">{user.Username}</p>
            <p className="user-email">{user.MailId}</p>
          </div>
          <button className="logout-btn">Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
