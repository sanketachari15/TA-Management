import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {SharedService} from "../shared.service";
import {DataService} from '../data.service';
import 'rxjs/add/operator/takeUntil';
import {Subject, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

  header = 'Welcome Student';
  constructor(private dataService: DataService, private sharedService: SharedService) { }
  toShow = 'profile';
  isHome: boolean = this.toShow === 'home';
  students: any;
  student: any;
  firstName: string;
  lastName: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.sharedService.changeHeader(this.header);

    this.dataService.getStudents()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            (x) =>  {this.students = x;
              this.student = this.students[0];
              this.firstName = this.student.FirstName;
              this.lastName = this.student.LastName; },
            (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
            () => console.log('students requested' + this.students[0].FirstName)
        ); }
  show(path: string) {
    this.toShow = path;
    this.isHome = this.toShow === 'home';
  }

}
