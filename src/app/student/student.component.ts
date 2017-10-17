import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

  constructor() { }
  toShow = 'profile';
  isHome: boolean = this.toShow === 'home';
  show(path: string) {
    this.toShow = path;
    this.isHome = this.toShow === 'home';
  }
  ngOnInit() {
  }

}
