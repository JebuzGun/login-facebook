import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formLogin:FormGroup;
  remember:boolean;
  private user:any;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private _facebook: Facebook) {
    this.formLogin = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
    let remember = JSON.parse(localStorage.getItem('remember'));
    let facebookUser = JSON.parse(localStorage.getItem('userFacebook'));
    if(facebookUser) {
      this.navCtrl.setRoot('RecuerdosPage',{helper: facebookUser});
    }
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

  facebookLogin() {
    this._facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        if(res.status) {
        this.getInfo();
        }
      }).catch(e => console.log('Error logging into Facebook', e));
  }

  getInfo(){
    this._facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
      .then(data=>{
        this.user = data;
        localStorage.setItem('userFacebook',JSON.stringify(data));
        this.navCtrl.setRoot('RecuerdosPage',{helper:data});
      })
      .catch(error =>{
        console.error( error );
      });
  }

}
