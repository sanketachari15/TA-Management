const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const http = require('http');

// API file for interacting with MongoDB
const api = require('./routes/api');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));


/*app.listen(port, () => {
  console.log(`Started on port ${port}`);
});*/

module.exports = {app};
