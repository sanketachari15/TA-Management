var mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
  Email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  Password: {
    type: String,
    required: true,
    minLength: 1
  },
  Tokens: [{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

module.exports= { User };
