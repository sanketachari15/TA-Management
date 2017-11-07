import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MdDialogModule, MdDialogRef, MD_DIALOG_DATA, MdDialog} from '@angular/material';
import { TadetailsComponent } from './tadetails.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('TadetailsComponent', () => {
  let component: TadetailsComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ TadetailsComponent ]
      }
    });
    TestBed.configureTestingModule({
      imports: [MdDialogModule, BrowserAnimationsModule],
      declarations: [ TadetailsComponent, PdfViewerComponent ],
      providers: [MdDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    let dialogRef = dialog.open(TadetailsComponent, {data: {resumeLink: this.resumeLink}});
    component = dialogRef.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
