import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

  header = 'Welcome Student';
  constructor(private sharedService: SharedService) { }
  toShow = 'profile';
  isHome: boolean = this.toShow === 'home';
  show(path: string) {
    this.toShow = path;
    this.isHome = this.toShow === 'home';
  }


  ngOnInit() {
    this.sharedService.changeHeader(this.header);
  }

}
