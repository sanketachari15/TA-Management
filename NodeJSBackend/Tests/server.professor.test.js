const expect = require('expect');
const request = require('supertest');

const { app } = require('../Server/server');
const { Professor } = require('../SchemaModels/ProfessorModel');

const testProfessors = [{
  FirstName: 'TestProf1',
  LastName: 'TestProf1',
  Sem: 'Fall2017',
  Email: 'TestProf1TestProf1@ufl.edu',
  WebsiteLink: 'xyzTestProf1',
  TeachingCourses: ['TestSub11', 'TestSub12']
},{
  FirstName: 'TestProf2',
  LastName: 'TestProf2',
  Sem: 'Fall2017',
  Email: 'TestProf2TestProf2@ufl.edu',
  WebsiteLink: 'xyzTestProf2',
  TeachingCourses: ['TestSub21', 'TestSub22']
}];

// beforeEach((done) => {
//   Professor.remove({}).then(() => done());
// });

beforeEach((done) => {
    Professor.remove({}).then(() => {
    Professor.insertMany(testProfessors);
  }).then(() => done());
});


describe('POST /professors', () => {

  it('should create a new professor', (done) => {
    var ProfessorTest = new Professor({
      FirstName: 'TestProf',
      LastName: 'TestProf',
      Sem: 'Fall2017',
      Email: 'TestProfTestProf@ufl.edu',
      WebsiteLink: 'xyzTestProf',
      TeachingCourses: ['TestSub1', 'TestSub2']
    });
    request(app)
      .post('/professors')
      .send(ProfessorTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(ProfessorTest.Email);
      })
      .end((error, response) => {
        if(error){
          return done(error);
        }
      Professor.find({Email: 'TestProfTestProf@ufl.edu'}).then((professors) => {
        expect(professors.length).toBe(1);
        expect(professors[0].Email).toBe(ProfessorTest.Email)
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });

  it('should not add professor with empty body data', (done) => {
    request(app)
      .post('/professors')
      .send({})
      .expect(400)
      .end((error, response) => {
        if(error){
          return done(error);
        }
      Professor.find().then((professors) => {
        expect(professors.length).toBe(2);
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });
});

describe('Get /professors', () => {
  it('should get all professors', (done) => {
    request(app)
    .get('/professors')
    .expect(200)
    .expect((response) => {
      expect(response.body.professors.length).toBe(2)
    })
    .end(done);
  })
});

describe('Get professors/Email', () => {
  it('should return professor doc', (done) => {
    request(app)
    .get(`/professors/${testProfessors[0].Email}`)
    .expect(200)
    .expect((response) => {
      expect(response.body.professor[0].Email).toBe(testProfessors[0].Email)
    })
    .end(done);
  });

  it('should return 404 if professor not found', (done) => {
    var falseProfEmail = "invalidProfessorEmail"
    request(app)
    .get(`/professors/${falseProfEmail}`)
    .expect(404)
    .end(done);
  });
});
