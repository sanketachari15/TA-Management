import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {Angular2Csv} from 'angular2-csv';
import {DataService} from '../data.service';
import * as _ from 'lodash';
import 'rxjs/add/operator/takeUntil';
import {Subject, Subscription} from 'rxjs/Rx';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import {SharedService} from "../shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-professor',
  templateUrl: 'professor.component.html',
  styleUrls: ['professor.component.scss']
})
export class ProfessorComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  header = "Welcome Professor";
  prof = 'Alin Dobra';

  droppedItems = [];
  courses = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};
  messages = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};
  announcements = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};

  students: any;
  search: string;
  profCourses: any;
  removeTAClicked = false;

  constructor(private dataService: DataService, private sharedService: SharedService, public dialog: MdDialog, private router: Router) {
  }

  ngOnInit() {

    this.sharedService.changeHeader(this.header);

    this.dataService.getStudents()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            (y) =>  {
                this.students = y;

                this.dataService.getProfCourses()
                    .takeUntil(this.ngUnsubscribe)
                    .subscribe(
                        (z) => {
                            let profCourseDetails = _.filter(z, (details) => {return details.FullName == this.prof});
                            this.profCourses = profCourseDetails[0].Courses;
                            _.forEach(this.profCourses, (courseDetails) => {
                                courseDetails.messagesLength = _.filter(courseDetails.messages, (msg) => {return (msg.from) && !_.isEmpty(msg.from)}).length;
                                courseDetails.announcementsLength = courseDetails.announcements.length;
                                courseDetails.filesLength = courseDetails.files.length;

                                this.dataService.getTAs(courseDetails.name)
                                    .takeUntil(this.ngUnsubscribe)
                                    .subscribe(
                                        (x) => {
                                            courseDetails.TAs = x;
                                            _.forEach(courseDetails.TAs, (ta) => {
                                                _.forEach(this.students, (student) => {
                                                    if(student.UFID ===  ta.UFID)
                                                        this.droppedItems.push(student);
                                                });
                                            });
                                        },
                                        (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                                        () => {});
                            });
                        },
                        (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                        () => console.log('professor courses requested'));
            },
            (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
            () => console.log('students requested')
        );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onItemDrop(event: any, courseNo: number) {
    this.droppedItems.push(event.dragData);
    this.courses[courseNo].push(event.dragData);

    let ta = event.dragData;

    ta.isTA = false;
    ta.TAofCourse = this.profCourses[courseNo].name;

    this.dataService.addTAs(ta).subscribe();

    return event.dragData;
  }

  getStudents(courseIndex) {

    let students = _.filter(this.students, (s) => { return _.findIndex(s.CourseMostInterestedIn, (c) => {return c == this.profCourses[courseIndex].name}) > -1});

    if (_.isEmpty( this.search )) {

      return _.orderBy(students, ['InterestLevel','GPA'], ['desc', 'desc']);
    }

    return _.chain(students).filter(student =>  (student.FirstName + " " + student.LastName).toLowerCase().startsWith(this.search.toLowerCase())).value();
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
    this.removeTAClicked = true;
    this.dataService.deleteTA(student.UFID)
        .subscribe((x) => {
            this.courses[courseNo].splice(this.courses[courseNo].indexOf(student), 1);
            this.droppedItems.splice(this.droppedItems.indexOf(student), 1);
        });
  }

  getTAs(courseNo: number) {
    return this.courses[courseNo].concat(this.profCourses[courseNo].TAs);
  }

  exportToCSV(courseNo: number) {

    if (!_.isEmpty(this.courses[courseNo])) {
       new Angular2Csv(this.courses[courseNo], this.profCourses[courseNo].name, {headers: Object.keys(this.courses[courseNo][0])});
       return true;
    }
    return false;
  }

  openDialog(): void {

      if(this.removeTAClicked)
          this.removeTAClicked = false;
      else {
          let dialogRef = this.dialog.open(TadetailsComponent);

          dialogRef.componentInstance.dRef = dialogRef;

          dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
          });
      }

  }

  show(courseIndex, x): void{
    this.sharedService.setProfCourses(this.profCourses);
    this.sharedService.setCourseIndex(courseIndex);
    this.sharedService.setRedirectFrom(x);
    this.sharedService.setProfName(this.prof);
    this.router.navigate(['/course/' + courseIndex]);
  }
}

