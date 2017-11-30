import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentprofileComponent } from './studentprofile.component';
import {
  MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule, MdListModule,
  MdSidenavModule, MdButtonModule, MdDialogClose
} from '@angular/material';
import {DataService} from '../data.service';
import {FileUploadService} from '../file-upload.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import * as _ from 'underscore';
import {MdDialogModule, MdDialogRef, MD_DIALOG_DATA, MdDialog} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {SharedService} from '../shared.service';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpaChangeComponent } from './studentprofile.component';
import { StudenthomeComponent } from '../studenthome/studenthome.component';
import { StudentComponent } from '../student/student.component';

describe('StudentprofileComponent', () => {

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

  let component: StudentprofileComponent;
  let fixture: ComponentFixture<StudentprofileComponent>;
  const resumeLink = '../../assets/pdf/resum.pdf';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule, MdSidenavModule,
        MdButtonModule, FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, MdDialogModule, MdListModule, RouterTestingModule],
      declarations: [ StudentComponent,  StudentprofileComponent, StudenthomeComponent,
        GpaChangeComponent,  TadetailsComponent, PdfViewerComponent],
      providers: [DataService, FileUploadService, MdDialogModule, SharedService, PdfViewerComponent, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentprofileComponent);
    component = fixture.componentInstance;
    component.resumeLink = resumeLink;
    component.students = students;
    component.student = students[0];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the student resume', () => {
    expect(component).toBeTruthy();
  });

it('Student list should not be empty', async(() => {
    expect(component.students).toBeTruthy();
    expect(!((component.students[0].LastName).toBeNull));
    expect(!((component.students[0].LastName).toBeUndefined));
    expect((component.students[0].LastName).toBeTruthy);
  }));

it('Logged in student should be selected with same id', () => {
  expect(component.student).toBeTruthy();
  expect(component.student.UFID).toBe(123456789011);
  expect(component.student.FirstName).toBe('John');
  expect(component.student.LastName).toBe('Johansson');
});

it('Student should have a resume', () => {
  expect(component.student).toBeTruthy();
  expect(component.student.resumeLink === '').toBe(false);
});
});
