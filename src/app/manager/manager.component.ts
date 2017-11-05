import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  header = "Welcome Manager";
  prof = 'Alin Dobra';

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.changeHeader(this.header);
  }

}
