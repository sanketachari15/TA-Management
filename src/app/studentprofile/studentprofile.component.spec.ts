import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentprofileComponent } from './studentprofile.component';
import {
  MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule, MdListModule,
  MdSidenavModule, MdButtonModule, MdDialogClose
} from '@angular/material';
import {DataService} from '../data.service';
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
import { Observable } from 'rxjs/Observable';

describe('StudentprofileComponent', () => {
  let component: StudentprofileComponent;
  let fixture: ComponentFixture<StudentprofileComponent>;
  let testData;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule, MdSidenavModule,
        MdButtonModule, FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, MdDialogModule, MdListModule, RouterTestingModule],
      declarations: [ StudentComponent,  StudentprofileComponent, StudenthomeComponent,
        GpaChangeComponent,  TadetailsComponent, PdfViewerComponent],
      providers: [DataService, MdDialogModule, SharedService, PdfViewerComponent, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentprofileComponent);
    component = fixture.debugElement.componentInstance;
    testData = require('../../../test_data/mock-data.json');
    // fixture.detectChanges ();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Student list should not be empty', async(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getStudents')
    .and.returnValue(Promise.resolve(testData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.students).toBeTruthy();
      expect(component.students.length > 0).toBe(true);
    });
  }));

  // it('Logged in student should be selected with same id', () => {
  //   expect(component.student).toBeTruthy();
  //   expect(component.student.UFID).toBe('123456789011');
  //   expect(component.student.FirstName).toBe('John');
  //   expect(component.student.LastName).toBe('Johansson');
  // });

  // it('Student should have a resume', () => {
  //   expect(component.student).toBeTruthy();
  //   expect(component.student.resumeLink === '').toBe(false);
  // });

});
