const expect = require('expect');
const request = require('supertest');
const  _ = require('lodash');

const { app } = require('../server');
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
      expect(response.body.length).toBe(2)
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
      expect(response.body[0].Email).toBe(testProfessors[0].Email)
    })
    .end(done);
  });

  it('should return 404 if professor not found', (done) => {
    let falseProfEmail = "invalidProfessorEmail";
    request(app)
    .get(`/professors/${falseProfEmail}`)
    .expect(404)
    .end(done);
  });
});

describe('Delete professors/Email', () => {
  it('should remove a professor', (done) => {
    var profEmail = testProfessors[0].Email;
    request(app)
    .delete(`/professors/${profEmail}`)
    .expect(200)
    .expect((response) => {
      expect(response.body.Email).toBe(profEmail)
    })
    .end((error, response) => {
      if(error){
        return done(error);
      }
      Professor.find({Email: profEmail}).then((professors) => {
        expect(professors.length).toBe(0);
        done();
      }).catch((error) => done(error));
    });
  });

  it('should return 404 if professor not found', (done) => {
    var falseProfessorEmail = "invalidProfessorEmail"
    request(app)
    .delete(`/professors/${falseProfessorEmail}`)
    .expect(404)
    .end(done);
  });

describe('Delete /professors', () => {

    it('should delete the professor', (done) => {

        //----- Delete -----
        request(app)
            .delete(`/professors/${testProfessors[1].Email}`)
            .expect(200)
            .expect((response) => {
                    expect(response.body.Email).toBe(testProfessors[1].Email)
                }
            )
            .end((error, response) => {
                if (error)
                    return done(error);

                //----- Read -----
                request(app)
                    .get(`/professors/${testProfessors[1].Email}`)
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

    it('should return 404 if professor\'s email not found', (done) => {
        let falseProfEmail = "invalidProfessorEmail";
        request(app)
            .delete(`/professors/${falseProfEmail}`)
            .expect(404)
            .end(done);
    });
});

describe('Patch /professors', () => {

    it('should update the existing professor\'s attribute ', (done) => {

        //----- Patch -----

        let newSem = "Fall2018";
        request(app)
            .patch(`/professors/${testProfessors[0].Email}`)
            .send({"Sem": newSem})
            .expect(200)
            .expect((response) => {
                expect(response.body.Sem).toBe(newSem);
            })
            .end((error, response) => {

                if (error)
                    return done(error);

                //----- Read -----

                request(app)
                    .get(`/professors/${testProfessors[0].Email}`)
                    .expect(200)
                    .expect((response) => {
                        expect(response.body[0].Sem).toBe(newSem);
                    })
                    .end((error, response) => {
                        if (error)
                            return done(error);
                        done();
                    });
            });
    });

    it('should return 404 if professor not found', (done) => {
        let falseProfEmail = "invalidProfessorEmail";
        request(app)
            .patch(`/professors/${falseProfEmail}`)
            .expect(404)
            .end(done);
    });
});

describe('Put /professors', () => {

    it('should update the existing professor\'s attribute ', (done) => {

        let prof = new Professor({
            FirstName: 'PUTTestProf11',
            LastName: 'PUTTestProf11',
            Sem: 'Fall2017',
            Email: 'PUTTestProf11@ufl.edu',
            WebsiteLink: 'xyzPUTTestProf',
            TeachingCourses: ['TestSub1', 'TestSub2']
        });

        //----- Put -----
        request(app)
            .put(`/professors/${testProfessors[0].Email}`)
            .send(prof)
            .expect(200)
            .expect((response) => {
                expect(response.body.Email).toBe(prof.Email);
            })
            .end((error, response) => {
                if (error)
                    return done(error);

                //----- Read -----

                request(app)
                    .get(`/professors/${testProfessors[0].Email}`)
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

    it('should return 404 if professor not found', (done) => {
        let falseProfEmail = "invalidProfessorEmail";
        request(app)
            .put(`/professors/${falseProfEmail}`)
            .expect(404)
            .end(done);
    });
});

describe('CRUD /professors', () => {

  it('should create -> read -> update -> read -> delete -> read new professor', (done) => {
      let prof = new Professor({
          FirstName: 'CRUDTestProf11',
          LastName: 'CRUDTestProf11',
          Sem: 'Fall2017',
          Email: 'CRUDTestProf11@ufl.edu',
          WebsiteLink: 'xyzCRUDTestProf',
          TeachingCourses: ['TestSub1', 'TestSub2']
      });

      let newSem = "Spring2017";
      //----- Create -----
      request(app)
          .post('/professors')
          .send(prof)
          .expect(200)
          .expect((response) => {
              expect(response.body.Email).toBe(prof.Email);
          })
          .end((error, response) => {

              if (error)
                  return done(error);

              //----- Read -----
              request(app)
                  .get(`/professors/${prof.Email}`)
                  .expect(200)
                  .expect((response) => {
                      expect(response.body[0].Email).toBe(prof.Email);
                  })
                  .end((error, response) => {

                      if (error)
                          return done(error);

                      //----- Update/Patch -----

                      request(app)
                          .patch(`/professors/${prof.Email}`)
                          .send({"Sem": newSem})
                          .expect(200)
                          .expect((response) => {
                              expect(response.body.Sem).toBe(newSem);
                          })
                          .end((error, response) => {

                              if (error)
                                  return done(error);

                              //----- Read -----

                              request(app)
                                  .get(`/professors/${prof.Email}`)
                                  .expect(200)
                                  .expect((response) => {
                                      expect(response.body[0].Sem).toBe(newSem);
                                  })
                                  .end((error, response) => {

                                      if (error)
                                          return done(error);


                                      // ----- Delete -----

                                      request(app)
                                          .delete(`/professors/${prof.Email}`)
                                          .expect(200)
                                          .expect((response) => {
                                              expect(response.body.Sem).toBe(newSem);
                                          })
                                          .end((error, response) => {

                                              if (error)
                                                  return done(error);

                                              //----- Read -----

                                              request(app)
                                                  .get(`/professors/${prof.Email}`)
                                                  .expect(404)
                                                  .expect((response) => {
                                                      expect(_.isEmpty(response.body)).toBe(true);
                                                  })
                                                  .end((error, response) => {

                                                      if (error)
                                                          return done(error);
                                                      done()
                                                  });
                                          });
                                  });
                          });
                  });
          });
  });
});
