const express = require("express");
const apiRouter = express.Router();
const fs = require("fs");
const path = require("path");

apiRouter.get("/notes", (req, res) => {
  const dbPath = path.join(__dirname, "..", "db", "db.json");
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath);
    if (data.length > 0) {
      res.json(JSON.parse(data));
    } else {
      res.json([]);
    }
  } else {
    res.json([]);
  }
});

module.exports = apiRouter;
