import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import NotesScreen from "./pages/NotesScreen";
import NoteEditScreen from "./pages/NoteEditScreen";

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
          <Route path="/add" element={<NoteEditScreen/>} />
          <Route path="/edit/:id" element={<NoteEditScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
