const expect = require('expect');
const request = require('supertest');

const { app } = require('../Server/server');
const { Course } = require('../SchemaModels/CourseModel');

beforeEach((done) => {
  Course.remove({}).then(() => done());
});

describe('POST /addCourse', () => {
  it('should create a new course', (done) => {
    var CourseTest = new Course({
      Code: 'Test123',
      Name: 'TestCourse',
      Sem: 'Fall2017',
      Department: 'CSE',
      CourseCredits: 3,
      ProfessorFullName: 'TestProf',
      ProfessorEmail: 'TestProfTestProf@ufl.edu',
      CourseScheduleLink: 'courseScheduleTest',
      CourseSyllabusLink: 'courseSyllabusTest',
      MaxStudents: 50,
      TAs: ['17162351']
    });

    request(app)
      .post('/addCourse')
      .send(CourseTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(CourseTest.Email);
      })
      .end((error, response) => {
        if(error){
          return done(error);
        }

      Course.find().then((courses) => {
        expect(courses.length).toBe(1);
        expect(courses[0].Code).toBe(CourseTest.Code)
        done();
      }).catch((error) => {
        done(error);
      })
      });

  });
});
