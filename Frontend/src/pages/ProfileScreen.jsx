import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileScreen.modules.css";

function ProfileScreen({ setIsLoggedIn }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get("/api/users/profile");
        setUser(data);
        setEditedUser(data);
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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put("/api/users/profile", editedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user details", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false)
  };

  return (
    <div className="profile-screen">
      <h1>My Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <label>First Name:</label>
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <div className="profile-value">{user.firstName}</div>
          )}
        </div>
        <div className="profile-item">
          <label>Last Name:</label>
          {editMode ? (
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <div className="profile-value">{user.lastName}</div>
          )}
        </div>
        <div className="profile-item">
          <label>Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="profile-input"
            />
          ) : (
            <div className="profile-value">{user.email}</div>
          )}
        </div>
      </div>
      <div className="actions">
        {editMode ? (
          <button className="save-profile" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-profile" onClick={handleEditClick}>
            Edit Profile
          </button>
        )}
        {editMode ? (
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        )}
        
      </div>
    </div>
  );
}

export default ProfileScreen;
