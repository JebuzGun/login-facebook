import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-recuerdo',
  templateUrl: 'recuerdo.html',
})
export class RecuerdoPage {

  private name:string='';
  private location:string='';
  edit:boolean = false;
  private _info:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController) {
  }

  editMemory() {
    let alert = this.alertCtrl.create({

    });
    alert.present().then(() => {

    });
  }

  deleteMemory() {

  }

  selectPicture() {
    let alert = this.alertCtrl.create({

    });
    alert.present();
  }

  getGallery() {

  }

  getCamera() {

  }

}
