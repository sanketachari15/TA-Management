const expect = require('expect');
const request = require('supertest');
const  _ = require('lodash');

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
    isTA: true,
    CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering'],
    InterestLevel: '2',
    Email: 'johnjohansson@ufl.edu',
    ResumeLink: 'testResumeLink',
    GPA: 3.66
  },
  {
    UFID: '123456789012',
    FirstName: 'Jane',
    LastName: 'Zukerberg Johansson',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CIS6930: Database Implementation'],
    InterestLevel: '3',
    isTA: true,
    TAofCourse: 'COP5615: Distributed Operating Systems',
    Email: 'jzj@ufl.edu',
    ResumeLink: 'resumeOfTest2',
    GPA: 3.75
  },
  {
    UFID: '123456789013',
    FirstName: 'Nicolaus',
    LastName: 'Copernicus',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CIS6930: Database Implementation'],
    InterestLevel: '3',
    isTA: true,
    TAofCourse: 'COP5615: Distributed Operating Systems',
    Email: 'nc@ufl.edu',
    ResumeLink: 'resumeOfTest3',
    GPA: 3.5
  },
  {
    UFID: '123456789019',
    FirstName: 'Patricia',
    LastName: 'S. Goldman-Rakic',
    GradOrUndergrad: 'Undergrad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'CEN5035: Software Engineering',
    isTA: true,
    CourseMostInterestedIn: ['CEN5035: Software Engineering'],
    InterestLevel: '5',
    Email: 'psgr@ufl.edu',
    ResumeLink: 'resumeOfTest9',
    GPA: 3.67
  },
  {
    UFID: '123456789022',
    FirstName: 'Rita',
    LastName: 'Levi-Montalcini',
    GradOrUndergrad: 'grad',
    SchoolYear: 2,
    Sem: 'Fall2017',
    TAofCourse: 'CIS6930: Database Implementation',
    isTA: true,
    CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering', 'CIS6930: Database Implementation'],
    InterestLevel: '5',
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

describe('Delete /tas/:UFID', () => {

  it('should delete the ta', (done) => {

    //----- Delete -----
    request(app)
      .delete(`/tas/${testTAs[1].UFID}`)
      .expect(200)
      .expect((response) => {
          expect(response.body.UFID).toBe(testTAs[1].UFID)
        }
      )
      .end((error, response) => {
        if (error)
          return done(error);

        //----- Read -----
        request(app)
          .get(`/tas/${testTAs[1].Email}`)
          .expect(404)
          .expect((response) => {
            expect(_.isEmpty(response.body)).toBe(true);
          })
          .end((error, response) => {
            if (error)
              return done(error);
            done();
          });
      });
  });

  it('should return 404 if tas\'s UFID not found', (done) => {
    let falseUFID = 89348303099039080938904389;
    request(app)
      .delete(`/tas/${falseUFID}`)
      .expect(404)
      .end(done);
  });
});

describe('POST /tas', () => {

  it('should create a new course', (done) => {
    let taTest = new TA({
      UFID: '123456789034',
      FirstName: 'Pablo',
      LastName: 'Escobar',
      GradOrUndergrad: 'Undergrad',
      SchoolYear: 2,
      Sem: 'Fall2017',
      TAofCourse: 'COP5615: Distributed Operating Systems',
      isTA: false,
      CourseMostInterestedIn: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering'],
      InterestLevel: '2',
      Email: 'pbebr@ufl.edu',
      ResumeLink: 'testResumeLink',
      GPA: 3.66
    });
    request(app)
      .post('/tas')
      .send(taTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(taTest.Email);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        TA.find({Email: taTest.Email}).then((ta) => {
          expect(ta.length).toBe(1);
          done();
        }).catch((error) => {
          done(error);
        })
      });
  });

  it('should not add ta with empty body data', (done) => {
    request(app)
      .post('/tas')
      .send({})
      .expect(400)
      .end((error, response) => {
        if (error)
          return done(error);

        done();
      });
  });
});
