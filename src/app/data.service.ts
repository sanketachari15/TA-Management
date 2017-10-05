import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/Rx'

@Injectable()
export class DataService {

  api: string = 'http://localhost:3000/api';
  prof: string;

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get(this.api + '/students');
  }

  getProfCourses(){
    let params = new HttpParams();
    this.getProf();
    params = params.append('prof', this.prof);

    return this.http.get(this.api + '/prof-courses', {params: params});
  }

  getProf(){
    this.prof = "Alin Dobra";
  }
}
