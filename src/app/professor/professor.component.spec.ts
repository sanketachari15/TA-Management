import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorComponent } from './professor.component';
import {MdTabsModule, MdCardModule, MdTooltipModule, MdIconModule, MdMenuModule} from "@angular/material";
import {DndModule, DragDropService, DragDropConfig} from "ng2-dnd";
import {DataService} from "../data.service";
import {StarRatingModule} from "angular-star-rating";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";

describe('ProfessorComponent', () => {
  let component: ProfessorComponent;
  let fixture: ComponentFixture<ProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdTabsModule, MdCardModule, DndModule.forRoot(), StarRatingModule.forRoot(), MdTooltipModule,
                MdIconModule, MdMenuModule, FormsModule, HttpModule, HttpClientModule],
      declarations: [ ProfessorComponent ],
      providers: [DragDropService, DragDropConfig, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
