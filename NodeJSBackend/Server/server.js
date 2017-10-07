var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('../Db/mongoose.js');
var { Student } = require('../SchemaModels/StudentModel.js');
var { Professor } = require('../SchemaModels/ProfessorModel.js');
var { Course } = require('../SchemaModels/CourseModel.js');

var app = express();

app.use(bodyParser.json());

app.post('/addStudent', (request, response) => {
  var newStudent = new Student(request.body);
  newStudent.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

app.post('/addProfessor', (request, response) => {
  var newProfessor = new Professor(request.body);
  newProfessor.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

app.post('/addCourse', (request, response) => {
  var newCourse = new Course(request.body);
  newCourse.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
