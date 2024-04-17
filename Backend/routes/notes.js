const express = require("express");
const router = express.Router();
const {
  createNotes,
  readNotes,
  readNotesById,
  updateNotes,
  deleteNotes,
} = require("../controllers/notes");

router.post("/notes", createNotes);

router.get("/notes", readNotes);

router.get("/notes/:notesId", readNotesById);

router.put("/notes/:notesId", updateNotes);

router.delete("/notes/:notesId", deleteNotes);

module.exports = router;
