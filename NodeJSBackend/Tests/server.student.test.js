const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Student } = require('../SchemaModels/StudentModel');

const testStudents = [{
  UFID: '123456789011',
  FirstName: 'John',
  LastName: 'Johansson',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering'],
  InterestLevel: '2',
  Email: 'johnjohansson@ufl.edu',
  ResumeLink: 'resumeOfTest1',
  GPA: 3.66
}, {
  UFID: '123456789012',
  FirstName: 'Jane',
  LastName: 'Zukerberg Johansson',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CIS6930: Database Implementation'],
  InterestLevel: '3',
  Email: 'jzj@ufl.edu',
  ResumeLink: 'resumeOfTest2',
  GPA: 3.75
},{
  UFID: '123456789011',
  FirstName: 'Nicolaus',
  LastName: 'Copernicus',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering'],
  InterestLevel: '2',
  Email: 'nc@ufl.edu',
  ResumeLink: 'resumeOfTest3',
  GPA: 3.5
}, {
  UFID: '123456789012',
  FirstName: 'Cecilia',
  LastName: 'Payne-Gaposchkin',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['CIS6930: Database Implementation'],
  InterestLevel: '3',
  Email: 'cpg@ufl.edu',
  ResumeLink: 'resumeOfTest4',
  GPA: 3.8
},{
  UFID: '123456789011',
  FirstName: 'Anna',
  LastName: 'K. Behrensmeyer',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering'],
  InterestLevel: '3',
  Email: 'akb@ufl.edu',
  ResumeLink: 'resumeOfTest5',
  GPA: 3.89
}, {
  UFID: '123456789012',
  FirstName: 'Frieda',
  LastName: 'Robscheit-Robbins',
  GradOrUndergrad: 'Undergrad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering', 'CIS6930: Database Implementation'],
  InterestLevel: '4',
  Email: 'frr@ufl.edu',
  ResumeLink: 'resumeOfTest6',
  GPA: 3.32
},{
  UFID: '123456789011',
  FirstName: 'Lene',
  LastName: 'Vestergaard Hau',
  GradOrUndergrad: 'grad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering', 'CIS6930: Database Implementation'],
  InterestLevel: '2',
  Email: 'lvh@ufl.edu',
  ResumeLink: 'resumeOfTest7',
  GPA: 3.91
}, {
  UFID: '123456789012',
  FirstName: 'Mildred',
  LastName: 'S. Dresselhaus',
  GradOrUndergrad: 'grad',
  SchoolYear: 2,
  Sem: 'Fall2017',
  CourseMostInterestedIn: ['COP5615: Distributed Operating Systems',  'CIS6930: Database Implementation'],
  InterestLevel: '5',
  Email: 'msd@ufl.edu',
  ResumeLink: 'resumeOfTest8',
  GPA: 3.88
},
  {
    UFID: '123456789011',
    FirstName: 'Patricia',
    LastName: 'S. Goldman-Rakic',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    CourseMostInterestedIn: ['CEN5035: Software Engineering'],
    InterestLevel: '5',
    Email: 'psgr@ufl.edu',
    ResumeLink: 'resumeOfTest9',
    GPA: 3.67
  }, {
    UFID: '123456789012',
    FirstName: 'Richard',
    LastName: 'Phillips Feynman',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    CourseMostInterestedIn: ['CEN5035: Software Engineering'],
    InterestLevel: '5',
    Email: 'frr@ufl.edu',
    ResumeLink: 'resumeOfTest10',
    GPA: 3.55
  },{
    UFID: '123456789011',
    FirstName: 'Werner',
    LastName: 'Karl Heisenberg',
    GradOrUndergrad: 'grad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    CourseMostInterestedIn: ['COP5615: Distributed Operating Systems'],
    InterestLevel: '5',
    Email: 'wkh@ufl.edu',
    ResumeLink: 'resumeOfTest11',
    GPA: 3.42
  }, {
    UFID: '123456789012',
    FirstName: 'Rita',
    LastName: 'Levi-Montalcini',
    GradOrUndergrad: 'grad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering', 'CIS6930: Database Implementation'],
    InterestLevel: '5',
    Email: 'rlm@ufl.edu',
    ResumeLink: 'resumeOfTest12',
    GPA: 3.75
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
      CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering', 'CIS6930: Database Implementation'],
      InterestLevel: '2',
      Email: 'testTest@ufl.edu',
      ResumeLink: 'resumeOfTest',
      GPA: 3.66
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
        expect(students.length).toBe(12);
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
      expect(response.body.length).toBe(12)
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
      expect(response.body[0].UFID).toBe(testStudents[0].UFID)
    })
    .end(done);
  });

  it('should return 404 if student not found', (done) => {
    var falseStudentUFID = "invalidUFID";
    request(app)
    .get(`/students/${falseStudentUFID}`)
    .expect(404)
    .end(done);
  });
});
