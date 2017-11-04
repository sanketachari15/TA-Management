import {Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit, ComponentRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {Subject} from "rxjs";
import {SharedService} from "../shared.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
    message: string;
    courseIndex: any;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private sharedService: SharedService) {
        console.log("In child's ctor");
        console.log(this.router.url);
    }

    ngOnInit() {
        console.log("In child's onInit");
        this.sharedService.currentCourseIndex.subscribe(x => this.courseIndex = x);
        this.sharedService.setNewMsg(false);
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

        console.log("In child OnDestroy");
    }

    ngAfterContentInit(){
        console.log("In ng after content init");
    }

    ngAfterViewInit(){
        console.log("In ng after view init");
    }

    sendMessage() {

        /* Make REST call to store the data*/
        let msgBody = {'to': 'TA1', 'message': this.message};

        if (!_.isEmpty(this.message)){
            this.dataService.sendMessage(msgBody)
                .takeUntil(this.ngUnsubscribe)
                .subscribe(
                    (x) => {
                    },
                    (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
                    () => {
                        console.log('message sent');
                        this.sharedService.setMessage(msgBody);
                    }
                );
        }

        this.sharedService.setNewMsg(true);
        this.router.navigate(['../'], {relativeTo: this.route});
        // this.router.navigate(['/course/' + this.courseIndex]);
        // this.ngOnDestroy();
    }

    cancel() {
        this.sharedService.setNewMsg(true);
        // this.router.navigate(['../'], {relativeTo: this.route});
        // this.router.navigate(['/course/' + this.courseIndex]);
        // this.ngOnDestroy();
        this.router.navigate(['/prof']);
    }
}
