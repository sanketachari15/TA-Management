import { Component, OnInit, OnDestroy} from '@angular/core';
import {Angular2Csv} from "angular2-csv";
import {DataService} from "../data.service";
import * as _ from 'underscore';
import 'rxjs/add/operator/takeUntil';
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-professor',
  templateUrl: 'professor.component.html',
  styleUrls: ['professor.component.scss']
})
export class ProfessorComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  droppedItems = [];
  courses = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};

  students: any;
  studentSubscription: Subscription;
  coursesSubscription:Subscription;
  search:string;
  profCourses: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {

    this.dataService.getStudents()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(x => { this.students = x; });

    this.dataService.getProfCourses()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(x => { this.profCourses = x; });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    /*this.studentSubscription.unsubscribe();
    this.coursesSubscription.unsubscribe();*/
  }

  onItemDrop(event: any, courseNo: number) {
    this.droppedItems.push(event.dragData);
    this.courses[courseNo].push(event.dragData);
    return event.dragData;
  }

  getStudents(){  

    if(_.isEmpty(this.search)) 
      return this.students; 

    return _.chain(this.students) 
        .filter(student =>  student.name.toLowerCase().startsWith(this.search.toLowerCase())) 
        .value(); 
  }

  getColor(student: any) {
    if (this.droppedItems.indexOf(student) > -1) {
      return '#757575';
    }
    return 'white';
  }

  isAvailable(student: any) {
    if (this.droppedItems.indexOf(student) > -1) {
      // console.log(student.name + ": " + "false");
      return false;
    }
    return true;
  }

  removeTA(student: any, courseNo: number) {
    this.courses[courseNo].splice(this.courses[courseNo].indexOf(student), 1);
    this.droppedItems.splice(this.droppedItems.indexOf(student), 1);
  }

  getTAs(courseNo: number) {
    return this.courses[courseNo];
  }

  exportToCSV(courseNo: number) {

    if (!_.isEmpty(this.courses[courseNo])) {
      return new Angular2Csv(this.courses[courseNo], this.profCourses[courseNo], {headers: Object.keys(this.courses[courseNo][0])});
    }
  }

}
