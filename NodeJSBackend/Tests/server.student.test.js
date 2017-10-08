const expect = require('expect');
const request = require('supertest');

const { app } = require('../Server/server');
const { Student } = require('../SchemaModels/StudentModel');

beforeEach((done) => {
  Student.remove({}).then(() => done());
});

describe('POST /students', () => {

  it('should create a new student', (done) => {
    var StudentTest = new Student({
      UFID: '1234567890',
      FirstName: 'Test',
      LastName: 'Test',
      GradOrUndergrad: 'Undergrad',
      SchoolYear: 2,
      Sem: 'Fall2017',
      CourseMostInterestedIn: 'CN123',
      InterestLevel: '2',
      Email: 'testTest@ufl.edu',
      ResumeLink: 'resumeOfTest'
    });
    request(app)
      .post('/students')
      .send(StudentTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.UFID).toBe(StudentTest.UFID);
      })
      .end((error, response) => {
        if(error){
          return done(error);
        }
      Student.find().then((students) => {
        expect(students.length).toBe(1);
        expect(students[0].UFID).toBe(StudentTest.UFID);
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });

  it('should not add student with empty body data', (done) => {
    request(app)
      .post('/students')
      .send({})
      .expect(400)
      .end((error, response) => {
        if(error){
          return done(error);
        }
      Student.find().then((students) => {
        expect(students.length).toBe(0);
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });

});
