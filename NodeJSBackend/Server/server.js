var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('../Db/mongoose.js');
var { Student } = require('../SchemaModels/StudentModel.js');
var { Professor } = require('../SchemaModels/ProfessorModel.js');
var { Course } = require('../SchemaModels/CourseModel.js');

var app = express();

app.use(bodyParser.json());

app.post('/students', (request, response) => {
  var newStudent = new Student(request.body);
  newStudent.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});

app.get('/students', (request, response) => {
  Student.find().then((students) => {
    response.send({students});
  }, (error) => {
    response.status(400).send(error);
  });
});

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

app.post('/professors', (request, response) => {
  var newProfessor = new Professor(request.body);
  newProfessor.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

app.get('/professors', (request, response) => {
  Professor.find().then((professors) => {
    response.send({professors});
  }, (error) => {
    response.status(400).send(error);
  });
});

app.get('/professors/:Email', (request, response) => {
  var Email = request.params.Email;
  Professor.find({Email}).then((professor) => {
    if(professor.length == 0){
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

app.get('/courses', (request, response) => {
  Course.find().then((courses) => {
    response.send({courses});
  }, (error) => {
    response.status(400).send(error);
  });
});

app.get('/courses/:Code', (request, response) => {
  var Code = request.params.Code;
  Course.find({Code}).then((course) => {
    if(course.length == 0){
      response.status(404).send();
    }
    response.send({course});
  }).catch((error) => {
    response.status(400).send();
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
