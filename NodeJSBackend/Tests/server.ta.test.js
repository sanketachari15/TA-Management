const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {TA} = require('../SchemaModels/TAModel');

const testTAs = [
  {
    UFID: '123456789011',
    FirstName: 'John',
    LastName: 'Johansson',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'COP5615: Distributed Operating Systems',
    Email: 'johnjohansson@ufl.edu',
    GPA: 3.66
  },
  {
    UFID: '123456789012',
    FirstName: 'Jane',
    LastName: 'Zukerberg Johansson',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'COP5615: Distributed Operating Systems',
    Email: 'jzj@ufl.edu',
    ResumeLink: 'resumeOfTest2',
    GPA: 3.75
  },
  {
    UFID: '123456789011',
    FirstName: 'Nicolaus',
    LastName: 'Copernicus',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'COP5615: Distributed Operating Systems',
    Email: 'nc@ufl.edu',
    ResumeLink: 'resumeOfTest3',
    GPA: 3.5
  },
  {
    UFID: '123456789011',
    FirstName: 'Patricia',
    LastName: 'S. Goldman-Rakic',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'CEN5035: Software Engineering',
    Email: 'psgr@ufl.edu',
    ResumeLink: 'resumeOfTest9',
    GPA: 3.67
  },
  {
    UFID: '123456789012',
    FirstName: 'Rita',
    LastName: 'Levi-Montalcini',
    GradOrUndergrad: 'grad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'CIS6930: Database Implementation',
    Email: 'rlm@ufl.edu',
    ResumeLink: 'resumeOfTest12',
    GPA: 3.75
  }
];

beforeEach((done) => {
  TA.remove({}).then(() => {
    TA.insertMany(testTAs);
  }).then(() => done());
});

describe('Get /tas', () => {
  it('should get all tas', (done) => {
    request(app)
      .get('/tas')
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBe(5)
      })
      .end(done);
  })
});


describe('Get tas/course', () => {
  it('should return TAa of course', (done) => {
    request(app)
      .get(`/tas/${testTAs[0].TAofCourse}`)
      .expect(200)
      .expect((response) => {
        expect(response.body[0].TAofCourse).toBe(testTAs[0].TAofCourse);
        expect(response.body.length).toBe(3);
      })
      .end(done);
  });

  it('should return 404 if ta not found', (done) => {
    let falseTAofCourse = "invalidUFID";
    request(app)
      .get(`/tas/${falseTAofCourse}`)
      .expect(404)
      .end(done);
  });
});