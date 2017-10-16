import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {SharedService} from "../shared.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

    profCourses: any;
    courseTitle: string;
    header: string;
    courseIndex: number;
    link: string = 'home';
    redirectFrom: string;

    constructor(private sharedService: SharedService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.sharedService.currentProfCourse.subscribe(x => this.profCourses = x);
        this.sharedService.currentCourseIndex.subscribe(x => this.courseIndex = x);
        this.sharedService.currentRedirectFrom.subscribe(x => {this.redirectFrom = x;
                                                                this.link = this.redirectFrom});
    }

    checkDataFromParent() {
        if (this.profCourses && this.courseIndex != undefined) {
            this.courseTitle = this.profCourses[this.courseIndex].name;
            return true;
        }
        return false;
    }

    getHome() {
        this.link = 'home';
    }

    getAnnouncements() {
        this.link = 'announcements';
        if (this.profCourses && this.courseIndex != undefined) {
            return this.profCourses[this.courseIndex].announcements;
        }
        return ["No Announcements"];
    }

    getMessages(){
        this.link = 'messages';
        if (this.profCourses && this.courseIndex != undefined) {
            return this.profCourses[this.courseIndex].messages;
        }
        return ["No Messages"];
    }

    getFiles() {
        this.link = 'files';
    }

    newMessage(){
        this.router.navigate(['./new-message'], {relativeTo: this.activatedRoute});
    }
}
