var mongoose = require('mongoose');

var Student = mongoose.model('Student', {
  UFID: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  FirstName: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  LastName: {
    type: String,
    trim: true
  },
  GradOrUndergrad: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  SchoolYear: {
    type: Number,
    required: true
  },
  Sem: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  CourseMostInterestedIn: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  InterestLevel: {
    type: Number,
    required: true
  },
  Email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  ResumeLink: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

// var StudentNikita = new Student({
//   UFID: '17162351',
//   FirstName: 'Nikita',
//   LastName: 'Saxena',
//   GradOrUndergrad: 'Grad',
//   SchoolYear: 2,
//   Sem: 'Fall2017',
//   CourseMostInterestedIn: 'CN123',
//   InterestLevel: '4',
//   Email: 'nikitasaxena08@ufl.edu',
//   ResumeLink: 'xyzTest'
// });
//
// StudentNikita.save().then((doc) => {
//   console.log('Saved student ', doc);
// }, (error) => {
//   console.log('Unable to save student ', error);
// });

module.exports= { Student };
