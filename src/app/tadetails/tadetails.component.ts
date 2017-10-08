import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-tadetails',
  templateUrl: './tadetails.component.html',
  styleUrls: ['./tadetails.component.scss']
})
export class TadetailsComponent implements OnInit {
  public dRef: MdDialogRef<TadetailsComponent>;
  constructor() { }
  /*constructor(
    public dialogRef: MdDialogRef<TadetailsComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }*/
  ngOnInit() {
  }
    onNoClick(): void {
      this.dRef.close();
    }
  }
