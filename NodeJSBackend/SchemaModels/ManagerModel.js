let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messages = new Schema({
  from: {
    type: String,
    required: false,
    minLength: 1,
    trim: true
  },
  to: {
    type: String,
    required: false,
    minLength: 1,
    trim: true
  },
  message: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
}, {_id: false});

let Manager = mongoose.model('Manager', {
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
  Sem: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  announcements: {
    type: [String]
  },
  messages: {
    type: [messages]
  },
  files: {
    type: [String]
  }
});

module.exports = {Manager};