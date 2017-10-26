/**
 * Created by sanket on 10/25/17.
 */

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messages = new Schema({
    from:{
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    message: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
},{_id: false});


let courses =  new Schema({

    name:{
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },

    announcements:{
        type: [String]
    },

    messages:{
        type: [messages]
    }


},{_id: false});

let ProfCourses = mongoose.model('ProfCourses', {

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

module.exports = {ProfCourses};