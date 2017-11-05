import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomeComponent } from './studenthome.component';
import {
  MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule, MdListModule,
  MdSidenavModule, MdButtonModule, MdDialogModule
} from '@angular/material';
import {DataService} from '../data.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import * as _ from 'underscore';
import {MdDialogRef, MD_DIALOG_DATA, MdDialog} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {SharedService} from '../shared.service';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpaChangeComponent } from '../studentprofile/studentprofile.component';
import { StudentprofileComponent } from '../studentprofile/studentprofile.component';
import { StudentComponent } from '../student/student.component';

describe('StudenthomeComponent', () => {
  let component: StudenthomeComponent;
  let fixture: ComponentFixture<StudenthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule, MdButtonModule,
        FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, MdDialogModule, MdListModule, RouterTestingModule],
      declarations: [ StudentComponent,  StudentprofileComponent, StudenthomeComponent,
        GpaChangeComponent,  TadetailsComponent, PdfViewerComponent ],
      providers: [DataService, MdDialogModule, SharedService, PdfViewerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
