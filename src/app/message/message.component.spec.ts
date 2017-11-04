import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CourseComponent} from "../course/course.component";
import {FormsModule} from "@angular/forms";
import {MdListModule, MdInputModule, MdTooltipModule} from "@angular/material";
import {DataService} from "../data.service";
import {SharedService} from "../shared.service";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, FormsModule, MdListModule, MdInputModule, MdTooltipModule, HttpModule, HttpClientModule],
      declarations: [ MessageComponent, CourseComponent],
      providers: [SharedService, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = '';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
