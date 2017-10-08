const expect = require('expect');
const request = require('supertest');

const { app } = require('../Server/server');
const { Professor } = require('../SchemaModels/ProfessorModel');

beforeEach((done) => {
  Professor.remove({}).then(() => done());
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
      Professor.find().then((professors) => {
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
        expect(professors.length).toBe(0);
        done();
      }).catch((error) => {
        done(error);
      })
      });
  });

});
