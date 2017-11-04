import {Component, OnInit, OnDestroy, ChangeDetectorRef, AfterContentInit, AfterViewInit} from '@angular/core';
import {SharedService} from "../shared.service";
import {Router, ActivatedRoute} from "@angular/router";
import * as _  from 'lodash';
import {DataService} from "../data.service";
import {Subject} from "rxjs";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    profCourses: any;
    profName = 'Alin Dobra';
    courseTitle: string;
    header: string;
    courseIndex: number;
    link: string = 'home';
    redirectFrom: string;
    sendMessage: any;
    messages: any[];
    newMsgEnabled: boolean;

    constructor(private sharedService: SharedService, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.messages = [];
    }

    ngOnInit() {
        this.courseIndex = this.activatedRoute.snapshot.params['id'];
        this.sharedService.currentMessage.subscribe(x => this.sendMessage = x);
        this.dataService.getProfCourses()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (x) => {
                    let profCourseDetails = _.filter(x, (details) => {
                        return details.FullName == this.profName
                    });
                    this.profCourses = profCourseDetails[0].Courses;
                },
                (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                () => console.log('professor courses requested'));

        this.sharedService.currentRedirectFrom.subscribe(x => {
            this.redirectFrom = x;
            if (!_.isEmpty(this.redirectFrom)) {
                this.link = this.redirectFrom;
            }
        });

        this.sharedService.currentNewMsg.subscribe((x) => this.newMsgEnabled = x);
        this.sharedService.setNewMsg(true);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }


    checkDataFromParent() {
        if (this.profCourses && this.courseIndex != undefined) {
            this.courseTitle = this.profCourses[this.courseIndex].name;
            return true;
        }
        return false;
    }

    setLink(link: string) {
        this.link = link;
    }


    getAnnouncements() {
        if (this.profCourses && this.courseIndex != undefined) {
            return this.profCourses[this.courseIndex].announcements;
        }
        return ["No Announcements"];
    }

    getMessages() {
        if (this.profCourses && this.courseIndex != undefined) {
            return _.filter(this.profCourses[this.courseIndex].messages, (msgs) => {
                return (msgs.from) && !_.isEmpty(msgs.from);
            });
        }
        return ["No Messages"];
    }

    getSentMessages() {
        if (this.profCourses && this.courseIndex != undefined) {
            let sentMessages = _.filter(this.profCourses[this.courseIndex].messages, (msgs) => {
                return (msgs.to) && !_.isEmpty(msgs.to)
            });

            if (this.sendMessage && this.sendMessage != undefined) {
                this.messages.push(this.sendMessage);
                this.sendMessage = null;
            }
            return sentMessages.concat(this.messages);
        }
        return ["No Messages"];
    }

    newMessage() {
        if (this.newMsgEnabled) {
            console.log("Navigating to child");
            this.router.navigate(['./new-message'], {relativeTo: this.activatedRoute});
        }
    }
}
