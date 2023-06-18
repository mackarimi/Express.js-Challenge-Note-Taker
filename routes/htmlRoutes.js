const express = require("express");
const router = express.Router();
const path = require("path");

// GET Route for notes page
router.get("/notes", (res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  

// GET Route for notes page
router.get("/notes", (req, res) => {
    // Use the req object if needed
    console.log(req.headers);
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
module.exports = router;
