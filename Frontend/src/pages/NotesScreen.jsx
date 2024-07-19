import React, { useEffect, useState } from "react";
import "./NotesScreen.modues.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

function NotesScreen() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      if (Array.isArray(response.data)) {
        setNotes(response.data);
        setMessage("");
      } else if (response.data.message) {
        setNotes([]);
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleClick = () => {
    navigate("/add");
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
      // setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("There was an error deleting the note!", error);
    }
  };

  return (
    <div className="notes-screen">
      <div className="notes-header">
        <h2>My Notes</h2>
        <button className="add-note-button" onClick={handleClick}>
          +
        </button>
      </div>
      {error && <div className="error-message">Error: {error}</div>}
      {message && <div className="info-message">{message}</div>}
      <div className="note-cards">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}

export default NotesScreen;
