import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-tadetails',
  templateUrl: './tadetails.component.html',
  styleUrls: ['./tadetails.component.scss']
})
export class TadetailsComponent implements OnInit {
  pdfSrc = '../../assets/pdf/resum.pdf';
  // pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
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
