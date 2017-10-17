import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  sendMessage() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  cancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
