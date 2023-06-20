const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, "..", "/Develop/db/db.json");

// Handle GET request to retrieve notes
router.get('/notes', (req, res) => {
  // Read the notes from the database file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve notes" });
      return;
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Send the notes as the response
    res.json(notes);
  });
});

// Handle POST request to create a new note
router.post('/notes', (req, res) => {
  // Read the notes from the database file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save note" });
      return;
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Generate a new note ID using uuid
    const newNoteId = uuidv4();

    // Create a new note object
    const newNote = {
      id: newNoteId,
      title: req.body.title,
      text: req.body.text,
    };

    // Add the new note to the notes array
    notes.push(newNote);

    // Write the updated notes to the database file
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save note" });
        return;
      }

      // Send the new note as the response
      res.json(newNote);
    });
  });
});

// Handle DELETE request to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Read the notes from the database file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete note" });
      return;
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Find the index of the note to delete
    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    // Remove the note from the notes array
    const deletedNote = notes.splice(noteIndex, 1)[0];

    // Write the updated notes to the database file
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete note" });
        return;
      }

      // Send the deleted note as the response
      res.json(deletedNote);
    });
  });
});

module.exports = router;
