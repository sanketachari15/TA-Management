import {Component, OnInit, OnDestroy} from '@angular/core';
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
    course = 'COP5615: Distributed Operating Systems';
    courseTitle: string;
    header: string;
    courseIndex: number;
    link: string = 'home';
    redirectFrom: string;
    sentMsg: any;
    message: string;
    messages: any;
    newMsgEnabled = false;
    TAs: any;

    constructor(private sharedService: SharedService, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.messages = [];
        this.TAs = [];
    }

    ngOnInit() {
        this.courseIndex = this.activatedRoute.snapshot.params['id'];
        this.sharedService.currentMessage.subscribe(x => this.sentMsg = x);
        this.sharedService.currentRedirectFrom.subscribe(x => {
            this.redirectFrom = x;
            if (!_.isEmpty(this.redirectFrom)) {
                this.link = this.redirectFrom;
            }
        });

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

        this.dataService.getTAs(this.course)
            .takeUntil(this.ngUnsubscribe)
                .subscribe(
                    (x) => {
                        this.TAs = x;
                        _.forEach(this.TAs, (ta) => {ta.checked = false;});
                    },
                    (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                    () => console.log('professor courses requested'));
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

            if (this.sentMsg && this.sentMsg != undefined) {
                this.messages.push(this.sentMsg);
                this.sentMsg = null;
            }
            return sentMessages.concat(this.messages);
        }
        return ["No Messages"];
    }

    newMessage() {
        if (this.newMsgEnabled) {
            // this.router.navigate(['./new-message'], {relativeTo: this.activatedRoute});
        }else {
            this.message = "";
            this.newMsgEnabled = true;
        }
    }

    sendMessage(){

        if (!_.isEmpty(this.message)){
            _.forEach(this.TAs, (ta) => {

                if (ta.checked) {
                    let msgBody = {'to': ta.FirstName + " " + ta.LastName, 'message': this.message};
                    this.dataService.sendMessage(msgBody)
                        .takeUntil(this.ngUnsubscribe)
                        .subscribe(
                            (x) => {
                            },
                            (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                            () => {
                                console.log('message sent');
                                this.sentMsg = msgBody;
                            }
                        );
                }
            });
        }
        this.newMsgEnabled = false;
    }

    cancel() {
        this.newMsgEnabled = false;
    }
}
