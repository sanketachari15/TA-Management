import {Component, OnInit} from '@angular/core';
import {SharedService} from './shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  header = 'Welcome to UF';

  constructor(private sharedService: SharedService) {}

  setHeader(newHeader: string)  {
    console.log("In set header");
    this.header = newHeader;
  }

  ngOnInit(){
    this.sharedService.currentHeader.subscribe(x => this.header = x)
  }
}
