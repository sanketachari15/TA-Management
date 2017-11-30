import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/Rx'
import {SharedService} from "./shared.service";

@Injectable()
export class DataService {

  api: string = 'http://localhost:3000/api';
  prof: string = "Alin Dobra";
  profEmail: string = "ad@ufl.edu";

  constructor(private http: HttpClient, public sharedService: SharedService) { }

  getStudents(){
    return this.http.get(this.api + '/students');
  }

  patchStudent(student:any){
    return this.http.patch(this.api + '/students/' + student.UFID + '/isallowed', student)
  }

  getProfCourses(){
    return this.http.get(this.api + '/profcourses');
  }

  getProfs(){
      return this.http.get(this.api + '/professors');
  }

  sendMessage(msgbody: any){
    this.sharedService.currentEmail.subscribe((x) => this.profEmail = x);
    return this.http.patch(this.api + '/profcourses/' + this.profEmail + '/to', msgbody);
  }

  managerSendMessage(msgbody:any, managerEmail: string){
      return this.http.patch(this.api + '/manager/' + managerEmail + '/to', msgbody);
  }

  addTAs(ta:any){
      return this.http.post(this.api + '/tas',  ta);
  }

  getTAs(course: string){
    return this.http.get(this.api + '/tas/' + course);
  }

  getAllTAs(){
      return this.http.get(this.api + '/tas/');
  }

  deleteTA(UFID: number){
      return this.http.delete(this.api + '/tas/' + UFID);
  }
  getStudentHome() {
    return this.http.get(this.api + '/studenthome');
  }

  getManager() {
    return this.http.get(this.api + '/manager');
  }

  login(user: any){
      return this.http.post(this.api + '/users/login', user);
  }

  signup(user:any){
      return this.http.post(this.api + '/users', user);
  }
}
