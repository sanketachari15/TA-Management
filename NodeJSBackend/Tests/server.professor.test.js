const expect = require('expect');
const request = require('supertest');
const  _ = require('lodash');

const { app } = require('../server');
const { Professor } = require('../SchemaModels/ProfessorModel');

const testProfessors = [{
  FirstName: 'Alin',
  LastName: 'Dobra',
  Sem: 'Fall2017',
  Email: 'ad@ufl.edu',
  WebsiteLink: 'xyzTestProf1',
  TeachingCourses: ['COP5615: Distributed Operating Systems', 'CEN5035: Software Engineering', 'CIS6930: Database Implementation']
},{
  FirstName: 'Beverly',
  LastName: 'Sanders',
  Sem: 'Fall2017',
  Email: 'bs@ufl.edu',
  WebsiteLink: 'xyzTestProf2',
  TeachingCourses: ['COP5556: Programming Language Principles', 'CIS6930: Concurrent Programming']
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
      .post('/api/professors')
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
      .post('/api/professors')
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
    .get('/api/professors')
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
    .get(`/api/professors/${testProfessors[0].Email}`)
    .expect(200)
    .expect((response) => {
      expect(response.body[0].Email).toBe(testProfessors[0].Email)
    })
    .end(done);
  });

  it('should return 404 if professor not found', (done) => {
    let falseProfEmail = "invalidProfessorEmail";
    request(app)
    .get(`/api/professors/${falseProfEmail}`)
    .expect(404)
    .end(done);
  });
});

describe('Delete professors/Email', () => {
  it('should remove a professor', (done) => {
    var profEmail = testProfessors[0].Email;
    request(app)
    .delete(`/api/professors/${profEmail}`)
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
    .delete(`/api/professors/${falseProfessorEmail}`)
    .expect(404)
    .end(done);
  });

describe('Delete /professors', () => {

    it('should delete the professor', (done) => {

        //----- Delete -----
        request(app)
            .delete(`/api/professors/${testProfessors[1].Email}`)
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
                    .get(`/api/professors/${testProfessors[1].Email}`)
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
            .delete(`/api/professors/${falseProfEmail}`)
            .expect(404)
            .end(done);
    });
});

describe('Patch /professors', () => {

    it('should update the existing professor\'s attribute ', (done) => {

        //----- Patch -----

        let newSem = "Fall2018";
        request(app)
            .patch(`/api/professors/${testProfessors[0].Email}`)
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
                    .get(`/api/professors/${testProfessors[0].Email}`)
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
            .patch(`/api/professors/${falseProfEmail}`)
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
            .put(`/api/professors/${testProfessors[0].Email}`)
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
                    .get(`/api/professors/${testProfessors[0].Email}`)
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
            .put(`/api/professors/${falseProfEmail}`)
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
          .post('/api/professors')
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
                  .get(`/api/professors/${prof.Email}`)
                  .expect(200)
                  .expect((response) => {
                      expect(response.body[0].Email).toBe(prof.Email);
                  })
                  .end((error, response) => {

                      if (error)
                          return done(error);

                      //----- Update/Patch -----

                      request(app)
                          .patch(`/api/professors/${prof.Email}`)
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
                                  .get(`/api/professors/${prof.Email}`)
                                  .expect(200)
                                  .expect((response) => {
                                      expect(response.body[0].Sem).toBe(newSem);
                                  })
                                  .end((error, response) => {

                                      if (error)
                                          return done(error);


                                      // ----- Delete -----

                                      request(app)
                                          .delete(`/api/professors/${prof.Email}`)
                                          .expect(200)
                                          .expect((response) => {
                                              expect(response.body.Sem).toBe(newSem);
                                          })
                                          .end((error, response) => {

                                              if (error)
                                                  return done(error);

                                              //----- Read -----

                                              request(app)
                                                  .get(`/api/professors/${prof.Email}`)
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
})
});
