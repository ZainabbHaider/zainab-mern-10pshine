import React from "react";
import deleteLogo from "../assets/delete.png";
import editLogo from "../assets/edit.png";
import "./NoteCard.modules.css";

function NoteCard({ note, onDelete }) {

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note._id);
    }
  };

  return (
    <div key={note._id} className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        <button className="edit-button">
          <img src={editLogo} alt="Edit" />
        </button>
        <button className="delete-button" onClick={handleDelete}>
          <img src={deleteLogo} alt="Delete" />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
