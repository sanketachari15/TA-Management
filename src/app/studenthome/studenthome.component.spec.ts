import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenthomeComponent } from './studenthome.component';
import {MdListModule, MdIconModule, MdTooltipModule, MdSlideToggleModule, MaterialModule} from "@angular/material";
import {SharedService} from "../shared.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {DataService} from "../data.service";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

describe('StudenthomeComponent', () => {
  let component: StudenthomeComponent;
  let fixture: ComponentFixture<StudenthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenthomeComponent],
      imports: [MdListModule, RouterTestingModule, MdIconModule, FormsModule, MdTooltipModule,
         HttpModule, HttpClientModule, MaterialModule, MdSlideToggleModule,],
      providers: [SharedService, DataService]
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
