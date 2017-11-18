const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Manager} = require('../SchemaModels/ManagerModel');

const testManager = {
    FirstName: 'Alice',
    LastName: 'Scott',
    Sem: 'Fall2017',
    Email: 'ad@ufl.edu',
    announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
    messages: [
      {
        from: "Manager X",
        message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
      },
      {
        from: "Prof1",
        message: "Can you please provide the list of students?"
      },
      {
        from: "Prof2",
        message: "I have added TAs to my subject"
      },
      {
        to: "Prof3",
        message: "How many TAs do you want?"
      }
    ]
  };

beforeEach((done) => {
  Manager.remove({}).then(() => {
    Manager.insertMany(testManager);
  }).then(() => done());
});

describe('POST /manager', () => {

  it('should create a new manager', (done) => {
    let managerTest = new Manager({
      FirstName: 'FirstNameManager1',
      LastName: 'LastNameManger1',
      Email: 'm1@ufl.edu',
      Sem: 'Fall2017',
      announcements: ["TA1 has released the grades for exam1", "TA2 is not taking office hours this week", "TA1 has is working on the evaluation of assignment 2"],
      messages: [
        {
          from: "Manager X",
          message: "Please send the list of TAs. I would have to assign TAs till tomorrow"
        },
        {
          from: "Prof1",
          message: "Can you please provide the list of students?"
        },
        {
          from: "Prof2",
          message: "I have added TAs to my subject"
        },
        {
          to: "Prof3",
          message: "How many TAs do you want?"
        }
      ]
    });
    request(app)
      .post('/api/manager')
      .send(managerTest)
      .expect(200)
      .expect((response) => {
        expect(response.body.Email).toBe(managerTest.Email);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }
        Manager.find({Email: managerTest.Email}).then((manager) => {
          expect(manager.length).toBe(1);
          done();
        }).catch((error) => {
          done(error);
        })
      });
  });

  it('should not add manager with empty body data', (done) => {
    request(app)
      .post('/api/manager')
      .send({})
      .expect(400)
      .end((error, response) => {
        if (error)
          return done(error);

        done();
      });
  });
});

describe('Get /manager', () => {
  it('should get manager', (done) => {
    request(app)
      .get('/api/manager')
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBe(1)
      })
      .end(done);
  })
});

describe('Get /manager/Email', () => {

  it('should return manager doc', (done) => {
    request(app)
      .get(`/api/manager/${testManager.Email}`)
      .expect(200)
      .expect((response) => {
        expect(response.body[0].Email).toBe(testManager.Email)
      })
      .end(done);
  });

  it('should return 404 if manager not found', (done) => {
    let falseManagerEmail = "invalidManaerEmail";
    request(app)
      .get(`/api/manager/${falseManagerEmail}`)
      .expect(404)
      .end(done);
  });
});