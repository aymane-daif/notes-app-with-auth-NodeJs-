const Note = require('../../models/Note');
const CustomError = require('../../errors/CustomError');

const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ user: userId });
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

const createNote = async (req, res, next) => {
  try {
    const newNote = { ...req.body, user: req.user.id };
    const createdNote = await Note.create(newNote);
    res.status(201).json(createdNote);
  } catch (err) {
    next(err);
  }
};

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, user: req.user.id });
    if (!note) {
      // if id doesn't exist
      return next(new CustomError('Resource not found', 400));
    }
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updatedNote) {
      return next(new CustomError('Resource not found', 400));
    }
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) return next(new CustomError('Resource not found', 400));
    res.json(deletedNote);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllNotes, createNote, getNote, updateNote, deleteNote };
