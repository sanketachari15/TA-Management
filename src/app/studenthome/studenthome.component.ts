import {Component, OnInit, OnDestroy} from '@angular/core';
import {SharedService} from '../shared.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {DataService} from '../data.service';
import {Subject} from 'rxjs/Rx';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.scss']
})
export class StudenthomeComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  studentCourses: any;
  taName = 'John Johansson';
  course = 'COP5615: Distributed Operating Systems';
  courseTitle: string;
  header: string;
  courseIndex: number;
  link = 'home';
  redirectFrom: string;
  sentMsg: any;
  message: string;
  messages: any;
  newMsgEnabled = false;

  constructor(private sharedService: SharedService, private dataService: DataService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.messages = [];
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

  this.dataService.getStudentHome()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
          (x) => {
              this.studentCourses = x[0].Courses;
          },
          (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
          () => console.log('hello ' + this.studentCourses.name ));
}

ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}


checkDataFromParent() {
  if (this.studentCourses && this.courseIndex !== undefined) {
      this.courseTitle = this.studentCourses[this.courseIndex].name;
      return true;
  }
  return false;
}

setLink(link: string) {
  this.link = link;
}


getAnnouncements() {
  if (this.studentCourses && this.courseIndex !== undefined) {
      return this.studentCourses[this.courseIndex].announcements;
  }
  return ['No Announcements'];
}

getMessages() {
  if (this.studentCourses && this.courseIndex !== undefined) {
      return _.filter(this.studentCourses[this.courseIndex].messages, (msgs) => {
          return (msgs.from) && !_.isEmpty(msgs.from);
      });
  }
  return ['No Messages'];
}

getSentMessages() {
  if (this.studentCourses && this.courseIndex !== undefined) {
      const sentMessages = _.filter(this.studentCourses[this.courseIndex].messages, (msgs) => {
          return (msgs.to) && !_.isEmpty(msgs.to);
      });

      if (this.sentMsg && this.sentMsg !== undefined) {
          this.messages.push(this.sentMsg);
          this.sentMsg = null;
      }
      return sentMessages.concat(this.messages);
  }
  return ['No Messages'];
}

newMessage() {
  if (this.newMsgEnabled) {
      // this.router.navigate(['./new-message'], {relativeTo: this.activatedRoute});
  }else {
      this.message = '';
      this.newMsgEnabled = true;
  }
}

// sendMessage() {

//   if (!_.isEmpty(this.message)){
//       _.forEach(this.TAs, (ta) => {

//           if (ta.checked) {
//               let msgBody = {'to': ta.FirstName + ' ' + ta.LastName, 'message': this.message};
//               this.dataService.sendMessage(msgBody)
//                   .takeUntil(this.ngUnsubscribe)
//                   .subscribe(
//                       (x) => {
//                       },
//                       (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
//                       () => {
//                           console.log('message sent');
//                           this.sentMsg = msgBody;
//                       }
//                   );
//           }
//       });
//   }
//   this.newMsgEnabled = false;
// }

cancel() {
  this.newMsgEnabled = false;
}

}
