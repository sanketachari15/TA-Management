import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SharedService {

  private headerSource = new BehaviorSubject<string>("Welcome to UF");
  currentHeader = this.headerSource.asObservable();

  private profCourseSource = new BehaviorSubject<any>(null);
  currentProfCourse = this.profCourseSource.asObservable();

  private courseIndexSource = new BehaviorSubject<number>(0);
  currentCourseIndex = this.courseIndexSource.asObservable();

  private redirectFromSource = new BehaviorSubject<string>('');
  currentRedirectFrom = this.redirectFromSource.asObservable();

  constructor() { }

  changeHeader(header: string){
    this.headerSource.next(header)
  }

  setProfCourses(course:any){
    this.profCourseSource.next(course);
  }

  setCourseIndex(index: number){
    this.courseIndexSource.next(index);
  }

  setRedirectFrom(from: string){
    this.redirectFromSource.next(from);
  }

}
