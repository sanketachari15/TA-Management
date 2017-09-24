import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, HttpHandler, HttpClient]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
