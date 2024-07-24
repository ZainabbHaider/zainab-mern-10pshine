import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileScreen.modules.css";

function ProfileScreen({ setIsLoggedIn }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get("/api/users/profile");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to login
    localStorage.removeItem("userInfo");
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <div className="profile-screen">
      <h2>My Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <label>First Name:</label>
          <span>{user.firstName}</span>
        </div>
        <div className="profile-item">
          <label>Last Name:</label>
          <span>{user.lastName}</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="actions">
        <button className="edit-profile" >
          Edit Profile
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileScreen;
