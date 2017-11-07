import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    header: string = "TA Management";
    public imageSources: string[] = [
      '../../assets/images/reitz3.jpg',
      '../../assets/images/banner.jpg',
      '../../assets/images/banner3.jpg',
      '../../assets/images/banner1.jpg'
   ];

   public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 2000,
    stopAutoplayMinWidth: 768
  };
    constructor(private router: Router, private sharedService: SharedService) {  }

    ngOnInit() {
      this.sharedService.changeHeader(this.header);
    }

    onLogin(user: string){
      this.router.navigate([user]);
    }

}
