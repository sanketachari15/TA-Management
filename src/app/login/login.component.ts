import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import {MdDialog, MdDialogClose, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {DataService} from "../data.service";


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
    constructor(private router: Router, private sharedService: SharedService, public dialog: MdDialog) {  }

    ngOnInit() {
      this.sharedService.changeHeader(this.header);
    }

    onLogin(user: string){
      this.router.navigate([user]);
    }
    onClickLogin(user: String): void {
      let dialogRef = this.dialog.open(loginPopComponent, { width: '300px', data: {user: user} });

      dialogRef.componentInstance.dialogRef = dialogRef;

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result.data == 'ok')
            this.router.navigate(['/'+user]);
      });
    }


}

@Component({
  selector: 'app-login-pop',
  template:  `<div *ngIf="!isClicked" class="login-singup">
                 <button md-button class="signup-button" (click)="onSignUp()" tabindex="-1">Sign Up</button>
                 <button md-button class="login-button" (click)="onLogin()" tabindex="2" id="ok" >Login</button>
              </div>
              <br>
              <div *ngIf="isClicked">
                  <h1 md-dialog-title>{{header}}</h1>
                  <div md-dialog-content>
                    <md-form-field>
                      <input mdInput id="enter-email"  name= "email" [(ngModel)] = "email" placeholder="Enter Email" autofocus>
                      <br><br>
                      <input mdInput type="password" id="enter-password" name= "password" [(ngModel)] = "password" placeholder="Enter Password">
                    </md-form-field>
                  </div>
                  <div md-dialog-actions>
                    <button md-button class="button" (click)="onNoClick('ok')" tabindex="2" id="ok" >Ok</button>
                    <button md-button class="button" (click)="onNoClick('cancel')" tabindex="-1">Cancel</button>
                  </div>
                  <div *ngIf="invalid">
                    <p *ngIf = "isLogin" [ngStyle] = "{'color': 'red'}"> Credentials invalid or user doesn't exist, sign up first</p>
                    <p *ngIf = "!isLogin" [ngStyle] = "{'color': 'red'}"> Credentials invalid or user already exists</p>
                  </div>
              </div>
            `,
    styleUrls: ['./login.component.scss']
})
export class loginPopComponent {

  invalid: boolean = false;
  email: string;
  password: string;
  isClicked: boolean = false;
  isLogin: boolean = false;
  header: string;
  user: string;

  constructor(
    public dialogRef: MdDialogRef<loginPopComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dataService: DataService, public sharedService: SharedService) {

      if (data.user === 'prof')
          this.user = 'Professor';

      else if (data.user === 'student')
          this.user = 'Student';

      else if (data.user === 'manager')
          this.user = 'Manager';
  }

  onNoClick(button: string): void {

    if (button == 'ok'){
        let user = {
            "Email": this.email,
            "Password": this.password
        };

        // Login
        if(this.isLogin){
            this.dataService.login(user).subscribe(
                (response) =>{
                    // response is good
                    this.invalid = false;
                    if (response["Email"] === user.Email){
                        this.dialogRef.close({data: button});
                        console.log("Login response is good");
                        this.sharedService.setEmail(user.Email);
                        localStorage.setItem('email-' + this.user, user.Email);
                    }
                },
                //if response is not empty then show error
                () => {
                    this.invalid = true;
                    console.log("Invalid credentials Login");
                }
            );
        }
        // Sing Up
        else {
            this.dataService.signup(user).subscribe(
                (response) =>{
                    // response is good
                    this.invalid = false;
                    if (response["Email"] === user.Email){
                        this.dialogRef.close({data: button});
                        console.log("Sign up response is good");
                        this.sharedService.setEmail(user.Email);
                        localStorage.setItem('email-' + this.user, user.Email);
                    }
                },
                //if response is not empty then show error
                () => {
                    this.invalid = true;
                    console.log("Invalid credentials for Singup");
                }
            );
        }
    }
    else
        this.dialogRef.close({data: button});
  }

  onLogin(){
      this.isLogin = true;
      this.isClicked = true;
      this.header = 'Login ' + this.user;
  }

  onSignUp(){
    this.isLogin = false;
    this.isClicked = true;
    this.header = 'Sign Up ' + this.user;
  }
}
