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

// var ProfDobra = new Professor({
//   FirstName: 'Alin',
//   LastName: 'Dobra',
//   Sem: 'Fall2017',
//   Email: 'alinDobra@ufl.edu',
//   WebsiteLink: 'xyzTest',
//   TeachingCourses: ['DOS', 'SE']
// });
//
// ProfDobra.save().then((doc) => {
//   console.log('Saved professor ', doc);
// }, (error) => {
//   console.log('Unable to save professor ', error);
// });

module.exports= { Professor };
