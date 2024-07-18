import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import NotesScreen from "./pages/NotesScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mynotes" element={<NotesScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
