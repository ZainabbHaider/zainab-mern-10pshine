const asyncHandler = require("express-async-handler");
// const notes = require("../data/notes");
const Note = require("../models/noteModel");

const showNotes = asyncHandler(async (req, res) => {
    try {
        // Fetch notes associated with the logged-in user
        const notes = await Note.find({ userId: req.user._id });
        if (notes.length === 0) {
            res.json({ message: "Your note collection is empty. Begin by creating your first note!" });
        } else {
            res.json(notes);
        }
    } catch (error) {
        res.status(500);
        throw new Error("Failed to fetch notes");
    }
});


const addNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const note = await Note.create({
        title,
        content,
        userId: req.user._id
    });

    res.status(201).json({ message: "Note added" });
});

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.userId.toString() === req.user._id.toString()) {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note removed" });
    } else {
        res.status(404);
        throw new Error("Note not found or you're not authorized to delete this note");
    }
});

const editNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note && note.userId.toString() === req.user._id.toString()) {
      note.title = req.body.title || note.title;
      note.content = req.body.content || note.content;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found or you're not authorized to update this note");
    }
  });
  
  module.exports = { showNotes, addNote, deleteNote, editNote };
