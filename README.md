# TA-Management 

**TA Management** is a Application which can be used by Professor - to add and remove new TAs, Manager - to approve or reject TAs added by the Professor, and Student TA - to manage his Profile and get Notifications.

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
    

## User Stories

The following **required** functionality is completed:

### For Professor
- [x] Professor should be able to add and remove students as TAs for a particular course, added students should be disabled in the list.
- [x] Professor should be able to search a particular student from the list and add him as TA
- [x] If professor added a student in 1 course he/she should be disabled in other courses.
- [x] Professor should be able to view announcements and notifications.
- [x] Professor should be able to message TAs.
- [x] Student selected for TAs by the Professor should persist, when professor login back again, They should be there.
- [x] Professor Should be able to download selected TA info in form of an excel sheet.

## Video Walkthrough 

Here's a walkthrough of implemented user stories:

- Professor should be able to add and remove students as TAs for a particular course, added students should be disabled in the list
<img src='gifs/prof_add_remove.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


- Professor should be able to search a particular student from the list and add him as TA
<img src='gifs/prof_search.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


- If professor added a student in 1 course he/she should be disabled in other courses.
<img src='gifs/prof_stu_disab_other_corses.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


- Professor should be able to view announcements and notifications.
<img src='gifs/prof_view_Notifications.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


- Professor should be able to message TAs.
<img src='gifs/prof_message_tas.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


- Student selected for TAs by the Professor should persist, when professor login back again, They should be there.
<img src='gifs/prof_stud_persist.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


- Professor Should be able to download selected TA info in form of an excel sheet.
<img src='gifs/prof_download_ta.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [2017] [University Of Florida]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
