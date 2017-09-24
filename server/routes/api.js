/**
 * Created by sanket on 9/8/17.
 */
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Uncomment following code for connecting MySQL database
/*var connection  = mysql.createConnection({
    host: 'localhost',
    // port: 8889,
    // socketPath: '/tmp/mysql.sock', // '/Applications/MAMP/tmp/mysql/mysql.sock',
    user: 'root',
    password: 'password',
    database: 'ta_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...')
});*/


const students = [
  {id: 1, name: "John johansson"}, {id: 2, name: "Jane zuckerberg johansson"}, {id: 3, name: "Nicolaus Copernicus"}, {id: 4, name: "Cecilia Payne-Gaposchkin "},
  {id: 5, name: "Anna K. Behrensmeyer"}, {id: 6, name: "Frieda Robscheit-Robbins"}, {id: 7, name: "Lene Vestergaard Hau"}, {id: 8, name: "Mildred S. Dresselhaus"}, {id: 9, name: "Patricia S. Goldman-Rakic"}, {id: 10, name: "Richard Phillips Feynman"}, {id: 11, name: "Werner Karl Heisenberg"}, {id: 12, name: "Sir Ernest Rutherford"},
  {id: 13, name: "Rita Levi-Montalcini"}, {id: 14, name: "Jake"}];

const profs = [{id:1, "name": "Alin Dobra"}, {id:2, "name": "Beverly Sanders"}, {id:3, "name": "Alper Ungor"}]  
const profCourses = [{"id":1,
                      "name": "Alin Dobra",
                      "courses":
                          ["COP5615: Distributed Operating Systems",
                           "CEN5035: Software Engineering", 
                           "CIS6930: Database Implementation"]}, 
                     {"id": 2,
                     "name": "Beverly Sanders",
                     "courses":
                          ["COP5556: Programming Language Principles",
                            "CIS6930: Concurrent Programming"]}
                    ];

router.get('/students', (req, res) => {
  res.json(students);
})

var getCourses = function (profName) {
  var prof;
  for (var index in profCourses){
    prof = profCourses[index];
    if (prof.name === profName)
          return prof.courses;
  }

  return [];
};

router.get('/prof-courses', (req, res) => {
  res.json( getCourses(req.query.prof));
})

module.exports = router;
