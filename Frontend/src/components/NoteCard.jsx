import React from "react";
import deleteLogo from "../assets/delete.png";
import editLogo from "../assets/edit.png";
import viewLogo from "../assets/view.png";
import "./NoteCard.modules.css";
import { useNavigate } from "react-router-dom";

function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note._id);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${note._id}`, { state: { note } });
  };

  return (
    <div key={note._id} className="note-card">
      <h3>{note.title}</h3>
      <div
        className="note-content"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      <div className="note-actions">
        <button className="edit-button">
          <img src={editLogo} alt="Edit" onClick={handleEdit}/>
        </button>
        <button className="view-button">
          <img src={viewLogo} alt="View" />
        </button>
        <button className="delete-button" onClick={handleDelete}>
          <img src={deleteLogo} alt="Delete" />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
