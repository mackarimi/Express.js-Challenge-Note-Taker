const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, 'data', 'notes.json');

// Get all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve notes' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Save a new note
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required' });
  }

  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save the note' });
    }

    const notes = JSON.parse(data);
    const newNote = { id: Date.now(), title, text };
    notes.push(newNote);

    fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save the note' });
      }

      res.json(newNote);
    });
  });
});

// Delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);

  if (isNaN(noteId)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }

  fs.readFile(notesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete the note' });
    }

    let notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    if (notes.length === updatedNotes.length) {
      return res.status(404).json({ error: 'Note not found' });
    }

    fs.writeFile(notesFilePath, JSON.stringify(updatedNotes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete the note' });
      }

      res.sendStatus(204);
    });
  });
});
