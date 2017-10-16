import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CourseComponent} from "../course/course.component";
import {FormsModule} from "@angular/forms";
import {MdListModule, MdInputModule, MdTooltipModule} from "@angular/material";

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, FormsModule, MdListModule, MdInputModule, MdTooltipModule],
      declarations: [ MessageComponent, CourseComponent]
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
