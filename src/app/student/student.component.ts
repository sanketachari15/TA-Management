import { Component, OnInit } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {

  header = "Welcome Student";
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.changeHeader(this.header);
  }

}
