var mongoose = require('mongoose');

var Course = mongoose.model('Course', {
  Code: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  Name: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  Sem: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  Department: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  CourseCredits: {
    type: Number,
    required: true
  },
  ProfessorFullName: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  ProfessorEmail: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  CourseScheduleLink: {
    type: String,
    minLength: 1,
    trim: true
  },
  CourseSyllabusLink: {
    type: String,
    minLength: 1,
    trim: true
  },
  MaxStudents: {
    type: Number
  },
  TAs:{
    type: [String] //UFIDs of the students
  }
});

// var courseSE = new Course({
//   Code: 'CN123',
//   Name: 'SE',
//   Sem: 'Fall2017',
//   Department: 'CSE',
//   CourseCredits: 3,
//   ProfessorFullName: 'Alin Dobra',
//   ProfessorEmail: 'alinDobra@ufl.edu',
//   CourseScheduleLink: 'courseScheduleTest',
//   CourseSyllabusLink: 'courseSyllabusTest',
//   MaxStudents: 50,
//   TAs: ['17162351']
// });
//
// courseSE.save().then((doc) => {
//   console.log('Saved course ', doc);
// }, (error) => {
//   console.log('Unable to save course ', error);
// });

module.exports= { Course };
