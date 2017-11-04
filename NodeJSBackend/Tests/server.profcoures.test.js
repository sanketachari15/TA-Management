const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {ProfCourses} = require('../SchemaModels/ProfCoursesModel');

const testProfCourses = [
  {
    FullName: 'Alin Dobra',
    Sem: 'Fall2017',
    Email: 'ad@ufl.edu',
    Courses: [
      {
        name: "COP5615: Distributed Operating Systems",
        announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
        messages: [{
          from: "Manager X",
          message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
        },
          {
            from: "TA2",
            message: "Professor can you please provide the details for Grade policy for this subject ?"
          },
          {from: "TA1", message: "Please have a look into the list of students who want to retake the exam 2"}
        ]
      },
      {
        name: "CEN5035: Software Engineering",
        announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
        messages: [{
          from: "Manager X",
          message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
        },
          {
            from: "TA2",
            message: "Professor can you please provide the details for Grade policy for this subject ?"
          },
          {from: "TA1", message: "Please have a look into the list of students who want to retake the exam 2"}
        ]
      },
      {
        name: "CIS6930: Database Implementation",
        announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
        messages: [{
          from: "Manager X",
          message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
        },
          {
            from: "TA2",
            message: "Professor can you please provide the details for Grade policy for this subject ?"
          },
          {from: "TA1", message: "Please have a look into the list of students who want to retake the exam 2"}
        ]
      }
    ]
  },
  {
    FullName: 'Beverly Sanders',
    Sem: 'Fall2017',
    Email: 'bs@ufl.edu',
    Courses: [
      {
        name: "COP5556: Programming Language Principles",
        announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
        messages: [{
          from: "Manager X",
          message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
        },
          {
            from: "TA2",
            message: "Professor can you please provide the details for Grade policy for this subject ?"
          },
          {from: "TA1", message: "Please have a look into the list of students who want to retake the exam 2"}
        ]
      },
      {
        name: "CIS6930: Concurrent Programming",
        announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
        messages: [{
          from: "Manager X",
          message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
        },
          {
            from: "TA2",
            message: "Professor can you please provide the details for Grade policy for this subject ?"
          },
          {from: "TA1", message: "Please have a look into the list of students who want to retake the exam 2"}
        ]
      }
    ]
  }];

beforeEach((done) => {
  ProfCourses.remove({}).then(() => {
    ProfCourses.insertMany(testProfCourses);
  }).then(() => done());
});

describe('POST /profcourses', () => {

  it('should create a new course', (done) => {
    let ProfCoursesTest = new ProfCourses({
      FullName: 'TestProf1',
      Sem: 'Fall2017',
      Email: 'tp1@ufl.edu',
      Courses: [
        {
          name: "COP5615: Distributed Operating Systems",
          announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
          messages: [{
            from: "Manager X",
            message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
          },
            {
              from: "TA2",
              message: "Professor can you please provide the details for Grade policy for this subject ?"
            },
            {
              from: "TA1",
              message: "Please have a look into the list of students who want to retake the exam 2"
            }
          ]
        },
        {
          name: "CEN5035: Software Engineering",
          announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
          messages: [{
            from: "Manager X",
            message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
          },
            {
              from: "TA2",
              message: "Professor can you please provide the details for Grade policy for this subject ?"
            },
            {
              from: "TA1",
              message: "Please have a look into the list of students who want to retake the exam 2"
            }
          ]
        },
        {
          name: "CIS6930: Database Implementation",
          announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
          messages: [{
            from: "Manager X",
            message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
          },
            {
              from: "TA2",
              message: "Professor can you please provide the details for Grade policy for this subject ?"
            },
            {
              from: "TA1",
              message: "Please have a look into the list of students who want to retake the exam 2"
            }
          ]
        }
      ]
    });
    request(app)
      .post('/profcourses')
      .send(ProfCoursesTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(ProfCoursesTest.Email);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        ProfCourses.find({Email: ProfCoursesTest.Email}).then((profCourses) => {
          expect(profCourses.length).toBe(1);
          done();
        }).catch((error) => {
          done(error);
        })
      });
  });

  it('should not add course with empty body data', (done) => {
    request(app)
      .post('/profcourses')
      .send({})
      .expect(400)
      .end((error, response) => {
        if (error)
          return done(error);

        done();
      });
  });
});

describe('Get /professors', () => {
  it('should get all professor\'s courses', (done) => {
    request(app)
      .get('/profcourses')
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBe(2)
      })
      .end(done);
  })
});

describe('Get profcourses/Email', () => {

  it('should return profcourses doc', (done) => {
    request(app)
      .get(`/profcourses/${testProfCourses[0].Email}`)
      .expect(200)
      .expect((response) => {
        // console.log(response.body);
        expect(response.body[0].Email).toBe(testProfCourses[0].Email)
      })
      .end(done);
  });

  it('should return 404 if professor not found', (done) => {
    let falseProfEmail = "invalidProfessorEmail";
    request(app)
      .get(`/profcourses/${falseProfEmail}`)
      .expect(404)
      .end(done);
  });
});
