const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// GET Route for the homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// GET Route for the notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
 