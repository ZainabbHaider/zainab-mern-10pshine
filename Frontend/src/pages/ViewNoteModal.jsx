import React from "react";
import Modal from "react-modal";
import parse from 'html-react-parser';
import "./ViewNoteModal.modules.css";

Modal.setAppElement('#root');

function ViewNoteModal({ isOpen, onRequestClose, note }) {
  if (!note) return null;
    console.log(note);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Note Details"
      className="note-modal"
      overlayClassName="note-modal-overlay"
    >
      <div className="modal-header">
        <h2>{note.title}</h2>
        <button onClick={onRequestClose} className="close-button">&times;</button>
      </div>
      <div className="note-content">
        {parse(note.content)}
      </div>
    </Modal>
  );
}

export default ViewNoteModal;
