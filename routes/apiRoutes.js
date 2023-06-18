const express = require("express");
const router = express.Router();
const fs = require("fs");

// GET Route for retrieving all the notes
router.get("/notes", (req, res) => {
  // Read the notes data from the file
  // Handle errors, parse data, and send the response
});

// DELETE Route for deleting a note by ID
router.delete("/notes/:id", (req, res) => {
  // Retrieve the note ID from request parameters
  // Read the notes data from the file
  // Find the note by ID, remove it, and update the file
  // Handle errors and send the appropriate response
});


module.exports = router;
