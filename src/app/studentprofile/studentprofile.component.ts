import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogClose, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { TadetailsComponent } from '../tadetails/tadetails.component';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/upload';
// Dummy Upload url
@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})

export class StudentprofileComponent implements OnInit {

  constructor(public dialog: MdDialog) { }
  gpa = 3.7; // sample for a student
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'resume'});
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response); };
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
    let dialogRef = this.dialog.open(TadetailsComponent);

        dialogRef.componentInstance.dRef = dialogRef;

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
  }

  uploadResume(): void {

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
