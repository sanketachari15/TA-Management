import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorComponent } from './professor.component';
import {MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule} from "@angular/material";
import {DndModule, DragDropService, DragDropConfig} from "ng2-dnd";
import {DataService} from "../data.service";
import {StarRatingModule} from "angular-star-rating";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import * as _ from 'underscore';
import {DebugElement} from "@angular/core";

describe('ProfessorComponent', () => {
  let component: ProfessorComponent;
  let fixture: ComponentFixture<ProfessorComponent>;

  const students = [
    {id: 1, name: "John johansson", gpa: "3.6", interest: 5}, {id: 2, name: "Jane zuckerberg johansson", gpa: "3.1", interest: 2}, {id: 3, name: "Nicolaus Copernicus",gpa: "3.6", interest: 5}, {id: 4, name: "Cecilia Payne-Gaposchkin ",gpa: "3.6", interest: 3},
    {id: 5, name: "Anna K. Behrensmeyer", gpa: "3.5", interest: 4}, {id: 6, name: "Frieda Robscheit-Robbins", gpa: "3.2", interest: 4}, {id: 7, name: "Lene Vestergaard Hau", gpa: "3.8", interest: 3}, {id: 8, name: "Mildred S. Dresselhaus", gpa: "3.7", interest: 5}, {id: 9, name: "Patricia S. Goldman-Rakic", gpa: "3.7", interest: 4}, {id: 10, name: "Richard Phillips Feynman", gpa: "3.6", interest: 5}, {id: 11, name: "Werner Karl Heisenberg", gpa: "3.8", interest: 4.5}, {id: 12, name: "Sir Ernest Rutherford", gpa: "3.9", interest: 4.9},
    {id: 13, name: "Rita Levi-Montalcini", gpa: "3.4", interest: 2}, {id: 14, name: "Jake", gpa: "3.4", interest: 5}];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, DndModule.forRoot(), StarRatingModule.forRoot(), MdTooltipModule,
                MdIconModule, MdMenuModule, FormsModule, HttpModule, HttpClientModule],
      declarations: [ ProfessorComponent ],
      providers: [DragDropService, DragDropConfig, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(angular.mock.module());

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have student lists', () => {
    expect(students).toBeTruthy();
    expect(students.length > 0).toBe(true);
  });

  it('students should be available', () => {

    _.forEach(students, function (student) {
      expect(student).toBeTruthy();
      expect(component.isAvailable(student)).toBe(true);
    });
  });

  it(' should not have TAs initially', () => {
    _.forEach(Object.keys(component.courses), function (key) {
      expect(component.getTAs(key).length).toBe(0);
    });
  });

});
