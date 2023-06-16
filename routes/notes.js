const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Read all notes from the db.json file
router.get('/notes', (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes.' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Save a new note to the db.json file
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save note.' });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('./db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note.' });
      }

      res.json(newNote);
    });
  });
});

// Delete a note from the db.json file
router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete note.' });
    }

    const notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== id);

    fs.writeFile('./db.json', JSON.stringify(updatedNotes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete note.' });
      }

      res.sendStatus(204);
    });
  });
});

module.exports = router;
