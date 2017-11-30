import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MdToolbarModule, MdMenuModule} from "@angular/material";
import {SharedService} from "../shared.service";
import { CarouselModule } from 'angular4-carousel';
import { loginPopComponent } from './login.component';
import {MdDialogModule, MdDialogRef, MD_DIALOG_DATA, MdDialog} from '@angular/material';
import {FormsModule} from "@angular/forms";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, loginPopComponent ],
      imports: [RouterTestingModule, MdToolbarModule, CarouselModule, MdDialogModule, MdMenuModule, FormsModule],
      providers: [SharedService, MdDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
