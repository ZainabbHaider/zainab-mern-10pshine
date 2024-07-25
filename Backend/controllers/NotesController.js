const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const logger = require("../logger");

const showNotes = asyncHandler(async (req, res) => {
  try {
    // Fetch notes associated with the logged-in user
    const notes = await Note.find({ userId: req.user._id });
    if (notes.length === 0) {
      logger.info(`User ${req.user.firstName} has no notes`);
      res.json({
        message:
          "Your note collection is empty. Begin by creating your first note!",
      });
    } else {
      logger.info(`Fetched ${notes.length} notes for user ${req.user.firstName}`);
      res.json(notes);
    }
  } catch (error) {
    logger.error(
      `Failed to fetch notes for user ${req.user.firstName}: ${error.message}`
    );
    res.status(500);
    throw new Error("Failed to fetch notes");
  }
});

const addNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    logger.warn(`User ${req.user.firstName} tried to add a note with missing fields`);
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const note = await Note.create({
    title,
    content,
    userId: req.user._id,
  });
  logger.info(`Note added by user ${req.user.firstName}: ${note.title}`);
  res.status(201).json({ message: "Note added" });
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note && note.userId.toString() === req.user._id.toString()) {
    await Note.findByIdAndDelete(req.params.id);
    logger.info(`Note deleted by user ${req.user.firstName}`);
    res.json({ message: "Note removed" });
  } else {
    logger.warn(
      `User ${req.user.firstName} tried to delete a note they don't own or doesn't exist: ${req.params.id}`
    );
    res.status(404);
    throw new Error(
      "Note not found or you're not authorized to delete this note"
    );
  }
});

const editNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note && note.userId.toString() === req.user._id.toString()) {
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    logger.info(`Note updated by user ${req.user.firstName}: ${updatedNote.title}`);
    res.json(updatedNote);
  } else {
    logger.warn(
      `User ${req.user.firstName} tried to edit a note they don't own or doesn't exist: ${req.params.id}`
    );
    res.status(404);
    throw new Error(
      "Note not found or you're not authorized to update this note"
    );
  }
});

module.exports = { showNotes, addNote, deleteNote, editNote };
