const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;