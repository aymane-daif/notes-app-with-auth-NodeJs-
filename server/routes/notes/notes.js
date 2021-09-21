const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require('../../controllers/notes/notes');

router.route('/notes').get(getAllNotes).post(createNote);
router.route('/notes/:id').get(getNote).patch(updateNote).delete(deleteNote);

module.exports = router;
