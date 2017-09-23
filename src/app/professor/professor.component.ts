import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import * as _ from 'underscore';

@Component({
    selector: 'app-professor',
    templateUrl: './professor.component.html',
    styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {

    droppedItems = [];

    courses = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};
    courseKeys = Object.keys(this.courses);

    students: any;
    profCourses: any;

    constructor(private dataService: DataService) {
        dataService.getStudents().subscribe(x => {
            this.students = x
        });
        dataService.getProfCourses().subscribe(x => {
            this.profCourses = x
        });
    }

    ngOnInit() {
    }

    onItemDrop(event: any, courseNo: number) {
        this.droppedItems.push(event.dragData);
        this.courses[courseNo].push(event.dragData);
        return event.dragData;
    }

    getColor(student: any) {
        if (this.droppedItems.indexOf(student) > -1)
            return '#757575';
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
        this.droppedItems.splice(this.droppedItems.indexOf(student), 1)
    }

    getTAs(courseNo: number) {
        return this.courses[courseNo];
    }

    exportToCSV(courseNo: number) {

        if (!_.isEmpty(this.courses[courseNo])) {
            console.log(JSON.stringify(this.courses[courseNo]));
            return new Angular2Csv(this.courses[courseNo], this.profCourses[courseNo], {headers: Object.keys(this.courses[courseNo][0])});
        }
    }
}
