const express = require("express");
const router = express.Router();
// Pastikan path ke noteController sudah benar
const { getAllNotes, createNote, updateNote, deleteNote, getNoteById } = require("../controllers/noteControllers");

router.get("/notes", getAllNotes);
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

module.exports = router;