const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const notesFilePath = path.join(__dirname, "../notes.json");

// GET Route for retrieving all notes
router.get("/notes", (req, res) => {
  fs.readFile(notesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read the notes" });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// DELETE Route for deleting a note by ID
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile(notesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read the notes" });
    }

    let notes = JSON.parse(data);

    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    notes.splice(noteIndex, 1);

    fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete the note" });
      }

      res.json({ message: "Note deleted successfully" });
    });
  });
});

module.exports = router;
