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

  private profNameSource = new BehaviorSubject<string>('');
  currentProfName = this.profNameSource.asObservable();

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  private newMsgSource = new BehaviorSubject<boolean>(null);
  currentNewMsg = this.newMsgSource.asObservable();

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

  setProfName(name: string){
    this.profNameSource.next(name);
  }

  setMessage(msg: any){
    this.messageSource.next(msg);
  }

  setNewMsg(enabled: boolean){
    this.newMsgSource.next(enabled);
  }
}
