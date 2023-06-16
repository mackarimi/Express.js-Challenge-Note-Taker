const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);

// HTML Routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
