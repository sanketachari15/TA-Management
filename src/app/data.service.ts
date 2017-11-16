import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/Rx'

@Injectable()
export class DataService {

  api: string = 'http://localhost:3000/api';
  prof: string;
  profEmail: string;

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get(this.api + '/students');
  }

  patchStudent(student:any){
    return this.http.patch(this.api + '/students/' + student.UFID + '/isallowed', student)
  }

  getProfCourses(){
    return this.http.get(this.api + '/profcourses');
  }

  getProf(){
    this.prof = "Alin Dobra";
    this.profEmail = "ad@ufl.edu"
  }

  getProfs(){
      return this.http.get(this.api + '/professors');
  }

  sendMessage(msgbody: any){
    this.getProf();
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
}
