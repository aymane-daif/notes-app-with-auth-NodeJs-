const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [60, 'Your title length must be between 1 and 60 characters'],
      match: [
        /^[\w\s\-]+$/gi,
        'Your title can only contain alphanumeric characters',
      ],
      required: [true, 'Please provide a title'],
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
