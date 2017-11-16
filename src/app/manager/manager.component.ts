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
    students: any;
    search: string;
    TACollection: any;
    announcements: any;
    message:string;
    messages:any;
    newSentMessages:any;
    sentMsg:any;
    newMsgEnabled = false;
    profs:any;
    managerEmail:any;

    constructor(private sharedService: SharedService, private dataService: DataService) {
        this.courses = [];
        this.students = [];
        this.TACollection = [];
        this.announcements = [];
        this.messages = [];
        this.newSentMessages = [];
        this.profs = [];
    }

    ngOnInit() {
        this.sharedService.changeHeader(this.header);
        this.getProfCourses();
        this.getStudentsFromDb();
        this.getProfs();
        this.getManager();
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
        this.dataService.deleteTA(t.UFID)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((x) => {
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

    getStudentsFromDb() {

        this.dataService.getAllTAs()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (x) =>{
                    let tas = x;

                    this.dataService.getStudents()
                        .takeUntil(this.ngUnsubscribe)
                        .subscribe(
                            (x) => {
                                this.students = x;
                                _.each(this.students, (student) => {
                                    student.isTA = _.findIndex(tas, (ta) => {return ta.UFID == student.UFID}) != -1;

                                    if (!student.isTA){
                                        if (student.isAllowed == false){
                                            student.allowOrReject = "Allow";
                                            student.color = "#4CAF50";
                                        }
                                        else{
                                            student.allowOrReject = "Reject";
                                            student.color = "#f44336";
                                        }
                                    }
                                    else {
                                        student.allowOrReject = "Already TA";
                                    }
                                });
                            },
                            (err) => console.log('Error occurred in getStudents ' + err),
                        );
                },
                (err) => console.log('Error occurred in getAllTAs ' + err),
            );
    }

    getProfs(){
        this.dataService.getProfs()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (x) => {this.profs = x;},
                (err) => console.log('Error occurred in http get professors ' + err)
            );
    }

    getStudents() {
        if (_.isEmpty(this.search))
            return _.orderBy(this.students, ['isTA','GPA'], ['inc','desc']);

        return _.chain(this.students).filter(student => (student.FirstName + " " + student.LastName).toLowerCase().startsWith(this.search.toLowerCase())).value();
    }

    getManager(){
        this.dataService.getManager()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (x) => {
                    this.managerEmail = x[0].Email;
                    this.announcements = x[0].announcements;
                    this.messages = x[0].messages;
                },
                (err) => console.log('Error occurred in http get manager ' + err)
            )
    }

    setLink(link: string) {
        this.link = link;
    }

    changeStatus(student: any) {

        if (student.allowOrReject === "Allow") {
            student.allowOrReject = "Reject";
            student.color = "#f44336";

            //REST call to accept application
            student.isAllowed = true;
            this.dataService.patchStudent(student).takeUntil(this.ngUnsubscribe).subscribe();

        }
        else {
            student.allowOrReject = "Allow";
            student.color = "#4CAF50";

            //REST call to reject application
            student.isAllowed = false;
            this.dataService.patchStudent(student).takeUntil(this.ngUnsubscribe).subscribe();
        }
    }

    getAnnouncements() {
        if (this.announcements.length > 1) {
            return this.announcements;
        }
        return ["No Announcements"];
    }

    getMessages() {
        if (this.messages.length > 1) {
            return _.filter(this.messages, (msgs) => {
                return (msgs.from) && !_.isEmpty(msgs.from);
            });
        }
        return ["No Messages"];
    }

    getSentMessages() {
        if (this.messages.length > 1) {
            let sentMessages = _.filter(this.messages, (msgs) => {
                return (msgs.to) && !_.isEmpty(msgs.to)
            });

            if (this.sentMsg && this.sentMsg != undefined) {
                this.newSentMessages.push(this.sentMsg);
                this.sentMsg = null;
            }
            return sentMessages.concat(this.newSentMessages);
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
            _.forEach(this.profs, (prof) => {

                if (prof.checked) {
                    let msgBody = {'to': prof.FirstName + " " + prof.LastName, 'message': this.message};
                    this.dataService.managerSendMessage(msgBody, this.managerEmail)
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
