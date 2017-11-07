/**
 * Created by Prem on 11/07/17.
 */

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


let courses = new Schema({

  name: {
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

}, {_id: false});

let StudentHome = mongoose.model('StudentHome', {

  FullName: {
    type: String,
    required: true,
    minLength: 1,
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

  Courses: {
    type: [courses],
    required: true,
    minLength: 1,
    trim: true
  },

});

module.exports = {StudentHome};
