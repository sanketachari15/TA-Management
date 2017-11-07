const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {StudentHome} = require('../SchemaModels/StudentHomeModel');

const testStudentHome = [
  {
    FullName: 'John Johansson',
    Sem: 'Fall2017',
    Email: 'johnjohansson@ufl.edu',
    Courses: [
      {
        name: "COP5615: Distributed Operating Systems",
        announcements: ["Professor has requested a meeting", "Professor is not taking office hours this week", "Grades are now released for assignment 2"],
        messages: [{
          from: "Professor X",
          message: "Please send me the list of students whose presentations are due friday."
        },
          {
            from: "Student 1",
            message: "Can i please get an extention on assignment 3?"
          },
          {from: "Student 2", message: "I need to request a meeting with you during TA hours tommorow."}
        ]
      }
    ]
  }];

beforeEach((done) => {
  StudentHome.remove({}).then(() => {
    StudentHome.insertMany(testStudentHome);
  }).then(() => done());
});

describe('POST /studenthome', () => {

  it('should create a new studenthome', (done) => {
    let StudentHomeTest = new StudentHome({
      FullName: 'TAGuy1',
      Sem: 'Fall2017',
      Email: 'ta1@ufl.edu',
      Courses: [
        {
          name: "COP5615: Distributed Operating Systems",
          announcements: ["Professor has requested a meeting", "Professor is not taking office hours this week", "Grades are now released for assignment 2"],
          messages: [{
            from: "Professor X",
            message: "Please send me the list of students whose presentations are due friday."
          },
            {
              from: "Student 1",
              message: "Can i please get an extention on assignment 3?"
            },
            {from: "Student 2", message: "I need to request a meeting with you during TA hours tommorow."}
          ]
        }
      ]
    });
    request(app)
      .post('/studenthome')
      .send(StudentHomeTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(StudentHomeTest.Email);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        StudentHome.find({Email: StudentHomeTest.Email}).then((studentHome) => {
          expect(studentHome.length).toBe(1);
          done();
        }).catch((error) => {
          done(error);
        })
      });
  });

  it('should not add course with empty body data', (done) => {
    request(app)
      .post('/studenthome')
      .send({})
      .expect(400)
      .end((error, response) => {
        if (error)
          return done(error);

        done();
      });
  });
});
