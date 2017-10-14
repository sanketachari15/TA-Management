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
import {MdDialogModule, MdDialogRef, MD_DIALOG_DATA, MdDialog} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {SharedService} from "../shared.service";

describe('ProfessorComponent', () => {
  let component: ProfessorComponent;
  let fixture: ComponentFixture<ProfessorComponent>;

  const students = [
    {id: 1, name: "John johansson", gpa: "3.6", interest: 5}, {id: 2, name: "Jane zuckerberg johansson", gpa: "3.1", interest: 2}, {id: 3, name: "Nicolaus Copernicus",gpa: "3.6", interest: 5}, {id: 4, name: "Cecilia Payne-Gaposchkin ",gpa: "3.6", interest: 3},
    {id: 5, name: "Anna K. Behrensmeyer", gpa: "3.5", interest: 4}, {id: 6, name: "Frieda Robscheit-Robbins", gpa: "3.2", interest: 4}, {id: 7, name: "Lene Vestergaard Hau", gpa: "3.8", interest: 3}, {id: 8, name: "Mildred S. Dresselhaus", gpa: "3.7", interest: 5}, {id: 9, name: "Patricia S. Goldman-Rakic", gpa: "3.7", interest: 4}, {id: 10, name: "Richard Phillips Feynman", gpa: "3.6", interest: 5}, {id: 11, name: "Werner Karl Heisenberg", gpa: "3.8", interest: 4.5}, {id: 12, name: "Sir Ernest Rutherford", gpa: "3.9", interest: 4.9},
    {id: 13, name: "Rita Levi-Montalcini", gpa: "3.4", interest: 2}, {id: 14, name: "Jake", gpa: "3.4", interest: 5}];

  const profCourses = [{"id":1,
    "name": "Alin Dobra",
    "courses":
        ["COP5615: Distributed Operating Systems",
          "CEN5035: Software Engineering",
          "CIS6930: Database Implementation"]},
    {"id": 2,
      "name": "Beverly Sanders",
      "courses":
          ["COP5556: Programming Language Principles",
            "CIS6930: Concurrent Programming"]}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, DndModule.forRoot(), StarRatingModule.forRoot(), MdTooltipModule,
                MdIconModule, MdMenuModule, FormsModule, HttpModule, HttpClientModule, MdDialogModule],
      declarations: [ ProfessorComponent, TadetailsComponent, PdfViewerComponent],
      providers: [DragDropService, DragDropConfig, DataService, MdDialogModule, SharedService, PdfViewerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.students = students;
    component.profCourses = profCourses;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have student lists', () => {
    expect(component.students).toBeTruthy();
    expect(component.students.length > 0).toBe(true);
  });

  it('should  have students available', () => {

    _.forEach(component.students, function (student) {
      expect(student).toBeTruthy();
      expect(component.isAvailable(student)).toBe(true);
    });
  });

  it(' should not have TAs initially', () => {
    _.forEach(Object.keys(component.courses), function (key) {
      expect(component.getTAs(key).length).toBe(0);
    });
  });


  it('should disable availability of students after selection', () => {
    expect(component.students).toBeTruthy();
    let shuffledStudents = component.students.sort(() => 0.5 - Math.random());
    let courseNo = 0;
    component.droppedItems.push(shuffledStudents[0]);
    component.courses[courseNo].push(shuffledStudents[0]);
    component.droppedItems.push(shuffledStudents[1]);
    component.courses[courseNo].push(shuffledStudents[1]);

    expect(component.isAvailable(shuffledStudents[0])).toBe(false);
    expect(component.isAvailable(shuffledStudents[1])).toBe(false);
  });

  it('should remove the added TAs', () => {
    let shuffledStudents = component.students.sort(() => 0.5 - Math.random());
    let courseNo = 0;
    component.droppedItems.push(shuffledStudents[0]);
    component.courses[courseNo].push(shuffledStudents[0]);
    component.droppedItems.push(shuffledStudents[1]);
    component.courses[courseNo].push(shuffledStudents[1]);

    component.removeTA(shuffledStudents[0], 0);
    component.removeTA(shuffledStudents[0], 1);

    expect(component.isAvailable(shuffledStudents[0])).toBe(true);
    expect(component.isAvailable(shuffledStudents[1])).toBe(true);
  });

  it('should not export to CSV if students list is empty', () => {
    let courseNo = 0;
    expect(component.exportToCSV(courseNo)).toBe(false);
  });

});
