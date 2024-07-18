import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NoteEditScreen.modules.css";

function NoteEditScreen() {
  const location = useLocation();
  const note = location.state?.note || {};
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      if (note._id) {
        await axios.put(`/api/notes/${note._id}`, { title, content }, config);
      } else {
        await axios.post("/api/notes/add", { title, content }, config);
      }
      setError(false);
      setLoading(false);
      navigate("/mynotes");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="note-edit-screen">
      <h2>Note Editor</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-title-input"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="note-content-textarea"
        theme="snow"
      />
      <div className="note-edit-actions">
        <button className="save-button" onClick={handleSave} disabled={loading}>
          {loading ? (note._id ? "Saving..." : "Creating...") : (note._id ? "Save" : "Create")}
        </button>
        <button className="cancel-button" onClick={() => navigate("/mynotes")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NoteEditScreen;
