import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {Angular2Csv} from 'angular2-csv';
import {DataService} from '../data.service';
import * as _ from 'underscore';
import 'rxjs/add/operator/takeUntil';
import {Subject, Subscription} from 'rxjs/Rx';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-professor',
  templateUrl: 'professor.component.html',
  styleUrls: ['professor.component.scss']
})
export class ProfessorComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  header = "Welcome Professor";

  droppedItems = [];
  courses = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};

  students: any;
  search: string;
  profCourses: any;

  constructor(private dataService: DataService, private sharedService: SharedService, public dialog: MdDialog) {
  }

  ngOnInit() {

    this.sharedService.changeHeader(this.header);

    this.dataService.getStudents()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            (x) =>  this.students = x,
            (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
            () => console.log('students requested')
        );


    this.dataService.getProfCourses()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            (x) => this.profCourses = x ,
            (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
            () => console.log('professor courses requested'));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onItemDrop(event: any, courseNo: number) {
    this.droppedItems.push(event.dragData);
    this.courses[courseNo].push(event.dragData);
    return event.dragData;
  }

  getStudents() {

    if (_.isEmpty( this.search )) {
      return this.students;
    }

    return _.chain(this.students).filter(student =>  student.name.toLowerCase().startsWith(this.search.toLowerCase())).value();
  }

  getColor(student: any) {
    if (this.droppedItems.indexOf(student) > -1) {
      return '#757575';
    }
    return 'white';
  }

  isAvailable(student: any) {
    return this.droppedItems.indexOf(student) < 0;
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
       new Angular2Csv(this.courses[courseNo], this.profCourses[courseNo], {headers: Object.keys(this.courses[courseNo][0])});
       return true;
    }
    return false;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(TadetailsComponent);

    dialogRef.componentInstance.dRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
