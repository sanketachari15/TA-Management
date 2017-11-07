const express = require('express');
const router = express.Router();
let _ = require('lodash');
let { mongoose } = require('../Db/mongoose');
let { Student } = require('../SchemaModels/StudentModel.js');
let { Professor } = require('../SchemaModels/ProfessorModel.js');
let { Course } = require('../SchemaModels/CourseModel.js');
let {ProfCourses} = require('../SchemaModels/ProfCoursesModel');
let {TA} = require('../SchemaModels/TAModel');


router.post('/students', (request, response) => {
    var newStudent = new Student(request.body);
    newStudent.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    });
});

router.get('/students', (request, response) => {
    Student.find().then((students) => {
        response.send(students);
    }, (error) => {
        response.status(400).send(error);
    });
});

router.get('/students/:UFID', (request, response) => {
    var UFID = request.params.UFID;
    Student.find({UFID}).then((student) => {
        if(student.length == 0){
            response.status(404).send();
        }
        response.send(student);
    }).catch((error) => {
        response.status(400).send();
    });
});

router.delete('/students/:UFID', (request, response) => {
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

router.post('/professors', (request, response) => {
    var newProfessor = new Professor(request.body);
    newProfessor.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

router.get('/professors', (request, response) => {
    Professor.find().then((professors) => {
        response.send(professors);
    }, (error) => {
        response.status(400).send(error);
    });
});

router.get('/professors/:Email', (request, response) => {
    var Email = request.params.Email;
    Professor.find({Email}).then((professor) => {
        if(professor.length == 0){
            return response.status(404).send();
        }
        response.send(professor);
    }).catch((error) => {
        response.status(400).send(error);
    });
});

// Updates only the semester attribute of professor
router.patch('/professors/:Email' , (req, res) => {
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
router.put('/professors/:Email' , (req, res) => {
    let email = req.params.Email;
    Professor.findOne({Email: email}).then((professor) => {
        if(!professor){
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
router.delete('/professors/:Email', (req, res) => {
    let email = req.params.Email;
    Professor.findOneAndRemove({Email: email}).then((professor) => {
        if (!professor){
            return res.status(404).send();
        }
        res.send(professor);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.post('/courses', (request, response) => {
    var newCourse = new Course(request.body);
    newCourse.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

router.get('/courses', (request, response) => {
    Course.find().then((courses) => {
        response.send(courses);
    }, (error) => {
        response.status(400).send(error);
    });
});

router.get('/courses/:Code', (request, response) => {
    var Code = request.params.Code;
    Course.find({Code}).then((course) => {
        if(course.length == 0){
            response.status(404).send();
        }
        response.send(course);
    }).catch((error) => {
        response.status(400).send();
    });
});

router.delete('/courses/:Code', (request, response) => {
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

router.post('/profcourses', (request, response) => {
    let newProfCourses = new ProfCourses(request.body);
    newProfCourses.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

router.get('/profcourses', (req, res) => {
    ProfCourses.find().then((profCourses) => {
        res.send(profCourses);
    }, (error) => {
        res.status(400).send(error);
    });
});

router.get('/profcourses/:Email', (request, response) => {
    let Email = request.params.Email;
    ProfCourses.find({Email}).then((profCourses) => {
        if(profCourses.length == 0){
            return response.status(404).send();
        }
        response.send(profCourses);
    }).catch((error) => {
        response.status(400).send(error);
    });
});

// Updates only the semester attribute of professor
router.patch('/profcourses/:Email' , (req, res) => {
    let email = req.params.Email;
    ProfCourses.findOneAndUpdate({Email: email}, { $set : { Sem: req.body.Sem} } , {new: true}).then((profCourses) => {
        if(!profCourses) {
            return res.status(404).send();
        }
        res.send(profCourses);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Update complete entry of professor identified by email
/*router.put('/profcourses/:Email' , (req, res) => {
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
 });*/

//delete the entry of professor identified by email
router.delete('/profcourses/:Email', (req, res) => {
    let email = req.params.Email;
    ProfCourses.findOneAndRemove({Email: email}).then((profCourses) => {
        if (!profCourses){
            return res.status(404).send();
        }
        res.send(profCourses);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Updates only the messages attribute of professor. Push new message
router.patch('/profcourses/:Email/to' , (req, res) => {
  let email = req.params.Email;
  ProfCourses.findOneAndUpdate({Email: email}, { $push : { 'Courses.0.messages': {'to': req.body.to, 'message': req.body.message} }} , {new: true}).then((profCourses) => {
    if(!profCourses) {
      return res.status(404).send();
    }
    return res.send(profCourses);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

// Get all the tas
router.get('/tas', (request, response) => {

  TA.find().then((tas) => {
    response.send(tas);
  }, (error) => {
    response.status(400).send(error);
  });
});

// Get all the tas of a given course
router.get('/tas/:course', (request, response) => {
  let course = request.params.course;
  TA.find({TAofCourse: course}).then((tas) => {
    if(tas.length == 0){
      response.status(404).send();
    }
    response.send(tas);
  }).catch((error) => {
    response.status(400).send();
  });
});

// Delete the TA
router.delete('/tas/:UFID' , (req, res) => {
  let UFID = req.params.UFID;
  TA.findOneAndRemove({UFID: UFID}).then((ta) => {
    if(!ta) {
      return res.status(404).send();
    }
    return res.send(ta);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

// Add new TA
router.post('/tas', (req, res) => {
  let newTA = new TA(req.body);
  newTA.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  })
});

module.exports = router;