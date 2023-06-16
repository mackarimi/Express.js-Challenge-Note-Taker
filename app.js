const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }

    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = generateUniqueId(); // Generate a unique ID for the note

    notes.push(newNote);
    fs.writeFile('db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error writing notes' });
      }

      res.json(newNote);
    });
  });
});

// BONUS: DELETE Route
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading notes' });
    }

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);

    fs.writeFile('db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error writing notes' });
      }

      res.sendStatus(204);
    });
  });
});

// Helper function to generate a unique ID
function generateUniqueId() {
  // You can use a library like 'uuid' to generate unique IDs
  // Example: return require('uuid').v4();

  // For simplicity, using a timestamp-based ID in this example
  return Date.now().toString();
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
