import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";
import * as _ from 'lodash';
import {SharedService} from "../shared.service";
import {DataService} from "../data.service";

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    header = "Welcome Manager";
    prof = 'Alin Dobra';
    profCourses: any;
    courses: any;
    courseName: string;
    link = 'home';
    TAs: any;
    seats: number;
    profName: string;

    constructor(private sharedService: SharedService, private dataService: DataService) {
        this.courses = []
    }

    ngOnInit() {
        this.sharedService.changeHeader(this.header);
        this.getProfCourses()
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    setCourse(course: any) {
        this.TAs = course.TAs;
        this.profName = course.profName;
        this.seats = course.seats;
        this.courseName = course.name;
    }

    removeTA(t) {
        console.log("In remove TA");
        this.dataService.deleteTA(t.UFID)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((x) => {
                console.log("Delete successful");
                this.TAs = _.filter(this.TAs, (ta) => {
                    return ta.UFID != t.UFID
                })
            });
    }

    getProfCourses() {

        this.dataService.getProfCourses()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (z) => {
                    this.profCourses = z;
                    this.courseName = this.profCourses[0].Courses[0].name;

                    _.forEach(this.profCourses, (profCoursesDetails) => {

                        _.forEach(profCoursesDetails.Courses, (course) => {
                            this.courses.push(course);
                            course.TAs = [];
                            course.profName = profCoursesDetails.FullName;
                            this.dataService.getTAs(course.name)
                                .takeUntil(this.ngUnsubscribe)
                                .subscribe(
                                    (x) => {
                                        course.TAs = x;
                                        if (course.name === this.courseName) {
                                            this.TAs = this.profCourses[0].Courses[0].TAs;
                                            this.seats = this.profCourses[0].Courses[0].seats;
                                            this.profName = this.profCourses[0].FullName;
                                        }
                                    },
                                    (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                                    () => {
                                    });
                        });
                    });

                },
                (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                () => console.log('professor courses requested'));
    }

    setLink(link: string) {
        this.link = link;
    }
}
