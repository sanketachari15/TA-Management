let mongoose = require('mongoose');

let TA = mongoose.model('TA', {
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
  TAofCourse: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  isTA:{
    type: Boolean,
    required: true,
    minLength: 1,
    trim: true
  },
  ResumeLink: {
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
  GPA:{
    type: Number,
    required: true,
    minLength: 1,
    trim: true
  },
});

module.exports= { TA };
