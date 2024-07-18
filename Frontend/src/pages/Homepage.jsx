import React from "react";
import cover from "../assets/cover2.png";
import "./Homepage.modules.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="main">
      <img src={cover} alt="cover" className="cover-image" />
      <h1>One Space for All Your Thoughts</h1>
      <div className="button-container">
        <button className="sign-in-button">
          <Link className="link" to="/login">Sign In</Link>
        </button>
        <button className="sign-up-button"><Link className="link" to="/register">Sign Up</Link></button>
      </div>
    </div>
  );
}

export default Homepage;
