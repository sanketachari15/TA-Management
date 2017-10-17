import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';
import {HttpClient, HttpHandler, HttpParams} from "@angular/common/http";
import {ReflectiveInjector, Injectable} from "@angular/core";
import {ConnectionBackend, RequestOptions, BaseRequestOptions, Http, ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";


const student_one = {
  "id": 1,
  "name": "John johansson",
  "gpa": "3.6",
  "interest": 5
};

const student_two = {
  "id": 2,
  "name": "Jane zuckerberg johansson",
  "gpa": "3.1",
  "interest": 2
};

@Injectable()
class DataService {
  api: string = 'http://localhost:3000/api';
  prof :string;

  constructor(private http: Http) {}

  getStudents(): Promise<String[]> {
    return this.http.get(this.api + '/students')
        .toPromise()
        .then(response => response.json().data)
        .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getProfCourses(){
    let params = new HttpParams();
    this.getProf();
    params = params.append('prof', this.prof);

    return this.http.get(this.api + '/prof-courses', {params: params})
        .toPromise()
        .then(response => response.json().data)
        .catch(e => this.handleError(e));
  }

  getProf(){
    this.prof = "Alin Dobra";
    return this.prof
  }

  getCourses(profCourses) {
    let prof;
    let profName = this.getProf();
    for (let index in profCourses) {
      prof = profCourses[index];
      if (prof.name === profName)
        return prof.courses;
    }
    return [];
  }
}

describe('DataService', () => {

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      DataService
    ]);
    this.dataService = this.injector.get(DataService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);

    this.testData = require('../../test_data/mock-data.json');
  });

  it('should be created', () => {
    expect(this.dataService).toBeTruthy();
  });

  it('getStudents() should query current service url', () => {
    this.dataService.getStudents();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students/, 'url invalid');
  });

  it('getStudents() should return some students', fakeAsync(() => {
    let result: any;
    this.dataService.getStudents().then((students: any) => result = students);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: this.testData.students}),
    })));
    tick();

    expect(result.length).toEqual(this.testData.students.length, 'should contain given amount of students');
    expect(result[0]).toEqual(student_one, ' student_one should be the first student');
    expect(result[1]).toEqual(student_two, ' student_two should be the second student');
  }));

  it('getProfCourses() should query current service url', () => {
    this.dataService.getProfCourses();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/prof-courses/, 'url invalid');
  });

  it('getProfCourses() should return some courses', fakeAsync(() => {
    let result: any;
    this.dataService.getProfCourses().then((courses: any) => result = courses);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: this.dataService.getCourses(this.testData.profCourses)}),
    })));
    tick();

    expect(result.length).toEqual(this.testData.courses.length, 'should contain given amount of students');
    expect(result[0]).toEqual(this.testData.courses[0], '  should be the first course');
    expect(result[1]).toEqual(this.testData.courses[1], '  should be the second course');
  }));

});
