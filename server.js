const express = require('express');  // import express module
const app = express();  // create an express application instance
const path = require('path');  // import path module
const PORT = process.env.PORT || 3001;  // define the PORT at 3001
const apiRouter = require('./routes/apiRoutes');  // import apiRoutes module
const htmlRouter = require('./routes/htmlRoutes');  // import htmlRoutes module

app.use(express.json());  // middleware to parse JSON data in the request body
app.use(express.static(path.join(__dirname, '/develop/public')));  // middleware to serve static files from the '/develop/public' folder
app.use('/api', apiRouter);  // use the apiRouter for all routes starting with '/api'
app.use('/', htmlRouter);  // use the htmlRouter for all routes starting with '/'


app.listen(PORT, () => {  // start the server and listen on PORT 3001
  console.log(`Server started on port ${PORT}`);  // log a message to the console when the server starts
});