const Note = require('../../models/Note');

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const createNote = async (req, res, next) => {
  try {
    const createdNote = await Note.create(req.body);
    res.json(createdNote);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) throw Error('No note found with id ' + id);
    res.json(note);
  } catch (err) {
    next(err);
  }
};
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedNote) throw Error('No note found with id ' + id);
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) throw Error('No note found with id ' + id);
    res.json(deletedNote);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllNotes, createNote, getNote, updateNote, deleteNote };
