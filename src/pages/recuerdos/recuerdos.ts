import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
@IonicPage()
@Component({
  selector: 'page-recuerdos',
  templateUrl: 'recuerdos.html',
})
export class RecuerdosPage {

  private user:any;
  private anotherUser:any;
  private remembers:any;

  constructor(public navCtrl: NavController) {
    this.user = JSON.parse(localStorage.getItem('userFacebook'));
    this.anotherUser = localStorage.getItem('remember');
    console.log(this.user);
    console.log(this.anotherUser);
  }

  ionViewDidEnter() {
    this.remembers = JSON.parse(localStorage.getItem('remembers'));
  }

  ionViewWillEnter() {
    setTimeout(()=> {
      if(!this.remembers) {
        this.remembers = [];
        localStorage.setItem('remembers',JSON.stringify(this.remembers));
      }
      this.remembers = JSON.parse(localStorage.getItem('remembers'));
      console.log(this.remembers);
    },500);
  }

  addMemory() {
    this.navCtrl.push('RecuerdoPage');
  }

  sendMemory(remember,index) {
    let json = {
      remember: remember,
      index: index
    };
    this.navCtrl.push('RecuerdoPage', {remember:json});
  }

  logout() {
    this.navCtrl.setRoot('LoginPage').then(() => {
      localStorage.removeItem('remember');
      localStorage.removeItem('userFacebook');
    });
  }

}
