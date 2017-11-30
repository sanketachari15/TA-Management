# TA-Management System

## Functionality

1) When a Professor logins:  
   -- Different tabs will be there for different courses.  
   -- For each course the professor will see the list of students available for him to choose as TAs.  
   -- The students list will be in sorted order according to their star ratings which is based on their GPA, interest etc.   
   -- The professor can drag, drop and remove the students he wants as TAs.  
   -- The professor can also see the latest announcements as wells as message his TAs.  
2) When a Student logins:  
   -- A student that has been selected as a TA can manage his profile here.  
   -- The student can update and upload his resume.  
   -- The student can upload his profile image, GPA etc.  
   -- The student can also see messages and announcements.  
3) When a TAManager logins:  
   -- There will be different cards for different courses.  
   -- For each course the manager can see what all students has the professor chosen for being the TA.  
   -- The manager can approve or reject the students for the TA position.


## Initial Setup

 Run following:

1. Download mongodb.
2. Configure db path. Run "mongod --dbpath /your/db/directory" from terminal.
3. Run "npm test". This will add initial values in db.
4. Run "npm install".
5. Open terminal. Run "npm start".
6. Open another terminal. Run "ng build --w".
7. Go to browser & check "localhost:3000".



## Running tests

### Back end testing    
    
1. Run unit test cases for backend   
    
    Follow the steps in order to test backend
    1. npm install
    2. npm test

### Front end testing
1.  Run unit test cases and show result in browser
    
    ng test 

2. Run existing test cases and calculate th code coverage. To see code coverage run the following command and then check coverage/index.html file

    ng test --cc 
    
### End to End Testing
1. Run e2e tests with the help of following steps. Execute these steps sequentially.
    1. npm install
    2. npm test
    3. npm start
    4. ng build --w
    5. ng e2e --no-serve
    
