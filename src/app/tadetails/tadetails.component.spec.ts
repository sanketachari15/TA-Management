import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TadetailsComponent } from './tadetails.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

describe('TadetailsComponent', () => {
  let component: TadetailsComponent;
  let fixture: ComponentFixture<TadetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TadetailsComponent, PdfViewerComponent ],
      providers: [PdfViewerComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
