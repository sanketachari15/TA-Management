var express = require('express');
var bodyParser = require('body-parser');
let _ = require('lodash');

var { mongoose } = require('./Db/mongoose.js');
var { Student } = require('./SchemaModels/StudentModel.js');
var { Professor } = require('./SchemaModels/ProfessorModel.js');
var { Course } = require('./SchemaModels/CourseModel.js');

var app = express();
const port = process.env.PORT || 3000;

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


// Updates only the semester attribute of professor
app.patch('/professors/:Email' , (req, res) => {
  let email = req.params.Email;
  Professor.findOneAndUpdate({Email: email}, { $set : { Sem: req.body.Sem} } , {new: true}).then((professor) => {
      if(!professor) {
          return res.status(404).send();
      }
      res.send(professor);
  }).catch((error) => {
      res.status(400).send(error);
  });
});

// Update complete entry of professor identified by email
app.put('/professors/:Email' , (req, res) => {
    let email = req.params.Email;
    Professor.findOne({Email: email}).then((professor) => {
        if(!professor){
            console.log("Unable to find professor returning 404 ");
            return res.status(404).send();
        }

        professor.Email = req.body.Email;
        professor.FirstName = req.body.FirstName;
        professor.Sem = req.body.Sem;
        professor.LastName = req.body.LastName;
        professor.WebsiteLink = req.body.WebsiteLink;
        professor.TeachingCourses = req.body.TeachingCourses;

        professor.save().then((doc) => {
            res.send(doc);
        }, (error) => {
            res.status(400).send(error);
        })
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//delete the entry of professor identified by email
app.delete('/professors/:Email', (req, res) => {
  let email = req.params.Email;
  Professor.findOneAndRemove({Email: email}).then((professor) => {
    if (!professor){
      return res.status(404).send();
    }
    res.send(professor);
  }).catch((error) => {
    res.status(400).send(error);
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
