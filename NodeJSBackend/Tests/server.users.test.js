const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { User } = require('../SchemaModels/UserModel');

describe('POST /users ', () => {
  it('should create a professor user', (done) => {
    var Email = 'ad@ufl.edu';
    var Password = 'ad';

    User.remove({}).then(() => {

      request(app)
        .post('/api/users')
        .send({ Email, Password})
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.Email).toBe(Email);
        })
        .end((err) => {
          if (err) {
            return done(err);
          }

          User.findOne({Email}).then((user) => {
            expect(user).toExist();
            expect(user.Password).toNotBe(Password);
            done();
          });
        });
      });

  });

  it('should create a student user', (done) => {
   var Email = 'jj@ufl.edu';
   var Password = 'jj';

   request(app)
     .post('/api/users')
     .send({ Email, Password})
     .expect(200)
     .expect((res) => {
       expect(res.headers['x-auth']).toExist();
       expect(res.body._id).toExist();
       expect(res.body.Email).toBe(Email);
     })
     .end((err) => {
       if (err) {
         return done(err);
       }

       User.findOne({Email}).then((user) => {
         expect(user).toExist();
         expect(user.Password).toNotBe(Password);
         done();
       });
     });
 });

 it('should create a ta user', (done) => {
  var Email = 'as@ufl.edu';
  var Password = 'as';

  request(app)
    .post('/api/users')
    .send({ Email, Password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.Email).toBe(Email);
    })
    .end((err) => {
      if (err) {
        return done(err);
      }

      User.findOne({Email}).then((user) => {
        expect(user).toExist();
        expect(user.Password).toNotBe(Password);
        done();
      });
    });
});

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/api/users')
      .send({
        Email: 'and',
        Password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/api/users')
      .send({
        Email: 'ad@ufl.edu',
        Password: 'Password123!'
      })
      .expect(400)
      .end(done);
  });
});
