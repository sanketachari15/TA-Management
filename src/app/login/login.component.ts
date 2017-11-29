import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import {MdDialog, MdDialogClose, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';


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
      let dialogRef = this.dialog.open(loginPopComponent, { width: '250px', data: {user: user} });

      dialogRef.componentInstance.dialogRef = dialogRef;

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.router.navigate(['/'+user]);
      });
    }


}

@Component({
  selector: 'app-login-pop',
  template: `<h1 md-dialog-title>Login {{data.user}}</h1>
  <div md-dialog-content>
    <md-form-field>
      <input mdInput tabindex="1" id="enterPassword"  placeholder="Enter Password">
    </md-form-field>
  </div>
  <div md-dialog-actions>
    <button md-button (click)="onNoClick()" tabindex="2" id="okButton">Ok</button>
    <button md-button (click)="onNoClick()" tabindex="-1">Cancel</button>
  </div>`,
})
export class loginPopComponent {

  constructor(
    public dialogRef: MdDialogRef<loginPopComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
