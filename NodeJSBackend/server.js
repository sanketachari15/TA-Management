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

app.get('/students/:UFID', (request, response) => {
  var UFID = request.params.UFID;
  Student.find({UFID}).then((student) => {
    if(student.length == 0){
      response.status(404).send();
    }
    response.send({student});
  }).catch((error) => {
    response.status(400).send();
  });
});

app.delete('/students/:UFID', (request, response) => {
  var UFID = request.params.UFID;
  Student.findOneAndRemove({UFID}).then((student) => {
    if(!student){
      response.status(404).send();
    }
    response.send({student});
  }).catch((error) => {
    response.status(400).send();
  });
});

app.post('/professors', (request, response) => {
  var newProfessor = new Professor(request.body);
  newProfessor.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

// API location
app.use('/', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

app.delete('/professors/:Email', (request, response) => {
  var Email = request.params.Email;
  Professor.findOneAndRemove({Email}).then((professor) => {
    if(!professor){
      response.status(404).send();
    }
    response.send({professor});
  }).catch((error) => {
    response.status(400).send();
  });
});

app.post('/courses', (request, response) => {
  var newCourse = new Course(request.body);
  newCourse.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));


app.delete('/courses/:Code', (request, response) => {
  var Code = request.params.Code;
  Course.findOneAndRemove({Code}).then((course) => {
    if(!course){
      response.status(404).send();
    }
    response.send({course});
  }).catch((error) => {
    response.status(400).send();
  });
});

app.listen(port, () => {

/*app.listen(port, () => {
  console.log(`Started on port ${port}`);
});*/

module.exports = {app};
