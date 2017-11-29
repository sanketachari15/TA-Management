import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogClose, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import {SharedService} from "../shared.service";
import {DataService} from '../data.service';
import 'rxjs/add/operator/takeUntil';
import {Subject, Subscription} from 'rxjs/Rx';
import { FileUploadService } from '../file-upload.service';
import { browser } from 'protractor';

// Dummy Upload url
@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})

export class StudentprofileComponent implements OnInit {

  constructor(private dataService: DataService, private sharedService: SharedService,
    public dialog: MdDialog, private _svc: FileUploadService) {
      this.reset();
    }
  students: any;
  student: any;
  header = "Welcome Student";
  gpa; // sample for a student
  resumeLink;
  url = '../../assets/images/taimg.jpg';

  // for uploads
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  currentStatus1: number;
  uploadFieldName = 'photos';

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

  readonly STATUS_INITIAL1 = 0;
  readonly STATUS_SAVING1= 1;
  readonly STATUS_SUCCESS1 = 2;
  readonly STATUS_FAILED1 = 3;

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
    this.currentStatus1 = this.STATUS_SUCCESS1;
  }

  onSelectFile(fieldName: string, fileList: FileList) {
    if (fileList && fileList[0]) {
      console.log(fileList);
      console.log(fileList[0]);
      const reader = new FileReader();

      reader.readAsDataURL(fileList[0]); // read file as data url

      reader.onload = (x: any) => { // called once readAsDataURL is completed
        this.url = x.target.result; };
    }
    const formData = new FormData();

        if (!fileList.length) {
          return;
        }
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;

    this.currentStatus1 = this.STATUS_INITIAL1;
  }

  save(formData: FormData) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;
    this._svc.upload(formData)
      .take(1)
      .delay(1500) // DEV ONLY: delay 1.5s to see the changes
      .subscribe(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = this.STATUS_SUCCESS;
      }, err => {
        this.uploadError = err;
        this.currentStatus = this.STATUS_FAILED;
      });
  }

}

@Component({
  selector: 'app-gpa-change',
  template: `<h1 md-dialog-title>Enter new GPA.</h1>
  <div md-dialog-content>
    <md-form-field>
      <input mdInput tabindex="1" [(ngModel)]="data.gpa" id="enterGpa">
    </md-form-field>
  </div>
  <div md-dialog-actions>
    <button md-button [md-dialog-close]="data.gpa" tabindex="2" id="okButton">Ok</button>
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
