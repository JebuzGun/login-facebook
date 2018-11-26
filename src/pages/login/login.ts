import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formLogin:FormGroup;
  remember:boolean;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
    let remember = JSON.parse(localStorage.getItem('remember'));
    if(remember) {
      this.formLogin.controls['user'].setValue(remember.user);
      this.formLogin.controls['password'].setValue(remember.password);
      this.remember = true;
    }
  }

  loginSimple() {
    let credentials = this.formLogin.value;
    let prevAccess = localStorage.getItem(credentials.user);
    if(this.remember) {
      localStorage.setItem('remember', JSON.stringify(credentials));
    }
    if(prevAccess) {
      console.log(prevAccess);
      this.navCtrl.setRoot('RecuerdosPage', prevAccess);
    }else{
      let helper = {
        "user" : credentials.user,
        "img" : '',
        "memories" : ""
      };
      localStorage.setItem(credentials.user,JSON.stringify(helper));
      this.navCtrl.setRoot('RecuerdosPage', helper);
    }
  }

}
