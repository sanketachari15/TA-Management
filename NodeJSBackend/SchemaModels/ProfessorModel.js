var mongoose = require('mongoose');

var Professor = mongoose.model('Professor', {
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
  Email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  WebsiteLink: {
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
  TeachingCourses: {
    type: [String]
  }
});

module.exports= { Professor };
