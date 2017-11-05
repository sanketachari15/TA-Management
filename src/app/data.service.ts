import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/Rx'

@Injectable()
export class DataService {

  api: string = 'http://localhost:3000';
  prof: string;
  profEmail: string;

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get(this.api + '/students');
  }

  getProfCourses(){
    return this.http.get(this.api + '/profcourses');
  }

  getProf(){
    this.prof = "Alin Dobra";
    this.profEmail = "ad@ufl.edu"
  }

  sendMessage(msgbody: any){
    this.getProf();
    return this.http.patch(this.api + '/profcourses/' + this.profEmail + '/to', msgbody);
  }

  getTAs(course: string){
    return this.http.get(this.api + '/tas/' + course);
  }
}
