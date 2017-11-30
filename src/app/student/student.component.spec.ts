import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdMenuModule,
  MdToolbarModule,
  MdSelectModule,
  MdDialogModule,
  MdDialog,
  MdTabsModule,
  MdSidenavModule,
  MdTooltipModule,
  MdListModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedService} from "../shared.service";
import { StudentprofileComponent } from '../studentprofile/studentprofile.component';
import { CommonModule } from '@angular/common';
import { StudenthomeComponent } from '../studenthome/studenthome.component';
import { GpaChangeComponent } from '../studentprofile/studentprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import {DataService} from "../data.service";
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import {FileUploadService} from '../file-upload.service';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdButtonModule,
        MdCardModule,
        MdIconModule,
        MdMenuModule,
        MdToolbarModule,
        MdSelectModule,
        MdDialogModule,
        MdTabsModule,
        MdSidenavModule,
        MdTooltipModule,
        MdListModule, BrowserAnimationsModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ StudentComponent,  StudentprofileComponent, StudenthomeComponent,
        GpaChangeComponent,  TadetailsComponent, PdfViewerComponent ],
        providers: [SharedService, FileUploadService, MdDialogModule, MdDialog, MdSidenavModule,
          PdfViewerComponent, DataService, HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
