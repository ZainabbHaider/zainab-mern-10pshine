const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/jwt')
const { deleteNote, addNote, showNotes, editNote } = require('../controllers/NotesController');


router.route("/").get(protect, showNotes)
router.route("/add").post(protect, addNote)
router.route('/:id').delete(protect, deleteNote).put(protect, editNote);


module.exports = router; 