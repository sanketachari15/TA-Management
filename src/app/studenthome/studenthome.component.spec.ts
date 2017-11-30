import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomeComponent } from './studenthome.component';
import {MdListModule, MdIconModule, MdTooltipModule, MdSlideToggleModule, MaterialModule} from "@angular/material";
import {SharedService} from "../shared.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {DataService} from "../data.service";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {FileUploadService} from '../file-upload.service';


describe('StudenthomeComponent', () => {
  let component: StudenthomeComponent;
  let fixture: ComponentFixture<StudenthomeComponent>;
  const studentHome = [
  {FullName: 'John Johansson', Sem: 'Fall2017', Email: 'johnjohansson@ufl.edu', Courses: [{name: "COP5615: Distributed Operating Systems",
  announcements: ["Professor has requested a meeting", "Professor is not taking office hours this week", 
  "Grades are now released for assignment 2"],
  messages: [{from: "Professor X",message: "Please send me the list of students whose presentations are due friday."},
             {from: "Student 1", message: "Can i please get an extention on assignment 3?"},
             {from: "Student 2", message: "I need to request a meeting with you during TA hours tommorow."}]
  }
  ]}];
  const students = [
  {UFID: 123456789011, FirstName: "John", LastName: "Johansson", gpa: "3.6", resumeLink: "../../assets/pdf/resum.pdf"}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenthomeComponent],
      imports: [MdListModule, RouterTestingModule, MdIconModule, FormsModule, MdTooltipModule,
         HttpModule, HttpClientModule, MaterialModule, MdSlideToggleModule],
      providers: [SharedService, DataService, FileUploadService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenthomeComponent);
    component = fixture.componentInstance;
    component.studentCourses = studentHome[0].Courses;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('student display home for logged in student', () => {
    const studentName = component.taName;
    expect(studentName).toBe('John Johansson');
  });

  it('student home should have announcements', () => {
    const announcements = component.getAnnouncements();
    expect(!(announcements).toBeNull);
    expect((announcements).toBeTruthy);
  });

  it('student home should have messages', () => {
    const messages = component.getAnnouncements();
    expect(!(messages).toBeNull);
    expect((messages).toBeTruthy);
  });
});
