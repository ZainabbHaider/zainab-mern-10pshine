import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.post(
        "/api/users",
        { firstName, lastName, email, password },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setError(false);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="main">
      <div className="right-main">
        <div className="login">
          <form onSubmit={handleSubmit}> 
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <label htmlFor="">First Name</label>
            <input
              name="First name"
              type="text"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="">Last Name</label>
            <input
              name="Last name"
              type="text"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="">Email</label>
            <input
              name="Email"
              type="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
