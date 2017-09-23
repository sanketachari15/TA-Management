import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Proflogin2Component } from './proflogin2.component';

describe('Proflogin2Component', () => {
  let component: Proflogin2Component;
  let fixture: ComponentFixture<Proflogin2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Proflogin2Component ]
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
