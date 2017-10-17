const expect = require('expect');
const request = require('supertest');

const { app } = require('../Server/server');
const { Student } = require('../SchemaModels/StudentModel');

const testStudents = [{
  UFID: '123456789011',
  FirstName: 'Test1',
  LastName: 'Test1',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: 'CN123',
  InterestLevel: '2',
  Email: 'test1Test1@ufl.edu',
  ResumeLink: 'resumeOfTest1'
}, {
  UFID: '123456789012',
  FirstName: 'Test2',
  LastName: 'Test2',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: 'CN123',
  InterestLevel: '3',
  Email: 'test2Test2@ufl.edu',
  ResumeLink: 'resumeOfTest2'
}];

beforeEach((done) => {
  Student.remove({}).then(() => {
    Student.insertMany(testStudents);
  }).then(() => done());
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
      Student.find({UFID:'1234567890'}).then((students) => {
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
        expect(students.length).toBe(2);
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });
});

describe('Get /students', () => {
  it('should get all students', (done) => {
    request(app)
    .get('/students')
    .expect(200)
    .expect((response) => {
      expect(response.body.students.length).toBe(2)
    })
    .end(done);
  })
});

describe('Get students/UFID', () => {
  it('should return student doc', (done) => {
    request(app)
    .get(`/students/${testStudents[0].UFID}`)
    .expect(200)
    .expect((response) => {
      expect(response.body.student[0].UFID).toBe(testStudents[0].UFID)
    })
    .end(done);
  });

  it('should return 404 if student not found', (done) => {
    var falseStudentUFID = "invalidUFID"
    request(app)
    .get(`/students/${falseStudentUFID}`)
    .expect(404)
    .end(done);
  });
});
