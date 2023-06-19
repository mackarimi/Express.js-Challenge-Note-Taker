const express = require('express');  // importing express
const htmlRouter = express.Router();  // creating instance of express
const path = require('path');  // import path module for node.js

// when the GET api/notes route is entered like thie: http://localhost:3001/notes, load the notes.html file 
htmlRouter.get('/notes', (req, res) => {   // this is a GET request for the /notes route
  res.sendFile(path.join(__dirname, '..', '/develop/public/notes.html'));  // notes.html is sent back to the client
});

// when the GET api url is entered like this: http://localhost:3001, load the index file
htmlRouter.get('*', (req, res) => {   // this is a GET request for * (wildcard); if no other routes are specified with the api url, then the index.html is returned to the client
    res.sendFile(path.join(__dirname, '..', '/develop/public/index.html'));  // index.html is sent back to the client
    });

module.exports = htmlRouter;  // this allows the htmlRouter routes to be exported to other files for usagejklajfaiofewaiof