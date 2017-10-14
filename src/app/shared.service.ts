import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SharedService {

  private headerSource = new BehaviorSubject<string>("Welcome to UF");
  currentHeader = this.headerSource.asObservable();

  constructor() { }

  changeHeader(header: string){
    this.headerSource.next(header)
  }
}
