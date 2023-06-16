const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get all notes
router.get('/', (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, '..', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes from the database.' });
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Return the notes as JSON
    res.json(notes);
  });
});

// Create a new note
router.post('/', (req, res) => {
  // Read the db.json file
  fs.readFile(path.join(__dirname, '..', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes from the database.' });
    }

    // Parse the JSON data
    const notes = JSON.parse(data);

    // Generate a unique id for the new note (you can use an npm package like 'uuid' for this)
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    // Add the new note to the array
    notes.push(newNote);

    // Write the updated notes to the db.json file
    fs.writeFile(path.join(__dirname, '..', 'db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save the note to the database.' });
      }

      // Return the new note as JSON
      res.json(newNote);
    });
  });
});

module.exports = router;
