import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proflogin2Component } from './proflogin2.component';
import {MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule} from "@angular/material";
import {DndModule, DragDropService, DragDropConfig} from "ng2-dnd";
import {DataService} from "../data.service";
import {StarRatingModule} from "angular-star-rating";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

describe('Proflogin2Component', () => {
  let component: Proflogin2Component;
  let fixture: ComponentFixture<Proflogin2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, DndModule.forRoot(), StarRatingModule.forRoot(), MdTooltipModule,
                MdIconModule, MdMenuModule, FormsModule, HttpModule, HttpClientModule],
      declarations: [ Proflogin2Component ],
      providers: [DragDropService, DragDropConfig, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Proflogin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
