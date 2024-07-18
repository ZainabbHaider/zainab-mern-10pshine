import React from "react";
import logo from "../assets/notes.png";
import "./Navbar.modules.css";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar-left">
      <Link className="link" to="/">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        </Link>
        <Link className="link" to="/">
          <div className="navbar-title">NoteIt</div>
        </Link>
      </div>
      {/* {isLoggedIn && (
        <div className="navbar-search">
          <input type="text" placeholder="Search notes..." />
        </div>
      )} */}
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <>
            <button className="navbar-button" onClick={()=>{
               navigate("/mynotes");
            }}>My Notes</button>
            <button className="navbar-button">New Note</button>
            <button className="navbar-button" onClick={()=>{
               localStorage.removeItem("userInfo");
              //  setIsLoggedIn(false);
               navigate("/");
            }}>My Profile</button>
          </>
        ) : (
          <>
            <button className="navbar-button">
              <Link className="link" to="/login ">
                Sign In
              </Link>
            </button>
            <button className="navbar-button">
              <Link className="link" to="/register ">
                Sign Up
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
