import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogClose, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import {SharedService} from "../shared.service";
import {DataService} from '../data.service';
import 'rxjs/add/operator/takeUntil';
import {Subject, Subscription} from 'rxjs/Rx';

// Dummy Upload url
@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})

export class StudentprofileComponent implements OnInit {

  constructor(private dataService: DataService, private sharedService: SharedService, public dialog: MdDialog) { }
  students: any;
  student: any;
  header = "Welcome Student";
  gpa; // sample for a student
  resumeLink;
  url = '../../assets/images/taimg.jpg';

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.sharedService.changeHeader(this.header);

    this.dataService.getStudents()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            (x) =>  {this.students = x;
              this.student = this.students[0];
              this.gpa = this.student.GPA;
              this.resumeLink = this.student.ResumeLink; },
            (err) => console.log('Error occurred in ngOnInit subscribe ' + err),
            () => console.log('students requested' + this.students[0].ResumeLink)
        );
}
  changeGpa(): void {
      let dialogRef = this.dialog.open(GpaChangeComponent, { width: '250px', data: {gpa: this.gpa} });

      dialogRef.componentInstance.dialogRef = dialogRef;

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.gpa = result;
      });
    }

  veiwResume(): void {
    let dialogRef = this.dialog.open(TadetailsComponent, {data: {resumeLink: this.resumeLink}});

        dialogRef.componentInstance.dialogRef = dialogRef;

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
  }

  uploadResume(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (x: any) => { // called once readAsDataURL is completed
        this.url = x.target.result; };
    }
  }

}

@Component({
  selector: 'app-gpa-change',
  template: `<h1 md-dialog-title>Enter new GPA.</h1>
  <div md-dialog-content>
    <md-form-field>
      <input mdInput tabindex="1" [(ngModel)]="data.gpa">
    </md-form-field>
  </div>
  <div md-dialog-actions>
    <button md-button [md-dialog-close]="data.gpa" tabindex="2">Ok</button>
    <button md-button (click)="onNoClick()" tabindex="-1">Cancel</button>
  </div>`,
})
export class GpaChangeComponent {

  constructor(
    public dialogRef: MdDialogRef<GpaChangeComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
