const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/notes.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/notes', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading notes.' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading notes.' });
      return;
    }
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('db.json', JSON.stringify(notes), 'utf8', (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error writing notes.' });
        return;
      }
      res.json(newNote);
    });
  });
});

// Bonus: DELETE /api/notes/:id route
app.delete('/api/notes/:id', (req, res) => {
  const idToDelete = req.params.id;

  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading notes.' });
      return;
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== idToDelete);

    fs.writeFile('db.json', JSON.stringify(notes), 'utf8', (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error writing notes.' });
        return;
      }
      res.json({ message: 'Note deleted.' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
